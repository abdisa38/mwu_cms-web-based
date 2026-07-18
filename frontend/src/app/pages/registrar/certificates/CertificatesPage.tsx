import { useState } from "react";
import { Search, Download, HelpCircle, Award, Settings, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { CertificateKPIs } from "./components/CertificateKPIs";
import { CertificateFilters } from "./components/CertificateFilters";
import { CertificateTable } from "./components/CertificateTable";
import { mockCertificates } from "./data/mockCertificates";
import { CertificateRecord } from "./data/types";
import { CertificateWorkspace } from "./components/workspace/CertificateWorkspace";

export function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateRecord | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-none z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <span className="cursor-pointer hover:text-slate-700">Dashboard</span>
              <span>/</span>
              <span className="text-slate-900 font-medium">Digital Certificates</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              Certificate Management
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Global Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Generate Certificate</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <CertificateKPIs />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-slate-50/50 rounded-t-xl">
            <div className="relative w-full xl:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by ID, Name, Certificate #..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <CertificateFilters />
          </div>
          
          {/* Table */}
          <CertificateTable 
            data={mockCertificates} 
            onRowClick={(cert) => setSelectedCertificate(cert)} 
          />
        </div>
      </div>

      {/* Overlay Workspace */}
      <CertificateWorkspace 
        certificate={selectedCertificate} 
        onClose={() => setSelectedCertificate(null)} 
      />
    </div>
  );
}
