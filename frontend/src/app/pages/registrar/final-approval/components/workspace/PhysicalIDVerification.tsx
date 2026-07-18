import { CreditCard, CheckCircle2, XCircle, AlertTriangle, FileSignature } from "lucide-react";
import { FinalApprovalRequest } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface PhysicalIDVerificationProps {
  clearance: FinalApprovalRequest;
}

export function PhysicalIDVerification({ clearance }: PhysicalIDVerificationProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          Physical Student ID Verification
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          clearance.physicalIdStatus === 'Verified' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
          clearance.physicalIdStatus === 'Not Received' ? 'bg-amber-100 text-amber-700 border-amber-200' :
          clearance.physicalIdStatus === 'Not Required' ? 'bg-slate-100 text-slate-700 border-slate-200' :
          'bg-rose-100 text-rose-700 border-rose-200'
        }`}>
          Status: {clearance.physicalIdStatus}
        </span>
      </div>
      
      <div className="p-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">ID Card Number</p>
              <p className="text-sm font-bold text-slate-900 mt-1">{clearance.studentId}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Student Name on Card</p>
              <p className="text-sm font-bold text-slate-900 mt-1">{clearance.studentName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Photo Match</p>
              <p className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Confirmed Match
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Received Date</p>
              <p className="text-sm font-bold text-slate-900 mt-1">
                {clearance.physicalIdStatus === 'Verified' ? '2024-06-15 10:30 AM' : 'Pending'}
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wider block mb-2">Verification Notes</label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none resize-none"
              rows={3}
              placeholder="Enter notes about the card condition or reception..."
              defaultValue={clearance.physicalIdStatus === 'Verified' ? 'Card received in good condition. Punched and filed.' : ''}
            ></textarea>
          </div>
        </div>

        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Registrar Actions</p>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" disabled={clearance.physicalIdStatus === 'Verified'}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark as Verified
          </Button>
          <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50" disabled={clearance.physicalIdStatus === 'Verified'}>
            <FileSignature className="w-4 h-4 mr-2 text-blue-600" />
            Mark as Received
          </Button>
          <Button variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-50" disabled={clearance.physicalIdStatus === 'Not Received'}>
            <XCircle className="w-4 h-4 mr-2" />
            Reject Verification
          </Button>
          <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50" disabled={clearance.physicalIdStatus === 'Verified'}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Request Physical ID
          </Button>
        </div>
      </div>
    </div>
  );
}
