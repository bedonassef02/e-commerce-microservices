import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUserByIdCommand } from './queries/impl/get-user-by-id.command';
import { GetUserByEmailCommand } from './queries/impl/get-user-by-email.command';
import { from, Observable } from 'rxjs';
import { User } from './entities/user.entity';
import { ValidateUserCommand } from './commands/impl/validate-user.command';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'create' })
  create(user: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(user));
  }

  @MessagePattern({ cmd: 'findById' })
  findById(id: string) {
    return this.queryBus.execute(new GetUserByIdCommand(id));
  }

  @MessagePattern({ cmd: 'findByEmail' })
  findByEmail(email: string): Observable<User> {
    return from(this.queryBus.execute(new GetUserByEmailCommand(email)));
  }

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: any) {
    const { email, password } = data;
    return this.commandBus.execute(new ValidateUserCommand(email, password));
  }
}
