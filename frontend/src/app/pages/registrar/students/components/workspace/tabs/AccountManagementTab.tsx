import { StudentRecord } from "../../../data/types";
import { Settings, ShieldAlert, Key, LogOut, CheckCircle2, History } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function AccountManagementTab({ student }: { student: StudentRecord }) {
  const isSuspended = student.accountStatus === "Suspended";

  return (
    <div className="space-y-8">
      
      {/* Account Security Overview */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" /> Account Settings & Security
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Account Status</div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isSuspended ? "bg-red-500" : "bg-emerald-500"}`}></div>
              <span className={`text-lg font-bold ${isSuspended ? "text-red-700" : "text-slate-900"}`}>{student.accountStatus}</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Last Login</div>
            <div className="text-lg font-bold text-slate-900">
              {new Date(student.lastLogin).toLocaleDateString()}
            </div>
            <div className="text-xs text-slate-400 mt-1">{new Date(student.lastLogin).toLocaleTimeString()}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">2FA Status</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-lg font-bold text-slate-900">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Administrative Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h4 className="font-bold text-slate-900">Administrative Actions</h4>
        </div>
        <div className="p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <h5 className="font-semibold text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" /> Password Reset
              </h5>
              <p className="text-sm text-slate-500 mt-1">Send a secure password reset link to the student's university email.</p>
            </div>
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 shrink-0">Send Reset Link</Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <h5 className="font-semibold text-slate-900 flex items-center gap-2">
                <LogOut className="w-4 h-4 text-slate-600" /> Force Logout
              </h5>
              <p className="text-sm text-slate-500 mt-1">Invalidate all active sessions for this user immediately.</p>
            </div>
            <Button variant="outline" className="text-slate-600 shrink-0">Force Logout Sessions</Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h5 className={`font-semibold flex items-center gap-2 ${isSuspended ? "text-emerald-700" : "text-red-700"}`}>
                <ShieldAlert className={`w-4 h-4 ${isSuspended ? "text-emerald-600" : "text-red-600"}`} /> 
                {isSuspended ? "Reactivate Account" : "Suspend Account"}
              </h5>
              <p className="text-sm text-slate-500 mt-1">
                {isSuspended 
                  ? "Restore student access to the portal and clearance workflows." 
                  : "Immediately restrict the student from logging in and accessing clearance actions."}
              </p>
            </div>
            <Button 
              className={`shrink-0 text-white shadow-sm ${
                isSuspended ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isSuspended ? "Reactivate Student" : "Suspend Student"}
            </Button>
          </div>

        </div>
      </div>

    </div>
  );
}
