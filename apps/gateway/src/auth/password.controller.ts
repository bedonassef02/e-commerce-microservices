import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/commands';
import { ResetPasswordDto } from '@app/common/dto/auth/reset-password.dto';
import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { User } from '@app/common/decorators/user.decorator';
import { ForgetPasswordDto } from '@app/common/dto/auth/forget-password.dto';
import { Public } from '@app/common/decorators/public.decorator';

@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard)
@Controller('auth/password')
export class PasswordController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly passwordService: ClientProxy,
  ) {}

  @Post('change')
  change(@User('id') user: string, @Body() passwordDto: ChangePasswordDto) {
    passwordDto.id = user;
    return this.passwordService.send(
      Commands.Auth.Password.CHANGE,
      passwordDto,
    );
  }

  @Get('reset')
  reset(@Body() resetDto: ResetPasswordDto) {
    return this.passwordService.send(
      Commands.Auth.Password.RESET,
      resetDto.email,
    );
  }

  @Public()
  @Patch('reset/:token')
  forget(
    @Param('token') token: string,
    @Body() passwordDto: ForgetPasswordDto,
  ) {
    passwordDto.token = token;
    return this.passwordService.send(
      Commands.Auth.Password.FORGET,
      passwordDto,
    );
  }
}
