import { StudentRecord } from "../../../data/types";
import { User, Mail, Phone, Calendar, MapPin, Heart } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function PersonalInfoTab({ student }: { student: StudentRecord }) {
  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" /> Public Information
          </h3>
          <Button variant="outline" className="text-xs py-1 h-8">Edit Public Info</Button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
            <div className="text-sm font-semibold text-slate-900">{student.fullName}</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Student ID</label>
            <div className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded w-max">{student.studentId}</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">University Email</label>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.email}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> {student.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-orange-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-500" /> Sensitive Information
          </h3>
          <Button variant="outline" className="text-xs py-1 h-8 border-orange-200 text-orange-700 hover:bg-orange-100">Unlock & Edit</Button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {/* Mock blur overlay for sensitive data */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-white/50 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">Restricted Access</div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Date of Birth</label>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {student.dateOfBirth}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Gender</label>
            <div className="text-sm text-slate-700">{student.gender}</div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">Permanent Address</label>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {student.address}
            </div>
          </div>
          <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">Emergency Contact</label>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> {student.emergencyContact}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Temporary inline Lock icon since it wasn't imported from lucide-react above
function Lock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}
