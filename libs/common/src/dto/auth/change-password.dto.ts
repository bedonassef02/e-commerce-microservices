import { IsString } from 'class-validator';

export class ChangePasswordDto {
  id?: string;
  @IsString()
  password: string;
  @IsString()
  newPassword: string;
}
