import { useState } from "react";
import { HardDrive, Cloud, ShieldAlert, Link, CheckCircle2, XCircle } from "lucide-react";
import { StorageSettings, Integration } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface Props {
  storageData: StorageSettings;
  integrations: Integration[];
  onDirty: () => void;
}

export function InfrastructureTab({ storageData, integrations, onDirty }: Props) {
  const [storage, setStorage] = useState(storageData);

  const handleStorageChange = (field: keyof StorageSettings, value: any) => {
    setStorage({ ...storage, [field]: value });
    onDirty();
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      
      {/* File Storage */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <HardDrive className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">File Storage</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Storage Provider</label>
              <select 
                value={storage.provider}
                onChange={(e) => handleStorageChange('provider', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Local Storage">Local Server Storage</option>
                <option value="AWS S3">AWS S3</option>
                <option value="Google Cloud Storage">Google Cloud Storage</option>
              </select>
            </div>
            {storage.provider !== "Local Storage" && (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Storage Bucket</label>
                  <input 
                    type="text" 
                    value={storage.bucket}
                    onChange={(e) => handleStorageChange('bucket', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Region</label>
                  <input 
                    type="text" 
                    value={storage.region}
                    onChange={(e) => handleStorageChange('region', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Max File Size (MB)</label>
              <input 
                type="number" 
                value={storage.maxFileSizeMB}
                onChange={(e) => handleStorageChange('maxFileSizeMB', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
            <div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Cloud className="w-4 h-4 text-slate-500"/>
                Encryption at Rest
              </div>
              <div className="text-xs text-slate-500 mt-1">Encrypt all stored documents (requires AWS KMS)</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={storage.encryptionAtRest}
                onChange={(e) => handleStorageChange('encryptionAtRest', e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Link className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Third-Party Integrations</h2>
          </div>
          <Button variant="outline" className="h-8 text-xs bg-white">Add Integration</Button>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 font-semibold">Integration</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Last Tested</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {integrations.map((int) => (
                <tr key={int.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{int.name}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{int.category}</td>
                  <td className="p-4">
                    {int.status === "Connected" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                      </span>
                    ) : int.status === "Error" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                        <ShieldAlert className="w-3.5 h-3.5" /> Error
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        <XCircle className="w-3.5 h-3.5" /> Disconnected
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-slate-500">{int.lastTested}</td>
                  <td className="p-4 text-right">
                    <button className="text-indigo-600 font-medium text-sm hover:underline">Configure</button>
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
