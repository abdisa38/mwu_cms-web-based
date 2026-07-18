import { Bell, Mail, Smartphone, History, ShieldAlert } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { mockAuditLogs } from "../../data/mockData";

export function NotificationsAuditTab() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Notifications Config */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" /> Notification Triggers
            </h3>
            <p className="text-sm text-slate-500 mt-1">Configure automated communications for this workflow.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900">Clearance Initiated</div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 px-2 text-xs bg-indigo-50 text-indigo-700 border-indigo-200"><Mail className="w-3.5 h-3.5 mr-1" /> Email</Button>
                <Button variant="outline" className="h-8 px-2 text-xs bg-slate-50 text-slate-400 border-slate-200 line-through"><Smartphone className="w-3.5 h-3.5 mr-1" /> SMS</Button>
              </div>
            </div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900">Department Approved</div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 px-2 text-xs bg-slate-50 text-slate-400 border-slate-200 line-through"><Mail className="w-3.5 h-3.5 mr-1" /> Email</Button>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between bg-red-50">
              <div className="font-bold text-sm text-red-900">Clearance Rejected</div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 px-2 text-xs bg-indigo-50 text-indigo-700 border-indigo-200"><Mail className="w-3.5 h-3.5 mr-1" /> Email</Button>
                <Button variant="outline" className="h-8 px-2 text-xs bg-indigo-50 text-indigo-700 border-indigo-200"><Smartphone className="w-3.5 h-3.5 mr-1" /> SMS</Button>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">Manage Message Templates</Button>
        </div>

        {/* Local Audit Log */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-600" /> Version Audit Trail
            </h3>
            <p className="text-sm text-slate-500 mt-1">Changes made specifically to this Clearance Type.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-400"></div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">{log.action}</h4>
                    <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-slate-600 mb-2">By <span className="font-bold">{log.userName}</span> ({log.role})</div>
                  <div className="bg-slate-50 rounded p-2 text-xs text-slate-700 italic border border-slate-100">
                    "{log.reason}"
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
