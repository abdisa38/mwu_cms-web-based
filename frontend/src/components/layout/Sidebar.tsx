import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  LayoutDashboard, FileText, FileBadge, 
  Settings, MessageSquare, Bell, User,
  ShieldCheck, Users, Activity, CheckSquare
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const getNavConfig = (role: string): NavItem[] => {
  switch (role) {
    case 'STUDENT':
      return [
        { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
        { name: 'My Clearances', href: '/student/clearances', icon: FileText },
        { name: 'My Documents', href: '/student/documents', icon: FileText },
        { name: 'My Certificates', href: '/student/certificates', icon: FileBadge },
      ];
    case 'OFFICER':
    case 'DEPARTMENT_HEAD':
      return [
        { name: 'Dashboard', href: '/staff/dashboard', icon: LayoutDashboard },
        { name: 'Clearance Queue', href: '/staff/queue', icon: CheckSquare },
        { name: 'Students', href: '/staff/students', icon: Users },
        { name: 'Reports', href: '/staff/reports', icon: Activity },
      ];
    case 'REGISTRAR':
    case 'SUPER_ADMIN':
      return [
        { name: 'Dashboard', href: '/registrar/dashboard', icon: LayoutDashboard },
        { name: 'Final Approvals', href: '/registrar/queue', icon: ShieldCheck },
        { name: 'Certificates', href: '/registrar/certificates', icon: FileBadge },
        { name: 'Staff Management', href: '/registrar/staff', icon: Users },
        { name: 'System Settings', href: '/registrar/settings', icon: Settings },
      ];
    default:
      return [];
  }
};

const commonNav: NavItem[] = [
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) return null;

  const roleNav = getNavConfig(user.role);

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">MWU CMS</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
        {/* Role Specific Nav */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {roleNav.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Common Nav */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Account
          </p>
          {commonNav.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Info Bottom */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-slate-500 truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
