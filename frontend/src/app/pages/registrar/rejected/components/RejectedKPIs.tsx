import { XCircle, AlertCircle, MessageSquare, Clock, RefreshCw, ShieldAlert } from "lucide-react";

export function RejectedKPIs() {
  const kpis = [
    { label: "Total Rejected", value: "342", icon: XCircle, color: "text-red-600", bg: "bg-red-100", trend: "12 Today" },
    { label: "Awaiting Action", value: "215", icon: Clock, color: "text-amber-600", bg: "bg-amber-100", trend: "Needs Student Action" },
    { label: "Active Appeals", value: "84", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100", trend: "12 Under Review" },
    { label: "Reopened Clearances", value: "45", icon: RefreshCw, color: "text-emerald-600", bg: "bg-emerald-100", trend: "Back in Workflow" },
    { label: "Final Rejections", value: "12", icon: ShieldAlert, color: "text-slate-600", bg: "bg-slate-200", trend: "Permanently Closed" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className={`p-3 rounded-xl ${kpi.bg}`}>
            <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1 leading-tight">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{kpi.trend}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
