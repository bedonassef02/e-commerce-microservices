import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from '../../../../apps/user/src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generate(user: UserDocument): string {
    const payload = { sub: user._id };
    return this.jwtService.sign(payload);
  }

  extract(request: JwtFromRequestFunction) {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
