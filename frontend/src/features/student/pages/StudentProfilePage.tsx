import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { User, Mail, Building, GraduationCap, Phone, MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateProfileMutation } from '../api/studentApi';
import { toast } from 'sonner';

export const StudentProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal and academic information.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-blue-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center relative overflow-hidden group">
              <User className="h-12 w-12 text-slate-400" />
              <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-colors">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user?.firstName} {user?.lastName}</h2>
              <p className="text-slate-500 font-medium">{user?.studentId}</p>
            </div>
            <Button variant={isEditing ? "outline" : "default"} onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Info (Read Only) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Academic Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-700">
                  <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">University Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <Building className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="font-medium">{user?.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <GraduationCap className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Program</p>
                    <p className="font-medium">Regular Degree (BSc)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info (Editable) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  {isEditing ? (
                    <Input 
                      placeholder="+251 9..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center space-x-3 text-slate-700 h-10">
                      <Phone className="h-5 w-5 text-slate-400 shrink-0" />
                      <p className="font-medium">+251 912 345 678</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Current Address</Label>
                  {isEditing ? (
                    <Input 
                      placeholder="Bale Robe, Ethiopia"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center space-x-3 text-slate-700 h-10">
                      <MapPin className="h-5 w-5 text-slate-400 shrink-0" />
                      <p className="font-medium">Bale Robe, Oromia, Ethiopia</p>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} isLoading={isLoading}>Save Changes</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
