import { Download, Printer, Share2, ShieldAlert, Award, QrCode } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";
import mwuLogo from "../../../../../../../imports/download.jfif";
import { ImageWithFallback } from "../../../../../../components/figma/ImageWithFallback";

export function CertificateCenterPanel({ clearance }: { clearance: CompletedClearance }) {
  if (clearance.certificate.status === "Revoked") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto mt-12">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-900 mb-2">Certificate Revoked</h3>
        <p className="text-red-700 mb-6">
          This certificate was revoked on {clearance.certificate.revokedAt ? new Date(clearance.certificate.revokedAt).toLocaleDateString() : "Unknown date"}.
          <br />
          Reason: {clearance.certificate.revocationReason || "Administrative decision"}
        </p>
        <Button variant="outline" className="bg-white text-red-700 border-red-200 hover:bg-red-50">View Audit Log</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Certificate Status: {clearance.certificate.status}</h3>
            <p className="text-sm text-slate-500">Version {clearance.certificate.version} • Generated {new Date(clearance.certificate.generatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Download PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Share2 className="w-4 h-4" /> Share Link
          </Button>
        </div>
      </div>

      <div className="bg-slate-200 p-8 rounded-xl flex items-center justify-center shadow-inner overflow-hidden relative">
        <div className="bg-white w-[800px] h-[560px] shadow-2xl p-12 relative flex flex-col justify-between border-8 border-double border-slate-100 transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-top">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />

          {/* Header */}
          <div className="flex justify-between items-start">
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-24 h-24 object-contain" />
            <div className="text-right">
              <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-widest text-indigo-900">Madda Walabu University</h1>
              <p className="text-slate-600">Office of the Registrar</p>
            </div>
          </div>

          {/* Body */}
          <div className="text-center my-8">
            <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-widest mb-4">Official Clearance</h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              This is to certify that
              <br/>
              <strong className="text-2xl text-slate-900 block my-2">{clearance.student.name}</strong>
              (ID: {clearance.student.id})
              <br/>
              has successfully completed all required institutional clearance procedures for {clearance.type} from the {clearance.student.department} department.
            </p>
          </div>

          {/* Footer & Signatures */}
          <div className="flex justify-between items-end">
            <div className="flex gap-4 items-end">
              <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-sm w-28 h-28 flex flex-col items-center justify-center">
                <QrCode className="w-16 h-16 text-slate-800" />
                <span className="text-[10px] mt-1 text-slate-500 font-mono">Verify Scan</span>
              </div>
              <div className="text-sm text-slate-500 font-mono space-y-1">
                <p>CERT No: <strong className="text-slate-900">{clearance.certificate.certificateNumber}</strong></p>
                <p>Date: <strong className="text-slate-900">{new Date(clearance.finalApprovalDate).toLocaleDateString()}</strong></p>
                <p>Version: <strong className="text-slate-900">v{clearance.certificate.version}.0</strong></p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-48 h-16 mb-2 flex items-center justify-center">
                <span className="font-signature text-3xl text-blue-900 opacity-80">{clearance.finalApprovedBy.split(' ')[1]}</span>
              </div>
              <div className="border-t border-slate-400 pt-2">
                <p className="font-bold text-slate-900 text-sm">{clearance.finalApprovedBy}</p>
                <p className="text-xs text-slate-500">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
