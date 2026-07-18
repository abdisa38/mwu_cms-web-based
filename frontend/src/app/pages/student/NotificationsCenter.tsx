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
  Award,
  MoreVertical,
  X,
  FileText,
  ExternalLink,
  Trash2,
  Archive,
  Pin
} from "lucide-react";

export function NotificationsCenter() {
  const [activeFilter, setActiveFilter] = useState("All Notifications");
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const filters = [
    { name: "All Notifications", count: 14 },
    { name: "Unread", count: 3 },
    { name: "Approvals", count: 5 },
    { name: "Rejections", count: 2 },
    { name: "Registrar Messages", count: 1 },
    { name: "System Alerts", count: 3 }
  ];

  const notifications = [
    {
      id: "notif-1",
      type: "rejection",
      title: "Library Clearance Rejected",
      desc: "Your clearance request was rejected due to an unreturned book (Introduction to Algorithms, 3rd Edition).",
      date: "Today",
      time: "10:45 AM",
      department: "Library",
      officer: "Sarah Officer",
      priority: "high",
      isRead: false,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    },
    {
      id: "notif-2",
      type: "approval",
      title: "Dormitory Cleared Successfully",
      desc: "Your dormitory clearance has been approved. No outstanding property found.",
      date: "Today",
      time: "09:15 AM",
      department: "Dormitory",
      officer: "Abebe Kebede",
      priority: "medium",
      isRead: false,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      id: "notif-3",
      type: "system",
      title: "System Maintenance Notice",
      desc: "The e-Clearance portal will undergo scheduled maintenance this Saturday from 2:00 AM to 4:00 AM EAT.",
      date: "Yesterday",
      time: "14:30 PM",
      department: "System",
      officer: "ICT Admin",
      priority: "medium",
      isRead: false,
      icon: Megaphone,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      id: "notif-4",
      type: "approval",
      title: "Student Cafe Approved",
      desc: "Your meal card and cafeteria accounts are fully cleared.",
      date: "Yesterday",
      time: "11:20 AM",
      department: "Cafeteria",
      officer: "Helen T.",
      priority: "low",
      isRead: true,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      id: "notif-5",
      type: "document",
      title: "Document Uploaded Successfully",
      desc: "Your file 'Student_ID_Scanned.jpg' was uploaded and is pending verification.",
      date: "Oct 24, 2023",
      time: "16:45 PM",
      department: "System",
      officer: "Auto-System",
      priority: "low",
      isRead: true,
      icon: FileText,
      color: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200"
    },
    {
      id: "notif-6",
      type: "alert",
      title: "Security Alert: New Login",
      desc: "We noticed a new login to your MWU account from Chrome on Windows (Addis Ababa).",
      date: "Oct 23, 2023",
      time: "08:12 AM",
      department: "Security",
      officer: "System Admin",
      priority: "high",
      isRead: true,
      icon: ShieldAlert,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    }
  ];

  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Notifications</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Notification Center
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">3 New</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Check className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Mark All Read</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Settings className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Preferences</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <RefreshCw className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">Total Notifications</p>
            <Bell className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-3xl font-bold text-slate-900">14</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">Unread</p>
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-1"></div>
          </div>
          <p className="text-3xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">High Priority</p>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">2</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-slate-500">This Week</p>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-3xl font-bold text-slate-900">8</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hidden lg:block">
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
          
          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm p-5 text-white hidden lg:block">
            <Megaphone className="w-6 h-6 text-blue-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">System Notice</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Clearance deadline for graduating students is fast approaching. Ensure all documents are submitted.
            </p>
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 border-0">View Details</Button>
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
                placeholder="Search notifications..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            </div>
            <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
              Showing {notifications.length} notifications
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Grouped by Date (Mocking logic for design) */}
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
                    
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {notif.department}
                      </span>
                      {notif.priority === 'high' && (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
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
                    
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                        {notif.department}
                      </span>
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
          <div className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl border-l border-slate-200 z-30 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
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
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {selectedNotification.department}
                        </span>
                        {selectedNotification.priority === 'high' && (
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            Critical Alert
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedNotification.title}</h2>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedNotification.desc}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Metadata</h4>
                    
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1">Date</p>
                        <p className="font-medium text-slate-900">{selectedNotification.date}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Time</p>
                        <p className="font-medium text-slate-900">{selectedNotification.time}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Officer</p>
                        <p className="font-medium text-slate-900">{selectedNotification.officer}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Reference</p>
                        <p className="font-mono text-xs text-blue-600 font-medium">REQ-2024-8932</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-col gap-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm"
                    onClick={() => {
                      if (selectedNotification.type === 'rejection' || selectedNotification.type === 'approval') {
                        navigate('/student/clearance');
                      } else if (selectedNotification.type === 'document') {
                        navigate('/student/documents');
                      }
                    }}
                  >
                    View Related Clearance Request
                  </Button>
                  <Button variant="outline" className="w-full bg-white border-slate-300 text-slate-700">
                    <HelpCircle className="w-4 h-4 mr-2" /> Contact Support
                  </Button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// Temporary icon fix for missing lucide import in the drawer
function Mail(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
