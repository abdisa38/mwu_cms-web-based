import { useState } from 'react';
import { Download, Award, Eye, FileBadge } from 'lucide-react';
import { useGetMyCertificatesQuery } from '../api/studentApi';
import { Button } from '@/components/ui/button';

export const StudentCertificatesPage = () => {
  const { data, isLoading } = useGetMyCertificatesQuery();
  const certificates = data?.data?.certificates || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Certificates</h1>
        <p className="text-slate-500 mt-1">Access and download your digital clearance certificates.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
        {isLoading ? (
          <div className="text-center py-12 text-slate-500">Loading certificates...</div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No Certificates Available</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
              You will receive your digital certificate here once your clearance process is 100% complete.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert: any) => (
              <div key={cert._id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex flex-col items-center justify-center text-white relative">
                  <FileBadge className="h-16 w-16 opacity-20 absolute top-4 right-4" />
                  <Award className="h-12 w-12 mb-3" />
                  <h3 className="font-bold text-lg text-center">Clearance Certificate</h3>
                  <p className="text-blue-200 text-xs mt-1">Madda Walabu University</p>
                </div>
                <div className="p-4 bg-white">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Issued On:</span>
                      <span className="font-medium text-slate-900">{new Date(cert.issuedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">ID:</span>
                      <span className="font-medium text-slate-900">{cert.certificateNumber}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full text-xs">
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                    <Button className="w-full text-xs">
                      <Download className="mr-2 h-4 w-4" /> PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
