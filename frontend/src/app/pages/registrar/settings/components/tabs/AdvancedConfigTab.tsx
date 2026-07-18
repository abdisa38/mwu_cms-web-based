import { useState } from "react";
import { Flag, ShieldAlert, ToggleLeft, ToggleRight } from "lucide-react";
import { FeatureFlag } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface Props {
  featureFlags: FeatureFlag[];
  onTriggerDangerousAction: (actionName: string) => void;
  onDirty: () => void;
}

export function AdvancedConfigTab({ featureFlags: initialFlags, onTriggerDangerousAction, onDirty }: Props) {
  const [flags, setFlags] = useState(initialFlags);

  const toggleFlag = (id: string, name: string) => {
    onTriggerDangerousAction(`Toggle Feature Flag: ${name}`);
    // In a real app, this state would only update after the modal is confirmed.
    // For prototype purposes, we'll just trigger the warning modal.
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      
      {/* Feature Flags */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Flag className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Feature Flags</h2>
          </div>
        </div>
        <div className="p-6 bg-amber-50 border-b border-amber-200">
           <div className="flex gap-3 text-amber-800 text-sm">
             <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600" />
             <p><strong>Warning:</strong> Modifying feature flags can instantly change system behavior or disable core functionality. All changes are logged and require re-authentication.</p>
           </div>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 font-semibold">Feature Name</th>
                <th className="p-4 font-semibold">Environment</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {flags.map((flag) => (
                <tr key={flag.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{flag.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{flag.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                      {flag.environment}
                    </span>
                  </td>
                  <td className="p-4">
                     {flag.enabled ? (
                        <span className="text-emerald-600 font-bold text-sm">Enabled</span>
                     ) : (
                        <span className="text-slate-400 font-bold text-sm">Disabled</span>
                     )}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleFlag(flag.id, flag.name)}
                      className={`transition-colors ${flag.enabled ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-400'}`}
                    >
                      {flag.enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
