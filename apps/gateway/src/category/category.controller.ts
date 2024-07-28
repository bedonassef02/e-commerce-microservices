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
  UseGuards,
  Query,
} from '@nestjs/common';
import { ParseMongoIdPipe } from '@app/common/pipes/parse-mongo-id.pipe';
import { CATEGORY_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/types/crud.interface';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { RoleGuard } from '@app/common/guards/role.guard';
import { Roles } from '@app/common/decorators/role.decorator';
import { Role } from '@app/common/utils/constants/constants';

@UseInterceptors(RpcExceptionInterceptor)
@Controller('category')
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: ClientProxy) {}

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.send(Commands.CREATE, createCategoryDto);
  }

  @Get()
  async findAll(@Query() query: CategoryQuery) {
    return this.categoryService.send(Commands.FIND_ALL, query);
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
    return this.categoryService.send(Commands.UPDATE, {
      id,
      updateCategoryDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoryService.send(Commands.DELETE, id);
  }
}
