import { IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from '@app/common/dto/auth/login.dto';

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  provider?: string;
  providerId?: string;
}
