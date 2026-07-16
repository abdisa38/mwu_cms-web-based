import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Certificate } from "../../components/shared/Certificate";
import { 
  ChevronRight, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  HelpCircle,
  FileCheck2,
  Clock,
  CheckCircle2,
  QrCode,
  Copy,
  ExternalLink,
  History,
  AlertCircle
} from "lucide-react";

export function StudentCertificate() {
  // Toggle this to see the empty state
  const [isCertificateAvailable, setIsCertificateAvailable] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  const timelineSteps = [
    { title: 'Library', status: 'approved' },
    { title: 'Dormitory', status: 'approved' },
    { title: 'Cafeteria', status: 'approved' },
    { title: 'Bookstore', status: 'approved' },
    { title: 'Department Head', status: 'approved' },
    { title: 'Registrar', status: 'approved' },
  ];

  if (!isCertificateAvailable) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0 h-[calc(100vh-5rem)] flex flex-col animate-in fade-in duration-500">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <div>
            <div className="flex items-center text-sm text-slate-500 mb-1">
              <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-slate-900 font-medium">My Certificate</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Official Certificate</h1>
          </div>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm">
            <HelpCircle className="w-4 h-4 mr-2" /> Help Center
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-8 text-center">
          <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-lg">
            <Award className="w-12 h-12 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Certificate Not Yet Available</h2>
          <p className="text-slate-500 max-w-md mb-8">
            Your clearance process is still ongoing. The official digital certificate will be generated automatically once all departments and the registrar have approved your request.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 w-full max-w-lg text-left flex gap-4">
            <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Waiting for Department Approval</h3>
              <p className="text-sm text-amber-700">Currently pending review at the Dormitory department. You can track exact progress on your clearance tracker.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="bg-white border-slate-300">
              <RefreshCw className="w-4 h-4 mr-2 text-slate-500" /> Refresh Status
            </Button>
            <Link to="/student/clearance">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                <FileCheck2 className="w-4 h-4 mr-2" /> View My Clearance
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-24 md:pb-0 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">My Certificate</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Official Certificate</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Share2 className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Printer className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Print</span>
          </Button>
          <Button 
            className={`shadow-sm px-4 flex-1 sm:flex-none transition-all ${downloadSuccess ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            onClick={handleDownload}
            isLoading={isDownloading}
          >
            {downloadSuccess ? (
              <><CheckCircle2 className="w-4 h-4 mr-2" /> Downloaded</>
            ) : (
              <><Download className="w-4 h-4 mr-2" /> Download PDF</>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Certificate Preview Viewer */}
        <div className="flex-1 flex flex-col min-w-0 space-y-6">
          <div className="bg-slate-200/50 rounded-2xl border border-slate-200 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden shadow-inner min-h-[600px]">
            {/* Viewer Controls */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 flex items-center p-1 z-20">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors font-medium text-xs">Fit Width</button>
              <div className="w-px h-4 bg-slate-300 mx-1"></div>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors font-medium text-xs">Fit Page</button>
              <div className="w-px h-4 bg-slate-300 mx-1"></div>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Zoom Out">-</button>
              <span className="px-2 text-xs font-bold text-slate-900">100%</span>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Zoom In">+</button>
            </div>

            {/* Embedded Certificate Component */}
            <div className="w-full max-w-[900px] shadow-2xl transition-transform transform scale-100 sm:scale-100 xl:scale-110 origin-center bg-white rounded-sm relative z-10">
               <Certificate 
                certNumber="MWU-CLR-2024-8932"
                studentName="John Doe"
                studentId="UGR/1234/12"
                department="Computer Science"
                status="Valid"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Actions */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          
          {/* Status Dashboard Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Verification Status</h3>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Valid
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                This certificate was officially generated by the MWU Registrar and is cryptographically verifiable.
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Certificate Number</p>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <p className="font-mono text-sm font-semibold text-slate-800">MWU-CLR-2024-8932</p>
                  <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Copy to clipboard">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Issue Date</p>
                  <p className="text-sm font-medium text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Clearance Req</p>
                  <Link to="/student/clearance" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                    REQ-8932 <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
            <h3 className="font-bold text-slate-900 mb-1">Digital Verification</h3>
            <p className="text-xs text-slate-500 mb-6">Scan QR to verify authenticity instantly</p>
            
            <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 inline-block shadow-sm mb-6 relative group">
              <div className="absolute inset-0 bg-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <QrCode className="w-40 h-40 text-slate-800" />
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full bg-white text-slate-700 hover:bg-slate-50 shadow-sm border-slate-200">
                <Copy className="w-4 h-4 mr-2" /> Copy Verification Link
              </Button>
              <Link to="/verify" target="_blank">
                <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50">
                  Open Verification Portal <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Approval Timeline Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Approval Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 border-l-2 border-emerald-200 ml-2">
                {timelineSteps.map((step, i) => (
                  <div key={i} className="relative pl-5 flex items-center justify-between">
                    <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-emerald-500"></div>
                    <span className="text-sm font-medium text-slate-700">{step.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Approved</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Activity History</h3>
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Certificate Generated</p>
                    <p className="text-xs text-slate-500">Today, 09:15 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Registrar Approved</p>
                    <p className="text-xs text-slate-500">Today, 09:14 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Temporary icon component fallback since Award wasn't imported from lucide-react above
function Award(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
