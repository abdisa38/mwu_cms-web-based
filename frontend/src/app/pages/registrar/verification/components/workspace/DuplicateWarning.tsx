import { AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

export function DuplicateWarning() {
  // Simulating that the backend found a potential duplicate
  const hasDuplicate = true;

  if (!hasDuplicate) return null;

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <h4 className="text-base font-bold text-rose-900">Possible Duplicate Account Detected</h4>
          <p className="text-sm text-rose-700 mt-1">
            An existing active account was found with the matching Student ID (<span className="font-mono font-medium">UGR/8821/11</span>).
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="shrink-0 bg-white border-rose-200 text-rose-700 hover:bg-rose-100 hover:text-rose-800">
        Compare Accounts
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
