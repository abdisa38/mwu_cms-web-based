import { Bell, AlertTriangle, ShieldAlert, Building2, MessageSquare, Megaphone } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function LiveNotificationsCenter() {
  const notifications = [
    { type: 'System Alert', message: 'API Response Time Degraded (>500ms)', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', time: '5m ago' },
    { type: 'Security Alert', message: 'Multiple failed login attempts from IP 192.168.1.5', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50', time: '15m ago' },
    { type: 'Department Alert', message: 'Library Department has 45 overdue requests SLA breached.', icon: Building2, color: 'text-orange-500', bg: 'bg-orange-50', time: '1h ago' },
    { type: 'Message', message: 'New unread message from Officer Kebede (Sports)', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50', time: '2h ago' },
    { type: 'Announcement', message: 'Maintenance scheduled for tonight at 2:00 AM.', icon: Megaphone, color: 'text-indigo-500', bg: 'bg-indigo-50', time: '4h ago' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-500" />
          Live Notifications
        </h3>
        <span className="bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-xs font-bold shadow-sm animate-pulse">
          3 Unread
        </span>
      </div>
      
      <div className="p-0 flex-1 overflow-auto">
        <ul className="divide-y divide-slate-100">
          {notifications.map((notif, idx) => (
            <li key={idx} className={`p-4 hover:bg-slate-50 transition-colors ${idx < 3 ? 'bg-slate-50/50' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <notif.icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-sm">{notif.type}</span>
                    <span className="text-xs text-slate-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-center flex gap-2">
        <Button variant="outline" size="sm" className="w-full bg-white hover:bg-slate-100">
          Mark All Read
        </Button>
        <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:bg-blue-50">
          View All Center
        </Button>
      </div>
    </div>
  );
}
