import { ShieldAlert, Activity, CheckCircle2, XCircle, Users, LockKeyhole, FileKey } from "lucide-react";
import { AuditKPIs } from "../data/types";

interface AuditKPIsProps {
  data: AuditKPIs;
}

export function AuditKPIsRow({ data }: AuditKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Audit Events</p>
          <div className="text-2xl font-bold text-slate-900">{data.totalEvents.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1"><span className="text-emerald-600 font-bold">+{data.eventsToday}</span> today</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Failed Actions</p>
          <div className="text-2xl font-bold text-slate-900">{data.failedActions.toLocaleString()}</div>
          <div className="text-xs text-red-600 font-medium mt-1">Requires review</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
          <XCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Security Events</p>
          <div className="text-2xl font-bold text-slate-900">{data.securityEvents.toLocaleString()}</div>
          <div className="text-xs text-amber-600 font-medium mt-1">Active alerts</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
          <ShieldAlert className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Permission Changes</p>
          <div className="text-2xl font-bold text-slate-900">{data.permissionChanges.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Last 7 days</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
          <FileKey className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
