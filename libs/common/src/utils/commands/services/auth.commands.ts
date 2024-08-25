import { PasswordCommands } from '@app/common/utils/commands/services/password.commands';

export const AuthCommands = {
  FIND_BY_EMAIL: { cmd: 'findByEmail' },
  LOGIN: { cmd: 'login' },
  REGISTER: { cmd: 'register' },
  Password: PasswordCommands,
  TWO_FACTOR: {
    GENERATE_SECRET: 'generateSecret',
    VERIFY: 'verify',
  },
  REFRESH_TOKEN: { cmd: 'refreshToken' },
  OAuth: {
    Google: { cmd: 'googleLoginOrRegister' },
    Github: { cmd: 'githubLoginOrRegister' },
  },
};
