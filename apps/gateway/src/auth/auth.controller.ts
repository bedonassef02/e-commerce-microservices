import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/utils/constants';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Observable } from 'rxjs';
import { AuthGuard } from '@app/common/guards/auth.guard';

@UseInterceptors(RpcExceptionInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<any> {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Observable<any> {
    return this.authService.send({ cmd: 'register' }, registerDto);
  }
}
