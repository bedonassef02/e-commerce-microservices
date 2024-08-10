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
import { Commands } from '@app/common/utils/commands';
import { CategoryQuery } from '@app/common/utils/features/category.query';

@Controller()
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Crud.CREATE)
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.commandBus.execute(
      new CreateCategoryCommand(createCategoryDto),
    );
  }

  @MessagePattern(Commands.Crud.FIND_ALL)
  async findAll(query: CategoryQuery) {
    return this.queryBus.execute(new GetCategoriesQuery(query));
  }

  @MessagePattern(Commands.Crud.FIND_BY_ID)
  async findById(id: string): Promise<Category> {
    return this.queryBus.execute(new GetCategoryQuery(id));
  }

  @MessagePattern(Commands.Crud.UPDATE)
  async update(@Payload() data: any): Promise<Category> {
    const { id = null, updateCategoryDto = null } = { ...data };
    return this.commandBus.execute(
      new UpdateCategoryCommand(id, updateCategoryDto),
    );
  }

  @MessagePattern(Commands.Crud.DELETE)
  async remove(id: string): Promise<Category> {
    return this.commandBus.execute(new RemoveCategoryCommand(id));
  }
}
