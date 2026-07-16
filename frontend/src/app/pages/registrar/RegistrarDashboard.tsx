import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { 
  Users,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileText,
  Search,
  CalendarDays,
  Bell
} from "lucide-react";

export function RegistrarDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, Registrar Manager!</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
            <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1.5 text-slate-400" /> Semester II, 2023/2024</span>
            <span className="hidden sm:block text-slate-300">•</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-slate-400" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              8 Pending Final Approvals
            </span>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none lg:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Quick search student..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
            />
          </div>
          <Link to="/registrar/approvals" className="flex-1 lg:flex-none">
            <Button className="w-full shadow-sm">Review Approvals</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Pending Final Approval</p>
          </div>
          <div className="relative z-10 flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">8</p>
            <span className="text-xs font-medium text-amber-600 flex items-center bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
              Requires Action
            </span>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Certificates Generated</p>
          </div>
          <div className="relative z-10 flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">1,245</p>
            <span className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +124 this week
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Active Students</p>
          </div>
          <div className="relative z-10 flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">8,432</p>
            <span className="text-xs font-medium text-blue-600 flex items-center bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
              Across 25 Depts
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Completed Today</p>
          </div>
          <div className="relative z-10 flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">42</p>
            <span className="text-xs font-medium text-slate-600 flex items-center bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
              System Wide
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area - Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Recent Activity Feed</h3>
              <Button variant="ghost" size="sm" className="text-blue-600 h-8">View All Activity</Button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
                {[
                  { user: 'Registrar Admin', action: 'generated a certificate for', target: 'Dawit Tadesse', time: '10 minutes ago', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { user: 'Library Officer', action: 'rejected clearance for', target: 'Sara Mohammed', time: '1 hour ago', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                  { user: 'System', action: 'sent automated reminder to', target: 'Dormitory Department', time: '2 hours ago', icon: Bell, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { user: 'Abebe Kebede', action: 'submitted new clearance request', target: '', time: '3 hours ago', icon: FileText, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { user: 'Registrar Manager', action: 'updated system settings', target: '', time: 'Yesterday', icon: CheckCircle2, color: 'text-slate-500', bg: 'bg-slate-100' },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start group">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.bg} ${item.color} shrink-0 shadow-sm z-10`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4 p-3 w-full rounded-xl border border-transparent group-hover:border-slate-100 group-hover:bg-slate-50 transition-colors">
                      <p className="text-sm text-slate-900">
                        <span className="font-semibold">{item.user}</span> {item.action} {item.target && <span className="font-semibold text-blue-600">{item.target}</span>}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/registrar/users" className="block">
                <div className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-900">Manage Users</h4>
                  </div>
                </div>
              </Link>
              
              <Link to="/registrar/certificates" className="block">
                <div className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-900">Certificate Dashboard</h4>
                  </div>
                </div>
              </Link>

              <Link to="/registrar/reports" className="block">
                <div className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-900">System Reports</h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
