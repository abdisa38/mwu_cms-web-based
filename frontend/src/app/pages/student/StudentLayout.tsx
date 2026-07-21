import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mwuLogo from "@/imports/download.jfif";
import { Button } from "@/app/components/ui/Button";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  LayoutDashboard, 
  FileCheck2, 
  PlusCircle, 
  FolderOpen, 
  MessageSquare, 
  Award, 
  User, 
  Settings, 
  LogOut,
  Menu,
  Moon
} from "lucide-react";
import { useState } from "react";

export function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
    { icon: FileCheck2, label: "My Clearance", path: "/student/clearance" },
    { icon: PlusCircle, label: "Start New Clearance", path: "/student/new-clearance" },
    { icon: FolderOpen, label: "My Documents", path: "/student/documents" },
    { icon: Bell, label: "Notifications", path: "/student/notifications", badge: 3 },
    { icon: MessageSquare, label: "Messages", path: "/student/messages" },
    { icon: Award, label: "Certificate", path: "/student/certificate" },
  ];

  const bottomNavItems = [
    { icon: User, label: "Profile", path: "/student/profile" },
    { icon: Settings, label: "Settings", path: "/student/settings" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-8 h-8 rounded-md object-contain" />
            {sidebarOpen && <span className="font-bold text-slate-900 truncate">MWU Student</span>}
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="flex justify-center p-2 mb-4 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-2">
            {sidebarOpen ? 'Menu' : '•••'}
          </div>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center ${sidebarOpen ? 'px-3' : 'justify-center'} py-2.5 rounded-lg transition-colors group relative ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {sidebarOpen && (
                  <>
                    <span className="ml-3 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="mt-auto pt-4 border-t border-slate-200 flex flex-col gap-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
              {sidebarOpen ? 'Account' : '•••'}
            </div>
            {bottomNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center ${sidebarOpen ? 'px-3' : 'justify-center'} py-2.5 rounded-lg transition-colors group relative ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {sidebarOpen && <span className="ml-3 truncate">{item.label}</span>}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
            <button onClick={() => navigate('/login')} className={`flex items-center ${sidebarOpen ? 'px-3' : 'justify-center'} py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors group relative mt-1`}>
              <LogOut className="w-5 h-5 text-red-500" />
              {sidebarOpen && <span className="ml-3 font-medium">Log out</span>}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Log out
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 hover:text-slate-700">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-900 hidden sm:block">
              {navItems.find(i => i.path === location.pathname)?.label || bottomNavItems.find(i => i.path === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden lg:flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none w-64 transition-all"
              />
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
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                JD
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-slate-900 leading-none">John Doe</span>
                <span className="text-xs text-slate-500 mt-0.5">UGR/1234/12</span>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Bottom Navigation (optional, just showing layout intention) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-50">
        <Link to="/student" className="flex flex-col items-center p-2 text-blue-600">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/student/clearance" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600">
          <FileCheck2 className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Clearance</span>
        </Link>
        <Link to="/student/new-clearance" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600">
          <div className="bg-blue-600 text-white rounded-full p-2 -mt-6 shadow-md border-4 border-slate-50">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] mt-1 font-medium">New</span>
        </Link>
        <Link to="/student/notifications" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-[10px] mt-1 font-medium">Alerts</span>
        </Link>
        <Link to="/student/profile" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600">
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
