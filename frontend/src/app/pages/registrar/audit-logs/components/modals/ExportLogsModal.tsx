import React, { useState } from "react";
import { X, Download, FileText, FileSpreadsheet, FileJson, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface ExportLogsModalProps {
  onClose: () => void;
  onExport: () => void;
}

export function ExportLogsModal({ onClose, onExport }: ExportLogsModalProps) {
  const [format, setFormat] = useState<"csv" | "excel" | "pdf">("csv");

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-600" /> Export Audit Logs
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-blue-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-blue-600" />
            <p>
              Exporting logs will create an immutable audit record of this action. The exported file will contain metadata identifying you as the exporter.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Select Export Format</label>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setFormat("csv")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  format === "csv" 
                    ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`p-2 rounded-lg ${format === "csv" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${format === "csv" ? "text-indigo-900" : "text-slate-900"}`}>CSV File (.csv)</div>
                  <div className={`text-xs mt-0.5 ${format === "csv" ? "text-indigo-700" : "text-slate-500"}`}>Best for data analysis tools</div>
                </div>
              </button>

              <button
                onClick={() => setFormat("excel")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  format === "excel" 
                    ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`p-2 rounded-lg ${format === "excel" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${format === "excel" ? "text-emerald-900" : "text-slate-900"}`}>Excel Spreadsheet (.xlsx)</div>
                  <div className={`text-xs mt-0.5 ${format === "excel" ? "text-emerald-700" : "text-slate-500"}`}>Best for spreadsheet viewing</div>
                </div>
              </button>

              <button
                onClick={() => setFormat("pdf")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  format === "pdf" 
                    ? "border-rose-600 bg-rose-50 ring-1 ring-rose-600" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`p-2 rounded-lg ${format === "pdf" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"}`}>
                  <FileJson className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${format === "pdf" ? "text-rose-900" : "text-slate-900"}`}>PDF Report (.pdf)</div>
                  <div className={`text-xs mt-0.5 ${format === "pdf" ? "text-rose-700" : "text-slate-500"}`}>Best for printing and sharing</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onExport} className="gap-2">
            <Download className="w-4 h-4" /> Download Export
          </Button>
        </div>
      </div>
    </div>
  );
}
