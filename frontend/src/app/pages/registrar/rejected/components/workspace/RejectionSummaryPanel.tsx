import { FileText, ShieldAlert, Clock, AlertTriangle, MessageSquare, CheckCircle2 } from "lucide-react";
import { RejectedClearance } from "../../data/types";
import { ImageWithFallback } from "../../../../../../components/figma/ImageWithFallback";

export function RejectionSummaryPanel({ clearance }: { clearance: RejectedClearance }) {
  return (
    <div className="space-y-6">
      {/* Student Profile Card */}
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

      {/* Rejection Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          Rejection Summary
        </h4>
        
        <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-6">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
            <div>
              <h5 className="font-bold text-red-900 mb-1">Reason: {clearance.rejectionCategory}</h5>
              <p className="text-red-800 leading-relaxed">{clearance.rejectionReason}</p>
            </div>
          </div>
        </div>

        <dl className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Rejected Department</dt>
            <dd className="font-medium text-slate-900">{clearance.rejectedDepartment}</dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Rejected By</dt>
            <dd className="font-medium text-slate-900">{clearance.rejectedBy}</dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Rejection Date</dt>
            <dd className="font-medium text-slate-900">{new Date(clearance.rejectionDate).toLocaleString()}</dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Required Corrective Action</dt>
            <dd className="font-medium text-slate-900 max-w-md text-right">{clearance.requiredAction}</dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Deadline for Action</dt>
            <dd className="font-medium text-red-600">
              {clearance.deadline ? new Date(clearance.deadline).toLocaleDateString() : "No strict deadline"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Student Notification</dt>
            <dd className="font-medium flex items-center gap-1.5">
              {clearance.studentNotificationStatus === "Read" ? (
                <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Read</span>
              ) : clearance.studentNotificationStatus === "Delivered" ? (
                <span className="text-blue-600 flex items-center gap-1"><MessageSquare className="w-4 h-4"/> Delivered</span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1"><Clock className="w-4 h-4"/> Pending</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
