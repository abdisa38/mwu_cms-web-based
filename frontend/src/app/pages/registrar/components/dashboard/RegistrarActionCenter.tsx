import { 
  CheckSquare, 
  UserCheck, 
  Award, 
  Building2, 
  Users, 
  Megaphone, 
  Bell, 
  FileText, 
  ShieldCheck, 
  Settings 
} from "lucide-react";
import { Link } from "react-router";

export function RegistrarActionCenter() {
  const actions = [
    { icon: UserCheck, label: "Verify Student", color: "text-blue-600", bg: "bg-blue-100", path: "/registrar/users" },
    { icon: CheckSquare, label: "Approve Final Clearance", color: "text-emerald-600", bg: "bg-emerald-100", path: "/registrar/approvals" },
    { icon: Award, label: "Generate Certificate", color: "text-purple-600", bg: "bg-purple-100", path: "/registrar/certificates" },
    { icon: Building2, label: "Manage Departments", color: "text-amber-600", bg: "bg-amber-100", path: "/registrar/departments" },
    { icon: Users, label: "Manage Officers", color: "text-indigo-600", bg: "bg-indigo-100", path: "/registrar/users" },
    { icon: ShieldCheck, label: "Audit Logs", color: "text-slate-600", bg: "bg-slate-200", path: "/registrar/audit-logs" },
    { icon: Megaphone, label: "Create Announcement", color: "text-orange-600", bg: "bg-orange-100", path: "#" },
    { icon: Bell, label: "Broadcast Notification", color: "text-sky-600", bg: "bg-sky-100", path: "#" },
    { icon: FileText, label: "Generate Reports", color: "text-teal-600", bg: "bg-teal-100", path: "/registrar/reports" },
    { icon: Settings, label: "System Settings", color: "text-slate-600", bg: "bg-slate-100", path: "/registrar/settings" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900">Registrar Action Center</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {actions.map((action, idx) => (
            <Link key={idx} to={action.path} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all group text-center gap-3">
              <div className={`w-12 h-12 rounded-full ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-900">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
