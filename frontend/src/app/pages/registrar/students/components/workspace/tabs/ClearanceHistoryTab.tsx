import { StudentRecord } from "../../../data/types";
import { FileCheck, Activity, Calendar, CheckCircle, Clock, XCircle, ChevronRight, FileX } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function ClearanceHistoryTab({ student }: { student: StudentRecord }) {
  const activeClearance = student.clearanceHistory.find(c => c.status === "In Progress" || c.status === "Pending");
  
  return (
    <div className="space-y-8">
      
      {/* Current Active Clearance */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" /> Current Clearance
        </h3>
        
        {activeClearance ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-lg font-bold text-slate-900">{activeClearance.type} Clearance</h4>
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{activeClearance.status}</span>
                </div>
                <p className="text-sm text-slate-500 font-mono">{activeClearance.clearanceNumber} • Started {new Date(activeClearance.submissionDate).toLocaleDateString()}</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Open Details</Button>
            </div>

            {/* Overall Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Overall Progress</span>
                <span className="font-bold text-blue-600">{activeClearance.progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    activeClearance.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${activeClearance.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Department Decisions Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">{student.departmentDecisions.filter(d => d.decision === "Approved").length}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Completed</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">{student.departmentDecisions.filter(d => d.decision === "Pending").length}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{student.departmentDecisions.filter(d => d.decision === "Rejected").length}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Rejected</div>
              </div>
            </div>

            {activeClearance.rejectedDepartment && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-red-900">Blocked by {activeClearance.rejectedDepartment}</h5>
                  <p className="text-xs text-red-700 mt-1">Student must resolve issues with this department before progress can continue.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <FileX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-slate-700 font-medium">No Active Clearance</h4>
            <p className="text-sm text-slate-500 mt-1">This student is not currently undergoing any clearance process.</p>
          </div>
        )}
      </div>

      {/* Clearance History */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-500" /> Clearance History
        </h3>
        
        <div className="space-y-4">
          {student.clearanceHistory.length === 0 ? (
             <p className="text-sm text-slate-500 italic px-2">No historical records found.</p>
          ) : (
            student.clearanceHistory.map(history => (
              <div key={history.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    history.status === "Completed" ? "bg-emerald-100 text-emerald-600" :
                    history.status === "Rejected" ? "bg-red-100 text-red-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {history.status === "Completed" ? <CheckCircle className="w-5 h-5" /> :
                     history.status === "Rejected" ? <XCircle className="w-5 h-5" /> :
                     <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{history.type} Clearance</h4>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span className="font-mono">{history.clearanceNumber}</span>
                      <span>•</span>
                      <span>{new Date(history.submissionDate).toLocaleDateString()}</span>
                      {history.completionDate && (
                        <>
                          <span>→</span>
                          <span>{new Date(history.completionDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {history.status === "Completed" && history.certificateNumber && (
                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">Cert: {history.certificateNumber}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
