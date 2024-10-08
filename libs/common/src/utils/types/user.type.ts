import { Role } from '@app/common/utils/constants/constants';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
