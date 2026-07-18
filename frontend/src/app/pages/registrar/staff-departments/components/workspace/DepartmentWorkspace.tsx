import { useState } from "react";
import { DepartmentRecord } from "../../data/types";
import { X, Building2, Settings, Users, Activity, FileCheck, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface DepartmentWorkspaceProps {
  department: DepartmentRecord;
  onClose: () => void;
}

export function DepartmentWorkspace({ department, onClose }: DepartmentWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview & Performance", icon: Activity },
    { id: "staff", label: "Assigned Staff", icon: Users },
    { id: "responsibilities", label: "Clearance Responsibilities", icon: FileCheck },
    { id: "settings", label: "Department Settings", icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-slate-50 w-full max-w-4xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden border-l border-slate-200">
        
        {/* Workspace Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {department.name}
                  {department.status === "Active" && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">Active</span>}
                  {department.status === "Temporarily Closed" && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Closed</span>}
                </h2>
                <div className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{department.code}</span>
                  <span>•</span>
                  <span>{department.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-slate-600 border-slate-200">Export Report</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Manage Status</Button>
          </div>
        </div>

        {/* Workspace Navigation */}
        <div className="bg-white border-b border-slate-200 px-6 shrink-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-6 min-w-max">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${
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
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Department Head</h3>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                        {department.headName ? department.headName.charAt(0) : "?"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{department.headName || "Unassigned"}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{department.headId || "Action Required"}</div>
                      </div>
                    </div>
                    <Button variant="outline" className="text-sm h-8">Change Head</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">{department.assignedStaffCount}</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Staff</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{department.activeRequests}</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Req</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">{department.pendingRequests}</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Req</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{department.averageProcessingTimeDays}d</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Process</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "responsibilities" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-indigo-600" /> Clearance Responsibilities
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">Select which clearance workflows route through this department for mandatory approval.</p>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                      <div>
                        <div className="font-bold text-slate-900">Graduation Clearance</div>
                        <div className="text-xs text-slate-500 mt-0.5">Required for graduating senior students.</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" checked={department.clearanceResponsibilities.graduation} readOnly />
                    </label>
                    <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                      <div>
                        <div className="font-bold text-slate-900">Withdrawal Clearance</div>
                        <div className="text-xs text-slate-500 mt-0.5">Required for students voluntarily leaving.</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" checked={department.clearanceResponsibilities.withdrawal} readOnly />
                    </label>
                    <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                      <div>
                        <div className="font-bold text-slate-900">Transfer Clearance</div>
                        <div className="text-xs text-slate-500 mt-0.5">Required for transferring to another university.</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" checked={department.clearanceResponsibilities.transfer} readOnly />
                    </label>
                    <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                      <div>
                        <div className="font-bold text-slate-900">Academic Dismissal</div>
                        <div className="text-xs text-slate-500 mt-0.5">Required for dismissed students.</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" checked={department.clearanceResponsibilities.academicDismissal} readOnly />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "staff" || activeTab === "settings") && (
              <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <Settings className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-slate-700 font-medium">Under Construction</h4>
                <p className="text-sm text-slate-500 mt-1">Detailed implementation for this tab would go here in a production build.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
