import { CheckCircle2, Clock, XCircle, FileText, AlertTriangle } from "lucide-react";
import { CompletedClearance } from "../../data/types";

export function ApprovalHistoryList({ clearance }: { clearance: CompletedClearance }) {
  if (clearance.departmentDecisions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">No Department history</h3>
        <p className="text-slate-500">There are no department decisions recorded for this clearance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Officer</th>
              <th className="px-6 py-4 font-medium">Decision</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Time Taken</th>
              <th className="px-6 py-4 font-medium">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clearance.departmentDecisions.map((decision) => (
              <tr key={decision.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{decision.departmentName}</td>
                <td className="px-6 py-4 text-slate-600">{decision.officerName}</td>
                <td className="px-6 py-4">
                  {decision.decision === "Approved" ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 w-fit">
                      <CheckCircle2 className="w-4 h-4" />
                      Approved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-red-600 font-medium bg-red-50 px-2 py-1 rounded-md border border-red-100 w-fit">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(decision.decisionDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-slate-600">{decision.processingTimeDays} Days</td>
                <td className="px-6 py-4">
                  {decision.auditStatus === "Clean" ? (
                    <span className="text-emerald-600 font-medium">Clean</span>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Flagged
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
