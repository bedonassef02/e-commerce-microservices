import * as crypto from 'crypto';

export function createResetToken(): string {
  const resetToken: string = crypto.randomBytes(20).toString('hex');
  return crypto.createHash('sha256').update(resetToken).digest('hex');
}

export const resetPasswordExpires = (): number => Date.now() + 10 * 60 * 1000; // 10 min
