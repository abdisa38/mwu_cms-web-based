import { Request, Response, NextFunction } from 'express';
import { AuthService } from './services/auth.service';
import { RegisterDto, LoginDto } from './dtos/auth.dto';
import { BadRequestError } from '../../core/errors';

const authService = new AuthService();

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = RegisterDto.parse(req.body);
      const file = req.file;
      const result = await authService.register(validated, file?.path);
      res.status(201).json({ success: true, message: result.message });
    } catch (error: any) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = LoginDto.parse(req.body);
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];

      const result = await authService.login(validated, ipAddress, userAgent);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
          user: {
            id: result.user._id,
            email: result.user.email,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            studentId: result.user.userId,
            status: result.user.status,
            role: (result.user.roleId as any)?.slug?.toUpperCase() || 'STUDENT'
          }
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      if (!refreshToken) throw new BadRequestError('Refresh token required');

      const result = await authService.refreshTokens(refreshToken);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        success: true,
        data: { accessToken: result.accessToken }
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshToken');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error: any) {
      next(error);
    }
  }
}
