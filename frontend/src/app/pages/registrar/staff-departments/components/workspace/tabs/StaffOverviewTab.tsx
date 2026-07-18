import { StaffRecord } from "../../../data/types";
import { Mail, Phone, Clock, Key, Activity, Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function StaffOverviewTab({ staff }: { staff: StaffRecord }) {
  return (
    <div className="space-y-6">
      
      {/* Contact & Basics */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Contact Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">University Email</label>
            <div className="text-sm text-slate-900 flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-blue-600" /> {staff.email}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
            <div className="text-sm text-slate-900 flex items-center gap-2 font-medium">
              <Phone className="w-4 h-4 text-emerald-600" /> {staff.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Security & Access</h3>
          <Button variant="outline" className="text-xs h-8">Reset Password</Button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Account Created</label>
            <div className="text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> {new Date(staff.accountCreatedDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Last Login</label>
            <div className="text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" /> {staff.lastLogin ? new Date(staff.lastLogin).toLocaleString() : "Never"}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Two-Factor Auth</label>
            <div className="text-sm font-semibold text-emerald-600 flex items-center gap-2">
              <Key className="w-4 h-4" /> Enabled
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Performance Summary</h3>
        </div>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <Activity className="w-5 h-5 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 mb-1">{staff.assignedClearanceRequests}</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <div className="w-5 h-5 mx-auto mb-2 text-emerald-600 font-bold">✓</div>
            <div className="text-2xl font-bold text-emerald-600 mb-1">340</div>
            <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Approved</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <div className="w-5 h-5 mx-auto mb-2 text-red-600 font-bold">✗</div>
            <div className="text-2xl font-bold text-red-600 mb-1">12</div>
            <div className="text-xs font-medium text-red-700 uppercase tracking-wider">Rejected</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <Clock className="w-5 h-5 text-amber-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-slate-900 mb-1 mt-1">1.2d</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Time</div>
          </div>
        </div>
      </div>

    </div>
  );
}
