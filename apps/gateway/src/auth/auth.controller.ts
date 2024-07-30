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
import { CustomI18nService } from '../utils/services/custom-i18n.service';

@UseInterceptors(RpcExceptionInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
    private readonly i18nService: CustomI18nService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<any> {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Observable<any> {
    return this.authService.send({ cmd: 'register' }, registerDto);
  }
}
