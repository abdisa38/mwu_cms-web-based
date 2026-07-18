import { ShieldCheck, Download } from "lucide-react";
import { AuditLogEntry } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface ClearanceAuditLogProps {
  logs: AuditLogEntry[];
}

export function ClearanceAuditLog({ logs }: ClearanceAuditLogProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          System Audit Log
        </h3>
        <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200">
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export Log
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 font-semibold">Date & Time</th>
              <th className="px-5 py-3 font-semibold">User</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Action</th>
              <th className="px-5 py-3 font-semibold font-mono text-xs">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                  No audit logs recorded for this clearance request.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors bg-white">
                  <td className="px-5 py-3 text-slate-600">
                    <span className="font-medium text-slate-900">{log.date}</span>
                    <span className="text-xs ml-2 text-slate-500">{log.time}</span>
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900">{log.user}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{log.action}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">{log.ip}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
