import { CheckCircle2, XCircle, AlertTriangle, MinusCircle } from "lucide-react";
import { ValidationCondition } from "../../data/types";

interface PreApprovalValidationProps {
  validations: ValidationCondition[];
}

export function PreApprovalValidation({ validations }: PreApprovalValidationProps) {
  const getValidationIcon = (status: ValidationCondition['status']) => {
    switch (status) {
      case 'Passed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'Failed': return <XCircle className="w-5 h-5 text-rose-500" />;
      case 'Warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Not Applicable': return <MinusCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getValidationColor = (status: ValidationCondition['status']) => {
    switch (status) {
      case 'Passed': return 'bg-emerald-50 border-emerald-100';
      case 'Failed': return 'bg-rose-50 border-rose-200';
      case 'Warning': return 'bg-amber-50 border-amber-200';
      case 'Not Applicable': return 'bg-slate-50 border-slate-100';
    }
  };

  const allPassed = validations.every(v => v.status === 'Passed' || v.status === 'Not Applicable');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={`p-5 border-b flex items-center justify-between ${allPassed ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
        <div>
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            Automated Pre-Approval Validation
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            System must validate all workflow conditions before final approval is unlocked.
          </p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 border ${allPassed ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'}`}>
          {allPassed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {allPassed ? 'Ready for Approval' : 'Validation Failed'}
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {validations.map((validation) => (
          <div key={validation.id} className={`flex items-start gap-4 p-4 rounded-xl border ${getValidationColor(validation.status)} transition-colors`}>
            <div className="mt-0.5 shrink-0">
              {getValidationIcon(validation.status)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{validation.label}</p>
              {validation.details && (
                <p className={`text-sm mt-1 ${validation.status === 'Failed' ? 'text-rose-700 font-medium' : 'text-slate-600'}`}>
                  {validation.details}
                </p>
              )}
            </div>
            <div className="ml-auto shrink-0">
              <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                validation.status === 'Passed' ? 'bg-emerald-100 text-emerald-700' :
                validation.status === 'Failed' ? 'bg-rose-100 text-rose-700' :
                validation.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {validation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
