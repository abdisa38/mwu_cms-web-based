import { Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

export const DashboardLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar (Placeholder for full implementation later) */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-white font-bold text-lg tracking-tight">MWU e-Clearance</span>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Main Menu
          </div>
          {/* Navigation links will go here based on Role */}
        </div>
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.email}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role.toLowerCase()}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center md:hidden">
             {/* Mobile menu button */}
             <span className="font-bold text-slate-900">MWU System</span>
          </div>
          <div className="flex-1 flex justify-end space-x-4">
            {/* Header Actions (Notifications, Profile) */}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
