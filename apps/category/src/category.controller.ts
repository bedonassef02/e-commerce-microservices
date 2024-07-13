import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './commands/impl/create-category.command';
import { Category } from './entities/category.entity';
import { GetCategoryQuery } from './queries/impl/get-category.query';
import { UpdateCategoryCommand } from './commands/impl/update-category.command';
import { RemoveCategoryCommand } from './commands/impl/remove-category.command';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { GetCategoriesQuery } from './queries/impl/get-categories.query';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'create' })
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.commandBus.execute(
      new CreateCategoryCommand(createCategoryDto),
    );
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll() {
    return this.queryBus.execute(new GetCategoriesQuery());
  }

  @MessagePattern({ cmd: 'findById' })
  async findById(id: string): Promise<Category> {
    return this.queryBus.execute(new GetCategoryQuery(id));
  }

  @MessagePattern({ cmd: 'update' })
  async update(@Payload() data: any): Promise<Category> {
    const { id, updateCategoryDto } = { ...data };
    return this.commandBus.execute(
      new UpdateCategoryCommand(id, updateCategoryDto),
    );
  }

  @MessagePattern({ cmd: 'remove' })
  async remove(id: string): Promise<Category> {
    return this.commandBus.execute(new RemoveCategoryCommand(id));
  }
}
