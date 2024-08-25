import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '@app/common';
import { AUTH_SERVICE } from '@app/common/utils/constants/service.constants';
import { AUTH_QUEUE } from '@app/common/utils/constants/queue.constants';
import { PasswordController } from './password.controller';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';
import { GoogleStrategy } from './utils/strategies/google.strategy';
import { TwoFactorController } from './two-factor.controller';

@Module({
  imports: [
    CommonModule,
    PassportModule,
    registerJwt(),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URL],
          queue: AUTH_QUEUE,
        },
      },
    ]),
  ],
  controllers: [AuthController, PasswordController, TwoFactorController],
  providers: [TokenService, GoogleStrategy],
})
export class AuthModule {}
