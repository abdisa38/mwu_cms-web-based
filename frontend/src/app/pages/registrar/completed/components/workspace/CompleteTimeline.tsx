import { Clock, User, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { CompletedClearance } from "../../data/types";

export function CompleteTimeline({ clearance }: { clearance: CompletedClearance }) {
  
  const getIcon = (action: string) => {
    if (action.includes("Submitted")) return FileText;
    if (action.includes("Approval")) return CheckCircle2;
    if (action.includes("Certificate")) return ShieldCheck;
    return Clock;
  };

  const getColor = (action: string) => {
    if (action.includes("Submitted")) return "bg-blue-100 text-blue-600 border-blue-200";
    if (action.includes("Approval")) return "bg-emerald-100 text-emerald-600 border-emerald-200";
    if (action.includes("Certificate")) return "bg-indigo-100 text-indigo-600 border-indigo-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  if (clearance.timeline.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">No Timeline Data</h3>
        <p className="text-slate-500">Historical timeline data is missing for this record.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-slate-900 mb-8">Comprehensive Audit Timeline</h3>
      
      <div className="relative border-l-2 border-slate-200 ml-6 space-y-8">
        {clearance.timeline.map((event, index) => {
          const Icon = getIcon(event.action);
          const colorClasses = getColor(event.action);
          
          return (
            <div key={event.id} className="relative pl-8">
              <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border ${colorClasses}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{event.action}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{event.user}</span>
                    <span className="text-slate-400">•</span>
                    <span>{event.role}</span>
                    <span className="text-slate-400">•</span>
                    <span>{event.department}</span>
                  </div>
                  {event.remarks && (
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600 italic">
                      "{event.remarks}"
                    </div>
                  )}
                </div>
                
                <div className="text-right shrink-0">
                  <p className="font-medium text-slate-900">{new Date(event.timestamp).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-500">{new Date(event.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
