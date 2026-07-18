import { useState } from "react";
import { X, UserPlus, Mail, Shield, Building2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col animate-in zoom-in-95 duration-200 my-auto">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Add New Staff Member</h3>
              <p className="text-sm text-slate-500">Create account and send invitation</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 overflow-y-auto max-h-[60vh]">
          
          {/* Basic Info */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <UserPlus className="w-4 h-4 text-slate-400" /> Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Abebe Kebede" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID *</label>
                <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. EMP-2023-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">University Email *</label>
                <input type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="name@mwu.edu.et" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+251..." />
              </div>
            </div>
          </div>

          {/* Department & Role */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building2 className="w-4 h-4 text-slate-400" /> Department & Role
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
                <select required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select Department...</option>
                  <option>Library</option>
                  <option>Dormitory</option>
                  <option>Registrar</option>
                  <option>Cafeteria</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
                <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Head Librarian" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">System Role *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  {/* Custom Radio Cards */}
                  <label className="border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-blue-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-colors">
                    <div className="flex items-start gap-2">
                      <input type="radio" name="role" value="Department Staff" className="mt-1" defaultChecked />
                      <div>
                        <div className="font-bold text-sm text-slate-900">Department Staff</div>
                        <div className="text-xs text-slate-500 mt-0.5">Basic clearance processing.</div>
                      </div>
                    </div>
                  </label>
                  <label className="border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-blue-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-colors">
                    <div className="flex items-start gap-2">
                      <input type="radio" name="role" value="Department Head" className="mt-1" />
                      <div>
                        <div className="font-bold text-sm text-slate-900">Department Head</div>
                        <div className="text-xs text-slate-500 mt-0.5">Approval authority for dept.</div>
                      </div>
                    </div>
                  </label>
                  <label className="border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-blue-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-colors">
                    <div className="flex items-start gap-2">
                      <input type="radio" name="role" value="Registrar Staff" className="mt-1" />
                      <div>
                        <div className="font-bold text-sm text-slate-900">Registrar Staff</div>
                        <div className="text-xs text-slate-500 mt-0.5">System-wide clearance mgmt.</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Invitation Settings */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-4">
            <Mail className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h5 className="font-bold text-blue-900 text-sm">Automated Invitation</h5>
              <p className="text-sm text-blue-800 mt-1">
                Upon creation, the system will email a secure activation link to the provided address. The staff member must set their own password and verify their email to activate the account.
              </p>
            </div>
          </div>

        </form>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 z-10">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Create Staff Account
          </Button>
        </div>

      </div>
    </div>
  );
}
