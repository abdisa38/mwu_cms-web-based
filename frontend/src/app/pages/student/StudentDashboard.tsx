import { Link } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  ChevronRight, 
  Download,
  AlertCircle,
  MessageSquare
} from "lucide-react";

export function StudentDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, John!</h2>
          <p className="text-slate-600 mb-4">Computer Science • Year 4 • UGR/1234/12</p>
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Clearance In Progress
          </div>
        </div>
        <div className="relative z-10 flex gap-3 w-full md:w-auto">
          <Link to="/student/new-clearance" className="flex-1 md:flex-none">
            <Button className="w-full">Resume Clearance</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Steps</p>
            <p className="text-2xl font-bold text-slate-900">8</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Approved</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-slate-900">4</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Rejected</p>
            <p className="text-2xl font-bold text-slate-900">1</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Required Banner */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Action Required: Library Department</h4>
              <p className="text-sm text-red-700 mb-3">Your clearance request was rejected because of unreturned books (Introduction to Algorithms).</p>
              <Button variant="danger" size="sm" className="bg-red-600 hover:bg-red-700">View Details</Button>
            </div>
          </div>

          {/* Progress Timeline Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Clearance Progress</h3>
              <span className="text-sm font-medium text-blue-600">37% Complete</span>
            </div>
            <div className="p-6">
              <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37%' }}></div>
              </div>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {[
                  { status: 'approved', dept: 'Student Cafe', date: 'Today, 10:45 AM', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { status: 'approved', dept: 'Sports Department', date: 'Yesterday, 02:15 PM', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { status: 'rejected', dept: 'Library', date: 'Yesterday, 11:30 AM', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                  { status: 'pending', dept: 'Dormitory', date: 'Pending Review', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { status: 'waiting', dept: 'Registrar', date: 'Waiting for others', icon: Clock, color: 'text-slate-400', bg: 'bg-slate-100' },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.bg} ${item.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-slate-900">{item.dept}</h4>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.bg} ${item.color}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-200 p-4 bg-slate-50/50 text-center">
              <Link to="/student/clearance" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center">
                View Full Timeline <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left bg-slate-50 hover:bg-slate-100 border-slate-200 shadow-none">
                <FileText className="w-4 h-4 mr-3 text-slate-500" />
                Submit New Document
              </Button>
              <Button variant="outline" className="w-full justify-start text-left bg-slate-50 hover:bg-slate-100 border-slate-200 shadow-none">
                <MessageSquare className="w-4 h-4 mr-3 text-slate-500" />
                Contact Support
              </Button>
              <Button variant="outline" disabled className="w-full justify-start text-left bg-slate-50 border-slate-200 shadow-none opacity-50">
                <Download className="w-4 h-4 mr-3 text-slate-500" />
                Download Certificate
              </Button>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-900">Recent Updates</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Sports Department Approved</p>
                  <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Library Request Rejected</p>
                  <p className="text-xs text-slate-500 mt-0.5">Yesterday</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-slate-300 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Clearance Initiated</p>
                  <p className="text-xs text-slate-500 mt-0.5">Oct 24, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
