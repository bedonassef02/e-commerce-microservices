import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { CreateUserCommand } from '../impl/create-user.command';
import { from, switchMap } from 'rxjs';
import { HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name);

  constructor(private readonly userService: UserService) {}

  async execute(command: CreateUserCommand) {
    return from(this.userService.findByEmail(command.createUserDto.email)).pipe(
      switchMap((user) => {
        if (user) {
          this.logger.error(
            `Email ${command.createUserDto.email} already exists`,
          );
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            message: 'Email already exists',
          });
        }
        return this.userService.create(command.createUserDto);
      }),
    );
  }
}
