import { TwoFactorDto } from '@app/common/dto/auth/two-factor.dto';

export class TwoFactorCommand {
  constructor(public readonly twoFactorDto: TwoFactorDto) {}
}
