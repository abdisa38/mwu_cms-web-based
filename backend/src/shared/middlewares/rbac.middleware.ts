import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../modules/auth/models/user.model';
import { AppError } from '../../core/AppError';

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('You must be logged in to access this resource', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};
