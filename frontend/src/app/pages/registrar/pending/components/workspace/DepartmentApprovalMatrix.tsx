import { Clock, CheckCircle2, XCircle, AlertCircle, HelpCircle } from "lucide-react";
import { ClearanceRequest, DepartmentApproval } from "../../data/types";
import { Button } from "../../../../components/ui/Button";

interface DepartmentApprovalMatrixProps {
  clearance: ClearanceRequest;
  preview?: boolean;
}

export function DepartmentApprovalMatrix({ clearance, preview = false }: DepartmentApprovalMatrixProps) {
  const getStatusBadge = (status: DepartmentApproval['status']) => {
    switch (status) {
      case 'Approved':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200"><XCircle className="w-3 h-3 mr-1" /> Rejected</span>;
      case 'Needs Information':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><HelpCircle className="w-3 h-3 mr-1" /> Needs Info</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
      case 'Not Started':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Not Started</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          Department Approvals
        </h3>
        {preview && (
          <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
            View Full Matrix
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 font-semibold">Department</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              {!preview && <th className="px-5 py-3 font-semibold">Responsible Officer</th>}
              {!preview && <th className="px-5 py-3 font-semibold">Decision Date</th>}
              <th className="px-5 py-3 font-semibold">Remarks</th>
              {!preview && <th className="px-5 py-3 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clearance.departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-semibold text-slate-900">{dept.departmentName}</td>
                <td className="px-5 py-4">{getStatusBadge(dept.status)}</td>
                {!preview && (
                  <td className="px-5 py-4 text-slate-600">{dept.responsibleOfficer}</td>
                )}
                {!preview && (
                  <td className="px-5 py-4 text-slate-500 text-xs">
                    {dept.decisionDate ? new Date(dept.decisionDate).toLocaleString() : '-'}
                  </td>
                )}
                <td className="px-5 py-4">
                  <span className={`text-sm ${dept.remarks ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                    {dept.remarks || 'No remarks'}
                  </span>
                </td>
                {!preview && (
                  <td className="px-5 py-4 text-right">
                    <Button variant="outline" size="sm" className="h-8">Details</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
