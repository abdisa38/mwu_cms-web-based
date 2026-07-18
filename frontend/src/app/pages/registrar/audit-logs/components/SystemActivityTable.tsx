import { AuditEvent, ActionStatus } from "../data/types";
import { Eye, ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface SystemActivityTableProps {
  events: AuditEvent[];
  onViewEvent: (event: AuditEvent) => void;
}

export function SystemActivityTable({ events, onViewEvent }: SystemActivityTableProps) {
  
  const getStatusBadge = (status: ActionStatus) => {
    switch (status) {
      case "Successful": return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Successful</span>;
      case "Failed": return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">Failed</span>;
      case "Blocked": return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">Blocked</span>;
      default: return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-bold">Pending</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Event ID & Time</th>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Action</th>
              <th className="p-4 font-semibold">Resource</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Integrity</th>
              <th className="p-4 font-semibold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => onViewEvent(event)}>
                <td className="p-4">
                  <div className="font-mono text-xs font-bold text-slate-900">{event.id}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{new Date(event.timestamp).toLocaleString()}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm text-slate-900">{event.user}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{event.role}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-700">{event.action}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{event.actionCategory}</div>
                </td>
                <td className="p-4">
                  <div className="inline-flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">{event.resourceType}</span>
                    <span className="text-xs font-mono font-medium text-slate-900 bg-slate-100 px-1 py-0.5 rounded mt-0.5 w-max">
                      {event.resourceId}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(event.status)}
                </td>
                <td className="p-4">
                  {event.status === "Failed" && event.actionCategory === "Authentication" ? (
                    <ShieldAlert className="w-4 h-4 text-red-500" title="Security Risk" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-500" title="Hash Verified" />
                  )}
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" className="h-8 w-8 p-0 text-slate-400 group-hover:text-indigo-600 border-transparent group-hover:bg-indigo-50">
                    <Eye className="w-4 h-4" />
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
