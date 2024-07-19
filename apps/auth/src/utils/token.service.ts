import { Injectable } from '@nestjs/common';
import { UserDocument } from '../../../user/src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { from, map } from 'rxjs';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generate(user: UserDocument): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return from(this.jwtService.verify(token)).pipe(
      map((payload) => {
        console.log(payload);
        return payload;
      }),
      throwException,
    );
  }
}
