import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('SERVICE_NAME'),
          auth: {
            user: configService.get<string>('EMAIL_ADDRESS'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
