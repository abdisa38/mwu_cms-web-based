import { useState } from "react";
import { ClearanceType } from "../../data/types";
import { X, GitBranch, FileCheck, Clock, Settings, Bell, History } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

import { VisualWorkflowDesigner } from "../designer/VisualWorkflowDesigner";
import { DocumentRequirementsTab } from "./tabs/DocumentRequirementsTab";
import { DeadlinesEscalationsTab } from "./tabs/DeadlinesEscalationsTab";
import { NotificationsAuditTab } from "./tabs/NotificationsAuditTab";

import { PublishWorkflowModal } from "../modals/PublishWorkflowModal";
import { WorkflowPreviewModal } from "../modals/WorkflowPreviewModal";

interface WorkflowBuilderWorkspaceProps {
  clearanceType: ClearanceType;
  onClose: () => void;
}

export function WorkflowBuilderWorkspace({ clearanceType, onClose }: WorkflowBuilderWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("designer");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const tabs = [
    { id: "designer", label: "Workflow Designer", icon: GitBranch },
    { id: "documents", label: "Required Documents", icon: FileCheck },
    { id: "deadlines", label: "Deadlines & Escalations", icon: Clock },
    { id: "notifications", label: "Notifications & Templates", icon: Bell },
    { id: "rules", label: "Approval Rules", icon: Settings },
    { id: "audit", label: "Configuration History", icon: History },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 transition-opacity animate-in fade-in duration-300">
      
      {/* Top Header Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-0.5">Workflow Configuration Workspace</div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {clearanceType.name}
              <span className="font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-sm">{clearanceType.code}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full ml-2">Active</span>
              <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-full">v{clearanceType.activeVersionId?.split('-').pop()}</span>
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500 mr-4">
            Last saved: <span className="font-medium text-slate-700">Just now</span>
          </div>
          <Button variant="outline" className="text-slate-600" onClick={() => setShowPreviewModal(true)}>Simulate Workflow</Button>
          <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">Save Draft</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" onClick={() => setShowPublishModal(true)}>Publish Version</Button>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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

      {/* Workspace Body */}
      <div className="flex-1 overflow-hidden bg-slate-50 relative">
        {activeTab === "designer" && <VisualWorkflowDesigner clearanceType={clearanceType} />}
        {activeTab === "documents" && (
          <div className="p-8 h-full overflow-y-auto">
            <DocumentRequirementsTab />
          </div>
        )}
        {activeTab === "deadlines" && (
          <div className="p-8 h-full overflow-y-auto">
            <DeadlinesEscalationsTab />
          </div>
        )}
        {activeTab === "notifications" && (
          <div className="p-8 h-full overflow-y-auto">
            <NotificationsAuditTab />
          </div>
        )}
        {(activeTab === "rules" || activeTab === "audit") && (
          <div className="p-8 h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Under Construction</h3>
              <p className="text-slate-500">This configuration panel is currently being built out for production deployment.</p>
            </div>
          </div>
        )}
      </div>

      <PublishWorkflowModal 
        isOpen={showPublishModal} 
        onClose={() => setShowPublishModal(false)} 
        workflowName={clearanceType.name} 
        version={clearanceType.activeVersionId?.split('-').pop() || "1.0"} 
      />

      <WorkflowPreviewModal 
        isOpen={showPreviewModal} 
        onClose={() => setShowPreviewModal(false)} 
        workflowName={clearanceType.name} 
      />

    </div>
  );
}
