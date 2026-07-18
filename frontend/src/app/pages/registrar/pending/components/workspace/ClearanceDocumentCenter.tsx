import { FileText, Download, Eye, ExternalLink, CheckCircle } from "lucide-react";
import { ClearanceDocument } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface ClearanceDocumentCenterProps {
  documents: ClearanceDocument[];
}

export function ClearanceDocumentCenter({ documents }: ClearanceDocumentCenterProps) {
  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Documents Found</h3>
        <p className="text-slate-500 mt-1 max-w-sm">There are currently no documents associated with this clearance request.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5 text-blue-600" />
          Clearance Document Center
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors group">
              <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden">
                {/* Mock Document Preview */}
                <FileText className="w-12 h-12 text-slate-300" />
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2 backdrop-blur-sm">
                  <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 truncate" title={doc.title}>{doc.title}</h4>
                  {doc.status === 'Verified' && (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500 flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium text-slate-700">{doc.type}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex justify-between">
                    <span>Uploaded By:</span>
                    <span className="font-medium text-slate-700 truncate ml-2">{doc.uploadedBy}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium text-slate-700">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-slate-600">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
