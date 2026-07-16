import { useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";

export function VerificationChecklist() {
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Student ID is Valid", status: 'verified', notes: "" },
    { id: 2, label: "Student Name Matches", status: 'verified', notes: "" },
    { id: 3, label: "Student Photo Matches", status: 'pending', notes: "" },
    { id: 4, label: "University Email is Correct", status: 'verified', notes: "" },
    { id: 5, label: "Department is Correct", status: 'failed', notes: "Record shows EE, ID shows CE." },
    { id: 6, label: "Student is Currently Enrolled", status: 'pending', notes: "" },
    { id: 7, label: "Document is Authentic", status: 'pending', notes: "" },
    { id: 8, label: "No Duplicate Account", status: 'failed', notes: "Possible duplicate found." },
  ]);

  const updateStatus = (id: number, status: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, status } : item));
  };

  const updateNotes = (id: number, notes: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, notes } : item));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Manual Verification Checklist</h3>
        <span className="text-xs font-medium text-slate-500">
          {checklist.filter(c => c.status === 'verified').length} / {checklist.length} Completed
        </span>
      </div>
      
      <div className="p-2 sm:p-4">
        <div className="space-y-3">
          {checklist.map((item) => (
            <div key={item.id} className={`p-4 rounded-lg border ${
              item.status === 'verified' ? 'bg-emerald-50/30 border-emerald-100' :
              item.status === 'failed' ? 'bg-rose-50/30 border-rose-200' :
              'bg-white border-slate-200 hover:border-slate-300 transition-colors'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                    item.status === 'verified' ? 'bg-emerald-100 text-emerald-600' :
                    item.status === 'failed' ? 'bg-rose-100 text-rose-600' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {item.status === 'verified' ? <Check className="w-5 h-5" /> : 
                     item.status === 'failed' ? <X className="w-5 h-5" /> : 
                     <AlertCircle className="w-5 h-5" />}
                  </div>
                  <span className={`font-medium ${item.status === 'pending' ? 'text-slate-700' : 'text-slate-900'}`}>
                    {item.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 sm:ml-auto">
                  <button 
                    onClick={() => updateStatus(item.id, 'verified')}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                      item.status === 'verified' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white text-slate-600 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                    }`}
                  >
                    Verified
                  </button>
                  <button 
                    onClick={() => updateStatus(item.id, 'failed')}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                      item.status === 'failed' ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-white text-slate-600 border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                    }`}
                  >
                    Failed
                  </button>
                  <button 
                    onClick={() => updateStatus(item.id, 'pending')}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                      item.status === 'pending' ? 'bg-slate-700 text-white border-slate-700 shadow-sm' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              {(item.status === 'failed' || item.notes) && (
                <div className="mt-3 pl-11 pr-2">
                  <input 
                    type="text" 
                    value={item.notes}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Add verification notes..." 
                    className="w-full text-sm bg-white border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
