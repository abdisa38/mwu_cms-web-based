import { StaffRecord } from "../data/types";
import { MoreHorizontal, Mail, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface StaffTableProps {
  staff: StaffRecord[];
  onStaffClick: (staff: StaffRecord) => void;
}

export function StaffTable({ staff, onStaffClick }: StaffTableProps) {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>;
      case "Pending Invitation": return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><Mail className="w-3.5 h-3.5" /> Invited</span>;
      case "Suspended": return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><ShieldAlert className="w-3.5 h-3.5" /> Suspended</span>;
      case "Inactive": return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><Clock className="w-3.5 h-3.5" /> Inactive</span>;
      default: return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold w-max">{status}</span>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin": return <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">Super Admin</span>;
      case "Registrar": return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">Registrar</span>;
      case "Registrar Staff": return <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs font-medium">Registrar Staff</span>;
      case "Department Head": return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">Dept Head</span>;
      default: return <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">Dept Staff</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 w-10 text-center"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" /></th>
              <th className="p-4 font-semibold">Staff Member</th>
              <th className="p-4 font-semibold">Department & Title</th>
              <th className="p-4 font-semibold">System Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Last Active</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((member) => (
              <tr 
                key={member.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onStaffClick(member)}
              >
                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {member.profilePhoto ? (
                      <img src={member.profilePhoto} alt={member.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {member.fullName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{member.fullName}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1 rounded">{member.employeeId}</span>
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-slate-900">{member.department}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{member.jobTitle}</div>
                </td>
                <td className="p-4">
                  {getRoleBadge(member.systemRole)}
                </td>
                <td className="p-4">
                  {getStatusBadge(member.accountStatus)}
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-900">{member.lastActivity ? new Date(member.lastActivity).toLocaleDateString() : "Never"}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{member.lastActivity ? new Date(member.lastActivity).toLocaleTimeString() : "-"}</div>
                </td>
                <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" className="p-2 h-8 w-8 text-slate-400 hover:text-blue-600 border-transparent hover:bg-blue-50 hover:border-blue-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No staff members found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
