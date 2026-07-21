import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useParams } from 'react-router';
import { Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { resetPasswordSchema, ResetPasswordFormValues } from '../validations';
import { useResetPasswordMutation } from '../api/authApi';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });
  
  const password = watch('password', '');
  
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  
  const strength = getPasswordStrength();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error('Reset token is missing.');
      return;
    }
    
    try {
      await resetPassword({ token, ...data }).unwrap();
      setIsSuccess(true);
      toast.success('Password reset successfully!');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to reset password. The link might be expired.');
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout title="Password Reset" subtitle="Your password has been changed successfully.">
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            You can now use your new password to sign in to your account.
          </p>
          <Link to="/login">
            <Button className="w-full">Sign In Now</Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Please enter your new secure password."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <Input 
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="pl-10 pr-10"
              error={!!errors.password}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          
          {password.length > 0 && !errors.password && (
            <div className="flex gap-1 mt-2">
              <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? 'bg-red-400' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? 'bg-orange-400' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-yellow-400' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${strength >= 4 ? 'bg-green-500' : 'bg-slate-200'}`} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Confirm New Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <Input 
              id="passwordConfirm"
              type={showPassword ? 'text' : 'password'}
              className="pl-10"
              error={!!errors.passwordConfirm}
              {...register('passwordConfirm')}
            />
          </div>
          {errors.passwordConfirm && <p className="text-xs text-red-500 mt-1">{errors.passwordConfirm.message}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full h-11 text-base font-semibold mt-4"
          isLoading={isLoading}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};
