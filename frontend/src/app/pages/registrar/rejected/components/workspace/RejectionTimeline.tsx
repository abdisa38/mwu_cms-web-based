import { History, User, Building2, CheckCircle2, XCircle, FileText, Send, AlertTriangle } from "lucide-react";
import { RejectedClearance } from "../../data/types";

export function RejectionTimeline({ clearance }: { clearance: RejectedClearance }) {
  
  const getActionIcon = (action: string) => {
    if (action.includes("Submitted")) return <Send className="w-4 h-4 text-blue-600" />;
    if (action.includes("Approved")) return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (action.includes("Rejected")) return <XCircle className="w-4 h-4 text-red-600" />;
    if (action.includes("Information Requested")) return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    return <FileText className="w-4 h-4 text-slate-600" />;
  };

  const getActionBg = (action: string) => {
    if (action.includes("Submitted")) return "bg-blue-100 border-blue-200";
    if (action.includes("Approved")) return "bg-emerald-100 border-emerald-200";
    if (action.includes("Rejected")) return "bg-red-100 border-red-200";
    if (action.includes("Information Requested")) return "bg-orange-100 border-orange-200";
    return "bg-slate-100 border-slate-200";
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <History className="w-5 h-5 text-slate-400" />
        Workflow Timeline
      </h3>

      <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
        {clearance.timeline.map((event, index) => (
          <div key={event.id} className="relative pl-8">
            {/* Timeline dot */}
            <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${getActionBg(event.action)}`}>
              {getActionIcon(event.action)}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-slate-900">{event.action}</h4>
                <div className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full w-fit">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mt-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{event.user}</span>
                  <span className="text-slate-400">({event.role})</span>
                </div>
                {event.department !== "N/A" && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>{event.department}</span>
                  </div>
                )}
              </div>

              {event.remarks && (
                <div className="mt-3 text-sm bg-white border border-slate-200 rounded-lg p-3 text-slate-700 italic">
                  "{event.remarks}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
