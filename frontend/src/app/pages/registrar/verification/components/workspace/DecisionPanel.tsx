import { CheckCircle, XCircle, AlertCircle, ShieldOff } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface DecisionPanelProps {
  onAction: (action: 'Approve' | 'Reject' | 'RequestInfo' | 'Suspend') => void;
}

export function DecisionPanel({ onAction }: DecisionPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => onAction('Suspend')}
          className="bg-white border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800 focus:ring-rose-200"
        >
          <ShieldOff className="w-4 h-4 mr-2" />
          Suspend Account
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
        <Button 
          variant="outline" 
          onClick={() => onAction('RequestInfo')}
          className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Request Info
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onAction('Reject')}
          className="bg-white border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject
        </Button>
        <Button 
          onClick={() => onAction('Approve')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve Verification
        </Button>
      </div>
    </div>
  );
}
