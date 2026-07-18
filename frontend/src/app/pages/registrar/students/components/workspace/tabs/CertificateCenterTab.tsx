import { StudentRecord } from "../../../data/types";
import { ScrollText, Download, Eye, ExternalLink, ShieldCheck, FileX } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function CertificateCenterTab({ student }: { student: StudentRecord }) {
  // In a real app, certificates would be strongly typed in StudentRecord.
  // We'll mock a certificate view based on the clearance history if completed.
  const completedClearances = student.clearanceHistory.filter(c => c.status === "Completed" && c.certificateNumber);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-blue-600" /> Digital Certificates
        </h3>
      </div>

      {completedClearances.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <ScrollText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-medium">No Certificates Found</h4>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">This student does not have any generated official certificates yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedClearances.map(cert => (
            <div key={cert.certificateNumber} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{cert.type} Certificate</h4>
                  <p className="text-xs font-mono text-slate-500">{cert.certificateNumber}</p>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">Active</span>
              </div>
              
              <div className="p-6 bg-slate-100 flex-1 flex flex-col items-center justify-center relative">
                <div className="w-32 h-40 bg-white shadow-sm border border-slate-200 rounded flex flex-col items-center p-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 mb-2"></div>
                  <div className="w-full h-1 bg-slate-200 mb-1 rounded"></div>
                  <div className="w-3/4 h-1 bg-slate-200 mb-4 rounded"></div>
                  <div className="w-full h-1 bg-slate-200 mb-1 rounded"></div>
                  <div className="w-full h-1 bg-slate-200 mb-1 rounded"></div>
                  <div className="w-5/6 h-1 bg-slate-200 rounded"></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Click Preview to view full document</p>

                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" className="text-white border-white hover:bg-white/20 w-40 justify-start gap-2">
                    <Eye className="w-4 h-4" /> View Certificate
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white/20 w-40 justify-start gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-slate-500 mb-0.5">Issue Date</span>
                  <span className="font-medium text-slate-900">{cert.completionDate ? new Date(cert.completionDate).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 mb-0.5">Version</span>
                  <span className="font-medium text-slate-900">v1.0</span>
                </div>
                <div className="col-span-2 flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>0 Verifications</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                    Copy Link <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
