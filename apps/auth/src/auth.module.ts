import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { authHandlers } from './commands';
import { CommonModule, UserMP } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { registerClient } from '@app/common/helpers/register-client.helper';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    ClientsModule.register([registerClient(UserMP)]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authHandlers],
})
export class AuthModule {}
