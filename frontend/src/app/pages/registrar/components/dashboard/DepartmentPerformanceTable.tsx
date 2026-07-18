import { Building2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function DepartmentPerformanceTable() {
  const departments = [
    { name: "Library", pending: 45, approved: 1250, rejected: 12, avgTime: "4 hrs", score: 98, sla: "On Track", trend: "up" },
    { name: "Student Cafe", pending: 120, approved: 1100, rejected: 5, avgTime: "12 hrs", score: 85, sla: "Warning", trend: "down" },
    { name: "Dormitory", pending: 230, approved: 890, rejected: 45, avgTime: "24 hrs", score: 72, sla: "Breached", trend: "down" },
    { name: "Sports", pending: 15, approved: 1300, rejected: 2, avgTime: "2 hrs", score: 99, sla: "On Track", trend: "up" },
    { name: "Finance", pending: 85, approved: 1150, rejected: 8, avgTime: "6 hrs", score: 92, sla: "On Track", trend: "up" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-500" />
          Department Performance Ranking
        </h3>
        <Button variant="ghost" size="sm" className="text-blue-600 h-8">View Full Report</Button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold">Department</th>
              <th className="px-6 py-3 font-semibold text-center">Pending</th>
              <th className="px-6 py-3 font-semibold text-center">Approved</th>
              <th className="px-6 py-3 font-semibold text-center">Rejected</th>
              <th className="px-6 py-3 font-semibold">Avg Time</th>
              <th className="px-6 py-3 font-semibold text-center">Score</th>
              <th className="px-6 py-3 font-semibold">SLA Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {departments.map((dept, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {dept.name}
                </td>
                <td className="px-6 py-4 text-center font-medium text-amber-600 bg-amber-50/30">
                  {dept.pending}
                </td>
                <td className="px-6 py-4 text-center text-emerald-600 font-medium">
                  {dept.approved}
                </td>
                <td className="px-6 py-4 text-center text-rose-600 font-medium">
                  {dept.rejected}
                </td>
                <td className="px-6 py-4 text-slate-600 font-mono">
                  {dept.avgTime}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-slate-900">{dept.score}</span>
                    {dept.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : dept.trend === 'down' ? <TrendingDown className="w-3 h-3 text-rose-500" /> : <Minus className="w-3 h-3 text-slate-400" />}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                    dept.sla === 'On Track' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                    dept.sla === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                    'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {dept.sla}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
