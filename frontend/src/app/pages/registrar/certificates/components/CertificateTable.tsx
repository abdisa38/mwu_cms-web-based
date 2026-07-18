import { useState } from "react";
import { CertificateRecord } from "../data/types";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  RefreshCw, 
  FileWarning, 
  MoreVertical, 
  Download, 
  Printer, 
  Eye, 
  ShieldCheck, 
  ShieldAlert
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/Button";

interface CertificateTableProps {
  data: CertificateRecord[];
  onRowClick: (cert: CertificateRecord) => void;
}

export function CertificateTable({ data, onRowClick }: CertificateTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(d => d.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Active":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3 h-3"/> Active</span>;
      case "Pending Generation":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><Clock className="w-3 h-3"/> Pending</span>;
      case "Revoked":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200"><XCircle className="w-3 h-3"/> Revoked</span>;
      case "Regenerated":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"><RefreshCw className="w-3 h-3"/> Regenerated</span>;
      case "Correction Requested":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200"><FileWarning className="w-3 h-3"/> Correction Req.</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch(status) {
      case "Verified":
        return <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium"><ShieldCheck className="w-4 h-4"/> Verified</span>;
      case "Verification Failed":
      case "Revoked":
        return <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium"><ShieldAlert className="w-4 h-4"/> Invalid</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium"><Clock className="w-4 h-4"/> Unverified</span>;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-y border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-medium">
            <th className="px-4 py-3 w-12 text-center">
              <input 
                type="checkbox" 
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={selectedRows.size === data.length && data.length > 0}
                onChange={toggleAll}
              />
            </th>
            <th className="px-4 py-3">Student / Department</th>
            <th className="px-4 py-3">Certificate Details</th>
            <th className="px-4 py-3">Clearance Info</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Verification</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((cert) => (
            <tr 
              key={cert.id} 
              onClick={() => onRowClick(cert)}
              className="hover:bg-blue-50/50 transition-colors cursor-pointer group bg-white"
            >
              <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedRows.has(cert.id)}
                  onChange={(e) => toggleRow(cert.id, e)}
                />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    {cert.studentPhoto ? (
                      <img src={cert.studentPhoto} alt={cert.studentName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-sm">
                        {cert.studentName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {cert.studentName}
                    </p>
                    <p className="text-xs text-slate-500">{cert.studentId}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[150px]">{cert.department}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                {cert.certificateNumber ? (
                  <div>
                    <p className="text-sm font-medium text-slate-900 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block">
                      {cert.certificateNumber}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">v{cert.certificateVersion}.0</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400 italic">Not Generated</span>
                )}
              </td>
              <td className="px-4 py-4">
                <div>
                  <p className="text-sm text-slate-700">{cert.clearanceNumber}</p>
                  <p className="text-xs text-slate-500 mt-1">{cert.clearanceType}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                {getStatusBadge(cert.certificateStatus)}
              </td>
              <td className="px-4 py-4">
                {getVerificationBadge(cert.verificationStatus)}
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {cert.certificateNumber && (
                    <>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50" title="Preview">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50" title="Download">
                        <Download className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-lg font-medium text-slate-900 mb-1">No certificates found</p>
                  <p className="text-sm">Adjust your search or filters to see results.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
