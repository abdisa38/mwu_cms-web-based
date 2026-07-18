import { StaffRecord } from "../../../data/types";
import { Activity, Clock, FileText, Settings, Key, UserCheck } from "lucide-react";

export function StaffActivityTab({ staff }: { staff: StaffRecord }) {
  
  const getActionIcon = (action: string) => {
    if (action.includes("Approved")) return <UserCheck className="w-4 h-4 text-emerald-600" />;
    if (action.includes("Suspended")) return <Settings className="w-4 h-4 text-red-600" />;
    if (action.includes("Invitation")) return <Key className="w-4 h-4 text-amber-600" />;
    return <FileText className="w-4 h-4 text-slate-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-600" /> Recent System Activity
          </h3>
          <p className="text-sm text-slate-500 mt-1">A chronological log of actions performed by or on this staff account.</p>
        </div>
      </div>

      {staff.auditLogs.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-medium">No Recent Activity</h4>
          <p className="text-sm text-slate-500 mt-1">There are no recorded actions for this user.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
          {staff.auditLogs.map((log) => (
            <div key={log.id} className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 group-hover:scale-125 transition-transform"></div>
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-blue-300 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                      {getActionIcon(log.action)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{log.action}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{log.department}</span>
                        <span>•</span>
                        <span>{new Date(log.date).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-start sm:items-end w-full sm:w-auto">
                    <span className="text-xs text-slate-500">Performed By</span>
                    <span className="text-sm font-semibold text-slate-900">{log.performedBy}</span>
                  </div>
                </div>

                {log.remarks && (
                  <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 border border-slate-100 italic">
                    "{log.remarks}"
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div className="relative pl-6 sm:pl-8 group opacity-70">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h4 className="font-bold text-slate-700">Account Created</h4>
              <p className="text-xs text-slate-500 mt-1">{new Date(staff.accountCreatedDate).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
