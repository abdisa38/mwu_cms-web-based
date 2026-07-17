import { useState } from "react";
import { X, Maximize2, Minimize2, FileText, CheckSquare, History, Activity, AlertCircle } from "lucide-react";
import { ClearanceStatusPanel } from "./ClearanceStatusPanel";
import { DepartmentApprovalMatrix } from "./DepartmentApprovalMatrix";
import { ClearanceProgressVisualization } from "./ClearanceProgressVisualization";
import { ClearanceDocumentCenter } from "./ClearanceDocumentCenter";
import { ClearanceTimeline } from "./ClearanceTimeline";
import { ClearanceAuditLog } from "./ClearanceAuditLog";
import { mockPendingClearances } from "../../data/mockPendingData";

interface PendingWorkspaceProps {
  clearanceId: string;
  onClose: () => void;
}

export function PendingWorkspace({ clearanceId, onClose }: PendingWorkspaceProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'documents' | 'timeline' | 'audit'>('overview');

  const clearance = mockPendingClearances.find(c => c.id === clearanceId);
  if (!clearance) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'departments', label: 'Department Approvals', icon: CheckSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'audit', label: 'Audit Log', icon: AlertCircle },
  ] as const;

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end ${isFullscreen ? 'p-0' : 'sm:p-4 md:p-6 lg:p-8'}`}>
      <div className={`bg-white shadow-2xl flex flex-col w-full overflow-hidden transition-all duration-300 ${isFullscreen ? 'h-full w-full rounded-none' : 'h-full w-full max-w-[1400px] rounded-2xl'}`}>
        
        {/* Workspace Header */}
        <div className="h-16 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">Clearance Workspace</h2>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
              clearance.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              clearance.status === 'Blocked' ? 'bg-rose-100 text-rose-700 border-rose-200' :
              clearance.status === 'Ready for Registrar Review' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
              'bg-amber-100 text-amber-700 border-amber-200'
            }`}>
              {clearance.status}
            </span>
            <div className="w-px h-5 bg-slate-300"></div>
            <span className="text-sm text-slate-500 font-mono">ID: {clearance.clearanceNumber}</span>
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
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Priority</p>
              <p className={`text-sm font-bold ${clearance.priority === 'Critical' ? 'text-rose-600' : clearance.priority === 'High' ? 'text-amber-600' : 'text-slate-700'}`}>
                {clearance.priority}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Due Date</p>
              <p className="text-sm font-semibold text-slate-700">{new Date(clearance.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex gap-1 pt-2 shrink-0 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <ClearanceProgressVisualization clearance={clearance} />
                  {clearance.status === 'Blocked' && clearance.blockedBy && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                        <div>
                          <h4 className="font-bold text-rose-900">Blocked by {clearance.blockedBy.department}</h4>
                          <p className="text-rose-700 text-sm mt-1">{clearance.blockedBy.reason}</p>
                          <div className="mt-3 bg-white/60 p-3 rounded-lg border border-rose-100">
                            <p className="text-sm font-medium text-rose-900">Required Action:</p>
                            <p className="text-sm text-rose-700">{clearance.blockedBy.requiredAction}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <DepartmentApprovalMatrix clearance={clearance} preview />
                </div>
                <div className="xl:col-span-1 space-y-6">
                  <ClearanceStatusPanel clearance={clearance} />
                </div>
              </div>
            )}
            {activeTab === 'departments' && <DepartmentApprovalMatrix clearance={clearance} />}
            {activeTab === 'documents' && <ClearanceDocumentCenter documents={clearance.documents} />}
            {activeTab === 'timeline' && <ClearanceTimeline timeline={clearance.timeline} />}
            {activeTab === 'audit' && <ClearanceAuditLog logs={clearance.auditLogs} />}
          </div>
        </div>
      </div>
    </div>
  );
}
