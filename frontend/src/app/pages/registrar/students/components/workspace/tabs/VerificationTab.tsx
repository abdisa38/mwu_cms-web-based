import { StudentRecord } from "../../../data/types";
import { ShieldCheck, CheckCircle2, Clock, XCircle, FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function VerificationTab({ student }: { student: StudentRecord }) {
  const isVerified = student.verificationStatus === "Verified";
  const isPending = student.verificationStatus === "Pending";

  return (
    <div className="space-y-6">
      
      {/* Status Banner */}
      <div className={`p-4 rounded-2xl flex items-center justify-between border ${
        isVerified ? "bg-emerald-50 border-emerald-200 text-emerald-900" :
        isPending ? "bg-amber-50 border-amber-200 text-amber-900" :
        "bg-red-50 border-red-200 text-red-900"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isVerified ? "bg-emerald-100 text-emerald-600" :
            isPending ? "bg-amber-100 text-amber-600" :
            "bg-red-100 text-red-600"
          }`}>
            {isVerified ? <CheckCircle2 className="w-5 h-5" /> :
             isPending ? <Clock className="w-5 h-5" /> :
             <XCircle className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold">Identity Verification: {student.verificationStatus}</h3>
            <p className="text-sm opacity-80">
              {isVerified ? `Verified by ${student.verifiedBy} on ${new Date(student.verificationDate!).toLocaleDateString()}` :
               isPending ? "Awaiting manual review by a registrar officer." :
               "Verification rejected. Please request a new document."}
            </p>
          </div>
        </div>
        
        {isPending && (
          <div className="flex gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm">Approve</Button>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-sm">Reject</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Uploaded Document */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" /> Uploaded ID Document
            </h3>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center bg-slate-100 min-h-[200px] relative group">
            {student.idDocumentUrl ? (
              <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white border-white hover:bg-white/20 mb-2 gap-2">
                  <ExternalLink className="w-4 h-4" /> Preview Full Screen
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/20 gap-2">
                  <Download className="w-4 h-4" /> Download File
                </Button>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No document uploaded</p>
              </div>
            )}
            {/* Mock Image Display */}
            {student.idDocumentUrl && (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-mono text-xs">
                [ID Image: {student.idDocumentUrl}]
              </div>
            )}
          </div>
        </div>

        {/* Identity Match Verification */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-500" /> Identity Match
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">System Student ID</label>
              <div className="text-sm font-mono text-slate-900">{student.studentId}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Document ID Number</label>
              <div className="text-sm font-mono text-slate-900">{student.idNumber || "Not provided"}</div>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-4">
              <label className="block text-xs font-medium text-slate-500 mb-2">Verification Notes</label>
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 italic border border-slate-100">
                {isVerified ? "Document clearly matches the student profile. No discrepancies found." : "No notes available."}
              </div>
            </div>

            <Button variant="outline" className="w-full mt-2 text-slate-600">Request New Document</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
