import { ShieldCheck, ShieldAlert, MonitorSmartphone, MapPin, Search } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

export function QRVerificationPanel({ clearance }: { clearance: CompletedClearance }) {
  const { certificate } = clearance;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Verification Status Card */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="w-48 h-48 bg-slate-100 rounded-xl mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">
            {/* Placeholder for actual QR code rendering */}
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-800 rounded-lg mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-mono">{certificate.qrToken}</p>
            </div>
          </div>
          
          <h3 className="font-bold text-slate-900 text-lg mb-1">Verification QR</h3>
          <p className="text-sm text-slate-500 mb-4">Scan to verify authenticity</p>
          
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-left font-mono text-slate-600 break-all border border-slate-200">
            https://verify.mwu.edu.et/c/{certificate.qrToken}
          </div>
        </div>

        {/* Verification Stats & History */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Total Scans</p>
              <h3 className="text-3xl font-bold text-slate-900">{certificate.totalVerificationCount}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Current Status</p>
              <div className="flex items-center gap-2 mt-1">
                {certificate.status === "Revoked" ? (
                  <>
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                    <h3 className="text-2xl font-bold text-red-700">Revoked</h3>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    <h3 className="text-2xl font-bold text-emerald-700">Valid</h3>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Verification Access Log</h3>
              <Button variant="ghost" className="h-8 px-2 text-xs">
                <Search className="w-4 h-4 mr-1" /> View All
              </Button>
            </div>
            {certificate.verificationLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No verifications recorded yet.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Date & Time</th>
                    <th className="px-6 py-3 font-medium">Location</th>
                    <th className="px-6 py-3 font-medium">Device/IP</th>
                    <th className="px-6 py-3 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificate.verificationLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-900">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {log.location}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MonitorSmartphone className="w-4 h-4 text-slate-400" />
                          <span className="truncate max-w-[150px]">{log.device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {log.status === "Valid" ? (
                          <span className="text-emerald-600 font-medium px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-xs">Valid</span>
                        ) : (
                          <span className="text-red-600 font-medium px-2 py-0.5 bg-red-50 border border-red-200 rounded text-xs">{log.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
