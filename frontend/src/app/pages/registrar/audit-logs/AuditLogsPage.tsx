import React, { useState } from "react";
import { Download, RefreshCw, FileText, FileSpreadsheet, FileJson } from "lucide-react";
import { AuditLogsPage as AuditLogsMainPage } from "./AuditLogsPage";
import { mockAuditKPIs, mockAuditEvents, mockSecurityEvents } from "./data/mockData";
import { AuditKPIsRow } from "./components/AuditKPIs";
import { AuditFilters } from "./components/AuditFilters";
import { SystemActivityTable } from "./components/SystemActivityTable";
import { SecurityEventsTable } from "./components/SecurityEventsTable";
import { RetentionSettingsView } from "./components/RetentionSettingsView";
import { AuditEvent } from "./data/types";
import { AuditDetailsWorkspace } from "./components/workspace/AuditDetailsWorkspace";
import { Button } from "@/app/components/ui/Button";

export function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState("activity");
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500 mb-1">Registrar Dashboard / Audit Logs</div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs & System Activity</h1>
          <p className="text-slate-500 mt-1">Immutable record of system changes, security events, and administrative actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
          <Button variant="primary" className="gap-2">
            <Download className="w-4 h-4" /> Export Logs
          </Button>
        </div>
      </div>

      <AuditKPIsRow data={mockAuditKPIs} />

      {/* Tabs */}
      <div className="mt-8 mb-6 border-b border-slate-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("activity")}
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === "activity" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            System Activity
            {activeTab === "activity" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === "security" ? "text-rose-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Security Events
            <span className="ml-2 inline-flex items-center justify-center bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              3 Active
            </span>
            {activeTab === "security" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("retention")}
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === "retention" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Retention Settings
            {activeTab === "retention" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === "activity" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AuditFilters />
            <SystemActivityTable 
              events={mockAuditEvents} 
              onViewEvent={(event) => setSelectedEvent(event)} 
            />
          </div>
        )}

        {activeTab === "security" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AuditFilters />
            <SecurityEventsTable events={mockSecurityEvents} />
          </div>
        )}

        {activeTab === "retention" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <RetentionSettingsView />
          </div>
        )}
      </div>

      {/* Details Workspace */}
      {selectedEvent && (
        <AuditDetailsWorkspace 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

    </div>
  );
}
