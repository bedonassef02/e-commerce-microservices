import { IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  user: string;
  @IsOptional()
  @IsString()
  code: string;
}
