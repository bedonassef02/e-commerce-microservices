import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ParseMongoIdPipe } from '@app/common/pipes/parse-mongo-id.pipe';
import { CATEGORY_SERVICE } from '@app/common/utils/constants';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/types/crud.interface';

@UseInterceptors(RpcExceptionInterceptor)
@Controller('category')
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: ClientProxy) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.send(Commands.CREATE, createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoryService.send(Commands.FIND_ALL, {});
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoryService.send(Commands.FIND_BY_ID, id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService
      .send(Commands.UPDATE, { id, updateCategoryDto })
      .pipe(timeout(5000));
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoryService.send(Commands.DELETE, id).pipe(timeout(5000));
  }
}
