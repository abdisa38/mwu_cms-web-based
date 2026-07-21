import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { IUser } from './models/user.model';

export class AuthService {
  static generateTokens(user: IUser) {
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as { id: string };
  }
}
