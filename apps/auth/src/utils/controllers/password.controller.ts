import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { Commands } from '@app/common/utils/types/crud.interface';
import { ResetPasswordCommand } from '../commands/impl/reset-password.command';
import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';
import { ChangePasswordCommand } from '../commands/impl/change-password.command';
import { ForgetPasswordCommand } from '../commands/impl/forget-password.command';
import { ForgetPasswordDto } from '@app/common/dto/auth/forget-password.dto';

@Controller()
export class PasswordController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @MessagePattern(Commands.Auth.Password.CHANGE)
  change(passwordDto: ChangePasswordDto) {
    return this.commandBus.execute(new ChangePasswordCommand(passwordDto));
  }

  @MessagePattern(Commands.Auth.Password.RESET)
  reset(email: string) {
    return this.commandBus.execute(new ResetPasswordCommand(email));
  }

  @MessagePattern(Commands.Auth.Password.FORGET)
  forget(passwordDto: ForgetPasswordDto) {
    return this.commandBus.execute(new ForgetPasswordCommand(passwordDto));
  }
}
