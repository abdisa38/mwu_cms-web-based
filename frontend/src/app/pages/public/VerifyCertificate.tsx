import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Certificate } from "@/app/components/shared/Certificate";
import { useVerifyCertificateMutation } from "@/api/publicApi";
import { 
  Search, 
  ShieldCheck, 
  XCircle, 
  Download, 
  Printer, 
  ScanLine,
  CheckCircle2
} from "lucide-react";

export function VerifyCertificate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<"idle" | "valid" | "invalid">("idle");
  const [certData, setCertData] = useState<any>(null);
  
  const [verifyCertificate, { isLoading: isSearching }] = useVerifyCertificateMutation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      const response = await verifyCertificate(searchQuery).unwrap();
      if (response.success && response.data) {
        setCertData(response.data);
        setResult("valid");
      } else {
        setResult("invalid");
      }
    } catch (error) {
      setResult("invalid");
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 w-full">
      {/* Hero Search Section */}
      <section className="w-full pt-16 pb-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Verify Digital Clearance</h1>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Enter a certificate number or student ID to verify the authenticity of a Madda Walabu University digital clearance certificate.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 bg-white border-2 border-transparent rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-lg shadow-lg"
                placeholder="e.g. MWU-CLR-2024-8932 or UGR/1234/12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-[60px] px-8 text-base bg-blue-600 hover:bg-blue-500 shadow-lg border border-blue-400/30"
              isLoading={isSearching}
            >
              Verify Now
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-200">
            <ScanLine className="w-4 h-4" />
            <span>Or scan the QR code printed on the physical certificate</span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="flex-1 w-full pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {result === "idle" && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure Verification Portal</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                This portal is connected directly to the MWU Registrar database. All verification results are provided in real-time.
              </p>
            </div>
          )}

          {result === "invalid" && (
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-red-50 p-6 flex items-center gap-4 border-b border-red-100">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Certificate Not Found or Invalid</h3>
                  <p className="text-red-700">We could not find a valid clearance certificate matching "{searchQuery}".</p>
                </div>
              </div>
              <div className="p-8 text-center space-y-4">
                <p className="text-slate-600">Please check the certificate number and try again. If you believe this is an error, the student may need to contact the university registrar.</p>
                <Button variant="outline" onClick={() => setResult("idle")}>Clear Search</Button>
              </div>
            </div>
          )}

          {result === "valid" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 overflow-hidden">
                <div className="bg-emerald-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 shadow-sm border border-emerald-200">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-900">Official Document Verified</h3>
                      <p className="text-emerald-700 font-medium">This is a valid and officially issued clearance certificate.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 flex-1 sm:flex-none">
                      <Printer className="w-4 h-4 mr-2" /> Print
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none">
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-slate-50 flex justify-center overflow-x-auto">
                  <div className="min-w-[800px] w-full transform scale-90 sm:scale-100 origin-top">
                    <Certificate 
                      certNumber={certData?.certificateNumber || searchQuery.toUpperCase()}
                      studentName={certData?.studentName || "Unknown"}
                      studentId={certData?.studentId?.studentId || "Unknown"}
                      department={certData?.studentId?.department?.name || "Unknown"}
                    />
                  </div>
                </div>
                
                <div className="border-t border-slate-200 bg-white p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Status</p>
                    <p className="font-semibold text-emerald-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> Valid</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Verified On</p>
                    <p className="font-semibold text-slate-900">{new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Issuer</p>
                    <p className="font-semibold text-slate-900">MWU Registrar</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Blockchain ID</p>
                    <p className="font-mono text-xs text-slate-600 bg-slate-100 p-1 rounded break-all">{certData?.blockchainHash ? certData.blockchainHash.substring(0, 16) + "..." : "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
