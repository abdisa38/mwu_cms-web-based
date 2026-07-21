import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { useGetMyClearancesQuery } from '../api/studentApi';
import { StatusBadge } from '../components/StatusBadge';

export const MyClearancePage = () => {
  const { data, isLoading } = useGetMyClearancesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const clearances = data?.data?.clearances || [];

  const filtered = clearances.filter((c: any) => 
    c.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Clearances</h1>
          <p className="text-slate-500 mt-1">View and track all your clearance requests.</p>
        </div>
        <Link 
          to="/student/clearance/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Start New Clearance
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search clearances..." 
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-3">Clearance Type</th>
                <th className="px-6 py-3">Initiated Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading clearances...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-slate-500">No clearances found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((clearance: any) => (
                  <tr key={clearance._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {clearance.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(clearance.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={clearance.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(clearance.workflow.filter((w: any) => w.status === 'APPROVED').length / clearance.workflow.length) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/student/clearance/${clearance._id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
