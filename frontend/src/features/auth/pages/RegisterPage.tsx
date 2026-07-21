import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, User as UserIcon, Mail, Building, GraduationCap, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { registerSchema, RegisterFormValues } from '../validations';
import { useRegisterMutation } from '../api/authApi';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerAccount, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');
  
  // Calculate simple password strength
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  
  const strength = getPasswordStrength();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerAccount(data).unwrap();
      setIsSuccess(true);
      toast.success('Registration successful! Please check your email.');
    } catch (err: any) {
      toast.error(err.data?.message || 'Registration failed. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout title="Registration Successful" subtitle="Welcome to MWU e-Clearance.">
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Check your email</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We've sent a verification link to your university email address. Please click the link to verify your account before logging in.
          </p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Return to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Student Registration" 
      subtitle="Create your account to initiate and track your clearance."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName"
              placeholder="Abebe"
              error={!!errors.firstName}
              {...register('firstName')}
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName"
              placeholder="Kebede"
              error={!!errors.lastName}
              {...register('lastName')}
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student ID */}
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="studentId"
                placeholder="MWU/1234/12"
                className="pl-9"
                error={!!errors.studentId}
                {...register('studentId')}
              />
            </div>
            {errors.studentId && <p className="text-xs text-red-500">{errors.studentId.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">University Email</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="email"
                placeholder="abebe@student.mwu.edu.et"
                className="pl-9"
                error={!!errors.email}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="department"
                placeholder="Software Engineering"
                className="pl-9"
                error={!!errors.department}
                {...register('department')}
              />
            </div>
            {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
          </div>

          {/* Program */}
          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="program"
                placeholder="Regular Degree"
                className="pl-9"
                error={!!errors.program}
                {...register('program')}
              />
            </div>
            {errors.program && <p className="text-xs text-red-500">{errors.program.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2 pt-2">
          <Label htmlFor="password">Create Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-slate-400" />
            </div>
            <Input 
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="pl-9 pr-9"
              error={!!errors.password}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          
          {/* Strength Indicator */}
          {password.length > 0 && !errors.password && (
            <div className="flex gap-1 mt-2">
              <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? 'bg-red-400' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? 'bg-orange-400' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-yellow-400' : 'bg-slate-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${strength >= 4 ? 'bg-green-500' : 'bg-slate-200'}`} />
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Confirm Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-slate-400" />
            </div>
            <Input 
              id="passwordConfirm"
              type={showPassword ? 'text' : 'password'}
              className="pl-9"
              error={!!errors.passwordConfirm}
              {...register('passwordConfirm')}
            />
          </div>
          {errors.passwordConfirm && <p className="text-xs text-red-500">{errors.passwordConfirm.message}</p>}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 text-base font-semibold mt-6"
          isLoading={isLoading}
        >
          Create Account
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-600 mt-6 pb-4">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
