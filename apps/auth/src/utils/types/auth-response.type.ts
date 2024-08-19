import { Role } from '@app/common/utils/constants/constants';

export type AuthResponse = {
  id: string;
  name: string;
  role: Role;
  access_token: string;
  refresh_token: string;
};
