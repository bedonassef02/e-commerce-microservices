import { Controller, Body, Param } from '@nestjs/common';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { GetProductQuery } from './queries/impl/get-product.query';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { RemoveProductCommand } from './commands/impl/remove-product.command';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'create' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  @MessagePattern({ cmd: 'findById' })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() data: any) {
    const { id, updateProductDto } = { ...data };
    return this.commandBus.execute(
      new UpdateProductCommand(id, updateProductDto),
    );
  }

  @MessagePattern({ cmd: 'remove' })
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new RemoveProductCommand(id));
  }
}
