import { Eye, ShieldAlert, Clock, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import { RejectedClearance, RejectionStatus, PriorityLevel } from "../data/types";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/Button";

interface RejectedArchiveTableProps {
  data: RejectedClearance[];
  onRowClick: (clearance: RejectedClearance) => void;
}

const statusConfig: Record<RejectionStatus, { color: string, icon: React.ElementType }> = {
  "Rejected": { color: "bg-red-100 text-red-700 border-red-200", icon: ShieldAlert },
  "Awaiting Student Action": { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  "Appeal Submitted": { color: "bg-blue-100 text-blue-700 border-blue-200", icon: AlertCircle },
  "Under Review": { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Eye },
  "Information Requested": { color: "bg-orange-100 text-orange-700 border-orange-200", icon: AlertTriangle },
  "Reopened": { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: RefreshCw },
  "Reconsideration Approved": { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: RefreshCw },
  "Reconsideration Rejected": { color: "bg-red-100 text-red-700 border-red-200", icon: ShieldAlert },
  "Final Rejected": { color: "bg-slate-100 text-slate-700 border-slate-300", icon: ShieldAlert },
};

export function RejectedArchiveTable({ data, onRowClick }: RejectedArchiveTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 w-10">
              <input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500" />
            </th>
            <th className="px-4 py-3">Student / Clearance</th>
            <th className="px-4 py-3">Rejection Info</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Updated</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => {
            const StatusIcon = statusConfig[row.status].icon;
            return (
              <tr 
                key={row.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onRowClick(row)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={row.student.photoUrl}
                      alt={row.student.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{row.student.name}</p>
                      <p className="text-xs text-slate-500">{row.clearanceNumber} • {row.student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{row.rejectedDepartment}</p>
                    <p className="text-xs text-slate-500 max-w-[200px] truncate">{row.rejectionCategory}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit ${statusConfig[row.status].color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {row.status}
                    </span>
                    {row.priority === "Critical" && (
                      <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">High Priority</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-slate-900">{new Date(row.lastUpdated).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-500">{new Date(row.lastUpdated).toLocaleTimeString()}</p>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button 
                    variant="ghost" 
                    className="px-2 py-1 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => { e.stopPropagation(); onRowClick(row); }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
