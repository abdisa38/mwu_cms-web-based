import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, Filter, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { useGetGlobalQueueQuery } from '../api/registrarApi';
import { Input } from '@/components/ui/input';

export const FinalApprovalQueuePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'PENDING';
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetGlobalQueueQuery({ 
    status: currentStatus !== 'ALL' ? currentStatus : undefined 
  });

  const queue = data?.data?.clearances || [];

  const filteredQueue = queue.filter((c: any) => 
    c.student?.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.student?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.student?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (status: string) => {
    searchParams.set('status', status);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Master Clearance Queue</h1>
          <p className="text-slate-500 mt-1">Manage final authorizations and university-wide clearance records.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {['PENDING', 'COMPLETED', 'REJECTED', 'ALL'].map((status) => (
            <button
              key={status}
              onClick={() => handleTabChange(status)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                currentStatus === status 
                  ? status === 'PENDING' ? 'border-orange-500 text-orange-600 bg-orange-50/50' : 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {status === 'PENDING' ? 'Awaiting Final Auth' : status}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input 
              placeholder="Search by student name or ID..." 
              className="pl-9 h-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">ID Number</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Initiated Date</th>
                <th className="px-6 py-4">Global Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Loading queue...
                  </td>
                </tr>
              ) : filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <p className="text-slate-500 text-lg">No records found.</p>
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item: any) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs mr-3">
                          {item.student?.firstName?.charAt(0) || 'S'}
                        </div>
                        <span className="font-medium text-slate-900">
                          {item.student?.firstName} {item.student?.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.student?.studentId}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {item.status === 'COMPLETED' && <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-semibold"><CheckCircle className="h-3 w-3 mr-1"/> Completed</span>}
                        {item.status === 'REJECTED' && <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-semibold"><XCircle className="h-3 w-3 mr-1"/> Rejected</span>}
                        {item.status === 'PENDING' && <span className="flex items-center text-orange-600 bg-orange-100 px-2 py-1 rounded text-xs font-semibold"><ShieldAlert className="h-3 w-3 mr-1"/> Pending Auth</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.status === 'PENDING' ? (
                        <Link 
                          to={`/registrar/queue/${item._id}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-md text-sm font-medium transition-colors"
                        >
                          Final Review
                        </Link>
                      ) : (
                        <Link 
                          to={`/registrar/queue/${item._id}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-md text-sm font-medium transition-colors"
                        >
                          View Log
                        </Link>
                      )}
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
