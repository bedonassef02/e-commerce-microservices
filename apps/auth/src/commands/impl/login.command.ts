import { LoginDto } from '@app/common/dto/auth/login.dto';

export class LoginCommand {
  constructor(public readonly loginDto: LoginDto) {}
}
