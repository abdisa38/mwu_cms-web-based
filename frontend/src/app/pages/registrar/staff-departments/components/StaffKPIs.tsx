import { Users, UserCheck, UserX, Building2, ShieldAlert } from "lucide-react";
import { mockStaff, mockDepartments } from "../data/mockData";

export function StaffKPIs() {
  const totalStaff = mockStaff.length;
  const activeStaff = mockStaff.filter(s => s.accountStatus === "Active").length;
  const suspendedStaff = mockStaff.filter(s => s.accountStatus === "Suspended").length;
  
  const totalDepartments = mockDepartments.length;
  const activeDepartments = mockDepartments.filter(d => d.status === "Active").length;
  
  const pendingRequests = mockDepartments.reduce((sum, d) => sum + d.pendingRequests, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="text-slate-500 text-sm font-medium">Total Staff</div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-slate-900">{totalStaff}</div>
          <div className="text-sm text-emerald-600 font-medium mt-1 flex items-center gap-1">
            +12% <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="text-slate-500 text-sm font-medium">Active Accounts</div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-slate-900">{activeStaff}</div>
          <div className="text-sm text-slate-500 font-medium mt-1">
            {Math.round((activeStaff / totalStaff) * 100)}% of total staff
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="text-slate-500 text-sm font-medium">Suspended Staff</div>
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <UserX className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-red-600">{suspendedStaff}</div>
          <div className="text-sm text-slate-500 font-medium mt-1">Requires review</div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="text-slate-500 text-sm font-medium">Active Departments</div>
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-slate-900">{activeDepartments} <span className="text-lg text-slate-400 font-normal">/ {totalDepartments}</span></div>
          <div className="text-sm text-amber-600 font-medium mt-1 flex items-center gap-1">
            1 Temporarily Closed
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-5 rounded-2xl border border-amber-400 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="text-amber-50 text-sm font-medium">Pending Requests</div>
          <div className="p-2 bg-white/20 text-white rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 relative z-10">
          <div className="text-3xl font-bold">{pendingRequests}</div>
          <div className="text-sm text-amber-100 font-medium mt-1">
            Across all departments
          </div>
        </div>
      </div>
    </div>
  );
}
