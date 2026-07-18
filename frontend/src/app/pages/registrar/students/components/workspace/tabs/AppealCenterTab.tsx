import { StudentRecord } from "../../../data/types";
import { AlertCircle, FileX, Scale, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function AppealCenterTab({ student }: { student: StudentRecord }) {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Rejected": return "bg-red-100 text-red-700 border-red-200";
      case "Under Review": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-600" /> Student Appeals
        </h3>
      </div>

      {student.appeals.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-medium">No Appeals Found</h4>
          <p className="text-sm text-slate-500 mt-1">This student has not submitted any clearance appeals.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {student.appeals.map(appeal => (
            <div key={appeal.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-amber-300 transition-colors cursor-pointer group flex flex-col sm:flex-row gap-6 items-start">
              
              <div className="flex-1 space-y-3 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-slate-900">Appeal: {appeal.appealNumber}</h4>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getStatusColor(appeal.status)}`}>
                        {appeal.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="font-mono">Ref: {appeal.clearanceNumber}</span>
                      <span>•</span>
                      <span>Submitted on {new Date(appeal.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-sm text-slate-700">
                  <p className="font-medium text-slate-900 mb-1">Reason provided by student:</p>
                  <p>"{appeal.reason}"</p>
                </div>
              </div>

              <div className="w-full sm:w-48 shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between h-full min-h-[120px]">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Assigned Reviewer</div>
                  <div className="text-sm font-medium text-slate-900 mb-3">{appeal.reviewer || "Unassigned"}</div>
                  
                  {appeal.decisionDate && (
                    <>
                      <div className="text-xs text-slate-500 mb-1">Decision Date</div>
                      <div className="text-sm font-medium text-slate-900">{new Date(appeal.decisionDate).toLocaleDateString()}</div>
                    </>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:text-blue-800 transition-colors">
                    View Case <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
