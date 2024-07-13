import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CommonModule } from '@app/common';
import { CategoryController } from './category.controller';
import { categoryCommands } from './commands';
import { categoryQueries } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [
    CqrsModule,
    CommonModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoryService, ...categoryCommands, ...categoryQueries],
  controllers: [CategoryController],
})
export class CategoryModule {}
