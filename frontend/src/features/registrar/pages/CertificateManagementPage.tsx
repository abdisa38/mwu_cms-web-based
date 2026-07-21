import { useState } from 'react';
import { Search, Download, Award, FileBadge, CheckCircle, Printer } from 'lucide-react';
import { useGetAllCertificatesQuery } from '../api/registrarApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const CertificateManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetAllCertificatesQuery({ search: searchTerm });

  const certificates = data?.data?.certificates || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certificate Registry</h1>
          <p className="text-slate-500 mt-1">Manage, verify, and export official digital clearance certificates.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" /> Export Registry
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
              placeholder="Search by Certificate ID or Student..." 
              className="pl-9 h-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Certificate ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Clearance Type</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Loading certificates...
                  </td>
                </tr>
              ) : certificates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <FileBadge className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 text-lg">No certificates issued yet.</p>
                  </td>
                </tr>
              ) : (
                certificates.map((cert: any) => (
                  <tr key={cert._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-900 font-medium">
                        <Award className="h-4 w-4 text-blue-600 mr-2" />
                        {cert.certificateNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{cert.student?.firstName} {cert.student?.lastName}</p>
                      <p className="text-xs text-slate-500">{cert.student?.studentId}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {cert.clearance?.type?.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {new Date(cert.issuedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" title="Print">
                          <Printer className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download PDF">
                          <Download className="h-4 w-4 text-slate-600" />
                        </Button>
                      </div>
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
