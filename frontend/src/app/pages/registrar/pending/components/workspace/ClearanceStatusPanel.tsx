import { ShieldAlert, User, Building, UserCheck, AlertTriangle, MessageSquare, Send, CornerUpRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { ClearanceRequest } from "../../data/types";

interface ClearanceStatusPanelProps {
  clearance: ClearanceRequest;
}

export function ClearanceStatusPanel({ clearance }: ClearanceStatusPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          Status Overview
        </h3>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              clearance.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
              clearance.status === 'Blocked' ? 'bg-rose-100 text-rose-600' :
              clearance.status === 'Ready for Registrar Review' ? 'bg-emerald-100 text-emerald-600' :
              'bg-amber-100 text-amber-600'
            }`}>
              {clearance.status === 'Blocked' ? <AlertTriangle className="w-5 h-5" /> : 
               clearance.status === 'Ready for Registrar Review' ? <CheckCircle2 className="w-5 h-5" /> :
               <Clock className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Current Status</p>
              <p className="font-bold text-slate-900">{clearance.status}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <Building className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Current Stage</p>
              <p className="text-sm font-semibold text-slate-900">{clearance.currentStage}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <UserCheck className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Departments</p>
              <p className="text-sm font-semibold text-slate-900">{clearance.pendingDepartments.join(', ') || 'None'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <User className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Last Updated</p>
              <p className="text-sm font-semibold text-slate-900">{new Date(clearance.lastActivity).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-slate-50 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Registrar Action Center</h4>
        <div className="grid grid-cols-2 gap-2">
          {clearance.status === 'Ready for Registrar Review' ? (
            <>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Final Approve
              </Button>
              <Button variant="outline" className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300" size="sm">
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full bg-white hover:bg-slate-50 border-slate-200 text-slate-700" size="sm">
                <Send className="w-4 h-4 mr-2 text-blue-500" />
                Send Reminder
              </Button>
              <Button variant="outline" className="w-full bg-white hover:bg-slate-50 border-slate-200 text-slate-700" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                Escalate
              </Button>
            </>
          )}
          <Button variant="outline" className="w-full bg-white hover:bg-slate-50 border-slate-200 text-slate-700" size="sm">
            <CornerUpRight className="w-4 h-4 mr-2 text-indigo-500" />
            Reassign
          </Button>
          <Button variant="outline" className="w-full bg-white hover:bg-slate-50 border-slate-200 text-slate-700" size="sm">
            <MessageSquare className="w-4 h-4 mr-2 text-emerald-500" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}
