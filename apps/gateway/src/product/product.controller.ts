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
  UseGuards,
  UsePipes,
  Query,
  UploadedFiles,
  ParseFilePipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/product/update-product.dto';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/commands';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { RoleGuard } from '@app/common/guards/role.guard';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { Public } from '@app/common/decorators/public.decorator';
import { Role } from '@app/common/utils/constants/constants';
import { Roles } from '@app/common/decorators/role.decorator';
import { ParseMongoIdPipe } from '@app/common/pipes/parse-mongo-id.pipe';
import { ProductQuery } from '@app/common/utils/features/product.query';
import { File } from '@app/common/utils/types/file.type';
import { imageUploadInterceptor } from '@app/common/intercetpors/image-upload.interceptor';
import { productFields } from '@app/common/utils/files/fields/product.fields';
import { ImagesInterceptor } from '@app/common/intercetpors/images.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(RpcExceptionInterceptor)
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: ClientProxy) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseInterceptors(
    imageUploadInterceptor(productFields, '5MB', ['png', 'jpg']),
    new ImagesInterceptor(true),
  )
  create(
    @UploadedFiles(new ParseFilePipe({ fileIsRequired: true }))
    files: { cover: File[]; images: File[] },
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.send(Commands.Crud.CREATE, createProductDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: ProductQuery) {
    return this.productService.send(Commands.Crud.FIND_ALL, query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findById(@Param('id') id: string) {
    return this.productService.send(Commands.Crud.FIND_BY_ID, id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.send(Commands.Crud.UPDATE, {
      id,
      updateProductDto,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productService.send(Commands.Crud.DELETE, id);
  }
}
