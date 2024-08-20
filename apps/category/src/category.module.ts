import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CommonModule } from '@app/common';
import { CategoryController } from './category.controller';
import { categoryCommands } from './commands';
import { categoryQueries } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { connectToMongo } from '@app/common/utils/modules/connect-to-mongo.helper';
import { configValidation } from '@app/common/utils/helpers/config-validation.helper';
import { mongoValidation } from '@app/common/utils/validation/utils/mongo-db.validation';
import { categoryBackup } from './utils/helpers/category.backup';

@Module({
  imports: [
    CqrsModule,
    CommonModule.register(configValidation(mongoValidation)),
    connectToMongo(Category.name),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [
    CategoryService,
    categoryBackup,
    ...categoryCommands,
    ...categoryQueries,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
