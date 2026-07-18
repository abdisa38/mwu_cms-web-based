import { CertificateRecord } from "../../data/types";
import { QrCode, Copy, ExternalLink, ShieldCheck, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface QRVerificationPanelProps {
  certificate: CertificateRecord;
}

export function QRVerificationPanel({ certificate }: QRVerificationPanelProps) {
  const verificationUrl = `https://clearance.mwu.edu.et/verify/${certificate.certificateNumber}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Banner indicating status */}
      <div className={`p-4 rounded-xl border flex items-start gap-4 ${
        certificate.verificationStatus === 'Revoked' 
          ? 'bg-red-50 border-red-200 text-red-800'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
      }`}>
        {certificate.verificationStatus === 'Revoked' ? (
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-red-600" />
        ) : (
          <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 text-emerald-600" />
        )}
        <div>
          <h3 className="font-bold text-lg mb-1">
            {certificate.verificationStatus === 'Revoked' ? 'Verification Revoked' : 'Verification Active'}
          </h3>
          <p className="opacity-90">
            {certificate.verificationStatus === 'Revoked' 
              ? 'This certificate has been revoked and will fail public verification checks.' 
              : 'This certificate is active and will pass public verification checks. Anyone with the QR code or link can verify its authenticity.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* QR Code Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-48 h-48 bg-slate-100 p-4 rounded-xl border-2 border-slate-200 mb-6 flex items-center justify-center">
            {/* Placeholder for actual QR code image */}
            <QrCode className="w-full h-full text-slate-800" />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">{certificate.certificateNumber}</h4>
          <p className="text-sm text-slate-500 mb-6">Scan to verify authenticity</p>
          
          <div className="w-full flex gap-2">
            <Button variant="outline" className="flex-1 text-slate-600">
              <Download className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button variant="outline" className="flex-1 text-slate-600">
              <Copy className="w-4 h-4 mr-2" /> Copy Link
            </Button>
          </div>
        </div>

        {/* Verification Details Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Verification Link</h4>
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 font-mono text-sm text-slate-600 break-all flex items-center">
                {verificationUrl}
              </div>
              <Button className="shrink-0 bg-slate-800 text-white hover:bg-slate-700">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
              <ExternalLink className="w-4 h-4 mr-2" /> Open Public Verification Page
            </Button>
          </div>

          {/* Verification History Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-slate-900">Verification History</h4>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {certificate.verificationHistory.length} Total Checks
              </span>
            </div>

            {certificate.verificationHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-medium">
                      <th className="pb-3 pr-4">Date & Time</th>
                      <th className="pb-3 px-4">Method</th>
                      <th className="pb-3 px-4">Location / IP</th>
                      <th className="pb-3 pl-4">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {certificate.verificationHistory.map(log => (
                      <tr key={log.id}>
                        <td className="py-3 pr-4 text-slate-700 font-medium">
                          {new Date(log.date).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{log.method}</td>
                        <td className="py-3 px-4">
                          <p className="text-slate-700">{log.location}</p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{log.ip}</p>
                        </td>
                        <td className="py-3 pl-4">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            log.result === 'Valid' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {log.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 border-2 border-dashed border-slate-100 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>No verification history found.</p>
                <p className="text-sm">This certificate has not been verified yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
