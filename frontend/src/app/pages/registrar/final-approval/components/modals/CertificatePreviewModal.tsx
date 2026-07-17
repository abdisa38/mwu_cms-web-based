import { X, Download, Printer, Share2, Award, QrCode } from "lucide-react";
import { FinalApprovalRequest } from "../../data/types";
import { Button } from "../../../../../components/ui/Button";
import mwuLogo from "../../../../../../imports/download.jfif";
import { ImageWithFallback } from "../../../../../components/figma/ImageWithFallback";

interface CertificatePreviewModalProps {
  clearance: FinalApprovalRequest;
  onClose: () => void;
}

export function CertificatePreviewModal({ clearance, onClose }: CertificatePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
      <div className="bg-slate-100 rounded-2xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header toolbar */}
        <div className="h-16 bg-[#0F172A] text-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-indigo-400" />
            <h2 className="font-bold">Official Clearance Certificate Generated</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <div className="w-px h-6 bg-slate-700 mx-2"></div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-200">
          
          {/* Certificate Paper */}
          <div className="w-full max-w-[800px] bg-white shadow-lg border border-slate-300 relative overflow-hidden aspect-[1/1.414] p-12 flex flex-col text-slate-900">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <ImageWithFallback src={mwuLogo} alt="MWU Watermark" className="w-96 h-96 object-contain" />
            </div>

            {/* Certificate Header */}
            <div className="text-center border-b-2 border-indigo-900 pb-6 mb-8 relative z-10">
              <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-20 h-20 mx-auto mb-4" />
              <h1 className="text-2xl font-serif font-bold text-indigo-900 uppercase tracking-widest">Madda Walabu University</h1>
              <h2 className="text-lg font-serif text-slate-700 mt-1 uppercase tracking-widest">Office of the Registrar</h2>
              <h3 className="text-3xl font-serif font-bold mt-6 text-slate-900">OFFICIAL CLEARANCE CERTIFICATE</h3>
            </div>

            {/* Certificate Body */}
            <div className="flex-1 space-y-6 relative z-10 text-justify leading-relaxed">
              <p className="text-lg font-serif">
                This is to certify that <strong className="border-b border-slate-400 font-bold px-2">{clearance.studentName}</strong>, 
                ID No. <strong className="border-b border-slate-400 font-bold px-2">{clearance.studentId}</strong>, a student in the 
                <strong className="border-b border-slate-400 font-bold px-2">{clearance.college}</strong>, Department of 
                <strong className="border-b border-slate-400 font-bold px-2">{clearance.department}</strong>, has completed all 
                obligations and returned all university property in accordance with the rules and regulations.
              </p>
              <p className="text-lg font-serif">
                All relevant departments, including the Library, Dormitory, Cafeteria, and Finance, have verified that there are no outstanding dues or issues.
              </p>
              <p className="text-lg font-serif">
                This clearance is issued for the purpose of <strong>{clearance.type}</strong>.
              </p>

              <div className="mt-12 flex items-end justify-between">
                <div>
                  <p className="font-bold font-serif mb-1">Issue Date:</p>
                  <p className="border-b border-slate-400 w-48 text-center pb-1">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-bold font-serif mb-1">Registrar Signature & Seal:</p>
                  <div className="border-b border-slate-400 w-64 h-16 relative">
                    {/* Fake signature line */}
                    <div className="absolute bottom-1 w-full text-center text-indigo-900/50 font-cursive text-2xl" style={{ fontFamily: 'cursive' }}>
                      Approved Digitally
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="border-t border-slate-200 mt-auto pt-4 flex justify-between items-end relative z-10">
              <div className="text-xs text-slate-500 space-y-1">
                <p>Certificate No: <strong>{clearance.clearanceNumber}-CERT</strong></p>
                <p>Verify at: https://registrar.mwu.edu.et/verify</p>
              </div>
              <div className="w-20 h-20 bg-white border border-slate-200 p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-16 h-16 text-slate-800" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
