import { useState } from "react";
import { RefreshCw, Download, ChevronRight, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { ApprovalKPIs } from "./components/ApprovalKPIs";
import { ApprovalFilters } from "./components/ApprovalFilters";
import { ApprovalQueueTable } from "./components/ApprovalQueueTable";
import { FinalApprovalWorkspace } from "./components/workspace/FinalApprovalWorkspace";

export function FinalApprovalPage() {
  const [selectedClearanceId, setSelectedClearanceId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-slate-900">Final Approval Center</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Final Approval Center</h2>
          <p className="text-slate-500 mt-1">Official final clearance decision and certificate generation center.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white" size="sm">
            <RefreshCw className="w-4 h-4 mr-2 text-slate-500" />
            Refresh
          </Button>
          <Button variant="outline" className="bg-white" size="sm">
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export
          </Button>
          <Button variant="outline" className="bg-white" size="sm">
            <Settings className="w-4 h-4 mr-2 text-slate-500" />
            View Settings
          </Button>
          <Button variant="ghost" className="bg-white" size="sm">
            <HelpCircle className="w-5 h-5 text-slate-500" />
          </Button>
        </div>
      </div>

      <ApprovalKPIs />
      <ApprovalFilters />
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <ApprovalQueueTable onSelectClearance={setSelectedClearanceId} />
      </div>

      {selectedClearanceId && (
        <FinalApprovalWorkspace 
          clearanceId={selectedClearanceId} 
          onClose={() => setSelectedClearanceId(null)} 
        />
      )}
    </div>
  );
}
