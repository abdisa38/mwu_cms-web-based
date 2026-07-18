import { useState } from "react";
import { MoreVertical, Mail, ShieldAlert, Clock, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { mockPendingClearances } from "../data/mockPendingData";

interface PendingQueueTableProps {
  onSelectClearance: (clearanceId: string) => void;
}

export function PendingQueueTable({ onSelectClearance }: PendingQueueTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedRows(newSet);
  };

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(mockPendingClearances.map(c => c.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const renderProgressBar = (progress: number) => {
    return (
      <div className="w-full max-w-[120px] flex items-center gap-2">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-600">{progress}%</span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto min-h-[500px]">
      <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="px-4 py-3 w-12 text-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                onChange={toggleAll}
                checked={selectedRows.size === mockPendingClearances.length && mockPendingClearances.length > 0}
              />
            </th>
            <th className="px-4 py-3 font-semibold">Student & ID</th>
            <th className="px-4 py-3 font-semibold">Clearance Details</th>
            <th className="px-4 py-3 font-semibold">Academic Profile</th>
            <th className="px-4 py-3 font-semibold">Progress & Stage</th>
            <th className="px-4 py-3 font-semibold">Priority & Due</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {mockPendingClearances.map((req) => {
            const isSelected = selectedRows.has(req.id);
            return (
              <tr 
                key={req.id} 
                onClick={() => onSelectClearance(req.id)}
                className={`hover:bg-blue-50/50 transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50/80' : 'bg-white'}`}
              >
                <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleRow(req.id, e as any);
                    }}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={req.studentPhoto} 
                      alt={req.studentName} 
                      className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{req.studentName}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5">{req.studentId}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-900">{req.type}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono mt-0.5">{req.clearanceNumber}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-medium truncate max-w-[200px]">{req.department}</span>
                    <span className="text-xs text-slate-500 truncate max-w-[200px]">{req.college}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1.5">
                    {renderProgressBar(req.overallProgress)}
                    <span className="text-xs text-slate-500">
                      Stage: <span className="font-medium text-slate-700">{req.currentStage}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    {req.priority === 'Critical' ? (
                      <span className="inline-flex items-center text-rose-700 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-200 w-fit">
                        <ShieldAlert className="w-3 h-3 mr-1" /> Critical
                      </span>
                    ) : req.priority === 'High' ? (
                      <span className="inline-flex items-center text-amber-700 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
                        <AlertCircle className="w-3 h-3 mr-1" /> High
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-slate-600 font-medium text-xs bg-slate-50 px-2 py-0.5 rounded border border-slate-200 w-fit">
                        Normal
                      </span>
                    )}
                    <span className="text-xs text-slate-500 mt-1">Due: {new Date(req.dueDate).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    req.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    req.status === 'Blocked' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                    req.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' : 
                    req.status === 'Ready for Registrar Review' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {req.status === 'Blocked' && <AlertCircle className="w-3 h-3 mr-1.5" />}
                    {req.status === 'Overdue' && <Clock className="w-3 h-3 mr-1.5" />}
                    {req.status === 'Ready for Registrar Review' && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-100 font-medium" onClick={(e) => { e.stopPropagation(); onSelectClearance(req.id); }}>
                      Open
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
