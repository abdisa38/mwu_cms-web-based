import { RolePermissionMatrix } from "../data/types";
import { Shield, Check, X, ShieldAlert } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface RolesPermissionsProps {
  matrix: RolePermissionMatrix[];
}

export function RolesPermissions({ matrix }: RolesPermissionsProps) {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-600" /> System Roles & Access Matrix
            </h3>
            <p className="text-sm text-slate-500 mt-1">Configure global permissions across all predefined system roles. Changes take effect immediately across all active sessions.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" className="text-slate-600 gap-2">
              <ShieldAlert className="w-4 h-4" /> Audit Role Changes
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Save Changes</Button>
          </div>
        </div>
      </div>

      {/* Permission Categories */}
      {matrix.map((category, index) => (
        <div key={index} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h4 className="font-bold text-slate-900">{category.category} Permissions</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4 w-1/3">Permission Name</th>
                  <th className="p-4 text-center">Dept Staff</th>
                  <th className="p-4 text-center">Dept Head</th>
                  <th className="p-4 text-center">Registrar Staff</th>
                  <th className="p-4 text-center">Registrar</th>
                  <th className="p-4 text-center">Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {category.permissions.map((perm, pIdx) => (
                  <tr key={pIdx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <span className="text-sm font-medium text-slate-900">{perm.name}</span>
                    </td>
                    <td className="p-4 text-center">
                      <Checkbox checked={perm.departmentStaff} />
                    </td>
                    <td className="p-4 text-center">
                      <Checkbox checked={perm.departmentHead} />
                    </td>
                    <td className="p-4 text-center">
                      <Checkbox checked={perm.registrarStaff} />
                    </td>
                    <td className="p-4 text-center">
                      <Checkbox checked={perm.registrar} />
                    </td>
                    <td className="p-4 text-center">
                      <Checkbox checked={perm.superAdmin} disabled /> {/* Super Admin cannot be unchecked in UI mockup */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      
    </div>
  );
}

// Simple internal checkbox component for the matrix
function Checkbox({ checked, disabled = false }: { checked: boolean, disabled?: boolean }) {
  return (
    <button 
      className={`w-6 h-6 rounded flex items-center justify-center mx-auto transition-colors border ${
        checked 
          ? disabled ? "bg-indigo-300 border-indigo-300 cursor-not-allowed" : "bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700" 
          : "bg-white border-slate-300 hover:border-indigo-400"
      }`}
      disabled={disabled}
    >
      {checked && <Check className="w-4 h-4 text-white" />}
    </button>
  );
}
