import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_URL } from '@app/common/utils/constants/constants';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '@app/common';
import { AUTH_SERVICE } from '@app/common/utils/constants/service.constants';
import { AUTH_QUEUE } from '@app/common/utils/constants/queue.constants';
import { registerI18n } from '@app/common/utils/modules/register-i18n.helper';
import { CustomI18nService } from '../utils/services/custom-i18n.service';

@Module({
  imports: [
    CqrsModule,
    registerI18n(),
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
  providers: [CustomI18nService],
})
export class AuthModule {}
