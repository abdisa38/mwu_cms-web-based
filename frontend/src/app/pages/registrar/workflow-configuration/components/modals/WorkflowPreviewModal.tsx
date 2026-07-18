import { useState } from "react";
import { X, PlayCircle, FastForward, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface WorkflowPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowName: string;
}

export function WorkflowPreviewModal({ isOpen, onClose, workflowName }: WorkflowPreviewModalProps) {
  const [scenario, setScenario] = useState("ideal");
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold">Interactive Workflow Simulation</h3>
              <p className="text-xs text-slate-400">Testing: {workflowName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulator Body */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Simulation Controls Sidebar */}
          <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Test Scenario</h4>
            <div className="space-y-2 mb-8">
              <label className="flex items-start gap-2 p-3 border border-slate-200 rounded-lg bg-white cursor-pointer hover:border-indigo-300 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 transition-colors">
                <input type="radio" name="scenario" checked={scenario === 'ideal'} onChange={() => {setScenario('ideal'); setStep(1)}} className="mt-0.5 text-indigo-600" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Ideal Path (Happy)</div>
                  <div className="text-xs text-slate-500 mt-0.5">All approvals pass immediately.</div>
                </div>
              </label>
              <label className="flex items-start gap-2 p-3 border border-slate-200 rounded-lg bg-white cursor-pointer hover:border-indigo-300 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 transition-colors">
                <input type="radio" name="scenario" checked={scenario === 'reject'} onChange={() => {setScenario('reject'); setStep(1)}} className="mt-0.5 text-indigo-600" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Rejection Path</div>
                  <div className="text-xs text-slate-500 mt-0.5">Library rejects due to unreturned book.</div>
                </div>
              </label>
              <label className="flex items-start gap-2 p-3 border border-slate-200 rounded-lg bg-white cursor-pointer hover:border-indigo-300 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 transition-colors">
                <input type="radio" name="scenario" checked={scenario === 'escalate'} onChange={() => {setScenario('escalate'); setStep(1)}} className="mt-0.5 text-indigo-600" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Overdue Escalation</div>
                  <div className="text-xs text-slate-500 mt-0.5">Department misses deadline.</div>
                </div>
              </label>
            </div>

            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Controls</h4>
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2 mb-2" onClick={() => setStep(prev => Math.min(prev + 1, 5))}>
              <FastForward className="w-4 h-4" /> Next Step
            </Button>
            <Button variant="outline" className="w-full text-slate-600" onClick={() => setStep(1)}>
              Restart Simulation
            </Button>
          </div>

          {/* Simulation Viewport */}
          <div className="flex-1 bg-slate-100 p-8 overflow-y-auto">
            <div className="max-w-xl mx-auto space-y-6">
              
              {/* Step 1 */}
              {step >= 1 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                    <h4 className="font-bold text-slate-900">Student Initiates Clearance</h4>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100 flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-500 mt-0.5" /> 
                    Student submits clearance form and uploads ID Card.
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step >= 2 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
                    <h4 className="font-bold text-slate-900">System Validation</h4>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg text-sm text-emerald-800 border border-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" /> 
                    System verifies active student status. Automation passed. Routing to Departments.
                  </div>
                </div>
              )}

              {/* Step 3 - Branching based on scenario */}
              {step >= 3 && scenario === 'ideal' && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">3</div>
                    <h4 className="font-bold text-slate-900">Parallel Department Review</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-slate-50 p-2 rounded text-sm flex justify-between items-center border border-slate-100">
                      <span>Library</span> <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Approved</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-sm flex justify-between items-center border border-slate-100">
                      <span>Dormitory</span> <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Approved</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-sm flex justify-between items-center border border-slate-100">
                      <span>Cafeteria</span> <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Approved</span>
                    </div>
                  </div>
                </div>
              )}

              {step >= 3 && scenario === 'reject' && (
                <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">3</div>
                    <h4 className="font-bold text-red-900">Department Rejection Triggered</h4>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-sm text-red-800 border border-red-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" /> 
                    <div>
                      <strong>Library</strong> rejected the clearance.<br/>
                      Reason: Unreturned book ("Advanced Data Structures").<br/>
                      <em>Workflow paused. Notification sent to student.</em>
                    </div>
                  </div>
                </div>
              )}

              {step >= 3 && scenario === 'escalate' && (
                <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-sm animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">3</div>
                    <h4 className="font-bold text-amber-900">Deadline Escalation Triggered</h4>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-sm text-amber-800 border border-amber-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" /> 
                    <div>
                      <strong>Dormitory</strong> exceeded 2-day SLA.<br/>
                      <em>Automated action: High Priority Task created for Dormitory Head. Registrar Notified.</em>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
