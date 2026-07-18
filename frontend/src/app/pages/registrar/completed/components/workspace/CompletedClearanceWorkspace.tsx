import { X, Archive, FileText, CheckCircle2, History, QrCode, FileSearch, GraduationCap } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { useState } from "react";
import { OfficialSummaryPanel } from "./OfficialSummaryPanel";
import { ApprovalHistoryList } from "./ApprovalHistoryList";
import { CertificateCenterPanel } from "./CertificateCenterPanel";
import { QRVerificationPanel } from "./QRVerificationPanel";
import { ClearanceDocumentArchive } from "./ClearanceDocumentArchive";
import { CompleteTimeline } from "./CompleteTimeline";
import { Button } from "@/app/components/ui/Button";

// Modals
import { CorrectionRequestModal } from "../modals/CorrectionRequestModal";
import { RevokeCertificateModal } from "../modals/RevokeCertificateModal";
import { RegenerateCertificateModal } from "../modals/RegenerateCertificateModal";

interface CompletedClearanceWorkspaceProps {
  clearance: CompletedClearance | null;
  onClose: () => void;
}

type TabType = "summary" | "history" | "certificate" | "verification" | "documents" | "timeline";

export function CompletedClearanceWorkspace({ clearance, onClose }: CompletedClearanceWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  if (!clearance) return null;

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: "summary", label: "Official Summary", icon: FileText },
    { id: "certificate", label: "Certificate Center", icon: GraduationCap },
    { id: "verification", label: "QR Verification", icon: QrCode },
    { id: "history", label: "Approval History", icon: CheckCircle2 },
    { id: "documents", label: "Document Archive", icon: Archive },
    { id: "timeline", label: "Complete Timeline", icon: History },
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-full lg:w-[1000px] bg-slate-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${clearance ? "translate-x-0" : "translate-x-full"}`}>
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <Archive className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Completed Clearance Record
              {clearance.recordStatus === "Corrected" && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2 py-0.5 rounded-full font-medium">Amended Record</span>
              )}
            </h2>
            <p className="text-sm text-slate-400">
              {clearance.student.name} • {clearance.student.id} • {clearance.clearanceNumber}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 shrink-0 flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-blue-600" : "text-slate-400"}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workspace Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "summary" && <OfficialSummaryPanel clearance={clearance} />}
        {activeTab === "certificate" && <CertificateCenterPanel clearance={clearance} />}
        {activeTab === "verification" && <QRVerificationPanel clearance={clearance} />}
        {activeTab === "history" && <ApprovalHistoryList clearance={clearance} />}
        {activeTab === "documents" && <ClearanceDocumentArchive clearance={clearance} />}
        {activeTab === "timeline" && <CompleteTimeline clearance={clearance} />}
      </div>

      {/* Sticky Action Footer */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <Button 
          variant="outline" 
          className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-medium"
          onClick={() => setShowCorrectionModal(true)}
        >
          Request Correction
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="bg-white text-red-600 border-red-200 hover:bg-red-50 font-medium"
            onClick={() => setShowRevokeModal(true)}
          >
            Revoke Certificate
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
            onClick={() => setShowRegenerateModal(true)}
          >
            Regenerate Certificate
          </Button>
        </div>
      </div>

      {/* Modals */}
      {showCorrectionModal && <CorrectionRequestModal onClose={() => setShowCorrectionModal(false)} clearance={clearance} />}
      {showRevokeModal && <RevokeCertificateModal onClose={() => setShowRevokeModal(false)} clearance={clearance} />}
      {showRegenerateModal && <RegenerateCertificateModal onClose={() => setShowRegenerateModal(false)} clearance={clearance} />}
    </div>
  );
}
