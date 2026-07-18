import { useState } from "react";
import { StaffRecord } from "../../data/types";
import { X, User, Shield, Activity, Bell, History, MoreVertical } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

import { StaffOverviewTab } from "./tabs/StaffOverviewTab";
import { StaffPermissionsTab } from "./tabs/StaffPermissionsTab";
import { StaffActivityTab } from "./tabs/StaffActivityTab";

interface StaffProfileWorkspaceProps {
  staff: StaffRecord;
  onClose: () => void;
  onSuspend: () => void;
}

export function StaffProfileWorkspace({ staff, onClose, onSuspend }: StaffProfileWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "permissions", label: "Permissions & Roles", icon: Shield },
    { id: "activity", label: "Clearance Activity", icon: Activity },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "audit", label: "Audit History", icon: History },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-slate-50 w-full max-w-5xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden">
        
        {/* Workspace Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {staff.profilePhoto ? (
                <img src={staff.profilePhoto} alt={staff.fullName} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                  {staff.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {staff.fullName}
                  {staff.accountStatus === "Active" && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">Active</span>}
                  {staff.accountStatus === "Suspended" && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Suspended</span>}
                  {staff.accountStatus === "Pending Invitation" && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Pending</span>}
                </h2>
                <div className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{staff.employeeId}</span>
                  <span>•</span>
                  <span>{staff.department}</span>
                  <span>•</span>
                  <span className="font-medium text-slate-700">{staff.jobTitle}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-slate-600">Edit Profile</Button>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={onSuspend}>Suspend</Button>
            <Button variant="outline" className="text-slate-600 px-2"><MoreVertical className="w-4 h-4" /></Button>
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
                      ? "border-blue-600 text-blue-600" 
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
          <div className="max-w-4xl mx-auto">
            {activeTab === "overview" && <StaffOverviewTab staff={staff} />}
            {activeTab === "permissions" && <StaffPermissionsTab staff={staff} />}
            {activeTab === "activity" && <StaffActivityTab staff={staff} />}
            {/* Notifications and Audit omitted for brevity, use placeholder */}
            {(activeTab === "notifications" || activeTab === "audit") && (
              <div className="text-center py-20 text-slate-500">
                <p>Detailed implementation coming soon for this tab.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
