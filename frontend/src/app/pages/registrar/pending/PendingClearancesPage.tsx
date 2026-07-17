import { useState } from "react";
import { RefreshCw, Download, ChevronRight, Settings, HelpCircle, Clock, CheckSquare } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { PendingKPIs } from "./components/PendingKPIs";
import { PendingFilters } from "./components/PendingFilters";
import { PendingQueueTable } from "./components/PendingQueueTable";
import { PendingWorkspace } from "./components/workspace/PendingWorkspace";

export function PendingClearancesPage() {
  const [selectedClearanceId, setSelectedClearanceId] = useState<string | null>(null);

  const handleRefresh = () => {
    console.log("Refreshing queue...");
  };

  const handleExport = () => {
    console.log("Exporting queue to Excel...");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 md:pb-8 relative">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-2">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Pending Clearances</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Pending Clearances</h1>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="h-9">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="h-9">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-slate-50">
            <CheckSquare className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>
          <Button variant="ghost" size="sm" className="h-9 text-slate-500 hover:text-slate-700 hidden sm:flex">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 text-slate-500 hover:text-slate-700 hidden sm:flex">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <PendingKPIs />

      {/* Main Content Area: Filters and Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <PendingFilters />
        <PendingQueueTable onSelectClearance={(id) => setSelectedClearanceId(id)} />
      </div>

      {/* Full Screen Workspace Overlay */}
      {selectedClearanceId && (
        <PendingWorkspace 
          clearanceId={selectedClearanceId} 
          onClose={() => setSelectedClearanceId(null)} 
        />
      )}
    </div>
  );
}
