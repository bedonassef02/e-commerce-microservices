import { UserDocument } from '../../../../user/src/entities/user.entity';
import { AuthResponse } from '../types/auth-response.type';

export function createAuthResponse(
  user: UserDocument,
  token: string,
): AuthResponse {
  return {
    id: user._id || user.id,
    name: user.name,
    role: user.role,
    token,
  };
}
