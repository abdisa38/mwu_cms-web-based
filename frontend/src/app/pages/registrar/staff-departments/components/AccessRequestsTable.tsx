import { AccessRequest } from "../data/types";
import { Key, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface AccessRequestsTableProps {
  requests: AccessRequest[];
}

export function AccessRequestsTable({ requests }: AccessRequestsTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-600" /> Pending Access & Role Requests
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Requester</th>
              <th className="p-4 font-semibold">Requested Access</th>
              <th className="p-4 font-semibold">Reason</th>
              <th className="p-4 font-semibold">Submitted</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-sm text-slate-900">{request.requesterName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{request.department}</div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs font-semibold">
                    {request.requestedPermission}
                  </span>
                </td>
                <td className="p-4 max-w-xs">
                  <p className="text-sm text-slate-700 truncate" title={request.reason}>{request.reason}</p>
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-900">{new Date(request.submittedDate).toLocaleDateString()}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{new Date(request.submittedDate).toLocaleTimeString()}</div>
                </td>
                <td className="p-4">
                  {request.status === "Pending" ? (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max">
                      <Clock className="w-3.5 h-3.5" /> Pending Review
                    </span>
                  ) : request.status === "Approved" ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-semibold flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">{request.status}</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {request.status === "Pending" ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 h-8 px-3 text-xs">Reject</Button>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3 text-xs shadow-sm">Approve</Button>
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-slate-500 flex justify-end">
                      Reviewed by {request.reviewer}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No pending access requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
