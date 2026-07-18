import { Users, UserCheck, Clock, UserX, CheckCircle, AlertTriangle } from "lucide-react";
import { StudentRecord } from "../data/types";

interface StudentKPIsProps {
  students: StudentRecord[];
}

export function StudentKPIs({ students }: StudentKPIsProps) {
  const kpis = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      trend: "+120 this month"
    },
    {
      title: "Verified Students",
      value: students.filter(s => s.verificationStatus === "Verified").length,
      icon: UserCheck,
      color: "bg-emerald-50 text-emerald-600",
      trend: "85% verification rate"
    },
    {
      title: "Pending Verification",
      value: students.filter(s => s.verificationStatus === "Pending").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      trend: "14 need review"
    },
    {
      title: "Active Clearances",
      value: students.filter(s => s.currentClearanceStatus === "In Progress" || s.currentClearanceStatus === "Pending").length,
      icon: CheckCircle,
      color: "bg-purple-50 text-purple-600",
      trend: "Currently processing"
    },
    {
      title: "Suspended Accounts",
      value: students.filter(s => s.accountStatus === "Suspended").length,
      icon: UserX,
      color: "bg-red-50 text-red-600",
      trend: "Action required"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{kpi.value}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{kpi.title}</p>
              <p className="text-xs text-slate-400 mt-1">{kpi.trend}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
