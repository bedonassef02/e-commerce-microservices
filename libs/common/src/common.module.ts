import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '@app/common/services/token.service';
import { CustomI18nService } from '@app/common/services/custom-i18n.service';
import * as path from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [CommonService, TokenService, CustomI18nService],
  exports: [CommonService, TokenService, CustomI18nService],
})
export class CommonModule {}
