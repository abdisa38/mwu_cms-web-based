import { CalendarDays, Clock } from "lucide-react";

export function ExecutiveWelcome() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, Dr. Abraham!</h2>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
          <span className="font-medium text-slate-800">University Registrar</span>
          <span className="hidden sm:block text-slate-300">•</span>
          <span className="font-medium text-slate-800">Madda Walabu University</span>
          <span className="hidden sm:block text-slate-300">•</span>
          <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1.5 text-slate-400" /> Academic Year 2023/2024 (Semester II)</span>
          <span className="hidden sm:block text-slate-300">•</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-slate-400" /> {currentDate}, {currentTime}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            8 Pending Final Approvals
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
            12 New Student Registrations Today
          </span>
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-2 w-full lg:w-auto text-right">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">System Status</p>
        <div className="flex items-center justify-end gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
          <span className="font-bold text-slate-900">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
}
