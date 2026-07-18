import { useState } from "react";
import { X, User, GraduationCap, ShieldCheck, FileCheck, FileText, ScrollText, AlertCircle, Clock, Settings, MoreVertical } from "lucide-react";
import { StudentRecord } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { AcademicInfoTab } from "./tabs/AcademicInfoTab";
import { VerificationTab } from "./tabs/VerificationTab";
import { ClearanceHistoryTab } from "./tabs/ClearanceHistoryTab";
import { CertificateCenterTab } from "./tabs/CertificateCenterTab";
import { DocumentCenterTab } from "./tabs/DocumentCenterTab";
import { AppealCenterTab } from "./tabs/AppealCenterTab";
import { CommunicationTab } from "./tabs/CommunicationTab";
import { AccountManagementTab } from "./tabs/AccountManagementTab";
import { AuditHistoryTab } from "./tabs/AuditHistoryTab";

interface StudentProfileWorkspaceProps {
  student: StudentRecord;
  onClose: () => void;
}

export function StudentProfileWorkspace({ student, onClose }: StudentProfileWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "verification", label: "Verification", icon: ShieldCheck },
    { id: "clearance", label: "Clearance", icon: FileCheck },
    { id: "certificates", label: "Certificates", icon: ScrollText },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "appeals", label: "Appeals", icon: AlertCircle },
    { id: "communications", label: "Comms", icon: Clock },
    { id: "audit", label: "Audit Log", icon: Clock },
    { id: "account", label: "Account", icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-slate-50 w-full max-w-5xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden">
        
        {/* Workspace Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {student.profilePhoto ? (
                <img src={student.profilePhoto} alt={student.fullName} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                  {student.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {student.fullName}
                  {student.studentStatus === "Active" && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">Active</span>}
                  {student.studentStatus === "Suspended" && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Suspended</span>}
                </h2>
                <div className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{student.studentId}</span>
                  <span>•</span>
                  <span>{student.department}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-slate-600">Send Notification</Button>
            <Button variant="outline" className="text-slate-600 px-2"><MoreVertical className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Workspace Navigation */}
        <div className="bg-white border-b border-slate-200 px-6 shrink-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-6 min-w-max">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {activeTab === "personal" && <PersonalInfoTab student={student} />}
            {activeTab === "academic" && <AcademicInfoTab student={student} />}
            {activeTab === "verification" && <VerificationTab student={student} />}
            {activeTab === "clearance" && <ClearanceHistoryTab student={student} />}
            {activeTab === "certificates" && <CertificateCenterTab student={student} />}
            {activeTab === "documents" && <DocumentCenterTab student={student} />}
            {activeTab === "appeals" && <AppealCenterTab student={student} />}
            {activeTab === "communications" && <CommunicationTab student={student} />}
            {activeTab === "audit" && <AuditHistoryTab student={student} />}
            {activeTab === "account" && <AccountManagementTab student={student} />}
          </div>
        </div>

      </div>
    </div>
  );
}
