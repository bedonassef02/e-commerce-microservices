import { IsMongoId, IsString } from 'class-validator';

export class UseCoupnDto {
  @IsString()
  code: string;
  @IsMongoId()
  user: string;
}
