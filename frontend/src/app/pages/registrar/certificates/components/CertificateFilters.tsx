import { Button } from "@/app/components/ui/Button";
import { Filter, ChevronDown, CheckCircle2, Clock, XCircle, RefreshCw, FileWarning } from "lucide-react";

export function CertificateFilters() {
  const statusFilters = [
    { label: "All", count: 4892, active: true },
    { label: "Pending Generation", count: 142, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Active", count: 4720, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Revoked", count: 12, icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    { label: "Regenerated", count: 84, icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Correction Requested", count: 18, icon: FileWarning, color: "text-orange-600", bg: "bg-orange-100" }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Status Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {statusFilters.map((filter, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter.active 
                ? "bg-slate-800 text-white shadow-sm" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {filter.icon && (
              <span className={`w-5 h-5 rounded-full flex items-center justify-center ${filter.bg} ${filter.color} ${filter.active ? 'bg-white/20 text-white' : ''}`}>
                <filter.icon className="w-3 h-3" />
              </span>
            )}
            {filter.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${filter.active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" className="text-slate-600 border-slate-200 bg-white">
          <Filter className="w-4 h-4 mr-2 text-slate-400" />
          More Filters
        </Button>
        <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500">
          <option>All Certificate Types</option>
          <option>Graduation Clearance</option>
          <option>Withdrawal Clearance</option>
          <option>Transfer Clearance</option>
          <option>Staff Clearance</option>
        </select>
        <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500">
          <option>All Verifications</option>
          <option>Verified</option>
          <option>Never Verified</option>
          <option>Verification Failed</option>
        </select>
        <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500">
          <option>All Dates</option>
          <option>Generated Today</option>
          <option>Generated This Week</option>
          <option>Generated This Month</option>
        </select>
      </div>
    </div>
  );
}
