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
  UsePipes,
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
import { AuthGuard } from '@app/common/guards/auth.guard';
import { Public } from '@app/common/decorators/public.decorator';

@UseInterceptors(RpcExceptionInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('category')
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: ClientProxy) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.send(Commands.CREATE, createCategoryDto);
  }

  @Get()
  @Public()
  async findAll(@Query() query: CategoryQuery) {
    return this.categoryService.send(Commands.FIND_ALL, query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findById(@Param('id') id: string) {
    return this.categoryService.send(Commands.FIND_BY_ID, id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoryService.send(Commands.DELETE, id);
  }
}
