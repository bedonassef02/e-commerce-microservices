import { UserDocument } from '../../../../user/src/entities/user.entity';
import { AuthResponse } from '../types/auth-response.type';

export function createAuthResponse(
  user: UserDocument,
  access_token: string,
  refresh_token: string,
): AuthResponse {
  return {
    id: user._id || user.id,
    name: user.name,
    role: user.role,
    access_token,
    refresh_token,
  };
}
