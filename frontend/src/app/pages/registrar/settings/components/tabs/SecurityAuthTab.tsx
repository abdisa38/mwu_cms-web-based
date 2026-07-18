import { useState } from "react";
import { ShieldCheck, Key, Lock, Activity, Users, AlertTriangle } from "lucide-react";
import { AuthSettings, SessionSettings, ActiveSession } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface Props {
  authData: AuthSettings;
  sessionData: SessionSettings;
  activeSessions: ActiveSession[];
  onDirty: () => void;
}

export function SecurityAuthTab({ authData, sessionData, activeSessions, onDirty }: Props) {
  const [auth, setAuth] = useState(authData);
  const [session, setSession] = useState(sessionData);

  const handleAuthChange = (field: keyof AuthSettings, value: any) => {
    setAuth({ ...auth, [field]: value });
    onDirty();
  };

  const handleSessionChange = (field: keyof SessionSettings, value: any) => {
    setSession({ ...session, [field]: value });
    onDirty();
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      
      {/* Authentication Policies */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Key className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">Authentication Policy</h2>
        </div>
        <div className="p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Two-Factor Authentication (2FA)</label>
              <select 
                value={auth.twoFactorRequirement}
                onChange={(e) => handleAuthChange('twoFactorRequirement', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Optional">Optional</option>
                <option value="Required for Registrar">Required for Registrar Only</option>
                <option value="Required for All Staff">Required for All Staff</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Applies to Time-based One Time Passwords (TOTP)</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">Password Complexity Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                <span className="text-sm font-medium text-slate-700">Minimum Length</span>
                <input 
                  type="number" 
                  value={auth.passwordMinLength}
                  onChange={(e) => handleAuthChange('passwordMinLength', parseInt(e.target.value))}
                  className="w-20 px-2 py-1 border border-slate-300 rounded text-center"
                />
              </div>
              <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-700">Require Uppercase (A-Z)</span>
                <input type="checkbox" checked={auth.passwordRequireUppercase} onChange={(e) => handleAuthChange('passwordRequireUppercase', e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-700">Require Numbers (0-9)</span>
                <input type="checkbox" checked={auth.passwordRequireNumber} onChange={(e) => handleAuthChange('passwordRequireNumber', e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-700">Require Special Characters</span>
                <input type="checkbox" checked={auth.passwordRequireSpecial} onChange={(e) => handleAuthChange('passwordRequireSpecial', e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
              </label>
            </div>
          </div>

        </div>
      </section>

      {/* Session Management */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Session & Device Management</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Session Expiration (Hours)</label>
              <input 
                type="number" 
                value={session.sessionDurationHours}
                onChange={(e) => handleSessionChange('sessionDurationHours', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Idle Timeout (Minutes)</label>
              <input 
                type="number" 
                value={session.idleTimeoutMinutes}
                onChange={(e) => handleSessionChange('idleTimeoutMinutes', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <h3 className="text-sm font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">Your Active Sessions</h3>
          <div className="space-y-3">
            {activeSessions.map((s, i) => (
              <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                <div className="mb-3 sm:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Monitor className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900 text-sm">{s.device}</span>
                    {i === 0 && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Current Session</span>}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-4">
                    <span>{s.location}</span>
                    <span>Last active: {s.lastActivity}</span>
                  </div>
                </div>
                {i !== 0 && (
                  <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs">
                    Revoke Session
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">
             <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                Revoke All Other Sessions
             </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
