import { useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { DocumentViewer } from "./DocumentViewer";
import { InformationComparison } from "./InformationComparison";
import { DuplicateWarning } from "./DuplicateWarning";
import { VerificationChecklist } from "./VerificationChecklist";
import { VerificationHistory } from "./VerificationHistory";
import { DecisionPanel } from "./DecisionPanel";
import { ApproveModal } from "../modals/ApproveModal";
import { RejectModal } from "../modals/RejectModal";
import { RequestInfoModal } from "../modals/RequestInfoModal";
import { SuspendModal } from "../modals/SuspendModal";

interface VerificationWorkspaceProps {
  studentId: string;
  onClose: () => void;
}

export function VerificationWorkspace({ studentId, onClose }: VerificationWorkspaceProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeModal, setActiveModal] = useState<'Approve' | 'Reject' | 'RequestInfo' | 'Suspend' | null>(null);

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end ${isFullscreen ? 'p-0' : 'sm:p-4 md:p-6 lg:p-8'}`}>
      <div className={`bg-white shadow-2xl flex flex-col w-full overflow-hidden transition-all duration-300 ${isFullscreen ? 'h-full w-full rounded-none' : 'h-full w-full max-w-[1400px] rounded-2xl'}`}>
        
        {/* Workspace Header */}
        <div className="h-16 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">Verification Workspace</h2>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 font-medium text-xs rounded-full border border-amber-200">
              Under Review
            </span>
            <div className="w-px h-5 bg-slate-300"></div>
            <span className="text-sm text-slate-500 font-mono">ID: {studentId}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Close Workspace"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-slate-100">
          {/* Left Column: Document Viewer (Sticky/Scrollable) */}
          <div className="w-full lg:w-1/2 xl:w-5/12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white flex flex-col h-1/2 lg:h-full">
            <DocumentViewer />
          </div>

          {/* Right Column: Information, Checklist, History */}
          <div className="w-full lg:w-1/2 xl:w-7/12 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 bg-slate-50">
            <DuplicateWarning />
            <InformationComparison />
            <VerificationChecklist />
            <VerificationHistory />
          </div>
        </div>

        {/* Workspace Footer: Decision Panel */}
        <div className="shrink-0 bg-white border-t border-slate-200 p-4 sm:px-6 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <DecisionPanel onAction={(action) => setActiveModal(action)} />
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'Approve' && <ApproveModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'Reject' && <RejectModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'RequestInfo' && <RequestInfoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'Suspend' && <SuspendModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
