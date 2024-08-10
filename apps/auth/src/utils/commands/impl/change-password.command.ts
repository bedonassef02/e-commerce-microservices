import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';

export class ChangePasswordCommand {
  constructor(public readonly passwordDto: ChangePasswordDto) {}
}
