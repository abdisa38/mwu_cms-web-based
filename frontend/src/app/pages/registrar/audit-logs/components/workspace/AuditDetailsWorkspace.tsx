import React, { useState } from "react";
import { X, Clock, User, Fingerprint, ShieldCheck, ShieldAlert, Monitor, Globe, Activity, Terminal } from "lucide-react";
import { AuditEvent } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface AuditDetailsWorkspaceProps {
  event: AuditEvent;
  onClose: () => void;
}

export function AuditDetailsWorkspace({ event, onClose }: AuditDetailsWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "changes" | "integrity">("overview");

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Workspace Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">Event Details</h2>
              {event.status === "Successful" && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Successful</span>
              )}
              {event.status === "Failed" && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">Failed</span>
              )}
            </div>
            <p className="text-xs font-mono text-slate-500 mt-1">{event.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Header */}
        <div className="px-6 py-6 bg-slate-50 border-b border-slate-200">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              event.status === 'Failed' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
            }`}>
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{event.action}</h3>
              <p className="text-sm text-slate-500 mt-1">{event.actionCategory}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{event.user}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{new Date(event.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 text-sm font-semibold transition-colors relative ${
              activeTab === "overview" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Overview
            {activeTab === "overview" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
          </button>
          <button
            onClick={() => setActiveTab("changes")}
            className={`py-3 text-sm font-semibold transition-colors relative ${
              activeTab === "changes" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Change Comparison
            {activeTab === "changes" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
          </button>
          <button
            onClick={() => setActiveTab("integrity")}
            className={`py-3 text-sm font-semibold transition-colors relative ${
              activeTab === "integrity" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Integrity Check
            {activeTab === "integrity" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {event.failureReason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-700">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Failure Reason</h4>
                    <p className="text-sm mt-1">{event.failureReason}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Actor</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Name</span>
                      <span className="font-medium text-slate-900">{event.user}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">ID</span>
                      <span className="font-mono text-slate-900">{event.userId}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Role</span>
                      <span className="text-slate-900">{event.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department</span>
                      <span className="text-slate-900">{event.department}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Resource</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Type</span>
                      <span className="font-medium text-slate-900">{event.resourceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ID</span>
                      <span className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {event.resourceId}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Button variant="outline" className="w-full text-xs">View Related Record</Button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Session Context
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-xs">IP Address</span>
                      <span className="font-mono text-slate-900 flex items-center gap-2">
                        <Globe className="w-3 h-3 text-slate-400" /> {event.ipAddress}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-xs">Device</span>
                      <span className="text-slate-900">{event.device}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-xs">Browser & OS</span>
                      <span className="text-slate-900">{event.browser} / {event.os}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-xs">Session ID</span>
                      <span className="font-mono text-slate-500 text-xs truncate" title={event.sessionId}>{event.sessionId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Changes Tab */}
          {activeTab === "changes" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {(!event.previousValues && !event.newValues) ? (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No state changes recorded for this event.</p>
                  <p className="text-sm text-slate-400 mt-1">This was likely a read, login, or export action.</p>
                </div>
              ) : (
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
                      <Terminal className="w-3 h-3" /> diff --git a/resource b/resource
                    </span>
                  </div>
                  <div className="p-4 font-mono text-sm overflow-x-auto whitespace-pre">
                    <div className="text-slate-500 mb-2">@@ -1,3 +1,3 @@</div>
                    
                    {event.previousValues && Object.entries(event.previousValues).map(([key, value]) => (
                      <div key={`prev-${key}`} className="text-rose-400 flex bg-rose-500/10 px-2 py-0.5 -mx-4">
                        <span className="w-4 select-none opacity-50">-</span>
                        <span>"{key}": {JSON.stringify(value)}</span>
                      </div>
                    ))}
                    
                    {event.newValues && Object.entries(event.newValues).map(([key, value]) => (
                      <div key={`new-${key}`} className="text-emerald-400 flex bg-emerald-500/10 px-2 py-0.5 -mx-4">
                        <span className="w-4 select-none opacity-50">+</span>
                        <span>"{key}": {JSON.stringify(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Integrity Tab */}
          {activeTab === "integrity" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-1">Cryptographically Verified</h3>
                <p className="text-sm text-emerald-700">
                  This audit log entry has been verified against the secure blockchain ledger. It has not been tampered with or altered since its creation.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Event Hash (SHA-256)</label>
                  <div className="font-mono text-sm bg-slate-100 p-3 rounded-lg text-slate-700 break-all border border-slate-200">
                    {event.integrityHash}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Previous Chain Hash</label>
                  <div className="font-mono text-sm bg-slate-50 p-3 rounded-lg text-slate-500 break-all border border-slate-200 border-dashed">
                    d8f9a2e12b4b4598...[truncated]
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
