import { useState } from "react";
import { ClearanceTypesTable } from "./components/ClearanceTypesTable";
import { mockClearanceTypes, mockAuditLogs } from "./data/mockData";
import { ClearanceType } from "./data/types";
import { Settings, GitMerge, FileCheck, History, HelpCircle, Save, RotateCcw } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

import { WorkflowBuilderWorkspace } from "./components/workspace/WorkflowBuilderWorkspace";

export function WorkflowConfigurationPage() {
  const [activeTab, setActiveTab] = useState("clearance_types");
  const [selectedClearanceType, setSelectedClearanceType] = useState<ClearanceType | null>(null);

  const tabs = [
    { id: "clearance_types", label: "Clearance Types", icon: GitMerge },
    { id: "global_documents", label: "Global Documents", icon: FileCheck },
    { id: "global_audit", label: "Configuration Audit", icon: History },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div>
        <div className="flex items-center text-sm text-slate-500 mb-2 gap-2">
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">Dashboard</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">Departments & Workflow Configuration</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Workflow Configuration</h1>
            <p className="text-slate-500 mt-1">Design clearance sequences, set department responsibilities, and configure approval rules.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-slate-600 gap-2">
              <RotateCcw className="w-4 h-4" /> Reset Changes
            </Button>
            <Button variant="outline" className="text-slate-600 gap-2">
              <History className="w-4 h-4" /> Version History
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm gap-2">
              <Save className="w-4 h-4" /> Save Configuration
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 pt-2 rounded-t-2xl">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive 
                    ? "border-indigo-600 text-indigo-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "clearance_types" && (
          <div className="animate-in fade-in duration-300">
            <ClearanceTypesTable 
              types={mockClearanceTypes} 
              onManageWorkflow={(type) => setSelectedClearanceType(type)}
            />
          </div>
        )}

        {activeTab === "global_documents" && (
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center animate-in fade-in">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-slate-700 font-medium">Global Document Configuration</h4>
            <p className="text-sm text-slate-500 mt-1">Manage global document templates and accepted file types here.</p>
          </div>
        )}

        {activeTab === "global_audit" && (
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center animate-in fade-in">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-slate-700 font-medium">Configuration Audit Log</h4>
            <p className="text-sm text-slate-500 mt-1">View the master log of all system configuration changes.</p>
          </div>
        )}
      </div>

      {/* Workspace Overlay */}
      {selectedClearanceType && (
        <WorkflowBuilderWorkspace 
          clearanceType={selectedClearanceType}
          onClose={() => setSelectedClearanceType(null)}
        />
      )}

    </div>
  );
}
