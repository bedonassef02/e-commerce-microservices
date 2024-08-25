import { Role } from '@app/common/utils/constants/constants';

export type Payload = {
  sub: string;
  role: Role;
  isTwoFactorEnabled: boolean;
  isTwoFactorAuthenticated: boolean;
};
