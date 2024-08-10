import { IsString } from 'class-validator';

export class ForgetPasswordDto {
  token: string;
  @IsString()
  password: string;
}
