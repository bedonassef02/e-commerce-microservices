import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from './commands/impl/register.command';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { LoginCommand } from './commands/impl/login.command';
import { Commands } from '@app/common/utils/commands';
import { RefreshTokenCommand } from './commands/impl/refresh-token.command';
import { LoginOrRegisterCommand } from './commands/impl/login-or-register.command';

@Controller()
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @MessagePattern(Commands.Auth.LOGIN)
  login(loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto));
  }

  @MessagePattern(Commands.Auth.REGISTER)
  register(registerDto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(registerDto));
  }

  @MessagePattern(Commands.Auth.REFRESH_TOKEN)
  refreshToken(refreshToken: string) {
    return this.commandBus.execute(new RefreshTokenCommand(refreshToken));
  }

  @MessagePattern(Commands.Auth.OAuth.Google)
  loginOrRegister(registerDto: RegisterDto) {
    return this.commandBus.execute(new LoginOrRegisterCommand(registerDto));
  }


}
