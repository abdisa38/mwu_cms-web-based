import { Check, X, AlertCircle } from "lucide-react";

export function InformationComparison() {
  const fields = [
    { label: "Student Name", submitted: "Chala Merera", record: "Chala Merera", status: "match" },
    { label: "Student ID", submitted: "UGR/8821/11", record: "UGR/8821/11", status: "match" },
    { label: "College", submitted: "Engineering", record: "Engineering", status: "match" },
    { label: "Department", submitted: "Civil Engineering", record: "Electrical Engineering", status: "mismatch" },
    { label: "Program", submitted: "Regular", record: "Regular", status: "match" },
    { label: "Admission Year", submitted: "2011 E.C", record: "2011 E.C", status: "match" },
    { label: "University Email", submitted: "chala.merera@mwu.edu.et", record: "chala.merera@mwu.edu.et", status: "match" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Information Comparison</h3>
        <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          Auto-Compare Active
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold w-1/4">Field</th>
              <th className="px-6 py-3 font-semibold w-1/3">Submitted Information</th>
              <th className="px-6 py-3 font-semibold w-1/3">University Record</th>
              <th className="px-6 py-3 font-semibold text-center w-1/12">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fields.map((field, idx) => (
              <tr key={idx} className={field.status === 'mismatch' ? 'bg-rose-50/30' : 'hover:bg-slate-50'}>
                <td className="px-6 py-3 font-medium text-slate-700">
                  {field.label}
                </td>
                <td className={`px-6 py-3 ${field.status === 'mismatch' ? 'text-rose-700 font-medium' : 'text-slate-900'}`}>
                  {field.submitted}
                </td>
                <td className={`px-6 py-3 ${field.status === 'mismatch' ? 'text-rose-700 font-medium' : 'text-slate-600'}`}>
                  {field.record}
                </td>
                <td className="px-6 py-3 text-center">
                  {field.status === 'match' ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  ) : field.status === 'mismatch' ? (
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mx-auto" title="Mismatch Detected">
                      <X className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mx-auto" title="Needs Review">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
