import { ExecutiveWelcome } from "./components/dashboard/ExecutiveWelcome";
import { ExecutiveKPIs } from "./components/dashboard/ExecutiveKPIs";
import { LiveSystemStatus } from "./components/dashboard/LiveSystemStatus";
import { ClearanceOverviewCharts } from "./components/dashboard/ClearanceOverviewCharts";
import { StudentVerificationQueue } from "./components/dashboard/StudentVerificationQueue";
import { RegistrarActionCenter } from "./components/dashboard/RegistrarActionCenter";
import { DepartmentPerformanceTable } from "./components/dashboard/DepartmentPerformanceTable";
import { RecentClearanceRequestsTable } from "./components/dashboard/RecentClearanceRequestsTable";
import { RecentActivitiesTimeline } from "./components/dashboard/RecentActivitiesTimeline";
import { LiveNotificationsCenter } from "./components/dashboard/LiveNotificationsCenter";

export function RegistrarDashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 md:pb-8">
      {/* 1. Executive Welcome Header */}
      <ExecutiveWelcome />

      {/* 2. Executive KPI Dashboard */}
      <ExecutiveKPIs />

      {/* 3. Action Center & Quick Actions */}
      <RegistrarActionCenter />

      {/* 4. Charts Overview & System Status */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <ClearanceOverviewCharts />
        </div>
        <div className="xl:col-span-1">
          <LiveSystemStatus />
        </div>
      </div>

      {/* 5. Verification & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <StudentVerificationQueue />
        </div>
        <div className="xl:col-span-1">
          <LiveNotificationsCenter />
        </div>
      </div>

      {/* 6. Enterprise Tables: Departments & Clearance Requests */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DepartmentPerformanceTable />
        <RecentActivitiesTimeline />
      </div>

      {/* 7. Recent Clearance Requests Table */}
      <RecentClearanceRequestsTable />
    </div>
  );
}
