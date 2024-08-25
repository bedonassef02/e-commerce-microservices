import { TwoFactorDto } from '@app/common/dto/auth/two-factor.dto';

export class Verify2faCommand {
  constructor(public readonly twoFactorDto: TwoFactorDto) {}
}
