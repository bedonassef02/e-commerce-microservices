import { TypeOrmModule } from '@nestjs/typeorm';

export function connectToMysql(name: string, entities = []) {
  // TODO: abstract
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: name,
    entities,
    synchronize: false,
  });
}
