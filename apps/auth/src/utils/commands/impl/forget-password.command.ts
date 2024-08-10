import { ForgetPasswordDto } from '@app/common/dto/auth/forget-password.dto';

export class ForgetPasswordCommand {
  constructor(public readonly forgetPasswordDto: ForgetPasswordDto) {}
}
