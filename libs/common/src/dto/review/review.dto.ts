import {
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ReviewDto {
  @IsOptional()
  @IsString()
  message?: string;
  @IsInt()
  @Min(1)
  @Max(5)
  stars?: number;
  @IsMongoId()
  product: string;
  user: string;
}
