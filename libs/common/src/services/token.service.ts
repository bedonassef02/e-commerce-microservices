import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from '../../../../apps/user/src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { Payload } from '@app/common/utils/types/payload.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generate(user: UserDocument, expiresIn: string = '15m'): string {
    const payload: Payload = {
      sub: user.id || user._id,
      role: user.role,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      isTwoFactorAuthenticated: false,
    };
    return this.jwtService.sign(payload, { expiresIn });
  }

  extract(request: JwtFromRequestFunction): string {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  }

  verify(token: string): Payload {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
