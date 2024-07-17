import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_URL, USER_QUEUE, USER_SERVICE } from '@app/common/utils/constants';
import { CqrsModule } from '@nestjs/cqrs';
import { authHandlers } from './commands';
import { CommonModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URL],
          queue: USER_QUEUE,
        },
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authHandlers],
})
export class AuthModule {}
