import { FileText, MoreVertical, Eye, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export function RecentClearanceRequestsTable() {
  const requests = [
    { student: "Chala Merera", id: "UGR/8821/11", dept: "Civil Engineering", type: "Graduation", status: "Pending Registrar", currentDept: "Registrar", date: "Today, 09:45 AM", priority: "High" },
    { student: "Tigist Bekele", id: "UGR/4432/12", dept: "Law", type: "Withdrawal", status: "In Progress", currentDept: "Library", date: "Today, 08:30 AM", priority: "Normal" },
    { student: "Kidist Alemu", id: "UGR/9981/13", dept: "Medicine", type: "Transfer", status: "Pending Registrar", currentDept: "Registrar", date: "Yesterday, 04:15 PM", priority: "Urgent" },
    { student: "Yonas Tesfaye", id: "UGR/1122/12", dept: "Computer Science", type: "Graduation", status: "Rejected", currentDept: "Student Cafe", date: "Yesterday, 02:00 PM", priority: "Normal" },
    { student: "Betelhem Getachew", id: "UGR/5544/14", dept: "Accounting", type: "Withdrawal", status: "In Progress", currentDept: "Finance", date: "Oct 24, 11:20 AM", priority: "Normal" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-500" />
          Recent Clearance Requests
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="pl-3 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-48"
            />
          </div>
          <Button variant="outline" size="sm" className="h-8">Filter</Button>
          <Button variant="ghost" size="sm" className="text-blue-600 h-8">View All</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold">Student</th>
              <th className="px-6 py-3 font-semibold">Student ID</th>
              <th className="px-6 py-3 font-semibold">Department</th>
              <th className="px-6 py-3 font-semibold">Type</th>
              <th className="px-6 py-3 font-semibold">Current Status</th>
              <th className="px-6 py-3 font-semibold">Date Submitted</th>
              <th className="px-6 py-3 font-semibold text-center">Priority</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {req.student}
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono">
                  {req.id}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {req.dept}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {req.type}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit ${
                      req.status === 'Pending Registrar' ? 'bg-amber-100 text-amber-700' : 
                      req.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {req.status}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">at {req.currentDept}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {req.date}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${
                    req.priority === 'Urgent' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                    req.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {req.status === 'Pending Registrar' && (
                      <>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
