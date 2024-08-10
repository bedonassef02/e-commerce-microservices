import crypto from 'crypto';

export function createResetToken() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  return crypto.createHash('sha256').update(resetToken).digest('hex');
}

export const resetPasswordExpires = () => Date.now() + 10 * 60 * 1000;
