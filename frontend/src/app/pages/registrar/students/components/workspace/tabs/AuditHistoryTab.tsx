import { StudentRecord } from "../../../data/types";
import { History, UserCheck, PlayCircle, Edit3, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

export function AuditHistoryTab({ student }: { student: StudentRecord }) {
  
  const getActionIcon = (action: string) => {
    if (action.includes("Suspended")) return <ShieldAlert className="w-4 h-4 text-red-600" />;
    if (action.includes("Approval")) return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (action.includes("Started")) return <PlayCircle className="w-4 h-4 text-blue-600" />;
    if (action.includes("Verified")) return <UserCheck className="w-4 h-4 text-emerald-600" />;
    if (action.includes("Document")) return <FileText className="w-4 h-4 text-indigo-600" />;
    return <Edit3 className="w-4 h-4 text-slate-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-slate-600" /> Chronological Audit Timeline
          </h3>
          <p className="text-sm text-slate-500 mt-1">A complete trace of every official action affecting this student record.</p>
        </div>
      </div>

      {student.auditLogs.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-medium">No Audit Records Found</h4>
          <p className="text-sm text-slate-500 mt-1">This student profile does not have any recorded events yet.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
          {student.auditLogs.map((log, index) => (
            <div key={log.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 group-hover:scale-125 transition-transform flex items-center justify-center"></div>
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-blue-300 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                      {getActionIcon(log.action)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{log.action}</h4>
                      <p className="text-xs text-slate-500">{new Date(log.date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-start sm:items-end w-full sm:w-auto">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded w-max">{log.user}</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">{log.role} • {log.department}</span>
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
          
          {/* Account Creation Node (Always at bottom conceptually) */}
          <div className="relative pl-6 sm:pl-8 group opacity-70">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h4 className="font-bold text-slate-700">Account Created & Registered</h4>
              <p className="text-xs text-slate-500 mt-1">{new Date(student.registrationDate).toLocaleString()} • System Automated</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
