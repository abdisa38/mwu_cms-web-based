import { useState } from "react";
import { X, Maximize2, Minimize2, ShieldCheck, CheckSquare, FileText, Activity, AlertCircle, RefreshCw } from "lucide-react";
import { mockFinalApprovals } from "../../data/mockFinalApprovalData";
import { ApprovalProgressHeader } from "./ApprovalProgressHeader";
import { DecisionPanel } from "./DecisionPanel";
import { PreApprovalValidation } from "./PreApprovalValidation";
import { PhysicalIDVerification } from "./PhysicalIDVerification";
import { AppealWarning } from "./AppealWarning";
import { DepartmentApprovalMatrix } from "./DepartmentApprovalMatrix";
import { ClearanceDocumentCenter } from "./ClearanceDocumentCenter";
import { ClearanceAuditLog } from "./ClearanceAuditLog";
import { Button } from "../../../../../components/ui/Button";

// Modals
import { FinalApproveModal } from "../modals/FinalApproveModal";
import { CertificatePreviewModal } from "../modals/CertificatePreviewModal";
import { ReturnCorrectionModal } from "../modals/ReturnCorrectionModal";
import { HoldModal } from "../modals/HoldModal";
import { RequestInfoModal } from "../modals/RequestInfoModal";

interface FinalApprovalWorkspaceProps {
  clearanceId: string;
  onClose: () => void;
}

export function FinalApprovalWorkspace({ clearanceId, onClose }: FinalApprovalWorkspaceProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'validation' | 'departments' | 'documents' | 'audit'>('validation');
  
  const [activeModal, setActiveModal] = useState<'Approve' | 'Certificate' | 'Return' | 'Hold' | 'RequestInfo' | 'Reject' | null>(null);

  const clearance = mockFinalApprovals.find(c => c.id === clearanceId);
  if (!clearance) return null;

  const tabs = [
    { id: 'validation', label: 'Final Validation', icon: ShieldCheck },
    { id: 'departments', label: 'Department Approvals', icon: CheckSquare },
    { id: 'documents', label: 'Documents & ID', icon: FileText },
    { id: 'audit', label: 'System Audit Trail', icon: Activity },
  ] as const;

  // Compute if ready for final approval
  const allValidationsPassed = clearance.validations.every(v => v.status === 'Passed' || v.status === 'Not Applicable');
  const noActiveAppeals = clearance.activeAppeals.length === 0;
  const isValidated = allValidationsPassed && noActiveAppeals && clearance.status !== 'Approved';

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end ${isFullscreen ? 'p-0' : 'sm:p-4 md:p-6 lg:p-8'}`}>
      <div className={`bg-white shadow-2xl flex flex-col w-full overflow-hidden transition-all duration-300 ${isFullscreen ? 'h-full w-full rounded-none' : 'h-full w-full max-w-[1400px] rounded-2xl'}`}>
        
        {/* Workspace Header */}
        <div className="h-16 border-b border-slate-200 bg-[#0F172A] text-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold">Official Final Approval Workspace</h2>
            <div className="w-px h-5 bg-slate-700"></div>
            <span className="text-sm text-slate-300 font-mono">ID: {clearance.clearanceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Student Profile Ribbon */}
        <div className="bg-white border-b border-slate-200 p-4 px-6 flex items-center gap-6 shrink-0">
          <img src={clearance.studentPhoto} alt={clearance.studentName} className="w-16 h-16 rounded-full border-2 border-slate-100 object-cover" />
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900">{clearance.studentName}</h3>
            <div className="text-sm text-slate-500 font-mono flex items-center gap-2 mt-0.5">
              <span>{clearance.studentId}</span>
              <span className="text-slate-300">•</span>
              <span>{clearance.email}</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">College</p>
              <p className="text-sm font-semibold text-slate-700">{clearance.college}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Department</p>
              <p className="text-sm font-semibold text-slate-700">{clearance.department}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Clearance Type</p>
              <p className="text-sm font-bold text-slate-900">{clearance.type}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">System Status</p>
              <p className={`text-sm font-bold ${
                clearance.status === 'Approved' ? 'text-emerald-600' :
                clearance.status === 'Blocked' ? 'text-rose-600' :
                'text-blue-600'
              }`}>{clearance.status}</p>
            </div>
          </div>
        </div>

        {/* Workflow Progress Header */}
        <ApprovalProgressHeader clearance={clearance} />

        {/* Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex gap-1 pt-2 shrink-0 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 rounded-t-lg' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'validation' && !isValidated && clearance.status !== 'Approved' && (
                <AlertCircle className="w-4 h-4 text-rose-500 ml-1" />
              )}
            </button>
          ))}
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <AppealWarning appeals={clearance.activeAppeals} />

            {activeTab === 'validation' && (
              <div className="space-y-6">
                <PreApprovalValidation validations={clearance.validations} />
                
                {/* Final Review Notes */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-lg">Registrar Final Review Notes</h3>
                  </div>
                  <div className="p-6">
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none resize-none min-h-[150px]"
                      placeholder="Enter internal notes, decision summaries, or required comments..."
                      readOnly={clearance.status === 'Approved'}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-slate-400 font-mono">0 / 1000 characters</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'departments' && <DepartmentApprovalMatrix clearance={clearance} />}
            
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <PhysicalIDVerification clearance={clearance} />
                <ClearanceDocumentCenter documents={clearance.documents} />
              </div>
            )}
            
            {activeTab === 'audit' && <ClearanceAuditLog logs={clearance.auditLogs} />}
          </div>
        </div>

        {/* Workspace Footer: Decision Panel */}
        <div className="shrink-0 bg-white border-t border-slate-200 p-4 sm:px-6 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {clearance.status === 'Approved' ? (
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Final Clearance Approved</p>
                  <p className="text-sm text-slate-500">This request is permanently locked and completed.</p>
                </div>
              </div>
              <Button onClick={() => setActiveModal('Certificate')} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                View Certificate
              </Button>
            </div>
          ) : (
            <DecisionPanel 
              clearance={clearance} 
              onAction={(action) => setActiveModal(action)} 
              isValidated={isValidated} 
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'Approve' && <FinalApproveModal clearance={clearance} onClose={() => setActiveModal(null)} onPreviewCertificate={() => setActiveModal('Certificate')} />}
      {activeModal === 'Certificate' && <CertificatePreviewModal clearance={clearance} onClose={() => setActiveModal(null)} />}
      {activeModal === 'Return' && <ReturnCorrectionModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'Hold' && <HoldModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'RequestInfo' && <RequestInfoModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
