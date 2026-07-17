import { CheckCircle2, FileX2, PauseCircle, HelpCircle, XCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";
import { FinalApprovalRequest } from "../../data/types";

interface DecisionPanelProps {
  clearance: FinalApprovalRequest;
  onAction: (action: 'Approve' | 'Return' | 'Hold' | 'RequestInfo' | 'Reject') => void;
  isValidated: boolean;
}

export function DecisionPanel({ clearance, onAction, isValidated }: DecisionPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="bg-white border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300"
          onClick={() => onAction('Reject')}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject Final
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 justify-end">
        <Button 
          variant="outline" 
          className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50"
          onClick={() => onAction('Return')}
        >
          <FileX2 className="w-4 h-4 mr-2" />
          Return for Correction
        </Button>
        <Button 
          variant="outline" 
          className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={() => onAction('Hold')}
        >
          <PauseCircle className="w-4 h-4 mr-2" />
          Place on Hold
        </Button>
        <Button 
          variant="outline" 
          className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={() => onAction('RequestInfo')}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Request Info
        </Button>
        <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>
        <Button 
          className={`shadow-md ${isValidated ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-600 ring-offset-2' : 'bg-slate-300 text-slate-500 cursor-not-allowed border-slate-300'}`}
          onClick={() => isValidated && onAction('Approve')}
          disabled={!isValidated}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {isValidated ? 'Approve Final Clearance' : 'Complete Validation First'}
        </Button>
      </div>
    </div>
  );
}
