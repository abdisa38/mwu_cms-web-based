import { History, User } from "lucide-react";
import { TimelineEvent } from "../../data/types";

interface ClearanceTimelineProps {
  timeline: TimelineEvent[];
}

export function ClearanceTimeline({ timeline }: ClearanceTimelineProps) {
  if (timeline.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <History className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Timeline Data</h3>
        <p className="text-slate-500 mt-1 max-w-sm">There are no timeline events recorded for this clearance yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <History className="w-5 h-5 text-blue-600" />
          Clearance Timeline
        </h3>
      </div>
      
      <div className="p-6">
        <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-8">
          {timeline.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-8 h-8 bg-blue-50 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{event.action}</h4>
                    {event.remarks && (
                      <p className="text-sm text-slate-600 mt-2 bg-white p-3 rounded-lg border border-slate-200">
                        {event.remarks}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">{event.user}</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wide">{event.role} {event.department && `• ${event.department}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end shrink-0">
                    <span className="text-sm font-semibold text-slate-700">{event.date}</span>
                    <span className="text-xs text-slate-500 font-mono mt-0.5">{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
