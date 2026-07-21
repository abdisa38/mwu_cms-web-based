import { Outlet } from 'react-router';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">MWU</span>
            </div>
            <span className="font-semibold text-slate-900 text-lg">
              e-Clearance System
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Madda Walabu University. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
