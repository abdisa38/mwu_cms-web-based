import { Search, Filter, Calendar, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function ApprovalFilters() {
  const statuses = [
    { label: 'All Requests', count: 171, active: true },
    { label: 'Ready for Review', count: 45, active: false },
    { label: 'Under Review', count: 18, active: false },
    { label: 'Blocked', count: 7, active: false },
    { label: 'Approved', count: 89, active: false },
    { label: 'Returned', count: 12, active: false },
  ];

  return (
    <div className="space-y-4">
      {/* Interactive Status Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {statuses.map((status) => (
          <button
            key={status.label}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
              status.active 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {status.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              status.active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {status.count}
            </span>
          </button>
        ))}
      </div>

      {/* Complex Filter Row */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96 flex-shrink-0">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Student Name, ID, Clearance #..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500 hidden xl:block">Clearance Type:</span>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700" size="sm">
              All Types <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500 hidden xl:block">Physical ID:</span>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700" size="sm">
              Any Status <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
            </Button>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700" size="sm">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            Date Range
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700" size="sm">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
