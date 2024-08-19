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
  UploadedFiles,
  ParseFilePipe,
} from '@nestjs/common';
import { ParseMongoIdPipe } from '@app/common/pipes/parse-mongo-id.pipe';
import { CATEGORY_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/commands';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { RoleGuard } from '@app/common/guards/role.guard';
import { Roles } from '@app/common/decorators/role.decorator';
import { Role } from '@app/common/utils/constants/constants';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { Public } from '@app/common/decorators/public.decorator';
import { File } from '@app/common/utils/types/file.type';
import { imageUploadInterceptor } from '@app/common/intercetpors/image-upload.interceptor';
import { ImagesInterceptor } from '@app/common/intercetpors/images.interceptor';
import { categoryFields } from '@app/common/utils/files/fields/category.fields';
import { ApiTags } from '@nestjs/swagger';
import { CategorySwagger } from '../utils/swagger/category/category.swagger';

@ApiTags('category')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(RpcExceptionInterceptor)
@Controller({ path: 'category', version: '1' })
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: ClientProxy) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseInterceptors(
    imageUploadInterceptor(categoryFields, '5MB', ['png', 'jpg']),
    new ImagesInterceptor(),
  )
  @CategorySwagger.create()
  async create(
    @UploadedFiles(new ParseFilePipe({ fileIsRequired: true }))
    files: { cover: File[] },
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.send(Commands.Crud.CREATE, createCategoryDto);
  }

  @Get()
  @Public()
  @CategorySwagger.findAll()
  async findAll(@Query() query: CategoryQuery) {
    return this.categoryService.send(Commands.Crud.FIND_ALL, query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  @CategorySwagger.findById()
  findById(@Param('id') id: string) {
    return this.categoryService.send(Commands.Crud.FIND_BY_ID, id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @CategorySwagger.update()
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.send(Commands.Crud.UPDATE, {
      id,
      updateCategoryDto,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @CategorySwagger.remove()
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoryService.send(Commands.Crud.DELETE, id);
  }
}
