import { BarChart3, Download, Calendar, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetDepartmentReportsQuery } from '../api/staffApi';

export const StaffReportsPage = () => {
  const { data, isLoading } = useGetDepartmentReportsQuery({});
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Department Reports</h1>
          <p className="text-slate-500 mt-1">Analytics and performance metrics for clearance processing.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="bg-white">
            <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Placeholder for real charts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Processing Volume</h2>
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <BarChart3 className="h-16 w-16 mb-4 text-slate-200" />
            <p className="text-sm">Chart integration requires Recharts library.</p>
            <p className="text-xs mt-1">Data: 145 Processed, 23 Pending</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Approval Ratio</h2>
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <PieChart className="h-16 w-16 mb-4 text-slate-200" />
            <p className="text-sm">Chart integration requires Recharts library.</p>
            <p className="text-xs mt-1">Data: 85% Approved, 15% Rejected</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-900">Performance Metrics</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">Average Processing Time</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">4.2 <span className="text-sm font-normal text-slate-500">hours</span></p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">Clearance Types</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">68% <span className="text-sm font-normal text-slate-500">Graduation</span></p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">Pending Backlog</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">12 <span className="text-sm font-normal text-slate-500">requests</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
