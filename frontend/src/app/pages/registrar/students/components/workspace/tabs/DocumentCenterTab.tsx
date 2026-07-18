import { StudentRecord } from "../../../data/types";
import { FileText, Download, Eye, FileBadge, CheckCircle2, Clock, XCircle, FileX } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function DocumentCenterTab({ student }: { student: StudentRecord }) {
  
  const getDocIcon = (type: string) => {
    switch(type) {
      case "ID": return <FileBadge className="w-5 h-5 text-indigo-600" />;
      case "Clearance": return <FileText className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Verified": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "Pending": return <Clock className="w-4 h-4 text-amber-500" />;
      case "Rejected": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" /> Document Repository
        </h3>
        <Button variant="outline" className="text-sm">Upload Document</Button>
      </div>

      {student.documents.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <FileX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-medium">No Documents Found</h4>
          <p className="text-sm text-slate-500 mt-1">There are no files uploaded for this student.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Document Name</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Uploaded</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.documents.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          {getDocIcon(doc.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{doc.name}</div>
                          <div className="text-xs text-slate-500">{doc.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {doc.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-900">{new Date(doc.uploadDate).toLocaleDateString()}</div>
                      <div className="text-xs text-slate-500">{doc.uploadedBy}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        {getStatusIcon(doc.status)} {doc.status}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" className="p-2 h-8 w-8" title="Preview">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="p-2 h-8 w-8" title="Download">
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
      )}
    </div>
  );
}
