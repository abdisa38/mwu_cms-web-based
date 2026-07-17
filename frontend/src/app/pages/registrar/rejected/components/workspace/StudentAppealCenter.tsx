import { MessageSquare, Calendar, User, FileText, Download, Eye } from "lucide-react";
import { RejectedClearance } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

export function StudentAppealCenter({ clearance }: { clearance: RejectedClearance }) {
  if (!clearance.appeal) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">No Appeal Submitted</h3>
        <p className="text-slate-500">The student has not submitted an appeal for this rejection.</p>
      </div>
    );
  }

  const { appeal } = clearance;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm relative overflow-hidden">
        {/* Top styling bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Appeal #{appeal.appealId}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {new Date(appeal.appealDate).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4"/> {clearance.student.name}</span>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
            {appeal.status}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Primary Reason for Appeal</h4>
            <p className="font-medium text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{appeal.appealReason}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Student's Explanation</h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
              {appeal.studentExplanation}
            </p>
          </div>
        </div>
      </div>

      {appeal.supportingDocuments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Student's Supporting Documents</h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appeal.supportingDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
