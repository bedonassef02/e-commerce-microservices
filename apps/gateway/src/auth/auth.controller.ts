import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
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

  @Post('refresh')
  refreshToken(@Body('refreshToken') refreshToken: string): Observable<any> {
    return this.authService.send(Commands.Auth.REFRESH_TOKEN, refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.send(Commands.Auth.OAuth.Google, req.user);
  }
}
