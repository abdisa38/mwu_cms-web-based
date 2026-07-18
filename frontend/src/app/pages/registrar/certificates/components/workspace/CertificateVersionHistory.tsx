import { CertificateRecord } from "../../data/types";
import { Download, ExternalLink, ShieldCheck, History, Edit3 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface CertificateVersionHistoryProps {
  certificate: CertificateRecord;
}

export function CertificateVersionHistory({ certificate }: CertificateVersionHistoryProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Overview Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Version History
          </h3>
          <p className="text-slate-500 mt-1">
            Track all generations, corrections, and modifications to this certificate.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500">Current Version</p>
          <p className="text-2xl font-bold text-slate-900">v{certificate.certificateVersion}.0</p>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="relative pl-6 border-l-2 border-slate-200 ml-4 space-y-8 pb-8">
        {certificate.versions.sort((a, b) => b.versionNumber - a.versionNumber).map((version, idx) => (
          <div key={version.id} className="relative">
            {/* Timeline Dot */}
            <div className={`absolute -left-[35px] w-5 h-5 rounded-full border-4 border-white ${
              idx === 0 ? 'bg-blue-600' : 'bg-slate-300'
            }`}></div>
            
            <div className={`bg-white p-5 rounded-xl border shadow-sm ${
              idx === 0 ? 'border-blue-200' : 'border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      idx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      Version {version.versionNumber}.0
                    </span>
                    <span className={`text-xs font-medium ${
                      version.status === 'Active' ? 'text-emerald-600' :
                      version.status === 'Revoked' ? 'text-red-600' :
                      'text-slate-500'
                    }`}>
                      {version.status}
                    </span>
                    {idx === 0 && (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Current
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900">{version.reason}</h4>
                </div>
                <div className="text-sm text-slate-500 sm:text-right">
                  <p className="font-medium text-slate-700">{new Date(version.createdDate).toLocaleString()}</p>
                  <p>By {version.createdBy}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded border border-slate-100 flex-1 truncate">
                  <span className="text-slate-400 mr-2">Hash:</span>
                  {version.documentHash}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-slate-600 bg-white border-slate-200">
                    <ExternalLink className="w-4 h-4 mr-2" /> Preview
                  </Button>
                  <Button size="sm" className="bg-slate-800 text-white hover:bg-slate-700">
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {certificate.versions.length === 0 && (
          <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed ml-2">
            <History className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p>No version history available.</p>
          </div>
        )}
      </div>

      {/* Correction Requests Section */}
      {certificate.correctionRequests.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-orange-500" />
            Correction History
          </h3>
          <div className="space-y-4">
            {certificate.correctionRequests.map(req => (
              <div key={req.id} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                      req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {req.status}
                    </span>
                    <p className="text-sm font-medium text-slate-900">Reason: {req.reason}</p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(req.requestedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-4 text-sm bg-white p-3 rounded border border-slate-200">
                  <div className="flex-1">
                    <span className="text-slate-400 text-xs block mb-1">Original Value</span>
                    <span className="text-red-600 line-through">{req.originalValue}</span>
                  </div>
                  <div className="text-slate-300 text-lg">→</div>
                  <div className="flex-1">
                    <span className="text-slate-400 text-xs block mb-1">Corrected Value</span>
                    <span className="text-emerald-600 font-medium">{req.correctedValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
