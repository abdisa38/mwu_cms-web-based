import { 
  UserPlus, 
  UserCheck, 
  CheckCircle2, 
  Award, 
  Settings, 
  Building2, 
  Users, 
  Megaphone,
  History
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function RecentActivitiesTimeline() {
  const activities = [
    { type: 'Student Registered', user: 'System', target: 'Natnael Tilahun (UGR/7765/14)', time: '10 mins ago', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50' },
    { type: 'Student Verified', user: 'Registrar Admin', target: 'Kidist Alemu', time: '45 mins ago', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { type: 'Department Approved', user: 'Library Dept', target: 'Chala Merera', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { type: 'Registrar Approved', user: 'Registrar Manager', target: 'Yosef Mulugeta', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { type: 'Certificate Generated', user: 'System', target: 'Yosef Mulugeta', time: '3 hours ago', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50' },
    { type: 'Department Updated', user: 'Registrar Admin', target: 'Sports Department', time: 'Yesterday', icon: Building2, color: 'text-amber-500', bg: 'bg-amber-50' },
    { type: 'Officer Assigned', user: 'Registrar Admin', target: 'Ato Kebede (Dormitory)', time: 'Yesterday', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { type: 'Announcement Posted', user: 'Registrar Manager', target: '"Semester II Clearance Open"', time: '2 days ago', icon: Megaphone, color: 'text-orange-500', bg: 'bg-orange-50' },
    { type: 'System Settings', user: 'Registrar Manager', target: 'SLA Timeouts Configured', time: '3 days ago', icon: Settings, color: 'text-slate-500', bg: 'bg-slate-100' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          Recent Activities
        </h3>
        <Button variant="ghost" size="sm" className="text-blue-600 h-8">View Audit Log</Button>
      </div>
      
      <div className="p-6 flex-1 overflow-auto">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
          {activities.map((item, i) => (
            <div key={i} className="relative flex items-start group">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.bg} ${item.color} shrink-0 shadow-sm z-10`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="ml-4 p-3 w-full rounded-xl border border-transparent group-hover:border-slate-100 group-hover:bg-slate-50 transition-colors">
                <p className="text-sm text-slate-900 leading-relaxed">
                  <span className="font-semibold">{item.user}</span> • <span className="text-slate-600">{item.type}</span> {item.target && <span className="font-medium text-blue-700 block mt-0.5">{item.target}</span>}
                </p>
                <p className="text-xs text-slate-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
