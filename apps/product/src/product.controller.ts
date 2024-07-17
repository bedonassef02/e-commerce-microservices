import { Controller, Body } from '@nestjs/common';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { GetProductQuery } from './queries/impl/get-product.query';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { RemoveProductCommand } from './commands/impl/remove-product.command';
import { Commands } from '@app/common/utils/types/crud.interface';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.CREATE)
  create(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @MessagePattern(Commands.FIND_ALL)
  findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  @MessagePattern(Commands.FIND_BY_ID)
  findOne(id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @MessagePattern(Commands.UPDATE)
  update(@Payload() data: any) {
    const { id = null, updateProductDto = null } = { ...data };
    return this.commandBus.execute(
      new UpdateProductCommand(id, updateProductDto),
    );
  }

  @MessagePattern(Commands.DELETE)
  remove(id: string) {
    return this.commandBus.execute(new RemoveProductCommand(id));
  }
}
