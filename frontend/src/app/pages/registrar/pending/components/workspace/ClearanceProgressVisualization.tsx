import { Check, Clock, AlertTriangle, Play, HelpCircle } from "lucide-react";
import { ClearanceRequest, DepartmentApproval } from "../../data/types";

interface ClearanceProgressVisualizationProps {
  clearance: ClearanceRequest;
}

export function ClearanceProgressVisualization({ clearance }: ClearanceProgressVisualizationProps) {
  const getStepIcon = (status: DepartmentApproval['status']) => {
    switch (status) {
      case 'Approved': return <Check className="w-4 h-4 text-emerald-600" />;
      case 'Rejected': return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'Needs Information': return <HelpCircle className="w-4 h-4 text-amber-600" />;
      case 'Pending': return <Play className="w-4 h-4 text-blue-600" />;
      case 'Not Started': return <Clock className="w-4 h-4 text-slate-400" />;
      case 'Skipped': return <Check className="w-4 h-4 text-slate-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStepColor = (status: DepartmentApproval['status']) => {
    switch (status) {
      case 'Approved': return "bg-emerald-100 border-emerald-300";
      case 'Rejected': return "bg-rose-100 border-rose-300";
      case 'Needs Information': return "bg-amber-100 border-amber-300";
      case 'Pending': return "bg-blue-100 border-blue-300 ring-2 ring-blue-100 ring-offset-2";
      case 'Not Started': return "bg-slate-100 border-slate-200";
      case 'Skipped': return "bg-slate-100 border-slate-300";
      default: return "bg-slate-100 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 text-lg">Clearance Workflow</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 font-medium">Overall Progress</span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-full text-sm">
            {clearance.overallProgress}%
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100 hidden md:block z-0"></div>

        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
          {/* Add a starting node for "Student Submitted" */}
          <div className="flex md:flex-col items-center gap-4 md:gap-2 relative group w-full">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 bg-emerald-100 border-emerald-300 z-10 transition-transform group-hover:scale-110 shadow-sm`}>
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="md:text-center mt-0 md:mt-2">
              <p className="text-sm font-bold text-slate-900">Submission</p>
              <p className="text-xs text-slate-500 mt-1">{new Date(clearance.submissionDate).toLocaleDateString()}</p>
            </div>
            <div className="absolute top-6 left-12 right-0 h-0.5 bg-emerald-300 hidden md:block -z-10"></div>
          </div>

          {clearance.departments.map((dept, index) => {
            const isLast = index === clearance.departments.length - 1;
            const isApproved = dept.status === 'Approved';
            
            return (
              <div key={dept.id} className="flex md:flex-col items-center gap-4 md:gap-2 relative group w-full">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 ${getStepColor(dept.status)} z-10 transition-transform group-hover:scale-110 shadow-sm`}>
                  {getStepIcon(dept.status)}
                </div>
                <div className="md:text-center mt-0 md:mt-2">
                  <p className={`text-sm font-bold ${dept.status === 'Pending' ? 'text-blue-700' : 'text-slate-900'}`}>
                    {dept.departmentName}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{dept.status}</p>
                </div>
                {!isLast && (
                  <div className={`absolute top-6 left-12 right-0 h-0.5 hidden md:block -z-10 ${isApproved ? 'bg-emerald-300' : 'bg-slate-200'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
