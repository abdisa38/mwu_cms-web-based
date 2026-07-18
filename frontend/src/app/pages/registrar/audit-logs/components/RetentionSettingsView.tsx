import { Shield, Clock, Archive, Trash2, Database, Save, AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function RetentionSettingsView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4">
        <div className="mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h4 className="text-amber-900 font-bold text-sm">Elevated Permissions Required</h4>
          <p className="text-amber-800 text-sm mt-1">
            Modifying audit retention policies requires Super Admin privileges and a secondary hardware key verification. All changes made to these policies are permanently logged.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Log Retention Policy</h3>
          <p className="text-sm text-slate-500 mt-1">Configure how long audit logs are kept in active storage before being archived.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Active Storage Duration</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>1 Year (Recommended for Compliance)</option>
                  <option>2 Years</option>
                  <option>3 Years</option>
                  <option>5 Years</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Logs older than this duration will be automatically moved to cold storage.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cold Storage Archive (Glacier)</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Keep Indefinitely (Immutable)</option>
                  <option>Keep for 7 Years</option>
                  <option>Keep for 10 Years</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Cold storage is highly secure but retrieving logs can take up to 24 hours.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-indigo-600" />
                Current Storage Status
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Active DB Usage</span>
                    <span className="font-bold text-slate-700">45 GB / 100 GB</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[45%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Cold Archive Usage</span>
                    <span className="font-bold text-slate-700">128 GB</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Integrity OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <Button variant="primary" className="gap-2">
            <Save className="w-4 h-4" /> Save Policy Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
