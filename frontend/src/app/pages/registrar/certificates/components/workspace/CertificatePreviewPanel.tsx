import { useState } from "react";
import { CertificateRecord } from "../../data/types";
import { Certificate } from "@/app/components/shared/Certificate";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { GenerateCertificateModal } from "../modals/GenerateCertificateModal";
import { RequestCorrectionModal } from "../modals/RequestCorrectionModal";
import { RegenerateCertificateModal } from "../modals/RegenerateCertificateModal";
import { RevokeCertificateModal } from "../modals/RevokeCertificateModal";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface CertificatePreviewPanelProps {
  certificate: CertificateRecord;
}

export function CertificatePreviewPanel({ certificate }: CertificatePreviewPanelProps) {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);

  if (certificate.certificateStatus === "Pending Generation") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
          <Clock className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Certificate Not Generated</h3>
        <p className="text-slate-500 max-w-md mb-8">
          This clearance has been approved but the official digital certificate has not yet been generated.
        </p>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full max-w-md text-left mb-8">
          <h4 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Pre-Generation Checklist</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Clearance Status is Completed</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Final Approval Exists</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">No Blocking Appeal Exists</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Student Identity Verified</span>
            </li>
          </ul>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-lg shadow-md">
          Generate Official Certificate
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* Left side: Certificate Visual */}
      <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto flex justify-center w-full">
        <div className="min-w-[800px] transform scale-90 sm:scale-100 origin-top">
          <Certificate 
            certNumber={certificate.certificateNumber || "N/A"}
            studentName={certificate.studentName}
            studentId={certificate.studentId}
            department={certificate.department}
          />
        </div>
      </div>

      {/* Right side: Certificate Metadata Sidebar */}
      <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
        
        {/* Status Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Current Status</h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Certificate Status</p>
              <div className="flex items-center gap-2">
                {certificate.certificateStatus === 'Active' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {certificate.certificateStatus === 'Revoked' && <AlertCircle className="w-5 h-5 text-red-600" />}
                <span className="font-semibold text-slate-900">{certificate.certificateStatus}</span>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-slate-500 mb-1">Verification Status</p>
              <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                certificate.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                certificate.verificationStatus === 'Revoked' ? 'bg-red-100 text-red-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {certificate.verificationStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Certificate Metadata</h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Version</span>
              <span className="font-medium text-slate-900">v{certificate.certificateVersion}.0</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Issue Date</span>
              <span className="font-medium text-slate-900">
                {certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Clearance Type</span>
              <span className="font-medium text-slate-900">{certificate.clearanceType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Issued By</span>
              <span className="font-medium text-slate-900 truncate max-w-[120px]" title={certificate.issuedBy || ""}>
                {certificate.issuedBy || "System"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-slate-600 bg-white">
            Request Correction
          </Button>
          <Button variant="outline" className="w-full justify-start text-slate-600 bg-white">
            Regenerate Certificate
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-white">
            Revoke Certificate
          </Button>
        </div>

      </div>
    </div>
  );
}
