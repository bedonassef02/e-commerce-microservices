import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { CreateUserCommand } from '../impl/create-user.command';
import { HttpStatus, Inject, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserDocument } from '../../entities/user.entity';
import { firstValueFrom, map } from 'rxjs';
import {
  CART_SERVICE,
  WISHLIST_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { Commands } from '@app/common/utils/types/crud.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name);

  constructor(
    private readonly userService: UserService,
    @Inject(WISHLIST_SERVICE) private wishlistService: ClientProxy,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserDocument> {
    const user = await firstValueFrom(
      this.userService.findByEmail(command.createUserDto.email),
    );
    if (user) {
      this.logger.error(`Email ${command.createUserDto.email} already exists`);
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: 'Email already exists',
      });
    }
    return firstValueFrom(
      this.userService.create(command.createUserDto).pipe(
        map((user: UserDocument) => {
          this.init(user.id);
          return user;
        }),
      ),
    );
  }

  private init(user: string) {
    this.createCart(user);
    this.createWishlist(user);
  }

  private createWishlist(user: string) {
    this.wishlistService.send(Commands.CREATE, user).subscribe({
      next: (response) =>
        this.logger.log(`Wishlist service response: ${response}`),
      error: (error) =>
        this.logger.error(`Wishlist service error: ${error.message}`),
    });
  }

  private createCart(user: string) {
    this.cartService.send(Commands.CREATE, user).subscribe({
      next: (response) => this.logger.log(`Cart service response: ${response}`),
      error: (error) =>
        this.logger.error(`Cart service error: ${error.message}`),
    });
  }
}
