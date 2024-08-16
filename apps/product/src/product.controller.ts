import { Controller, Body } from '@nestjs/common';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { GetProductQuery } from './queries/impl/get-product.query';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { RemoveProductCommand } from './commands/impl/remove-product.command';
import { Commands } from '@app/common/utils/commands';
import { ProductQuery } from '@app/common/utils/features/product.query';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Crud.CREATE)
  create(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @MessagePattern(Commands.Crud.FIND_ALL)
  findAll(query: ProductQuery) {
    return this.queryBus.execute(new GetProductsQuery(query));
  }

  @MessagePattern(Commands.Crud.FIND_BY_ID)
  findOne(id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @MessagePattern(Commands.Crud.UPDATE)
  update(@Payload() data: any) {
    const { id = null, updateProductDto = null } = { ...data };
    return this.commandBus.execute(
      new UpdateProductCommand(id, updateProductDto),
    );
  }

  @MessagePattern(Commands.Crud.DELETE)
  remove(id: string) {
    return this.commandBus.execute(new RemoveProductCommand(id));
  }
}
