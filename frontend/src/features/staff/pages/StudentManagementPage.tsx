import { useState } from 'react';
import { Search, Filter, MoreHorizontal, FileText } from 'lucide-react';
import { useGetDepartmentStudentsQuery } from '../api/staffApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const StudentManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetDepartmentStudentsQuery({ search: searchTerm });

  const students = data?.data?.users || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Database</h1>
          <p className="text-slate-500 mt-1">Search and view student profiles within your department.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input 
              placeholder="Search by name, ID, or email..." 
              className="pl-9 h-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">ID Number</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Loading students...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <p className="text-slate-500 text-lg">No students found.</p>
                  </td>
                </tr>
              ) : (
                students.map((student: any) => (
                  <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs mr-3 shrink-0">
                          {student.firstName?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{student.studentId}</td>
                    <td className="px-6 py-4 text-slate-600">Regular Degree</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
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
