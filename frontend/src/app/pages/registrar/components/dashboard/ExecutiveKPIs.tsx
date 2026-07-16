import { 
  Users,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileText,
  Building2,
  UserCheck,
  ShieldAlert,
  Activity,
  Calendar
} from "lucide-react";

export function ExecutiveKPIs() {
  const kpis = [
    {
      title: "Total Students",
      value: "14,532",
      subtext: "+320 this semester",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
      accent: "bg-blue-50"
    },
    {
      title: "Verified Students",
      value: "12,840",
      subtext: "88% completion",
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      accent: "bg-emerald-50"
    },
    {
      title: "Pending Verification",
      value: "1,692",
      subtext: "Action Required",
      icon: ShieldAlert,
      color: "text-amber-600",
      bg: "bg-amber-100",
      accent: "bg-amber-50"
    },
    {
      title: "Active Clearances",
      value: "3,450",
      subtext: "Currently in progress",
      icon: Activity,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      accent: "bg-indigo-50"
    },
    {
      title: "Pending Dept Reviews",
      value: "845",
      subtext: "Across 25 departments",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
      accent: "bg-amber-50"
    },
    {
      title: "Pending Final Approval",
      value: "42",
      subtext: "Registrar Queue",
      icon: FileText,
      color: "text-rose-600",
      bg: "bg-rose-100",
      accent: "bg-rose-50"
    },
    {
      title: "Completed Clearances",
      value: "1,208",
      subtext: "This Academic Year",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      accent: "bg-emerald-50"
    },
    {
      title: "Certificates Generated",
      value: "1,195",
      subtext: "+45 this week",
      icon: Award,
      color: "text-purple-600",
      bg: "bg-purple-100",
      accent: "bg-purple-50"
    }
  ];

  const secondaryKpis = [
    { title: "Departments", value: "25", icon: Building2 },
    { title: "System Users", value: "142", icon: Users },
    { title: "Today's Activity", value: "348", icon: Activity },
    { title: "Monthly Activity", value: "8.2k", icon: Calendar }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-slate-300 transition-colors">
            <div className={`absolute -right-4 -top-4 w-16 h-16 ${kpi.accent} rounded-full group-hover:scale-150 transition-transform duration-500 ease-out`} />
            <div className="relative z-10 flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full ${kpi.bg} ${kpi.color} flex items-center justify-center shadow-sm`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
            </div>
            <div className="relative z-10 flex items-end justify-between mt-2">
              <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
              <span className={`text-xs font-medium ${kpi.color} flex items-center ${kpi.accent} border border-transparent px-2 py-0.5 rounded-full`}>
                {kpi.title.includes('Generated') && <TrendingUp className="w-3 h-3 mr-1" />}
                {kpi.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryKpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100">
                <kpi.icon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-600">{kpi.title}</p>
            </div>
            <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
