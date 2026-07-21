import { useEffect } from 'react';
import { Link } from 'react-router';
import { FileText, Bell, Clock, FileCheck } from 'lucide-react';
import { useGetStudentDashboardStatsQuery, useGetMyClearancesQuery } from '../api/studentApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressTracker } from '../components/ProgressTracker';

export const StudentDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Fetch stats and active clearances
  const { data: stats, isLoading: statsLoading } = useGetStudentDashboardStatsQuery();
  const { data: clearances, isLoading: clearancesLoading } = useGetMyClearancesQuery();

  const activeClearance = clearances?.data?.clearances?.find((c: any) => c.status !== 'COMPLETED');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.firstName || user?.email}</h1>
          <p className="text-slate-500 mt-1">Here is an overview of your clearance status.</p>
        </div>
        <Link 
          to="/student/clearance/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Start New Clearance
        </Link>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Requests</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.data?.activeRequests || 0}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <FileCheck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Approved Departments</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.data?.approvedCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.data?.pendingCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Bell className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Unread Notifications</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.data?.unreadNotifications || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Current Clearance Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Current Clearance Progress</h2>
              {activeClearance && <StatusBadge status={activeClearance.status} />}
            </div>
            <div className="p-6">
              {clearancesLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-20 bg-slate-200 rounded"></div>
                </div>
              ) : activeClearance ? (
                <ProgressTracker stages={activeClearance.workflow || []} />
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900">No Active Clearance</h3>
                  <p className="text-slate-500 mt-1 mb-6">You don't have any ongoing clearance requests.</p>
                  <Link 
                    to="/student/clearance/new" 
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Initiate Clearance
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Notifications Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Notifications</h2>
              <Link to="/notifications" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="p-0">
              {/* Notification Items would go here */}
              <div className="p-4 border-b border-slate-100">
                <p className="text-sm text-slate-800 font-medium">Library Approved your request.</p>
                <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-800 font-medium">You have a new message from Registrar.</p>
                <p className="text-xs text-slate-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
