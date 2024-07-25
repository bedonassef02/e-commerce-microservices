import { IsMongoId } from 'class-validator';

export class WishlistDto {
  user: string;
  @IsMongoId()
  product?: string;
}
