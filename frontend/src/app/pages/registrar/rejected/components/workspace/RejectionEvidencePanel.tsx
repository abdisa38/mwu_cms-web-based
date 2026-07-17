import { FileText, Download, Eye, ExternalLink } from "lucide-react";
import { RejectedClearance } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

export function RejectionEvidencePanel({ clearance }: { clearance: RejectedClearance }) {
  if (clearance.evidence.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">No Evidence Attached</h3>
        <p className="text-slate-500">The officer did not attach any supporting documents to this rejection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Supporting Evidence ({clearance.evidence.length})</h3>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Document Name</th>
              <th className="px-6 py-4 font-medium">Uploaded By</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Size</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clearance.evidence.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500 uppercase">{doc.type.split('/')[1]}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-900">{doc.uploadedBy}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-600">{new Date(doc.uploadedDate).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400">{new Date(doc.uploadedDate).toLocaleTimeString()}</p>
                </td>
                <td className="px-6 py-4 text-slate-600">{doc.size}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" title="Preview">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" title="Download">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
