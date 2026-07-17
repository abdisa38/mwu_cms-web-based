import { Outlet, Link, useLocation } from "react-router";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import mwuLogo from "../../../imports/download.jfif";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Award, 
  Building2, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  Moon,
  UserCheck,
  Clock,
  ShieldCheck,
  Archive,
  XCircle
} from "lucide-react";
import { useState } from "react";

export function RegistrarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/registrar" },
    { icon: UserCheck, label: "Student Verification", path: "/registrar/verification", badge: 14 },
    { icon: Clock, label: "Pending Clearances", path: "/registrar/pending", badge: 24 },
    { icon: CheckSquare, label: "Final Approval", path: "/registrar/approvals", badge: 8 },
    { icon: Archive, label: "Completed Clearances", path: "/registrar/completed" },
    { icon: XCircle, label: "Rejected Clearances", path: "/registrar/rejected", badge: 3 },
    { icon: Users, label: "User Management", path: "/registrar/users" },
    { icon: Award, label: "Certificates", path: "/registrar/certificates" },
    { icon: Building2, label: "Departments", path: "/registrar/departments" },
    { icon: ShieldCheck, label: "Audit Logs", path: "/registrar/audit-logs" },
    { icon: BarChart3, label: "Reports", path: "/registrar/reports" },
    { icon: MessageSquare, label: "Messages", path: "/registrar/messages", badge: 2 },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "System Settings", path: "/registrar/settings" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-[#0F172A] text-slate-300 transition-all duration-300 ease-in-out z-20 shadow-2xl`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-[#0B1120]">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-8 h-8 rounded-md object-contain bg-white p-0.5" />
            {sidebarOpen && <span className="font-bold text-white truncate">MWU Admin</span>}
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="flex justify-center p-2 mb-4 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-2">
            {sidebarOpen ? 'Registrar Operations' : '•••'}
          </div>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== "/registrar");
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center ${sidebarOpen ? 'px-3' : 'justify-center'} py-2.5 rounded-lg transition-colors group relative ${
                  isActive 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                {sidebarOpen && (
                  <>
                    <span className="ml-3 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-blue-500 text-white py-0.5 px-2 rounded-full text-xs font-bold shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg font-medium">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
              {sidebarOpen ? 'Administration' : '•••'}
            </div>
            {bottomNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center ${sidebarOpen ? 'px-3' : 'justify-center'} py-2.5 rounded-lg transition-colors group relative ${
                    isActive 
                      ? 'bg-blue-600 text-white font-medium shadow-sm' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  {sidebarOpen && <span className="ml-3 truncate">{item.label}</span>}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg font-medium">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
            <button className={`flex items-center ${sidebarOpen ? 'px-3' : 'justify-center'} py-2.5 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors group relative mt-1`}>
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3 font-medium">Log out</span>}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg font-medium">
                  Log out
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 hover:text-slate-700">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-slate-900 hidden sm:block leading-tight">
                {navItems.find(i => location.pathname === i.path || (location.pathname.startsWith(i.path) && i.path !== "/registrar"))?.label || bottomNavItems.find(i => i.path === location.pathname)?.label || "Registrar Dashboard"}
              </h1>
              <div className="text-xs text-slate-500 hidden sm:flex items-center gap-2 font-medium">
                <span>Registrar Office</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-blue-600">Semester II, 2023/24</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden lg:flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none w-64 transition-all"
              />
            </div>
            
            <div className="hidden xl:flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-300">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Madda Walabu University</span>
              <span className="text-xs text-slate-400 ml-1">▼</span>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex">
              <Moon className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="w-px h-6 bg-slate-200 mx-1 sm:mx-2 hidden sm:block"></div>
            
            <button className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors border border-transparent hover:border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                RM
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-slate-900 leading-none">Registrar Manager</span>
                <span className="text-xs text-slate-500 mt-0.5">Admin</span>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
