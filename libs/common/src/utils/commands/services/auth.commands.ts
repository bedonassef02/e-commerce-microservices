import { PasswordCommands } from '@app/common/utils/commands/services/password.commands';

export const AuthCommands = {
  FIND_BY_EMAIL: { cmd: 'findByEmail' },
  LOGIN: { cmd: 'login' },
  REGISTER: { cmd: 'register' },
  Password: PasswordCommands,
  REFRESH_TOKEN: { cmd: 'refreshToken' },
};
