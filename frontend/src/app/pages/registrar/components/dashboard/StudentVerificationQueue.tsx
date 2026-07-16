import { ShieldCheck, Check, X, Eye, Users } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export function StudentVerificationQueue() {
  const pendingStudents = [
    { id: "UGR/1234/12", name: "Abebe Kebede", dept: "Computer Science", type: "ID Verification", time: "10 mins ago" },
    { id: "UGR/5678/13", name: "Sara Mohammed", dept: "Software Engineering", type: "Photo Match", time: "25 mins ago" },
    { id: "UGR/9012/14", name: "Dawit Tadesse", dept: "Information Systems", type: "Manual Review", time: "1 hour ago" },
    { id: "UGR/3456/12", name: "Hirut Bekele", dept: "Computer Science", type: "ID Verification", time: "2 hours ago" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          Student Verification Queue
        </h3>
        <span className="bg-amber-100 text-amber-700 py-0.5 px-2 rounded-full text-xs font-bold shadow-sm">
          14 Pending
        </span>
      </div>
      
      <div className="p-0 flex-1 overflow-auto">
        <ul className="divide-y divide-slate-100">
          {pendingStudents.map((student, idx) => (
            <li key={idx} className="p-4 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 text-sm">{student.name} <span className="text-slate-500 font-normal">({student.id})</span></span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{student.dept}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                      {student.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
        <Button variant="ghost" size="sm" className="text-blue-600 w-full hover:bg-blue-50">
          <Users className="w-4 h-4 mr-2" /> View All Pending Verifications
        </Button>
      </div>
    </div>
  );
}
