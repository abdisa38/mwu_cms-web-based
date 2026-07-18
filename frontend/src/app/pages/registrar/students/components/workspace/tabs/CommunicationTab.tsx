import { StudentRecord } from "../../../data/types";
import { Mail, Bell, MessageSquare, Check, X } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function CommunicationTab({ student }: { student: StudentRecord }) {
  
  const getCommIcon = (type: string) => {
    switch(type) {
      case "Email": return <Mail className="w-4 h-4 text-blue-600" />;
      case "System Alert": return <Bell className="w-4 h-4 text-amber-600" />;
      case "Message": return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      default: return <Mail className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-slate-600" /> Communication History
        </h3>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Send Message</Button>
      </div>

      {student.communications.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-medium">No Communications</h4>
          <p className="text-sm text-slate-500 mt-1">No messages or alerts have been sent to this student.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {student.communications.map(comm => (
            <div key={comm.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 justify-between items-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {getCommIcon(comm.type)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{comm.subject}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{comm.type}</span>
                    <span>•</span>
                    <span>{new Date(comm.date).toLocaleString()}</span>
                    <span>•</span>
                    <span>From: {comm.sender}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-medium w-full sm:w-auto justify-end">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Status:</span>
                  {comm.status === "Delivered" || comm.status === "Sent" ? (
                    <span className="text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {comm.status}</span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1"><X className="w-3.5 h-3.5" /> {comm.status}</span>
                  )}
                </div>
                <div className="w-px h-4 bg-slate-200 hidden sm:block"></div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Read:</span>
                  {comm.readStatus === "Read" ? (
                    <span className="text-blue-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Yes</span>
                  ) : (
                    <span className="text-slate-400">No</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
