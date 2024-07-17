import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/utils/constants';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';

@UseInterceptors(RpcExceptionInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    console.log({ loginDto });
    return this.authService.send({ cmd: 'login' }, loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.send({ cmd: 'register' }, registerDto);
  }
}
