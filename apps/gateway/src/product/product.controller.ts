import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/product/update-product.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/types/crud.interface';

@UseInterceptors(RpcExceptionInterceptor)
@Controller('product')
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.send(Commands.CREATE, createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.send(Commands.FIND_ALL, '');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.send(Commands.FIND_BY_ID, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.send(Commands.UPDATE, { id, updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.send(Commands.DELETE, id);
  }
}
