import { Server, Database, Cloud, Wifi, Cpu, HardDrive, BellRing, Mail, Activity } from "lucide-react";

export function LiveSystemStatus() {
  const systems = [
    { name: "University Network", status: "Operational", ping: "12ms", icon: Wifi, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Main Database", status: "Operational", ping: "4ms", icon: Database, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Clearance API", status: "Operational", ping: "28ms", icon: Server, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Cloud Storage", status: "Operational", ping: "45ms", icon: Cloud, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Background Jobs", status: "1 Job Queued", ping: "N/A", icon: Cpu, color: "text-amber-500", bg: "bg-amber-50" },
    { name: "Socket.IO (Live)", status: "Connected", ping: "18ms", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Email Service", status: "Operational", ping: "120ms", icon: Mail, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Push Notifications", status: "Operational", ping: "35ms", icon: BellRing, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-slate-500" />
          Live System Health
        </h3>
        <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></div>
          99.98% Uptime
        </span>
      </div>
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {systems.map((sys, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${sys.bg} ${sys.color} flex items-center justify-center`}>
                  <sys.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{sys.name}</p>
                  <p className={`text-xs ${sys.color === 'text-amber-500' ? 'text-amber-600' : 'text-emerald-600'} font-medium`}>{sys.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-mono">{sys.ping}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
