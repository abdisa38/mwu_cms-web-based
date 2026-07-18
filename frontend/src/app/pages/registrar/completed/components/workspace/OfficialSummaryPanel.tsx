import { User, FileText, Calendar, Clock, MapPin } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function OfficialSummaryPanel({ clearance }: { clearance: CompletedClearance }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <ImageWithFallback 
          src={clearance.student.photoUrl} 
          alt={clearance.student.name}
          className="w-24 h-24 rounded-xl object-cover border border-slate-200 shadow-sm"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-1">{clearance.student.name}</h3>
          <p className="text-slate-500 mb-4">{clearance.student.id} • {clearance.student.universityEmail}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400 mb-1">College</p>
              <p className="font-medium text-slate-900">{clearance.student.college}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Department</p>
              <p className="font-medium text-slate-900">{clearance.student.department}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Program</p>
              <p className="font-medium text-slate-900">{clearance.student.program}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-600" />
            Clearance Profile
          </h4>
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Clearance Type</dt>
              <dd className="font-medium text-slate-900">{clearance.type}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Clearance Number</dt>
              <dd className="font-medium text-slate-900">{clearance.clearanceNumber}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Record Status</dt>
              <dd className="font-medium text-slate-900">{clearance.recordStatus}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Submission Date</dt>
              <dd className="font-medium text-slate-900">{new Date(clearance.submissionDate).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Completion Date</dt>
              <dd className="font-medium text-slate-900">{new Date(clearance.completionDate).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Total Processing Time</dt>
              <dd className="font-medium text-slate-900">{clearance.totalProcessingTimeDays} Days</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            Final Approval details
          </h4>
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Final Approved By</dt>
              <dd className="font-medium text-slate-900">{clearance.finalApprovedBy}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Final Approval Date</dt>
              <dd className="font-medium text-slate-900">{new Date(clearance.finalApprovalDate).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Certificate Number</dt>
              <dd className="font-medium text-slate-900">{clearance.certificate.certificateNumber}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Certificate Status</dt>
              <dd className="font-medium text-slate-900">{clearance.certificate.status}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">QR Verification Status</dt>
              <dd className="font-medium text-slate-900">{clearance.certificate.totalVerificationCount > 0 ? "Verified" : "Not Verified"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Certificate Version</dt>
              <dd className="font-medium text-slate-900">v{clearance.certificate.version}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
