import { StaffRecord } from "../../../data/types";
import { Shield, Key, AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function StaffPermissionsTab({ staff }: { staff: StaffRecord }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-900 shadow-sm">
        <Shield className="w-6 h-6 shrink-0 text-blue-600 mt-0.5" />
        <div className="text-sm space-y-1">
          <p className="font-bold text-base">Role-Based Access Control</p>
          <p>This user's primary system role is <strong className="font-bold bg-blue-100 px-1.5 py-0.5 rounded">{staff.systemRole}</strong>.</p>
          <p>Permissions are inherited from their role. Direct permissions are granted individually and override role defaults.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Key className="w-5 h-5 text-slate-500" /> Active Permissions
          </h3>
          <Button variant="outline" className="text-xs h-8">Modify Access</Button>
        </div>
        
        <div className="p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Direct Permissions (Assigned specifically to this user)</h4>
          {staff.permissions.direct.length === 0 ? (
            <div className="text-sm text-slate-500 italic mb-8">No direct permissions assigned.</div>
          ) : (
            <div className="flex flex-wrap gap-2 mb-8">
              {staff.permissions.direct.map((perm, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md text-sm font-semibold">
                  {perm}
                </span>
              ))}
            </div>
          )}

          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Inherited Permissions (From {staff.systemRole} Role)</h4>
          {staff.permissions.inherited.length === 0 ? (
            <div className="text-sm text-slate-500 italic">No inherited permissions.</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {staff.permissions.inherited.map((perm, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-sm font-medium">
                  {perm}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Temporary Access</h4>
            <p className="text-xs text-slate-500 mt-0.5">Grant temporary elevated permissions that automatically expire.</p>
          </div>
        </div>
        <Button variant="outline" className="text-amber-700 border-amber-200 hover:bg-amber-50">Grant Temporary Access</Button>
      </div>

    </div>
  );
}
