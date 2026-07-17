import { CheckSquare, AlertTriangle, Clock, Award, FileWarning } from "lucide-react";

export function ApprovalKPIs() {
  const kpis = [
    { label: 'Ready for Final Approval', value: '45', icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+12' },
    { label: 'Pending Final Review', value: '18', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', trend: '-3' },
    { label: 'Blocked Approvals', value: '7', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100', trend: '+2' },
    { label: 'Missing ID / Docs', value: '12', icon: FileWarning, color: 'text-amber-600', bg: 'bg-amber-100', trend: '-5' },
    { label: 'Approved Today', value: '89', icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: '+24' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${kpi.bg}`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {kpi.trend}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">{kpi.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
