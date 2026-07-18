import { ChevronDown, Download, Eye, Award, CheckCircle2, ShieldAlert, KeyRound, ShieldCheck } from "lucide-react";
import { CompletedClearance, CertificateStatus } from "../data/types";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/Button";

interface CompletedArchiveTableProps {
  data: CompletedClearance[];
  onRowClick: (clearance: CompletedClearance) => void;
}

const statusColors: Record<CertificateStatus, string> = {
  Generated: "bg-blue-100 text-blue-700 border-blue-200",
  Downloaded: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Verified: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Corrected: "bg-amber-100 text-amber-700 border-amber-200",
  Revoked: "bg-red-100 text-red-700 border-red-200",
  Archived: "bg-slate-100 text-slate-700 border-slate-200",
};

export function CompletedArchiveTable({ data, onRowClick }: CompletedArchiveTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 w-10">
              <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            </th>
            <th className="px-4 py-3">Student Record</th>
            <th className="px-4 py-3">Clearance Details</th>
            <th className="px-4 py-3">Completion Date</th>
            <th className="px-4 py-3">Certificate Status</th>
            <th className="px-4 py-3">Verification</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr 
              key={row.id} 
              className="hover:bg-slate-50 transition-colors cursor-pointer group"
              onClick={() => onRowClick(row)}
            >
              <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={row.student.photoUrl}
                    alt={row.student.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{row.student.name}</p>
                    <p className="text-xs text-slate-500">{row.student.id} • {row.student.department}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-slate-900">{row.clearanceNumber}</p>
                  <p className="text-xs text-slate-500">{row.type}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {new Date(row.finalApprovalDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    By {row.finalApprovedBy.split(" ")[1]}
                  </p>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[row.certificate.status]}`}>
                  {row.certificate.status}
                </span>
                {row.recordStatus === "Corrected" && (
                  <span className="ml-2 text-xs text-amber-600 font-medium border border-amber-200 bg-amber-50 px-2 py-0.5 rounded-full">
                    Amended
                  </span>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  {row.certificate.totalVerificationCount > 0 ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-medium">{row.certificate.totalVerificationCount} Scans</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Not verified yet</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 text-right">
                <Button 
                  variant="ghost" 
                  className="px-2 py-1 h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={(e) => { e.stopPropagation(); onRowClick(row); }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Archive
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
