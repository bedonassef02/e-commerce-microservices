import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { User, UserDocument } from '../../user/src/entities/user.entity';
import { compare } from '@app/common/utils/helpers/password.helper';
import { Commands } from '@app/common/utils/commands';
import { TokenService } from '@app/common/services/token.service';
import { createAuthResponse } from './utils/helpers/create-auth-response.helper';
import { AuthResponse } from './utils/types/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    private readonly tokenService: TokenService,
  ) {
  }

  login(loginDto: LoginDto): Observable<User> {
    return this.userService
      .send(Commands.User.FIND_BY_EMAIL, loginDto.email)
      .pipe(
        map((user: User) => {
          if (user && compare(loginDto.password, user.password)) {
            return user;
          }
          throw new RpcException({
            status: HttpStatus.UNAUTHORIZED,
            error: 'email or password is incorrect',
          });
        }),
      );
  }

  register(registerDto: RegisterDto): Observable<User> {
    return this.userService.send(Commands.Crud.CREATE, registerDto);
  }

  loginOrRegister(registerDto: RegisterDto) {
    return this.userService.send(Commands.User.FIND_BY_EMAIL, registerDto.email).pipe(
      map((user: User) => {
        if (user) {
          return user;
        } else {
          return this.register(registerDto);
        }
      }),
    );
  }

  generateResponse(user: UserDocument): AuthResponse {
    const access_token: string = this.tokenService.generate(user);
    const refresh_token: string = this.tokenService.generate(user, '7d');
    return createAuthResponse(user, access_token, refresh_token);
  }
}
