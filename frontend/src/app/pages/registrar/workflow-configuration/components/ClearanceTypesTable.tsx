import { ClearanceType } from "../data/types";
import { Settings, FileEdit, Copy, Power, PowerOff, Activity } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface ClearanceTypesTableProps {
  types: ClearanceType[];
  onManageWorkflow: (type: ClearanceType) => void;
}

export function ClearanceTypesTable({ types, onManageWorkflow }: ClearanceTypesTableProps) {
  
  const getApplicantBadge = (type: string) => {
    switch (type) {
      case "Student": return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">Student</span>;
      case "Staff": return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">Staff</span>;
      default: return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">Both</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" /> System Clearance Types
        </h3>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm text-sm h-9">
          Create Clearance Type
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Clearance Type</th>
              <th className="p-4 font-semibold">Applicant</th>
              <th className="p-4 font-semibold">Required Departments</th>
              <th className="p-4 font-semibold">Active Version</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Last Updated</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {types.map((type) => (
              <tr key={type.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4">
                  <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{type.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="font-mono bg-slate-100 px-1 rounded">{type.code}</span>
                  </div>
                </td>
                <td className="p-4">
                  {getApplicantBadge(type.applicantType)}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {type.requiredDepartments.slice(0, 3).map(dept => (
                      <span key={dept} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium border border-slate-200">
                        {dept.replace("DEPT-", "")}
                      </span>
                    ))}
                    {type.requiredDepartments.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-medium border border-slate-200">
                        +{type.requiredDepartments.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-bold border border-indigo-100">
                    <Activity className="w-3.5 h-3.5" /> {type.activeVersionId ? type.activeVersionId.split('-').pop() : "Draft"}
                  </div>
                </td>
                <td className="p-4">
                  {type.activeStatus === "Active" ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max">
                      <Power className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold flex items-center gap-1 w-max">
                      <PowerOff className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-900">{new Date(type.lastUpdated).toLocaleDateString()}</div>
                  <div className="text-xs text-slate-500 mt-0.5">by {type.updatedBy}</div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="h-8 px-2 text-slate-500 hover:text-slate-900" title="Duplicate">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border border-indigo-200 h-8 text-xs font-medium px-3 gap-1.5"
                      onClick={() => onManageWorkflow(type)}
                    >
                      <FileEdit className="w-3.5 h-3.5" /> Manage Workflow
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
