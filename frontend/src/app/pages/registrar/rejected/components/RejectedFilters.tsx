import { Filter } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

export function RejectedFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
        <option>All Types</option>
        <option>Graduation</option>
        <option>Withdrawal</option>
        <option>Transfer</option>
        <option>Academic Dismissal</option>
        <option>Staff Clearance</option>
      </select>

      <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
        <option>All Rejection Statuses</option>
        <option>Rejected</option>
        <option>Awaiting Student Action</option>
        <option>Appeal Submitted</option>
        <option>Under Review</option>
        <option>Information Requested</option>
        <option>Reopened</option>
        <option>Final Rejected</option>
      </select>

      <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
        <option>Any Rejection Category</option>
        <option>Outstanding Property</option>
        <option>Unreturned Book</option>
        <option>Financial Obligation</option>
        <option>Missing Document</option>
        <option>Policy Violation</option>
        <option>Other</option>
      </select>

      <Button variant="outline" className="gap-2">
        <Filter className="w-4 h-4" />
        Advanced Filters
      </Button>
    </div>
  );
}
