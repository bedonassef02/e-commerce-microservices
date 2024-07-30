import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { authHandlers } from './commands';
import { CommonModule, UserMP } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    registerJwt(),
    ClientsModule.register([registerClient(UserMP)]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, ...authHandlers],
})
export class AuthModule {}
