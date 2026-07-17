import { AlertOctagon, Scale, Clock } from "lucide-react";
import { Appeal } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

interface AppealWarningProps {
  appeals: Appeal[];
}

export function AppealWarning({ appeals }: AppealWarningProps) {
  if (appeals.length === 0) return null;

  return (
    <div className="bg-rose-50 border-2 border-rose-500 rounded-xl overflow-hidden shadow-sm relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Scale className="w-32 h-32" />
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="bg-rose-100 p-3 rounded-full shrink-0">
            <AlertOctagon className="w-8 h-8 text-rose-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-rose-900">Active Appeal Blocking Approval</h3>
            <p className="text-rose-700 mt-1 font-medium">
              This student has filed an active appeal against a department rejection. Final approval cannot proceed until the appeal is resolved.
            </p>
            
            <div className="mt-6 space-y-4">
              {appeals.map(appeal => (
                <div key={appeal.id} className="bg-white/80 border border-rose-200 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-900">{appeal.appealNumber}</h4>
                        <span className="px-2.5 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded uppercase tracking-wider">
                          {appeal.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">
                        <strong className="text-slate-900">Department:</strong> {appeal.department}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong className="text-slate-900">Reason:</strong> {appeal.reason}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <p className="text-xs text-slate-500 font-medium flex items-center justify-end">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Filed on {new Date(appeal.date).toLocaleDateString()}
                      </p>
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white mt-2">
                        Review Appeal Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
