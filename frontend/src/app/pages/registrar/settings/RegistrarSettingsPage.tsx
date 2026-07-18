import React, { useState } from "react";
import { Link } from "react-router";
import { 
  Globe, Palette, ShieldCheck, Key, Clock, Bell, Mail, 
  HardDrive, FileCheck, CheckSquare, Wrench, Link as LinkIcon, 
  Database, Archive, Activity, Flag, History, AlertTriangle, ChevronRight, Save
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";

// Mock Data
import { 
  mockGeneralSettings, mockBrandingSettings, mockAuthSettings, 
  mockSessionSettings, mockActiveSessions, mockNotificationSettings, 
  mockEmailSettings, mockStorageSettings, mockIntegrations, 
  mockSystemHealth, mockBackups, mockFeatureFlags 
} from "./data/mockData";

// Tabs
import { GeneralBrandingTab } from "./components/tabs/GeneralBrandingTab";
import { SecurityAuthTab } from "./components/tabs/SecurityAuthTab";
import { CommunicationTab } from "./components/tabs/CommunicationTab";
import { InfrastructureTab } from "./components/tabs/InfrastructureTab";
import { SystemHealthTab } from "./components/tabs/SystemHealthTab";
import { AdvancedConfigTab } from "./components/tabs/AdvancedConfigTab";

// Modals
import { ElevatedActionModal } from "./components/modals/ElevatedActionModal";

type TabId = "general" | "security" | "communication" | "infrastructure" | "health" | "advanced";

export function RegistrarSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [isDirty, setIsDirty] = useState(false);
  
  // Elevated Action Modal State
  const [dangerousAction, setDangerousAction] = useState<string | null>(null);

  const navigationSections = [
    {
      title: "Platform Configuration",
      items: [
        { id: "general", label: "General & Branding", icon: Globe, description: "System name, logos, colors" },
        { id: "security", label: "Security & Sessions", icon: ShieldCheck, description: "Passwords, 2FA, active logins" },
      ]
    },
    {
      title: "Services & Integrations",
      items: [
        { id: "communication", label: "Communications", icon: Mail, description: "Emails, notifications, templates" },
        { id: "infrastructure", label: "Infrastructure", icon: HardDrive, description: "Storage, 3rd-party APIs" },
      ]
    },
    {
      title: "System Maintenance",
      items: [
        { id: "health", label: "Health & Backups", icon: Activity, description: "Uptime, database restore" },
        { id: "advanced", label: "Advanced Config", icon: Wrench, description: "Feature flags, workflow defaults" },
      ]
    }
  ];

  const handleDirty = () => setIsDirty(true);

  const handleSave = () => {
    setIsDirty(false);
    // Real app: fire save API
  };

  const triggerDangerousAction = (actionName: string) => {
    setDangerousAction(actionName);
  };

  const handleConfirmDangerousAction = (password: string, reason: string) => {
    console.log(`Confirmed ${dangerousAction} with reason: ${reason}`);
    setDangerousAction(null);
  };

  return (
    <div className="flex h-full bg-slate-50 relative pb-20">
      
      {/* Left Sidebar Navigation */}
      <div className="w-80 border-r border-slate-200 bg-white flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">System Settings</h1>
          <p className="text-sm text-slate-500">Global MWU platform configuration</p>
        </div>

        <div className="px-3 pb-6 space-y-8">
          {navigationSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabId)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isActive 
                          ? "bg-indigo-50 border border-indigo-100 shadow-sm" 
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mt-0.5 shrink-0 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                      <div>
                        <div className={`font-semibold text-sm ${isActive ? "text-indigo-900" : "text-slate-700"}`}>
                          {item.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${isActive ? "text-indigo-700" : "text-slate-500"}`}>
                          {item.description}
                        </div>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-indigo-400 ml-auto mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="p-8 max-w-5xl mx-auto">
          {/* Breadcrumb for Mobile / Top padding */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 lg:hidden">
            <Link to="/registrar" className="hover:text-indigo-600">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-slate-900">Settings</span>
          </div>

          {/* Tab Rendering */}
          {activeTab === "general" && (
            <GeneralBrandingTab generalData={mockGeneralSettings} brandingData={mockBrandingSettings} onDirty={handleDirty} />
          )}
          {activeTab === "security" && (
            <SecurityAuthTab authData={mockAuthSettings} sessionData={mockSessionSettings} activeSessions={mockActiveSessions} onDirty={handleDirty} />
          )}
          {activeTab === "communication" && (
            <CommunicationTab notifData={mockNotificationSettings} emailData={mockEmailSettings} onDirty={handleDirty} />
          )}
          {activeTab === "infrastructure" && (
            <InfrastructureTab storageData={mockStorageSettings} integrations={mockIntegrations} onDirty={handleDirty} />
          )}
          {activeTab === "health" && (
            <SystemHealthTab healthData={mockSystemHealth} backups={mockBackups} onTriggerDangerousAction={triggerDangerousAction} />
          )}
          {activeTab === "advanced" && (
            <AdvancedConfigTab featureFlags={mockFeatureFlags} onTriggerDangerousAction={triggerDangerousAction} onDirty={handleDirty} />
          )}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className={`fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] p-4 flex items-center justify-between z-40 transition-transform duration-300 ${isDirty ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-700">You have unsaved configuration changes.</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsDirty(false)}>Discard Changes</Button>
          <Button variant="primary" onClick={handleSave} className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
            <Save className="w-4 h-4" /> Save Configuration
          </Button>
        </div>
      </div>

      {/* Dangerous Action Modal */}
      {dangerousAction && (
        <ElevatedActionModal 
          actionName={dangerousAction} 
          onClose={() => setDangerousAction(null)} 
          onConfirm={handleConfirmDangerousAction} 
        />
      )}

    </div>
  );
}
