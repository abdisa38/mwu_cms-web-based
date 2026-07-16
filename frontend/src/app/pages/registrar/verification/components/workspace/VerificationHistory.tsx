import { FileText, Upload, User, UserCheck, MessageSquare } from "lucide-react";

export function VerificationHistory() {
  const history = [
    { event: "Account Registered", user: "Student", date: "Oct 24, 2023", time: "09:45 AM", icon: User, color: "text-blue-500", bg: "bg-blue-50" },
    { event: "Documents Uploaded", user: "Student", date: "Oct 24, 2023", time: "09:50 AM", icon: Upload, color: "text-indigo-500", bg: "bg-indigo-50" },
    { event: "Verification Started", user: "Registrar Admin", date: "Oct 24, 2023", time: "10:15 AM", icon: UserCheck, color: "text-amber-500", bg: "bg-amber-50" },
    { event: "Internal Note Added", user: "Registrar Admin", date: "Oct 24, 2023", time: "10:20 AM", icon: MessageSquare, color: "text-slate-500", bg: "bg-slate-100", note: "Waiting on confirmation for department transfer." },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-500" />
          Verification History
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
          {history.map((item, i) => (
            <div key={i} className="relative flex items-start group">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.bg} ${item.color} shrink-0 shadow-sm z-10`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="ml-4 p-3 w-full rounded-xl border border-transparent group-hover:border-slate-100 group-hover:bg-slate-50 transition-colors">
                <p className="text-sm text-slate-900 leading-relaxed font-medium">
                  {item.event}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  By {item.user} • {item.date} at {item.time}
                </p>
                {item.note && (
                  <div className="mt-2 text-sm text-slate-700 bg-white border border-slate-200 rounded p-3 italic">
                    "{item.note}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
