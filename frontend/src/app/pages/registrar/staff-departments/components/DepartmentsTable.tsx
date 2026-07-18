import { DepartmentRecord } from "../data/types";
import { Building2, MoreHorizontal, Settings, Users, Activity } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface DepartmentsTableProps {
  departments: DepartmentRecord[];
  onDepartmentClick?: (dept: DepartmentRecord) => void;
}

export function DepartmentsTable({ departments, onDepartmentClick }: DepartmentsTableProps) {
  
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" /> Active Departments
        </h3>
        <Button variant="outline" className="text-sm">Manage Operating Hours</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Department</th>
              <th className="p-4 font-semibold">Department Head</th>
              <th className="p-4 font-semibold text-center">Staff Count</th>
              <th className="p-4 font-semibold text-center">Workload (Pending)</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {departments.map((dept) => (
              <tr 
                key={dept.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onDepartmentClick?.(dept)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{dept.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1 rounded">{dept.code}</span>
                        <span>{dept.type}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-slate-900">{dept.headName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{dept.headId || "Not Assigned"}</div>
                </td>
                <td className="p-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-bold">
                    <Users className="w-4 h-4 text-slate-500" /> {dept.assignedStaffCount}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">
                    <Activity className="w-4 h-4 text-amber-500" /> {dept.pendingRequests}
                  </div>
                </td>
                <td className="p-4">
                  {dept.status === "Active" ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-semibold">Active</span>
                  ) : dept.status === "Temporarily Closed" ? (
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-semibold">Closed Temporarily</span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">{dept.status}</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" className="p-2 h-8 w-8 text-slate-400 hover:text-indigo-600 border-transparent hover:bg-indigo-50 hover:border-indigo-200">
                    <Settings className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
