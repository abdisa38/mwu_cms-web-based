import { Search, Filter, Calendar, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export function PendingFilters() {
  const statuses = [
    "All",
    "Pending",
    "In Progress",
    "Partially Approved",
    "Blocked",
    "Needs Action",
    "Ready for Review",
    "Overdue"
  ];

  return (
    <div className="flex flex-col bg-white border-b border-slate-200">
      {/* Top row: Status Pills & Search */}
      <div className="p-4 flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center border-b border-slate-100">
        <div className="flex items-center gap-1 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar">
          {statuses.map((status, index) => (
            <button
              key={index}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                index === 0 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex-1 w-full xl:w-auto max-w-md relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by student name, ID, or clearance number..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
          />
        </div>
      </div>
      
      {/* Bottom row: Advanced Select Filters */}
      <div className="p-4 bg-slate-50/50 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 mr-2 text-sm font-medium text-slate-500">
          <SlidersHorizontal className="w-4 h-4" />
          Filters:
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>Clearance Type</option>
            <option>Graduation</option>
            <option>Withdrawal</option>
            <option>Transfer</option>
            <option>Academic Dismissal</option>
            <option>Staff Clearance</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>All Colleges</option>
            <option>College of Computing</option>
            <option>College of Medicine</option>
            <option>College of Business</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>Current Stage</option>
            <option>Library</option>
            <option>Dormitory</option>
            <option>Cafeteria</option>
            <option>Department Head</option>
            <option>Registrar</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>Priority</option>
            <option>Normal</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-sm cursor-pointer">
            <option>Progress</option>
            <option>0%</option>
            <option>1-25%</option>
            <option>26-50%</option>
            <option>51-75%</option>
            <option>76-99%</option>
            <option>100%</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <Button variant="outline" size="sm" className="h-8 px-3 border-slate-200 text-slate-600 bg-white ml-auto">
          <Calendar className="w-3.5 h-3.5 mr-2 text-slate-400" />
          Date Range
        </Button>
      </div>
    </div>
  );
}
