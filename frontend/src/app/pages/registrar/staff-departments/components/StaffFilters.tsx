import { Search, Filter, Download, UserPlus, Building2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface StaffFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onAddStaff: () => void;
  onAddDepartment: () => void;
}

export function StaffFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  onAddStaff,
  onAddDepartment
}: StaffFiltersProps) {
  
  const statuses = ["All", "Active", "Pending Invitation", "Inactive", "Suspended", "Locked"];

  return (
    <div className="space-y-4">
      {/* Search and Main Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, ID, email, or department..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <Button variant="outline" className="gap-2 shrink-0">
            <Filter className="w-4 h-4" /> Advanced Filters
          </Button>
          <Button variant="outline" className="gap-2 shrink-0">
            <Download className="w-4 h-4" /> Export
          </Button>
          <div className="w-px h-10 bg-slate-200 hidden sm:block mx-1"></div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm gap-2 shrink-0" onClick={onAddDepartment}>
            <Building2 className="w-4 h-4" /> Add Dept
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2 shrink-0" onClick={onAddStaff}>
            <UserPlus className="w-4 h-4" /> Add Staff
          </Button>
        </div>
      </div>

      {/* Status Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
              selectedStatus === status 
                ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {status}
          </button>
        ))}
        <div className="w-px h-8 bg-slate-200 self-center mx-2 shrink-0"></div>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 outline-none cursor-pointer shrink-0">
          <option>All Departments</option>
          <option>Library</option>
          <option>Dormitory</option>
          <option>Registrar</option>
          <option>Cafeteria</option>
        </select>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 outline-none cursor-pointer shrink-0">
          <option>All Roles</option>
          <option>Department Staff</option>
          <option>Department Head</option>
          <option>Registrar</option>
          <option>Super Admin</option>
        </select>
      </div>
    </div>
  );
}
