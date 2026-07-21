import { useState } from 'react';
import { Search, Filter, Plus, UserCog, UserMinus, ShieldCheck } from 'lucide-react';
import { useGetAllStaffQuery } from '../api/registrarApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const StaffManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetAllStaffQuery({ search: searchTerm });

  const staff = data?.data?.users || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff & Users</h1>
          <p className="text-slate-500 mt-1">Manage system administrators, department officers, and roles.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Staff
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input 
              placeholder="Search by name, email, or department..." 
              className="pl-9 h-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white">
            <Filter className="h-4 w-4 mr-2" /> Role Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Loading staff directory...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <p className="text-slate-500 text-lg">No staff members found.</p>
                  </td>
                </tr>
              ) : (
                staff.map((user: any) => (
                  <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs mr-3 shrink-0">
                          {user.firstName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-900">
                        {user.role === 'SUPER_ADMIN' && <ShieldCheck className="h-4 w-4 text-purple-600 mr-2" />}
                        {user.role === 'REGISTRAR' && <ShieldCheck className="h-4 w-4 text-blue-600 mr-2" />}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.department || 'All (Admin)'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="icon" title="Edit Permissions">
                        <UserCog className="h-4 w-4 text-slate-600" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Deactivate" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
