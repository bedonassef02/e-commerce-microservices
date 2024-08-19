import { applyDecorators, Injectable } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';

@Injectable()
export class CategorySwagger {
  static create() {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new category' }),
      ApiBody({ type: CreateCategoryDto }),
      ApiResponse({
        status: 201,
        description: 'Category created successfully',
      }),
      this.badRequestResponse,
    );
  }

  static findAll() {
    return applyDecorators(
      ApiOperation({ summary: 'Get all categories' }),
      ApiQuery({ type: CategoryQuery }),
      this.successResponse('Successfully retrieved categories'),
    );
  }

  static findById() {
    return applyDecorators(
      ApiOperation({ summary: 'Get category by ID' }),
      this.commonIdParam,
      this.successResponse('Successfully retrieved category'),
      this.notFoundResponse,
    );
  }

  static update() {
    return applyDecorators(
      ApiOperation({ summary: 'Update category by ID' }),
      this.commonIdParam,
      ApiBody({ type: UpdateCategoryDto }),
      this.successResponse('Category updated successfully'),
      this.notFoundResponse,
    );
  }

  static remove() {
    return applyDecorators(
      ApiOperation({ summary: 'Delete category by ID' }),
      this.commonIdParam,
      this.successResponse('Category deleted successfully'),
      this.notFoundResponse,
    );
  }

  private static readonly commonIdParam = ApiParam({
    name: 'id',
    type: String,
    description: 'Category ID',
  });

  private static readonly successResponse = (description: string) =>
    ApiResponse({ status: 200, description });

  private static readonly notFoundResponse = ApiResponse({
    status: 404,
    description: 'Category not found',
  });

  private static readonly badRequestResponse = ApiResponse({
    status: 400,
    description: 'Bad request',
  });
}