import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from './commands/impl/register.command';
import { USER_SERVICE } from '@app/common/utils/constants';
import { LoginCommand } from './commands/impl/login.command';

@Controller()
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'login' })
  login(loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto));
  }

  @MessagePattern({ cmd: 'register' })
  register(registerDto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(registerDto));
  }
}
