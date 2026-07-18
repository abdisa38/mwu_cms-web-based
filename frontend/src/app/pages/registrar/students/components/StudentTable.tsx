import { MoreVertical, Mail, CheckCircle2, XCircle, AlertCircle, Clock, Eye, ShieldAlert, GraduationCap } from "lucide-react";
import { StudentRecord } from "../data/types";

interface StudentTableProps {
  students: StudentRecord[];
  onSelectStudent: (student: StudentRecord) => void;
}

export function StudentTable({ students, onSelectStudent }: StudentTableProps) {
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Active": return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Active</span>;
      case "Suspended": return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Suspended</span>;
      case "Graduated": return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1"><GraduationCap className="w-3 h-3"/> Graduated</span>;
      default: return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch(status) {
      case "Verified": return <div className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 className="w-4 h-4"/> <span className="text-sm font-medium">Verified</span></div>;
      case "Pending": return <div className="flex items-center gap-1.5 text-amber-600"><Clock className="w-4 h-4"/> <span className="text-sm font-medium">Pending</span></div>;
      case "Rejected": return <div className="flex items-center gap-1.5 text-red-600"><XCircle className="w-4 h-4"/> <span className="text-sm font-medium">Rejected</span></div>;
      default: return <div className="flex items-center gap-1.5 text-slate-500"><AlertCircle className="w-4 h-4"/> <span className="text-sm font-medium">{status}</span></div>;
    }
  };

  const getClearanceBadge = (status: string) => {
    switch(status) {
      case "Completed": return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-medium">Completed</span>;
      case "In Progress": return <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-medium">In Progress</span>;
      case "Pending": return <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-medium">Pending Start</span>;
      case "No Clearance": return <span className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded-md text-xs font-medium">None</span>;
      default: return <span className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold w-10">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th className="p-4 font-semibold">Student Information</th>
              <th className="p-4 font-semibold">Academic Program</th>
              <th className="p-4 font-semibold">Account Status</th>
              <th className="p-4 font-semibold">Verification</th>
              <th className="p-4 font-semibold">Current Clearance</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                onClick={() => onSelectStudent(student)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </td>
                
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {student.profilePhoto ? (
                      <img src={student.profilePhoto} alt={student.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold">
                        {student.fullName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {student.fullName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{student.studentId}</span>
                        <span>•</span>
                        <span>{student.email}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="text-sm font-medium text-slate-900">{student.department}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Year {student.yearLevel} • {student.college}</div>
                </td>

                <td className="p-4">
                  {getStatusBadge(student.studentStatus)}
                </td>

                <td className="p-4">
                  {getVerificationBadge(student.verificationStatus)}
                </td>

                <td className="p-4">
                  {getClearanceBadge(student.currentClearanceStatus)}
                </td>

                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Profile"
                      onClick={() => onSelectStudent(student)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Suspend Account">
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-600">
        <div>Showing 1 to {students.length} of 12,450 students</div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors" disabled>Previous</button>
          <button className="px-3 py-1 border border-blue-600 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">2</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">3</button>
          <span className="px-2 py-1">...</span>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">1245</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
