import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Users, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useGetStaffDashboardStatsQuery, useGetDepartmentQueueQuery } from '../api/staffApi';

export const StaffDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const { data: statsData, isLoading: statsLoading } = useGetStaffDashboardStatsQuery();
  const { data: queueData, isLoading: queueLoading } = useGetDepartmentQueueQuery({ status: 'PENDING', limit: 5 });

  const stats = statsData?.data || { pending: 0, approvedToday: 0, rejectedToday: 0, totalProcessed: 0 };
  const pendingRequests = queueData?.data?.clearances || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Department Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome, {user?.firstName}. Here's the current clearance queue for {user?.department || 'your department'}.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Review</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.pending}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Approved Today</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.approvedToday}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Rejected Today</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.rejectedToday}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Processed (Term)</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.totalProcessed}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content: Action Required */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Requires Attention</h2>
              <Link to="/staff/queue" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                View Queue <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100">
              {queueLoading ? (
                <div className="p-8 text-center text-slate-500">Loading queue...</div>
              ) : pendingRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">All Caught Up!</h3>
                  <p className="text-slate-500 mt-1">There are no pending requests requiring your attention right now.</p>
                </div>
              ) : (
                pendingRequests.map((request: any) => (
                  <div key={request._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-700 font-bold">
                        {request.student?.firstName?.charAt(0) || 'S'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {request.student?.firstName} {request.student?.lastName}
                        </h4>
                        <p className="text-sm text-slate-500">ID: {request.student?.studentId} • {request.type.replace('_', ' ')}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Submitted on {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link 
                        to={`/staff/queue/${request._id}`}
                        className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Review Request
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/staff/queue?status=PENDING" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <span className="font-medium text-slate-700 group-hover:text-blue-700">Review Pending Queue</span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
              </Link>
              <Link to="/staff/students" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <span className="font-medium text-slate-700 group-hover:text-blue-700">Search Students</span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
              </Link>
              <Link to="/staff/reports" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <span className="font-medium text-slate-700 group-hover:text-blue-700">Generate Reports</span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-6 text-white">
            <h2 className="text-lg font-bold mb-2">Department Guidelines</h2>
            <p className="text-sm text-slate-300 mb-4">
              Remember to verify all original documents and check the physical items (books, sports gear, keys) before approving a clearance request.
            </p>
            <a href="#" className="text-sm font-medium text-blue-300 hover:text-blue-200 underline">Read full policy</a>
          </div>
        </div>

      </div>
    </div>
  );
};
