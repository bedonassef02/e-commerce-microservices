import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from '../../entities/user.entity';
import { from, map } from 'rxjs';
import { HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ValidateUserCommand } from '../impl/validate-user.command';

@CommandHandler(ValidateUserCommand)
export class ValidateUserHandler
  implements ICommandHandler<ValidateUserCommand>
{
  private readonly logger = new Logger(ValidateUserHandler.name);
  constructor(private readonly userService: UserService) {}

  async execute(command: ValidateUserCommand): Promise<any> {
    return this.userService.validateUser(command.email, command.password);
  }
}
