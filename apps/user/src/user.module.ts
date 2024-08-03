import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CartMP, CommonModule, WishlistMP, MailMP } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { userHandlers } from './commands';
import { userQueries } from './queries';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';
import {
  registerBull,
  registerQueue,
} from '@app/common/utils/modules/register-bull.helper';
import { USER_QUEUE } from '@app/common/utils/constants/queue.constants';
import { UserConsumer } from './utils/user.consumer';

@Module({
  imports: [
    CommonModule,
    connectToMongo(User.name),
    registerBull(),
    registerQueue(USER_QUEUE),
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      registerClient(WishlistMP),
      registerClient(CartMP),
      registerClient(MailMP),
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserConsumer, ...userQueries, ...userHandlers],
})
export class UserModule {}
