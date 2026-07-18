import { useState } from "react";
import { Activity, Database, AlertTriangle, RefreshCw, Archive, Settings, Trash2 } from "lucide-react";
import { SystemHealthMetric, BackupRecord } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface Props {
  healthData: SystemHealthMetric[];
  backups: BackupRecord[];
  onTriggerDangerousAction: (actionName: string) => void;
}

export function SystemHealthTab({ healthData, backups, onTriggerDangerousAction }: Props) {

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      
      {/* System Health Dashboard */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">System Health</h2>
          </div>
          <Button variant="outline" className="h-8 text-xs bg-white gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Run Checks
          </Button>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-slate-100">
              {healthData.map((metric, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{metric.service}</div>
                  </td>
                  <td className="p-4">
                    {metric.status === "Operational" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
                        Operational
                      </span>
                    ) : metric.status === "Degraded" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700">
                        Degraded
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-700">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-mono text-right">
                    {metric.responseTime}
                  </td>
                  <td className="p-4 text-xs font-bold text-slate-700 text-right">
                    {metric.uptime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Backup & Recovery */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Backup & Recovery</h2>
          </div>
          <Button variant="primary" className="h-8 text-xs gap-2">
            <Archive className="w-3.5 h-3.5" /> Create Backup Now
          </Button>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 font-semibold">Backup ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Size</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backups.map((bkp) => (
                <tr key={bkp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-xs font-mono">{bkp.id}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{new Date(bkp.date).toLocaleString()}</td>
                  <td className="p-4 text-sm text-slate-600">{bkp.size}</td>
                  <td className="p-4 text-sm text-slate-600">
                     <span className={`px-2 py-0.5 rounded text-xs font-semibold ${bkp.type === 'Automated' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {bkp.type}
                     </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button className="text-indigo-600 font-medium text-xs hover:underline">Download</button>
                    <button 
                      onClick={() => onTriggerDangerousAction("Restore Backup " + bkp.id)}
                      className="text-rose-600 font-bold text-xs hover:underline"
                    >
                      RESTORE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Maintenance Mode Danger Zone */}
      <section className="bg-white rounded-2xl border border-rose-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-rose-200 flex items-center gap-3 bg-rose-50">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h2 className="text-lg font-bold text-rose-900">System Maintenance Mode</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-6">
            Activating maintenance mode will immediately lock out all students and non-admin staff. Active workflows will be paused, and public verification APIs will return a 503 Service Unavailable status.
          </p>
          <Button 
            variant="outline" 
            className="border-rose-600 text-rose-600 hover:bg-rose-50"
            onClick={() => onTriggerDangerousAction("Enable System Maintenance Mode")}
          >
            Enable Maintenance Mode
          </Button>
        </div>
      </section>

    </div>
  );
}
