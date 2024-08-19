import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Observable } from 'rxjs';
import { Commands } from '@app/common/utils/commands';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(RpcExceptionInterceptor)
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<any> {
    return this.authService.send(Commands.Auth.LOGIN, loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Observable<any> {
    return this.authService.send(Commands.Auth.REGISTER, registerDto);
  }
}
