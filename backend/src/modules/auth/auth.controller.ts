import { Request, Response, NextFunction } from 'express';
import User, { UserRole } from '../users/user.model';
import { signToken } from '../../utils/jwt';
import { AppError } from '../../utils/AppError';

// Helper to send token response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id.toString(), user.role);

  const cookieOptions = {
    expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN || '1') * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return next(new AppError('Please provide email, password and role', 400));
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    // Create user
    const newUser = await User.create({
      email,
      password,
      role
    });

    sendTokenResponse(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // 4) If everything ok, send token to client
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};
