import { Link } from 'react-router';
import { ShieldCheck, Activity, Users, FileBadge, ArrowRight, AlertTriangle } from 'lucide-react';
import { useGetRegistrarDashboardStatsQuery, useGetGlobalQueueQuery } from '../api/registrarApi';

export const RegistrarDashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useGetRegistrarDashboardStatsQuery();
  const { data: queueData, isLoading: queueLoading } = useGetGlobalQueueQuery({ status: 'PENDING', limit: 5 });

  const stats = statsData?.data || { pendingFinal: 0, completedToday: 0, totalStudents: 0, activeStaff: 0 };
  const pendingRequests = queueData?.data?.clearances || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrar Dashboard</h1>
          <p className="text-slate-500 mt-1">Super Admin overview and final approval center.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Final Auth</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.pendingFinal}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <FileBadge className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Certificates Today</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.completedToday}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Enrolled Students</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.totalStudents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Staff Users</p>
            <p className="text-2xl font-bold text-slate-900">{statsLoading ? '-' : stats.activeStaff}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content: Pending Final Approvals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-orange-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                Awaiting Final Authorization
              </h2>
              <Link to="/registrar/queue" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100">
              {queueLoading ? (
                <div className="p-8 text-center text-slate-500">Loading queue...</div>
              ) : pendingRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Queue Empty</h3>
                  <p className="text-slate-500 mt-1">There are no clearances awaiting final registrar authorization.</p>
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
                        <p className="text-xs text-green-600 font-medium mt-1">
                          ✓ Passed all department workflows
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link 
                        to={`/registrar/queue/${request._id}`}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
                      >
                        Final Review
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
            <h2 className="text-lg font-bold text-slate-900 mb-4">Admin Quick Links</h2>
            <div className="space-y-3">
              <Link to="/registrar/staff" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <span className="font-medium text-slate-700 group-hover:text-blue-700">Manage Staff & Users</span>
                <Users className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
              </Link>
              <Link to="/registrar/certificates" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <span className="font-medium text-slate-700 group-hover:text-blue-700">Certificate Registry</span>
                <FileBadge className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
              </Link>
              <Link to="/registrar/settings" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <span className="font-medium text-slate-700 group-hover:text-blue-700">System Settings</span>
                <Activity className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
