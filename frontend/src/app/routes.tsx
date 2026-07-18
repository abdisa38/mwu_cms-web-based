import React from "react";
import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Layout } from "./components/layout/Layout";
import { StudentLayout } from "./pages/student/StudentLayout";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { MyClearance } from "./pages/student/MyClearance";
import { MyDocuments } from "./pages/student/MyDocuments";
import { StartNewClearance } from "./pages/student/StartNewClearance";
import { NotificationsCenter } from "./pages/student/NotificationsCenter";
import { MessagesCenter } from "./pages/student/MessagesCenter";
import { StudentCertificate } from "./pages/student/StudentCertificate";
import { StudentProfile } from "./pages/student/StudentProfile";
import { StudentSettings } from "./pages/student/Settings";
import { OfficerLayout } from "./pages/officer/OfficerLayout";
import { OfficerDashboard } from "./pages/officer/OfficerDashboard";
import { ClearanceQueue } from "./pages/officer/ClearanceQueue";
import { PendingRequests } from "./pages/officer/PendingRequests";
import { ApprovedRequests } from "./pages/officer/ApprovedRequests";
import { RejectedRequests } from "./pages/officer/RejectedRequests";
import { StudentDatabase } from "./pages/officer/StudentDatabase";
import { OfficerNotifications } from "./pages/officer/OfficerNotifications";
import { OfficerMessages } from "./pages/officer/OfficerMessages";
import { OfficerAccount } from "./pages/officer/OfficerAccount";
import { OfficerSettings } from "./pages/officer/OfficerSettings";
import { RegistrarLayout } from "./pages/registrar/RegistrarLayout";
import { RegistrarDashboard } from "./pages/registrar/RegistrarDashboard";
import { UserManagement } from "./pages/registrar/UserManagement";
import { StudentVerificationPage } from "./pages/registrar/verification/StudentVerificationPage";
import { PendingClearancesPage } from "./pages/registrar/pending/PendingClearancesPage";
import { CompletedClearancesPage } from "./pages/registrar/completed/CompletedClearancesPage";
import { RejectedClearancesPage } from "./pages/registrar/rejected/RejectedClearancesPage";
import { VerifyCertificate } from "./pages/public/VerifyCertificate";
import { FinalApprovalPage } from "./pages/registrar/final-approval/FinalApprovalPage";
import { CertificatesPage } from "./pages/registrar/certificates/CertificatesPage";
import { StudentDatabasePage as RegistrarStudentDatabasePage } from "./pages/registrar/students/StudentDatabasePage";
import { StaffDepartmentsPage } from "./pages/registrar/staff-departments/StaffDepartmentsPage";
import { WorkflowConfigurationPage } from "./pages/registrar/workflow-configuration/WorkflowConfigurationPage";
import { AuditLogsPage } from "./pages/registrar/audit-logs/AuditLogsPage";
import { RegistrarSettingsPage } from "./pages/registrar/settings/RegistrarSettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "verify", Component: VerifyCertificate },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegistrationPage },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "clearance", Component: MyClearance },
      { path: "new-clearance", Component: StartNewClearance },
      { path: "documents", Component: MyDocuments },
      { path: "notifications", Component: NotificationsCenter },
      { path: "messages", Component: MessagesCenter },
      { path: "certificate", Component: StudentCertificate },
      { path: "profile", Component: StudentProfile },
      { path: "settings", Component: StudentSettings },
    ],
  },
  {
    path: "/officer",
    Component: OfficerLayout,
    children: [
      { index: true, Component: OfficerDashboard },
      { path: "pending", Component: PendingRequests },
      { path: "approved", Component: ApprovedRequests },
      { path: "rejected", Component: RejectedRequests },
      { path: "students", Component: StudentDatabase },
      { path: "notifications", Component: OfficerNotifications },
      { path: "messages", Component: OfficerMessages },
      { path: "account", Component: OfficerAccount },
      { path: "reports", Component: () => <div className="p-8"><h1 className="text-2xl font-bold">Reports</h1></div> },
      { path: "settings", Component: OfficerSettings },
    ]
  },
  {
    path: "/registrar",
    Component: RegistrarLayout,
    children: [
      { index: true, Component: RegistrarDashboard },
      { path: "users", Component: UserManagement },
      { path: "students", Component: RegistrarStudentDatabasePage },
      { path: "departments", Component: () => { window.location.href = '/registrar/staff-departments'; return null; } },
      { path: "staff-departments", Component: StaffDepartmentsPage },
      { path: "workflow-configuration", Component: WorkflowConfigurationPage },
      { path: "audit-logs", Component: AuditLogsPage },
      { path: "verification", Component: StudentVerificationPage },
      { path: "pending", Component: PendingClearancesPage },
      { path: "approvals", Component: FinalApprovalPage },
      { path: "completed", Component: CompletedClearancesPage },
      { path: "rejected", Component: RejectedClearancesPage },
      { path: "certificates", Component: CertificatesPage },
      { path: "reports", Component: () => <div className="p-8"><h1 className="text-2xl font-bold">Reports</h1></div> },
      { path: "messages", Component: () => <div className="p-8"><h1 className="text-2xl font-bold">Messages</h1></div> },
      { path: "settings", Component: RegistrarSettingsPage },
    ]
  }
]);
