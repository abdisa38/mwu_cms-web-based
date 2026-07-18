import { useState } from "react";
import { Search, Download, HelpCircle, XCircle, Settings, RefreshCw } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { RejectedKPIs } from "./components/RejectedKPIs";
import { RejectedFilters } from "./components/RejectedFilters";
import { RejectedArchiveTable } from "./components/RejectedArchiveTable";
import { mockRejectedClearances } from "./data/mockRejectedData";
import { RejectedClearance } from "./data/types";
import { RejectedClearanceWorkspace } from "./components/workspace/RejectedClearanceWorkspace";

export function RejectedClearancesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClearance, setSelectedClearance] = useState<RejectedClearance | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-none z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <span className="cursor-pointer hover:text-slate-700">Dashboard</span>
              <span>/</span>
              <span className="text-slate-900 font-medium">Rejected Clearances</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" />
              Rejected Clearance Management
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Global Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">View Settings</span>
            </Button>
            <Button variant="ghost" className="px-2 text-slate-500 hover:text-slate-700">
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <RejectedKPIs />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 rounded-t-xl">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by ID, Name, Clearance #, Reason..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </div>
            <RejectedFilters />
          </div>
          
          {/* Archive Table */}
          <RejectedArchiveTable 
            data={mockRejectedClearances} 
            onRowClick={(clearance) => setSelectedClearance(clearance)} 
          />
        </div>
      </div>

      {/* Overlay Workspace */}
      <RejectedClearanceWorkspace 
        clearance={selectedClearance} 
        onClose={() => setSelectedClearance(null)} 
      />
    </div>
  );
}
