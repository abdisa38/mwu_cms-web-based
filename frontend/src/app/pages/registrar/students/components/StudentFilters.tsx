import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function StudentFilters() {
  const statuses = [
    { label: "All", count: 12450, active: true },
    { label: "Active", count: 11200, active: false },
    { label: "Pending Verification", count: 450, active: false },
    { label: "Verified", count: 11000, active: false },
    { label: "Suspended", count: 45, active: false },
    { label: "Graduated", count: 850, active: false },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      
      {/* Interactive Status Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 xl:pb-0 scrollbar-hide">
        {statuses.map((status, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              status.active 
                ? "bg-slate-900 text-white shadow-md" 
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {status.label}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${status.active ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-500"}`}>
              {status.count}
            </span>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="flex items-center gap-3 w-full xl:w-auto shrink-0 border-t xl:border-t-0 pt-4 xl:pt-0 border-slate-100">
        <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
          <option>All Colleges</option>
          <option>Computing and Informatics</option>
          <option>Business and Economics</option>
          <option>Engineering</option>
          <option>Health Sciences</option>
        </select>

        <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
          <option>All Years</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
          <option>Year 5</option>
        </select>

        <Button variant="outline" className="gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Advanced</span>
        </Button>
      </div>
    </div>
  );
}
