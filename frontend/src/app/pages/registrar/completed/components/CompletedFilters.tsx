import { Filter } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function CompletedFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white">
        <option>All Types</option>
        <option>Graduation</option>
        <option>Withdrawal</option>
        <option>Transfer</option>
        <option>Academic Dismissal</option>
        <option>Staff Clearance</option>
      </select>

      <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white">
        <option>All Certificate Statuses</option>
        <option>Generated</option>
        <option>Downloaded</option>
        <option>Verified</option>
        <option>Revoked</option>
      </select>

      <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white">
        <option>Any Approval Date</option>
        <option>Today</option>
        <option>This Week</option>
        <option>This Month</option>
        <option>This Academic Year</option>
        <option>Custom Range...</option>
      </select>

      <Button variant="outline" className="gap-2">
        <Filter className="w-4 h-4" />
        Advanced Filters
      </Button>
    </div>
  );
}
