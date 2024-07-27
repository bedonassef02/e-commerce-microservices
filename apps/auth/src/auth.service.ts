import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { User } from '../../user/src/entities/user.entity';
import { compare } from '@app/common/helpers/password.helper';
import { Role } from '@app/common/utils/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  login(loginDto: LoginDto): Observable<User> {
    return this.userService.send({ cmd: 'findByEmail' }, loginDto.email).pipe(
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
    return this.userService.send({ cmd: 'create' }, registerDto);
  }
}
