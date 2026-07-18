import { FileCheck, Plus, Settings, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function DocumentRequirementsTab() {
  const documents = [
    { id: "1", name: "Student ID Card", type: "Identification", required: true, uploadedBy: "Student", step: "Student Initiates Clearance" },
    { id: "2", name: "Clearance Form Signed", type: "Application", required: true, uploadedBy: "Student", step: "Student Initiates Clearance" },
    { id: "3", name: "Library Clearance Certificate", type: "Internal Record", required: false, uploadedBy: "Department", step: "Library Review" },
    { id: "4", name: "Dormitory Key Return Receipt", type: "Physical Evidence", required: true, uploadedBy: "Department", step: "Dormitory Review" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600" /> Document Requirements
          </h3>
          <p className="text-sm text-slate-500 mt-1">Configure which documents must be uploaded during specific workflow steps.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
          <Plus className="w-4 h-4" /> Add Requirement
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Document Name</th>
              <th className="p-4 font-semibold">Required Step</th>
              <th className="p-4 font-semibold">Uploaded By</th>
              <th className="p-4 font-semibold">Requirement</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-sm text-slate-900">{doc.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{doc.type}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">{doc.step}</div>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${doc.uploadedBy === 'Student' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {doc.uploadedBy}
                  </span>
                </td>
                <td className="p-4">
                  {doc.required ? (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Required</span>
                  ) : (
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Optional</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"><Settings className="w-4 h-4" /></Button>
                    <Button variant="outline" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 border-transparent hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
