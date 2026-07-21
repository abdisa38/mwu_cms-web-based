import { Bell, Menu, Search, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '@/store/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      
      {/* Left side (Mobile Menu & Search) */}
      <div className="flex items-center flex-1 space-x-4">
        <button className="md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md">
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden sm:flex max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Global search..." 
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-slate-300 w-full rounded-full h-9"
          />
        </div>
      </div>

      {/* Right side (Notifications & Logout) */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>

    </header>
  );
};
