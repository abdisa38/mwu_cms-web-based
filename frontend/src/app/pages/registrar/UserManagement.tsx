import { Button } from "@/app/components/ui/Button";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle,
  Download
} from "lucide-react";
import { useState } from "react";

export function UserManagement() {
  const [activeTab, setActiveTab] = useState("all");

  const users = [
    { id: "UGR/1234/12", name: "John Doe", role: "Student", dept: "Computer Science", status: "Active", lastLogin: "2 hours ago" },
    { id: "EMP/001", name: "Sarah Officer", role: "Library Head", dept: "Library", status: "Active", lastLogin: "10 mins ago" },
    { id: "EMP/042", name: "Abebe Kebede", role: "Department Head", dept: "Software Eng", status: "Inactive", lastLogin: "5 days ago" },
    { id: "UGR/5533/11", name: "Betelhem Alemu", role: "Student", dept: "Information Sys", status: "Active", lastLogin: "1 day ago" },
    { id: "ADM/001", name: "Registrar Manager", role: "Admin", dept: "Registrar", status: "Active", lastLogin: "Just now" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500">Manage students, officers, and system administrators.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg self-start">
            {['All Users', 'Students', 'Officers', 'Admins'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.toLowerCase() ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
            </div>
            <Button variant="outline" className="bg-white px-3 border-slate-200">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Login</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'Student' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{user.name}</span>
                        <span className="text-xs text-slate-500">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      user.role === 'Student' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{user.dept}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {user.status === 'Active' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-400" />
                      )}
                      <span className={`font-medium ${user.status === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit User">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Reset Password">
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete User">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Showing 1 to 5 of 8,432 users</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-8">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
