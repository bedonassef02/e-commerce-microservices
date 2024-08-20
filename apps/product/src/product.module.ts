import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { productQueries } from './queries';
import { productCommands } from './commands';
import { CategoryMP, CommonModule } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';
import { configValidation } from '@app/common/utils/helpers/config-validation.helper';
import { mongoValidation } from '@app/common/utils/validation/utils/mongo-db.validation';
import { MulterModule } from '@nestjs/platform-express';
import { productBackup } from './utils/helpers/product-backup.helper';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CommonModule.register(configValidation(mongoValidation)),
    connectToMongo(Product.name),
    MulterModule.register({
      dest: './upload',
      // storage: storageConfig(),
    }),
    CqrsModule,
    ClientsModule.register([registerClient(CategoryMP)]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    productBackup,
    ...productQueries,
    ...productCommands,
  ],
})
export class ProductModule {}
