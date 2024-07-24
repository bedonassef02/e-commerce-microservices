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
import { registerClient } from '@app/common/helpers/register-client.helper';

@Module({
  imports: [
    CommonModule,
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
