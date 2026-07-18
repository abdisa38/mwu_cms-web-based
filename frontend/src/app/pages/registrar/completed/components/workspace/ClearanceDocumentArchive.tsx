import { FileText, Download, Eye, ExternalLink, CheckCircle, Search } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

export function ClearanceDocumentArchive({ clearance }: { clearance: CompletedClearance }) {
  if (clearance.documents.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">No Documents Found</h3>
        <p className="text-slate-500">There are no documents attached to this completed clearance record.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900">Document Archive ({clearance.documents.length})</h3>
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
            {clearance.documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 uppercase">{doc.type.split('/')[1]}</span>
                        {doc.verificationStatus === "Verified" && (
                          <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
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
                <td className="px-6 py-4 text-slate-600">
                  {doc.size}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" title="Preview">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" title="Download">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100" title="Open in new tab">
                      <ExternalLink className="w-4 h-4" />
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
