import { CheckCircle2, ShieldCheck, GraduationCap, Building2, SearchX, Download } from "lucide-react";

export function CompletedKPIs() {
  const kpis = [
    { label: "Total Completed", value: "14,520", icon: CheckCircle2, color: "text-indigo-600", bg: "bg-indigo-100", trend: "+124 this month" },
    { label: "Certificates Generated", value: "14,520", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-100", trend: "100% Generation Rate" },
    { label: "Certificates Verified", value: "8,941", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-100", trend: "+32 today" },
    { label: "Archived Staff/Transfer", value: "2,105", icon: Building2, color: "text-slate-600", bg: "bg-slate-100", trend: "Historical" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className={`p-3 rounded-xl ${kpi.bg}`}>
            <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{kpi.trend}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
