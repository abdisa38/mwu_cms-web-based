import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { 
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Users,
  Bell
} from "lucide-react";

export function OfficerDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, Sarah!</h2>
          <p className="text-slate-600 mb-4">Library Officer • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
              <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></span>
              12 High Priority
            </span>
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              45 Total Pending
            </span>
          </div>
        </div>
        <div className="relative z-10 flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none bg-white">
            <Download className="w-4 h-4 mr-2" /> Report
          </Button>
          <Link to="/officer/pending" className="flex-1 md:flex-none">
            <Button className="w-full">Review Queue</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Pending Requests</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">45</p>
            <span className="text-xs font-medium text-red-600 flex items-center bg-red-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +12 today
            </span>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Approved Today</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">128</p>
            <span className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +24%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Rejected Today</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">14</p>
            <span className="text-xs font-medium text-slate-500 flex items-center bg-slate-100 px-2 py-0.5 rounded-full">
              Normal rate
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Avg Process Time</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-slate-900">4.2<span className="text-lg text-slate-500 font-medium ml-1">hrs</span></p>
            <span className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
              -1.5 hrs
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area - Priority Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                Priority Queue
              </h3>
              <Link to="/officer/pending" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Student</th>
                    <th className="px-6 py-3 font-medium">ID / Dept</th>
                    <th className="px-6 py-3 font-medium">Time Waiting</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "Abebe Kebede", id: "UGR/4321/11", dept: "Computer Science", time: "2 days", avatar: "AK" },
                    { name: "Sara Mohammed", id: "UGR/5432/12", dept: "Software Eng", time: "1 day", avatar: "SM" },
                    { name: "Dawit Tadesse", id: "UGR/6543/11", dept: "Information Sys", time: "18 hours", avatar: "DT" },
                    { name: "Betelhem Alemu", id: "UGR/7654/12", dept: "Computer Science", time: "12 hours", avatar: "BA" },
                  ].map((student, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {student.avatar}
                          </div>
                          <span className="font-medium text-slate-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{student.id}</span>
                          <span className="text-xs text-slate-500">{student.dept}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center text-red-600 font-medium text-xs bg-red-50 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3 mr-1" /> {student.time}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline" className="bg-white">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search student ID..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <Button variant="outline" className="w-full justify-start text-left bg-slate-50 hover:bg-slate-100 border-slate-200 shadow-none h-11">
                <Users className="w-4 h-4 mr-3 text-slate-500" />
                Bulk Approval
              </Button>
              <Button variant="outline" className="w-full justify-start text-left bg-slate-50 hover:bg-slate-100 border-slate-200 shadow-none h-11">
                <Filter className="w-4 h-4 mr-3 text-slate-500" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* System Announcements */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-900">System Announcements</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-blue-600"><Bell className="w-4 h-4" /></div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Graduation Deadline Approaching</p>
                    <p className="text-xs text-blue-700">Please prioritize 4th-year students as the graduation deadline is next week.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-4 border-l-2 border-slate-200 space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">System Maintenance</p>
                  <p className="text-xs text-slate-500 mt-0.5">Scheduled for Saturday, 2:00 AM</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New Policy Update</p>
                  <p className="text-xs text-slate-500 mt-0.5">Library fine rules have been updated.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// trigger HMR 2
