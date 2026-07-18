import { Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function VerificationFilters() {
  return (
    <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div className="flex-1 w-full max-w-md relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by student name, ID, or email..." 
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Needs More Info</option>
          </select>
          <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>All Priorities</option>
            <option>High Priority</option>
            <option>Normal Priority</option>
          </select>
          <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative hidden sm:block">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>All Colleges</option>
            <option>Engineering</option>
            <option>Medicine</option>
            <option>Business</option>
          </select>
          <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <Button variant="outline" size="sm" className="h-9 px-3 border-slate-200 text-slate-600">
          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
          Today
        </Button>
      </div>
    </div>
  );
}
