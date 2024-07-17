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
import { Commands } from '@app/common/utils/types/crud.interface';

@Controller()
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.CREATE)
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.commandBus.execute(
      new CreateCategoryCommand(createCategoryDto),
    );
  }

  @MessagePattern(Commands.FIND_ALL)
  async findAll() {
    return this.queryBus.execute(new GetCategoriesQuery());
  }

  @MessagePattern(Commands.FIND_BY_ID)
  async findById(id: string): Promise<Category> {
    return this.queryBus.execute(new GetCategoryQuery(id));
  }

  @MessagePattern(Commands.UPDATE)
  async update(@Payload() data: any): Promise<Category> {
    const { id = null, updateCategoryDto = null } = { ...data };
    return this.commandBus.execute(
      new UpdateCategoryCommand(id, updateCategoryDto),
    );
  }

  @MessagePattern(Commands.DELETE)
  async remove(id: string): Promise<Category> {
    return this.commandBus.execute(new RemoveCategoryCommand(id));
  }
}
