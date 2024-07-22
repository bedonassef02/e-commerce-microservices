import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_QUEUE, AUTH_SERVICE, RMQ_URL } from '@app/common/utils/constants';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    CommonModule,
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
  controllers: [AuthController],
})
export class AuthModule {}
