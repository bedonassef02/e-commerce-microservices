import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CartMP, CommonModule, WishlistMP } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { userHandlers } from './commands';
import { userQueries } from './queries';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';

@Module({
  imports: [
    CommonModule,
    connectToMongo(User.name),
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      registerClient(WishlistMP),
      registerClient(CartMP),
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ...userQueries, ...userHandlers],
})
export class UserModule {}
