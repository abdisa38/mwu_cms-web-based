import { useState } from 'react';
import { Save, ShieldAlert, Sliders, Database, Server } from 'lucide-react';
import { useGetSystemSettingsQuery, useUpdateSystemSettingsMutation } from '../api/registrarApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const SystemSettingsPage = () => {
  const { data, isLoading } = useGetSystemSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSystemSettingsMutation();
  
  const [activeTab, setActiveTab] = useState('workflow');

  const handleSave = async () => {
    try {
      // Stub payload for UI demonstration
      await updateSettings({ updated: true }).unwrap();
      toast.success('System settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Configuration</h1>
        <p className="text-slate-500 mt-1">Super Admin controls for workflow chains and global parameters.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('workflow')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'workflow' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <Sliders className="h-4 w-4" />
              <span>Workflow Sequence</span>
            </button>
            <button 
              onClick={() => setActiveTab('maintenance')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'maintenance' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <Server className="h-4 w-4" />
              <span>Maintenance Mode</span>
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Security Policies</span>
            </button>
            <button 
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'backup' ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <Database className="h-4 w-4" />
              <span>Database Backups</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          
          {activeTab === 'workflow' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Department Workflow Sequence</h2>
                  <p className="text-sm text-slate-500 mt-1">Configure which departments must approve a clearance and in what order.</p>
                </div>
                <Button onClick={handleSave} isLoading={isUpdating}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>

              <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 space-y-4">
                {['Library', 'Sports', 'Student Cafe', 'Dormitory', 'Academic Advisor'].map((dept, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-md shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="h-6 w-6 bg-blue-100 text-blue-700 rounded text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </div>
                      <span className="font-medium text-slate-900">{dept}</span>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span className="text-xs text-slate-500">Required</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Maintenance Mode</h2>
                <p className="text-sm text-slate-500 mt-1">Take the system offline for updates. Only Super Admins can log in during maintenance.</p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start space-x-4">
                <ShieldAlert className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900">System Offline Status</h3>
                  <p className="text-sm text-red-700 mt-1 mb-4">
                    Enabling maintenance mode will instantly disconnect all active student and staff sessions.
                  </p>
                  <Button variant="destructive">Enable Maintenance Mode</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Security Policies</h2>
                </div>
                <Button onClick={handleSave}>Save</Button>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>JWT Expiration (Days)</Label>
                  <Input type="number" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label>Max File Upload Size (MB)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <label className="flex items-center space-x-3 mt-4">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-slate-700">Require Two-Factor Auth for all Admins</span>
                </label>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
