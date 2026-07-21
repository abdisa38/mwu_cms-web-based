import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, User as UserIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { loginSchema, LoginFormValues } from '../validations';
import { useLoginMutation } from '../api/authApi';
import { setCredentials } from '@/store/slices/authSlice';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrStudentId: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials({ user: response.data.user, token: response.token }));
      
      toast.success('Successfully logged in');
      
      // Redirect based on role
      const rolePath = response.data.user.role.toLowerCase();
      navigate(`/${rolePath}/dashboard`);
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your MWU e-Clearance account to continue."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Email / Student ID */}
        <div className="space-y-2">
          <Label htmlFor="emailOrStudentId">Email or Student ID</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400" />
            </div>
            <Input 
              id="emailOrStudentId"
              placeholder="e.g. abebe@mwu.edu.et or MWU/1234/12"
              className="pl-10"
              error={!!errors.emailOrStudentId}
              {...register('emailOrStudentId')}
            />
          </div>
          {errors.emailOrStudentId && (
            <p className="text-sm text-red-500 mt-1">{errors.emailOrStudentId.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <Input 
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10"
              error={!!errors.password}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 text-base font-semibold"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
            Register as a Student
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
