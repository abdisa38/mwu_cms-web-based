import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { 
  ChevronRight, 
  Search, 
  Check, 
  Settings, 
  RefreshCw, 
  HelpCircle,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Megaphone,
  Download,
  MoreVertical,
  X,
  FileText,
  ExternalLink,
  Trash2,
  Archive,
  CornerUpLeft,
  Mail,
  User,
  Filter,
  Scale
} from "lucide-react";

export function OfficerNotifications() {
  const [activeFilter, setActiveFilter] = useState("All Notifications");
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const filters = [
    { name: "All Notifications", count: 24 },
    { name: "Unread", count: 5 },
    { name: "Approvals", count: 8 },
    { name: "Rejections", count: 3 },
    { name: "Appeals", count: 2 },
    { name: "Student Messages", count: 4 },
    { name: "System Alerts", count: 2 }
  ];

  const notifications = [
    {
      id: "notif-1",
      type: "appeal",
      title: "New Appeal Submitted",
      desc: "Dawit Tadesse (UGR/6543/11) has submitted an appeal for a rejected clearance.",
      date: "Today",
      time: "10:45 AM",
      student: "Dawit Tadesse",
      studentId: "UGR/6543/11",
      priority: "high",
      isRead: false,
      icon: Scale,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      reqId: "REQ-2024-8850"
    },
    {
      id: "notif-2",
      type: "request",
      title: "New Clearance Request",
      desc: "A new clearance request is waiting for Library approval.",
      date: "Today",
      time: "09:15 AM",
      student: "Sara Mohammed",
      studentId: "UGR/5432/12",
      priority: "medium",
      isRead: false,
      icon: Bell,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      reqId: "REQ-2024-8915"
    },
    {
      id: "notif-3",
      type: "system",
      title: "System Maintenance Notice",
      desc: "The e-Clearance portal will undergo scheduled maintenance this Saturday from 2:00 AM to 4:00 AM EAT.",
      date: "Yesterday",
      time: "14:30 PM",
      student: "System",
      studentId: "Admin",
      priority: "low",
      isRead: true,
      icon: Megaphone,
      color: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200"
    },
    {
      id: "notif-4",
      type: "approval",
      title: "Request Automatically Approved",
      desc: "Student was automatically cleared as they have no outstanding records.",
      date: "Yesterday",
      time: "11:20 AM",
      student: "John Doe",
      studentId: "UGR/1234/12",
      priority: "low",
      isRead: true,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      reqId: "REQ-2024-8932"
    },
    {
      id: "notif-5",
      type: "document",
      title: "New Document Uploaded",
      desc: "Betelhem Alemu uploaded a new 'Book_Return_Receipt.pdf'.",
      date: "Oct 24, 2023",
      time: "16:45 PM",
      student: "Betelhem Alemu",
      studentId: "UGR/7654/12",
      priority: "medium",
      isRead: true,
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      reqId: "REQ-2024-8750"
    },
    {
      id: "notif-6",
      type: "alert",
      title: "Overdue SLA Warning",
      desc: "Request REQ-2024-8901 has exceeded the 5-day review SLA. Please process immediately.",
      date: "Oct 23, 2023",
      time: "08:12 AM",
      student: "Abebe Kebede",
      studentId: "UGR/4321/11",
      priority: "critical",
      isRead: true,
      icon: ShieldAlert,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      reqId: "REQ-2024-8901"
    }
  ];

  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsDrawerOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Notifications</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Notification Center
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">5 New</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Check className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Mark All Read</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Settings className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Settings</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Export</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">Total Updates</p>
            <Bell className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900">24</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">Unread</p>
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-1"></div>
          </div>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">High Priority</p>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">2</p>
        </div>
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-amber-800">Appeal Alerts</p>
            <Scale className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-700">2</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:col-span-2">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">Registrar Announcements</p>
            <Megaphone className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-lg font-bold text-slate-900 truncate">1 New Notice Available</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hidden lg:block sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Filters</h3>
            <ul className="space-y-1">
              {filters.map((filter) => (
                <li key={filter.name}>
                  <button 
                    onClick={() => setActiveFilter(filter.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeFilter === filter.name 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate">{filter.name}</span>
                    {filter.count > 0 && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        activeFilter === filter.name ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {filter.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Notification List */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px] relative">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 sticky top-0 z-10">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search notifications, students, or IDs..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white border-slate-200 shadow-sm hidden sm:flex">
                <Filter className="w-4 h-4 mr-2" /> Advanced
              </Button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Grouped by Date */}
            <div className="px-6 py-2 bg-slate-100/50 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today</h3>
            </div>
            
            <div className="divide-y divide-slate-100">
              {notifications.slice(0, 2).map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`group p-4 sm:p-6 flex items-start gap-4 cursor-pointer transition-colors ${notif.isRead ? 'hover:bg-slate-50' : 'bg-blue-50/30 hover:bg-blue-50/60'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${notif.bg} ${notif.color} ${notif.border}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                      <h4 className={`text-base font-semibold truncate pr-4 ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-3 ${notif.isRead ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>
                      {notif.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      {notif.student !== "System" && (
                        <span className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          <User className="w-3 h-3 mr-1" /> {notif.student} ({notif.studentId})
                        </span>
                      )}
                      {notif.priority === 'high' && (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0 h-full justify-between">
                    {!notif.isRead && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm ring-4 ring-blue-100"></div>
                    )}
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-2 bg-slate-100/50 border-y border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yesterday & Older</h3>
            </div>
            
            <div className="divide-y divide-slate-100">
              {notifications.slice(2).map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`group p-4 sm:p-6 flex items-start gap-4 cursor-pointer transition-colors hover:bg-slate-50`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${notif.bg} ${notif.color} ${notif.border} opacity-80`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                      <h4 className="text-base font-medium text-slate-700 truncate pr-4">
                        {notif.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">
                        {notif.date}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {notif.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      {notif.student !== "System" && (
                        <span className="inline-flex items-center text-[10px] font-medium text-slate-500 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {notif.student}
                        </span>
                      )}
                      {notif.priority === 'critical' && (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white bg-red-600 px-1.5 py-0.5 rounded shadow-sm">
                          Critical Alert
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Overlay to darken list when drawer is open */}
          {isDrawerOpen && (
            <div 
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] z-20 transition-opacity lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Right Detail Drawer */}
          <div className={`absolute top-0 right-0 h-full w-full sm:w-[400px] lg:w-[450px] bg-white shadow-2xl border-l border-slate-200 z-30 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {selectedNotification && (
              <>
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 sticky top-0">
                  <h3 className="font-semibold text-slate-900">Notification Details</h3>
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" title="Mark as unread">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="mb-6 flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-sm ${selectedNotification.bg} ${selectedNotification.color} ${selectedNotification.border}`}>
                      <selectedNotification.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex gap-2 mb-2">
                        {selectedNotification.priority === 'high' && (
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded shadow-sm">
                            High Priority
                          </span>
                        )}
                        {selectedNotification.priority === 'critical' && (
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white bg-red-600 border border-red-700 px-2 py-0.5 rounded shadow-sm">
                            Critical Action Required
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedNotification.title}</h2>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedNotification.desc}
                    </p>
                  </div>

                  {selectedNotification.student !== "System" && (
                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Student Context</h4>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                            {selectedNotification.student.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{selectedNotification.student}</p>
                            <p className="text-xs font-medium text-slate-500">{selectedNotification.studentId}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white shadow-sm h-8 hidden sm:flex">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Event Metadata</h4>
                    
                    <div className="grid grid-cols-2 gap-y-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <p className="text-slate-500 mb-1 text-xs">Date</p>
                        <p className="font-medium text-slate-900">{selectedNotification.date}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 text-xs">Time</p>
                        <p className="font-medium text-slate-900">{selectedNotification.time}</p>
                      </div>
                      {selectedNotification.reqId && (
                        <div className="col-span-2 pt-3 border-t border-slate-200 mt-1">
                          <p className="text-slate-500 mb-1 text-xs">Related Request Reference</p>
                          <Link to="/officer/pending" className="font-mono text-sm text-blue-600 font-bold hover:underline flex items-center">
                            {selectedNotification.reqId} <ExternalLink className="w-3.5 h-3.5 ml-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dynamic Footer Actions */}
                <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-3">
                  {selectedNotification.type === 'appeal' || selectedNotification.type === 'request' || selectedNotification.type === 'alert' ? (
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm h-11"
                      onClick={() => navigate(selectedNotification.type === 'appeal' ? '/officer/rejected' : '/officer/pending')}
                    >
                      Open Action Workspace
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full bg-white border-slate-300 text-slate-700 shadow-sm h-11">
                      <Archive className="w-4 h-4 mr-2" /> Archive Notice
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
