import { Search, Filter, Calendar } from "lucide-react";

export function AuditFilters() {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by Event ID, User, Resource ID..." 
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg shrink-0 cursor-pointer hover:bg-slate-100 transition-colors">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-700 font-medium">Last 7 Days</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg shrink-0 cursor-pointer hover:bg-slate-100 transition-colors">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-700 font-medium">Action Type</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg shrink-0 cursor-pointer hover:bg-slate-100 transition-colors">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-700 font-medium">Status</span>
        </div>
      </div>
    </div>
  );
}
