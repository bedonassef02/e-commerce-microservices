import { RegisterDto } from '@app/common/dto/auth/register.dto';

export class RegisterCommand {
  constructor(public readonly registerDto: RegisterDto) {}
}
