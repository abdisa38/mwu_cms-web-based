import { CheckCircle2, Circle, Clock, Check, AlertCircle } from "lucide-react";
import { FinalApprovalRequest } from "../../data/types";

interface ApprovalProgressHeaderProps {
  clearance: FinalApprovalRequest;
}

export function ApprovalProgressHeader({ clearance }: ApprovalProgressHeaderProps) {
  const steps = [
    { id: 1, label: 'Identity Verified', status: 'Completed' },
    { id: 2, label: 'Department Approvals', status: clearance.allDepartmentsStatus },
    { id: 3, label: 'Documents Verified', status: clearance.documentStatus === 'Complete' ? 'Completed' : 'Pending' },
    { id: 4, label: 'Physical ID Confirmed', status: clearance.physicalIdStatus === 'Verified' || clearance.physicalIdStatus === 'Not Required' ? 'Completed' : 'Pending' },
    { id: 5, label: 'Registrar Review', status: clearance.status === 'Ready for Review' || clearance.status === 'Approved' ? 'Completed' : 'Current' },
    { id: 6, label: 'Final Approval', status: clearance.status === 'Approved' ? 'Completed' : 'Pending' },
    { id: 7, label: 'Certificate', status: clearance.status === 'Approved' ? 'Completed' : 'Pending' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 shadow-sm z-10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-10"></div>
          
          {steps.map((step, index) => {
            const isCompleted = step.status === 'Completed';
            const isCurrent = step.status === 'Current' || (index > 0 && steps[index - 1].status === 'Completed' && step.status !== 'Completed');
            const isBlocked = clearance.status === 'Blocked' && isCurrent;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 group relative z-10 bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                  isCompleted ? 'bg-emerald-100 border-emerald-500 text-emerald-600' :
                  isBlocked ? 'bg-rose-100 border-rose-500 text-rose-600' :
                  isCurrent ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100' :
                  'bg-white border-slate-300 text-slate-300'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : 
                   isBlocked ? <AlertCircle className="w-4 h-4" /> :
                   <span className="text-xs font-bold">{step.id}</span>}
                </div>
                <div className="absolute top-10 w-32 text-center -ml-12 opacity-0 group-hover:opacity-100 md:opacity-100 md:relative md:top-auto md:w-auto md:ml-0 transition-opacity">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isCompleted ? 'text-emerald-700' :
                    isBlocked ? 'text-rose-700' :
                    isCurrent ? 'text-blue-700' :
                    'text-slate-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
