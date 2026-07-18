import { Award, CheckCircle2, AlertCircle, Clock, FileWarning, RefreshCw, XCircle, Download, BookOpen } from "lucide-react";

export function CertificateKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Generated */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Award className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Certificates</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900">4,892</h3>
          </div>
        </div>
      </div>

      {/* Verified Status */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Verified Authenticity</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-emerald-700">3,105</h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              63.5%
            </span>
          </div>
        </div>
      </div>

      {/* Pending Generation */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Generation</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-amber-700">142</h3>
          </div>
        </div>
      </div>

      {/* Revoked & Corrected */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600 font-medium">Regenerated</span>
          </div>
          <span className="text-sm font-bold text-slate-900">84</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-slate-600 font-medium">Revoked</span>
          </div>
          <span className="text-sm font-bold text-red-600">12</span>
        </div>
      </div>
    </div>
  );
}
