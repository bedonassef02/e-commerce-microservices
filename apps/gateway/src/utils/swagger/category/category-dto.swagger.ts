import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export class CategoryDtoSwagger {
  static Name() {
    return applyDecorators(
      ApiProperty({
        description: 'The name of the category',
        example: 'Electronics',
      }),
    );
  }

  static description() {
    return applyDecorators(
      ApiPropertyOptional({
        description: 'The description of the category',
        example: 'A category for electronic products',
      }),
    );
  }

  static parent() {
    return applyDecorators(
      ApiPropertyOptional({
        description: 'The ID of the parent category',
        example: '60d0fe4f5311236168a109ca',
        type: String,
      }),
    );
  }

  static cover() {
    return applyDecorators(
      ApiPropertyOptional({
        description: 'The URL or path of the category cover image',
        example: 'https://example.com/images/category-cover.png',
      }),
    );
  }
}
