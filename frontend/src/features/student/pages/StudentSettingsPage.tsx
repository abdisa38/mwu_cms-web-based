import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, Bell, Moon, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangePasswordMutation } from '../api/studentApi';
import { toast } from 'sonner';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordForm = z.infer<typeof passwordSchema>;

export const StudentSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema)
  });

  const onSubmitPassword = async (data: PasswordForm) => {
    try {
      await changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword }).unwrap();
      toast.success('Password updated successfully');
      reset();
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your security and application preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <Lock className="h-4 w-4" />
              <span>Security & Password</span>
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
            <button 
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <Moon className="h-4 w-4" />
              <span>Appearance</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
                <p className="text-sm text-slate-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input type="password" {...register('currentPassword')} error={!!errors.currentPassword} />
                  {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input type="password" {...register('newPassword')} error={!!errors.newPassword} />
                  {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input type="password" {...register('confirmPassword')} error={!!errors.confirmPassword} />
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <div className="pt-4">
                  <Button type="submit" isLoading={isLoading}>Update Password</Button>
                </div>
              </form>

              <div className="border-t border-slate-200 pt-8 mt-8">
                <h2 className="text-lg font-bold text-slate-900">Two-Factor Authentication</h2>
                <p className="text-sm text-slate-500 mt-1 mb-4">Add additional security to your account using two-factor authentication.</p>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" /> Enable 2FA
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
                <p className="text-sm text-slate-500 mt-1">Decide how you want to be notified about clearance updates.</p>
              </div>
              {/* Notification toggles would go here */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Email alerts for department approvals</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Email alerts for new messages</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">In-app notifications</span>
                </label>
              </div>
              <Button>Save Preferences</Button>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Appearance</h2>
                <p className="text-sm text-slate-500 mt-1">Customize how the application looks on your device.</p>
              </div>
              <div className="flex space-x-4">
                <div className="border-2 border-blue-600 rounded-lg p-1 cursor-pointer">
                  <div className="w-24 h-16 bg-slate-50 rounded shadow-sm border"></div>
                  <p className="text-center text-xs font-medium mt-2">Light</p>
                </div>
                <div className="border-2 border-transparent hover:border-slate-300 rounded-lg p-1 cursor-pointer opacity-50">
                  <div className="w-24 h-16 bg-slate-900 rounded shadow-sm border border-slate-800"></div>
                  <p className="text-center text-xs font-medium mt-2">Dark (Coming soon)</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
