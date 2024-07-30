import * as bcrypt from 'bcryptjs';

export function compare(password: string, hashedPassword: string) {
  console.log({ password, hashedPassword });
  return bcrypt.compareSync(password, hashedPassword);
}

export function hash(password: string) {
  return bcrypt.hashSync(password, 10);
}
