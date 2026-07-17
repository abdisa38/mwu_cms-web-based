import { X, ShieldAlert, FileText, CheckCircle2, History, MessageSquare, AlertCircle } from "lucide-react";
import { RejectedClearance } from "../../data/types";
import { useState } from "react";
import { RejectionSummaryPanel } from "./RejectionSummaryPanel";
import { RejectionEvidencePanel } from "./RejectionEvidencePanel";
import { ClearanceHistoryPanel } from "./ClearanceHistoryPanel";
import { RejectionTimeline } from "./RejectionTimeline";
import { StudentAppealCenter } from "./StudentAppealCenter";
import { AppealReviewPanel } from "./AppealReviewPanel";

// Modals
import { RequestMoreInfoModal } from "../modals/RequestMoreInfoModal";
import { SendForReconsiderationModal } from "../modals/SendForReconsiderationModal";
import { ReopenClearanceModal } from "../modals/ReopenClearanceModal";
import { FinalRejectionModal } from "../modals/FinalRejectionModal";

interface RejectedClearanceWorkspaceProps {
  clearance: RejectedClearance | null;
  onClose: () => void;
}

type TabType = "summary" | "evidence" | "history" | "timeline" | "appeal" | "review";

export function RejectedClearanceWorkspace({ clearance, onClose }: RejectedClearanceWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showReconsiderationModal, setShowReconsiderationModal] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showFinalRejectModal, setShowFinalRejectModal] = useState(false);

  if (!clearance) return null;

  const tabs: { id: TabType; label: string; icon: React.ElementType; show: boolean }[] = [
    { id: "summary", label: "Rejection Summary", icon: ShieldAlert, show: true },
    { id: "evidence", label: "Evidence", icon: FileText, show: true },
    { id: "appeal", label: "Student Appeal", icon: MessageSquare, show: !!clearance.appeal },
    { id: "review", label: "Appeal Review", icon: AlertCircle, show: !!clearance.appeal },
    { id: "history", label: "Workflow History", icon: CheckCircle2, show: true },
    { id: "timeline", label: "Timeline", icon: History, show: true },
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-full lg:w-[1000px] bg-slate-50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${clearance ? "translate-x-0" : "translate-x-full"}`}>
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Rejected Clearance Record
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-2 py-0.5 rounded-full font-medium">
                {clearance.status}
              </span>
            </h2>
            <p className="text-sm text-slate-400">
              {clearance.student.name} • {clearance.clearanceNumber}
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
        {tabs.filter(t => t.show).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? "border-red-600 text-red-600" 
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-red-600" : "text-slate-400"}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workspace Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "summary" && <RejectionSummaryPanel clearance={clearance} />}
        {activeTab === "evidence" && <RejectionEvidencePanel clearance={clearance} />}
        {activeTab === "history" && <ClearanceHistoryPanel clearance={clearance} />}
        {activeTab === "timeline" && <RejectionTimeline clearance={clearance} />}
        {activeTab === "appeal" && <StudentAppealCenter clearance={clearance} />}
        {activeTab === "review" && (
          <AppealReviewPanel 
            clearance={clearance} 
            onRequestInfo={() => setShowRequestInfoModal(true)}
            onSendReconsideration={() => setShowReconsiderationModal(true)}
            onReopen={() => setShowReopenModal(true)}
            onFinalReject={() => setShowFinalRejectModal(true)}
          />
        )}
      </div>

      {/* Modals */}
      {showRequestInfoModal && <RequestMoreInfoModal onClose={() => setShowRequestInfoModal(false)} clearance={clearance} />}
      {showReconsiderationModal && <SendForReconsiderationModal onClose={() => setShowReconsiderationModal(false)} clearance={clearance} />}
      {showReopenModal && <ReopenClearanceModal onClose={() => setShowReopenModal(false)} clearance={clearance} />}
      {showFinalRejectModal && <FinalRejectionModal onClose={() => setShowFinalRejectModal(false)} clearance={clearance} />}
    </div>
  );
}
