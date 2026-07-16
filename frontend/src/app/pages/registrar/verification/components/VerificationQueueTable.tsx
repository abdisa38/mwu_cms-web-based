import { useState } from "react";
import { MoreVertical, Mail, User, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

interface VerificationQueueTableProps {
  onSelectStudent: (studentId: string) => void;
}

export function VerificationQueueTable({ onSelectStudent }: VerificationQueueTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const queue = [
    { id: "V-99321", studentId: "UGR/8821/11", name: "Chala Merera", email: "chala.merera@mwu.edu.et", college: "Engineering", dept: "Civil", regDate: "Oct 24, 2023", status: "Pending", priority: "High", risk: "Low" },
    { id: "V-99322", studentId: "UGR/4432/12", name: "Tigist Bekele", email: "tigist.b@mwu.edu.et", college: "Social Science", dept: "Law", regDate: "Oct 24, 2023", status: "Under Review", priority: "Normal", risk: "Low" },
    { id: "V-99323", studentId: "UGR/9981/13", name: "Kidist Alemu", email: "kidist.alemu@mwu.edu.et", college: "Medicine", dept: "Nursing", regDate: "Oct 23, 2023", status: "Needs More Info", priority: "Normal", risk: "Medium" },
    { id: "V-99324", studentId: "UGR/1122/12", name: "Yonas Tesfaye", email: "yonas.t@gmail.com", college: "Computing", dept: "Computer Science", regDate: "Oct 23, 2023", status: "Pending", priority: "High", risk: "High" },
    { id: "V-99325", studentId: "UGR/5544/14", name: "Betelhem Getachew", email: "betty.get@mwu.edu.et", college: "Business", dept: "Accounting", regDate: "Oct 22, 2023", status: "Pending", priority: "Normal", risk: "Low" },
    { id: "V-99326", studentId: "UGR/2233/11", name: "Dawit Tadesse", email: "dawit.t@mwu.edu.et", college: "Engineering", dept: "Electrical", regDate: "Oct 22, 2023", status: "Under Review", priority: "Normal", risk: "Low" },
    { id: "V-99327", studentId: "UGR/7765/14", name: "Natnael Tilahun", email: "nati.t@mwu.edu.et", college: "Computing", dept: "Software Engineering", regDate: "Oct 21, 2023", status: "Pending", priority: "Normal", risk: "Low" },
  ];

  const toggleRow = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedRows);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setSelectedRows(newSet);
  };

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(queue.map((_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
  };

  return (
    <div className="overflow-x-auto min-h-[500px]">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 w-12 text-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                onChange={toggleAll}
                checked={selectedRows.size === queue.length && queue.length > 0}
              />
            </th>
            <th className="px-6 py-4 font-semibold">Student</th>
            <th className="px-6 py-4 font-semibold">Student ID</th>
            <th className="px-6 py-4 font-semibold">Department</th>
            <th className="px-6 py-4 font-semibold">Reg Date</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-center">Risk</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {queue.map((req, idx) => {
            const isSelected = selectedRows.has(idx);
            return (
              <tr 
                key={idx} 
                onClick={() => onSelectStudent(req.studentId)}
                className={`hover:bg-blue-50/50 transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50/80' : 'bg-white'}`}
              >
                <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleRow(idx, e as any);
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{req.name}</span>
                      <span className="text-xs text-slate-500 flex items-center mt-0.5">
                        <Mail className="w-3 h-3 mr-1" />
                        {req.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600">
                  {req.studentId}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-medium">{req.dept}</span>
                    <span className="text-xs text-slate-500">{req.college}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {req.regDate}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    req.status === 'Pending' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    req.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                    req.status === 'Needs More Info' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {req.status === 'Pending' && <Clock className="w-3 h-3 mr-1.5" />}
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {req.risk === 'High' ? (
                    <span className="inline-flex items-center text-rose-600 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      <ShieldAlert className="w-3 h-3 mr-1" /> High
                    </span>
                  ) : req.risk === 'Medium' ? (
                    <span className="inline-flex items-center text-amber-600 font-medium text-xs">
                      Medium
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-emerald-600 font-medium text-xs">
                      Low
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-100 font-medium" onClick={(e) => { e.stopPropagation(); onSelectStudent(req.studentId); }}>
                      Verify
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
