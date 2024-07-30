import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { CreateUserCommand } from '../impl/create-user.command';
import { HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserDocument } from '../../entities/user.entity';
import { firstValueFrom, map } from 'rxjs';
import { USER_QUEUE } from '@app/common/utils/constants/queue.constants';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name);

  constructor(
    private readonly userService: UserService,
    @InjectQueue(USER_QUEUE) private readonly queue: Queue,
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
          this.queue.add('user', user.id);
          return user;
        }),
      ),
    );
  }
}
