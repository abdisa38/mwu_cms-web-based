import { z } from 'zod';

export const RegisterDto = z.object({
  userId: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(128)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  roleSlug: z.string().optional()
});

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const ChangePasswordDto = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(8)
});

export const ResetPasswordDto = z.object({
  token: z.string(),
  newPassword: z.string().min(8)
});

export type RegisterInput = z.infer<typeof RegisterDto>;
export type LoginInput = z.infer<typeof LoginDto>;
