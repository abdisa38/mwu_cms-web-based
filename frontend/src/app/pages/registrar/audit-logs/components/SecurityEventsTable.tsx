import { SecurityEvent, RiskLevel } from "../data/types";
import { Eye, ShieldAlert, AlertTriangle, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface SecurityEventsTableProps {
  events: SecurityEvent[];
}

export function SecurityEventsTable({ events }: SecurityEventsTableProps) {
  
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case "Critical": return <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-xs font-bold"><ShieldAlert className="w-3 h-3"/> Critical</span>;
      case "High": return <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold"><AlertTriangle className="w-3 h-3"/> High</span>;
      case "Medium": return <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold"><AlertCircle className="w-3 h-3"/> Medium</span>;
      case "Low": return <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold"><ShieldCheck className="w-3 h-3"/> Low</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved": return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Resolved</span>;
      case "Investigating": return <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">Investigating</span>;
      case "Open": return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold animate-pulse">Open</span>;
      default: return null;
    }
  }

  return (
    <div className="bg-white border border-rose-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-rose-50 border-b border-rose-200 px-6 py-4 flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-rose-600" />
        <h3 className="text-rose-900 font-bold text-sm">Active Security Alerts</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Event ID & Time</th>
              <th className="p-4 font-semibold">Risk Level</th>
              <th className="p-4 font-semibold">Event Type</th>
              <th className="p-4 font-semibold">User / Target</th>
              <th className="p-4 font-semibold">IP & Device</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-mono text-xs font-bold text-slate-900">{event.id}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{new Date(event.timestamp).toLocaleString()}</div>
                </td>
                <td className="p-4">
                  {getRiskBadge(event.riskLevel)}
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-900">{event.eventType}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Taken: {event.actionTaken}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm text-slate-900">{event.user}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">{event.relatedAccount}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-700">{event.ipAddress}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{event.device}</div>
                </td>
                <td className="p-4">
                  {getStatusBadge(event.resolutionStatus)}
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" variant={event.resolutionStatus === 'Open' ? 'primary' : 'outline'}>
                    Investigate
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
