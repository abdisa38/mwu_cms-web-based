import React from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import mwuLogo from "../../../imports/download.jfif";
import { QrCode, CheckCircle2, ShieldCheck } from "lucide-react";

export function Certificate({ 
  studentName = "John Doe", 
  studentId = "UGR/1234/12", 
  department = "Computer Science", 
  program = "Undergraduate Regular",
  issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  certNumber = "MWU-CLR-2024-8932",
  status = "Valid"
}) {
  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white overflow-hidden shadow-xl" style={{ aspectRatio: '1.414 / 1' }}>
      {/* Background Watermark/Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <ImageWithFallback src={mwuLogo} alt="Watermark" className="w-1/2 h-1/2 object-contain grayscale" />
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-4 border-[12px] border-double border-slate-300 pointer-events-none"></div>
      <div className="absolute inset-6 border border-slate-200 pointer-events-none"></div>

      {/* Certificate Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between p-16 text-center">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="w-24 h-24"></div> {/* Spacer for balance */}
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-24 h-24 object-contain" />
            <div className="w-24 flex flex-col items-end text-xs text-slate-500 text-right">
              <span className="font-semibold text-slate-700">No. {certNumber}</span>
              <span>Issued: {issueDate}</span>
            </div>
          </div>
          <div className="space-y-1 mt-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight uppercase">
              Madda Walabu University
            </h1>
            <p className="text-sm md:text-base font-medium text-slate-500 uppercase tracking-widest">
              Office of the Registrar
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-2xl mx-auto space-y-6 my-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-blue-900 italic">
              Certificate of Clearance
            </h2>
            <div className="h-0.5 w-32 bg-blue-900 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-slate-600 text-lg leading-relaxed">
            This is to certify that
          </p>
          
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 px-12">
            {studentName}
          </h3>
          
          <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
            (ID: <span className="font-semibold text-slate-800">{studentId}</span>) from the Department of <span className="font-semibold text-slate-800">{department}</span>, Program <span className="font-semibold text-slate-800">{program}</span>, has successfully completed all necessary university clearance procedures and has no outstanding obligations to Madda Walabu University.
          </p>
        </div>

        {/* Footer / Signatures */}
        <div className="flex items-end justify-between w-full mt-auto pt-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center p-2 mb-2">
              <QrCode className="w-full h-full text-slate-800" />
            </div>
            <span className="text-xs text-slate-500 font-medium">Scan to Verify</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-2 border-amber-500 bg-amber-50 flex items-center justify-center relative mb-4">
              <div className="absolute inset-2 rounded-full border border-dashed border-amber-600 flex items-center justify-center">
                <div className="text-center">
                  <ShieldCheck className="w-8 h-8 text-amber-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-amber-700 uppercase leading-none block">Official<br/>Seal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-64">
            <div className="h-16 w-full flex items-end justify-center">
              {/* Signature Placeholder */}
              <span className="font-signature text-4xl text-blue-950 opacity-80 -rotate-2">Tadesse A.</span>
            </div>
            <div className="w-full border-t border-slate-400 mt-2 pt-2 text-center">
              <p className="font-bold text-slate-900 text-sm">University Registrar</p>
              <p className="text-xs text-slate-500">Madda Walabu University</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Status overlay banner (visible mostly for digital previews) */}
      {status === "Valid" && (
        <div className="absolute top-8 left-[-40px] bg-emerald-500 text-white font-bold py-1 px-12 transform -rotate-45 shadow-md z-20 text-xs tracking-widest uppercase">
          Valid Copy
        </div>
      )}
    </div>
  );
}
