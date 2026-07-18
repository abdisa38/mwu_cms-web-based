import { useState } from "react";
import { StaffKPIs } from "./components/StaffKPIs";
import { StaffFilters } from "./components/StaffFilters";
import { StaffTable } from "./components/StaffTable";
import { DepartmentsTable } from "./components/DepartmentsTable";
import { RolesPermissions } from "./components/RolesPermissions";
import { AccessRequestsTable } from "./components/AccessRequestsTable";
import { mockStaff, mockDepartments, mockPermissionMatrix, mockAccessRequests } from "./data/mockData";
import { StaffRecord } from "./data/types";
import { Users, Building2, Shield, Key } from "lucide-react";
import { AddStaffModal } from "./components/modals/AddStaffModal";
import { AddDepartmentModal } from "./components/modals/AddDepartmentModal";
import { StaffProfileWorkspace } from "./components/workspace/StaffProfileWorkspace";
import { DepartmentWorkspace } from "./components/workspace/DepartmentWorkspace";

export function StaffDepartmentsPage() {
  const [activeTab, setActiveTab] = useState("staff");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [selectedStaff, setSelectedStaff] = useState<StaffRecord | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentRecord | null>(null);
  
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);

  const tabs = [
    { id: "staff", label: "Staff Directory", icon: Users },
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "roles", label: "Roles & Permissions", icon: Shield },
    { id: "requests", label: "Access Requests", icon: Key },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div>
        <div className="flex items-center text-sm text-slate-500 mb-2 gap-2">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Dashboard</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">Staff & Departments</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Organization Center</h1>
            <p className="text-slate-500 mt-1">Manage university departments, staff accounts, roles, and system permissions.</p>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <StaffKPIs />

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
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.id === "requests" && (
                  <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">2</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "staff" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <StaffFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onAddStaff={() => setIsAddStaffOpen(true)}
              onAddDepartment={() => setIsAddDeptOpen(true)}
            />
            <StaffTable 
              staff={mockStaff} 
              onStaffClick={(staff) => setSelectedStaff(staff)}
            />
          </div>
        )}

        {activeTab === "departments" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <DepartmentsTable 
              departments={mockDepartments} 
              onDepartmentClick={(dept) => setSelectedDepartment(dept)} 
            />
          </div>
        )}

        {activeTab === "roles" && (
          <div className="animate-in fade-in duration-300">
            <RolesPermissions matrix={mockPermissionMatrix} />
          </div>
        )}

        {activeTab === "requests" && (
          <div className="animate-in fade-in duration-300">
            <AccessRequestsTable requests={mockAccessRequests} />
          </div>
        )}
      </div>

      <AddStaffModal isOpen={isAddStaffOpen} onClose={() => setIsAddStaffOpen(false)} />
      <AddDepartmentModal isOpen={isAddDeptOpen} onClose={() => setIsAddDeptOpen(false)} />
      
      {selectedStaff && (
        <StaffProfileWorkspace 
          staff={selectedStaff} 
          onClose={() => setSelectedStaff(null)} 
          onSuspend={() => {}}
        />
      )}

      {selectedDepartment && (
        <DepartmentWorkspace 
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}

    </div>
  );
}
