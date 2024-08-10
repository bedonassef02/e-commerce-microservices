import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';

export class UpdatePasswordCommand {
  constructor(public readonly passwordDto: ChangePasswordDto) {}
}
