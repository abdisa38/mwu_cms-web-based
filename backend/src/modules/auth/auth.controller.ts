import { Request, Response, NextFunction } from 'express';
import { User } from './models/user.model';
import { AuthService } from './auth.service';
import { AppError } from '../../core/AppError';
import { ApiResponse } from '../../core/ApiResponse';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        throw new AppError('Incorrect email or password', 401);
      }

      if (!user.isActive) {
        throw new AppError('Your account has been deactivated.', 403);
      }

      const { accessToken, refreshToken } = AuthService.generateTokens(user);

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      // Send refresh token in HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      user.password = undefined; // hide password
      user.refreshToken = undefined;

      return ApiResponse.success(res, { user, accessToken }, 'Logged in successfully');
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshToken');
      return ApiResponse.success(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }
}
