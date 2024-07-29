import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_URI } from '@app/common/utils/constants/constants';
import { DynamicModule } from '@nestjs/common';

export function connectToMongo(name: string): DynamicModule {
  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: `${configService.get<string>(DATABASE_URI)}/${name}`,
    }),
  })
}