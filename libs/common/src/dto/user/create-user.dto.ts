import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  role: string = 'user';

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
