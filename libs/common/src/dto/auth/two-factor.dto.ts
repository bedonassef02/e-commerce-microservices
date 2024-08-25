import { IsString } from 'class-validator';

export class TwoFactorDto {
  user?: string;
  twoFactorSecret?: string;
  isTwoFactorEnabled?: boolean;
  @IsString()
  token?: string;
}
