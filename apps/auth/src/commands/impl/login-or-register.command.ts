import { RegisterDto } from '@app/common/dto/auth/register.dto';

export class LoginOrRegisterCommand {
  constructor(public readonly registerDto: RegisterDto) {}
}
