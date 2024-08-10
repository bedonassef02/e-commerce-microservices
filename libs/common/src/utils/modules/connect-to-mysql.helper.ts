import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqlType } from '@app/common/utils/types/sql.type';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function connectToMysql(
  name: string,
  entities = [],
): ReturnType<typeof TypeOrmModule.forRootAsync> {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
      sqlOptions(name, entities, configService),
  });
}

function sqlOptions(
  name: string,
  entities: any[],
  configService: ConfigService,
): TypeOrmModuleOptions {
  const sqlType: SqlType = configService.get<SqlType>('SQL_DB_TYPE');
  return {
    type: sqlType,
    host: configService.get<string>('SQL_DB_HOST'),
    port: configService.get<number>('SQL_DB_PORT'),
    username: configService.get<string>('SQL_DB_USERNAME'),
    password: configService.get<string>('SQL_DB_PASSWORD'),
    database: name,
    entities,
    synchronize: false,
  };
}
