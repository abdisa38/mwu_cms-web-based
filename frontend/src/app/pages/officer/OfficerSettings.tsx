import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { 
  ChevronRight, 
  Settings as SettingsIcon,
  Shield, 
  Bell, 
  Eye, 
  MonitorSmartphone, 
  Download, 
  Database, 
  Info,
  User,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Palette,
  Moon,
  Sun,
  Laptop2,
  HelpCircle,
  X,
  Workflow,
  Building2,
  CheckSquare
} from "lucide-react";

export function OfficerSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Workflow Settings State
  const [defaultQueue, setDefaultQueue] = useState("pending");
  const [autoOpenNext, setAutoOpenNext] = useState(true);
  const [reviewConfirm, setReviewConfirm] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState("5");

  // Notifications state
  const [notifApp, setNotifApp] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifNewRequest, setNotifNewRequest] = useState(true);
  const [notifAppeal, setNotifAppeal] = useState(true);
  const [notifOverdue, setNotifOverdue] = useState(true);

  // Appearance state
  const [theme, setTheme] = useState("system");
  const [density, setDensity] = useState("comfortable");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const markChanged = () => {
    setHasChanges(true);
  };

  const tabs = [
    { id: "general", label: "General Information", icon: User },
    { id: "workflow", label: "Review & Workflow", icon: Workflow },
    { id: "security", label: "Security & Password", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy & Data", icon: Eye },
    { id: "sessions", label: "Active Sessions", icon: MonitorSmartphone },
  ];

  const sessions = [
    { id: 1, device: "Windows PC", browser: "Chrome", location: "Addis Ababa, ET", ip: "197.156.xx.xx", time: "Active Now", current: true, icon: Laptop },
    { id: 2, device: "MacBook Pro", browser: "Safari", location: "Addis Ababa, ET", ip: "197.156.xx.xx", time: "Last active 3 days ago", current: false, icon: Laptop },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-24 md:pb-0 animate-in fade-in duration-500 relative">
      
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-sm">Settings saved successfully!</span>
            <button onClick={() => setShowSuccess(false)} className="ml-4 text-emerald-600 hover:text-emerald-800"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Settings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Department Settings</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none" onClick={() => setHasChanges(false)}>
            <RotateCcw className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Reset</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <HelpCircle className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Help Center</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
        
        {/* Left Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Settings Menu</h3>
            </div>
            <div className="p-2 flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 pb-20">
          
          {/* General Information */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Department Information</h2>
                  <p className="text-sm text-slate-500">Read-only information managed by system administrators.</p>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</p>
                    <p className="font-medium text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-slate-400" /> Library
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department Code</p>
                    <p className="font-medium text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono text-sm">DEP-LIB-01</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Office Location</p>
                    <p className="font-medium text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100">Main Campus, Library Bldg, GF</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">SLA Target</p>
                    <p className="font-medium text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100">5 Business Days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Localization</h2>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Preferred Language</label>
                    <select onChange={markChanged} className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en">English (Default)</option>
                      <option value="am">Amharic</option>
                      <option value="om">Oromo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Timezone</label>
                    <select onChange={markChanged} className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="EAT">East Africa Time (EAT)</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workflow & Review Settings */}
          {activeTab === "workflow" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Review Preferences</h2>
                  <p className="text-sm text-slate-500">Customize how clearance requests behave when reviewing.</p>
                </div>
                <div className="p-0 divide-y divide-slate-100">
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Auto-open Next Request</h4>
                      <p className="text-sm text-slate-500">Automatically open the next pending request after approving/rejecting the current one.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={autoOpenNext} onChange={() => {setAutoOpenNext(!autoOpenNext); markChanged();}} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Require Review Confirmation</h4>
                      <p className="text-sm text-slate-500">Show a confirmation modal before finalizing an approval or rejection.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={reviewConfirm} onChange={() => {setReviewConfirm(!reviewConfirm); markChanged();}} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Queue Settings</h2>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Default Queue View</label>
                    <select 
                      value={defaultQueue} 
                      onChange={(e) => {setDefaultQueue(e.target.value); markChanged();}} 
                      className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending Requests</option>
                      <option value="all">All Requests</option>
                      <option value="priority">High Priority Only</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Auto Refresh Interval</label>
                    <select 
                      value={autoRefresh} 
                      onChange={(e) => {setAutoRefresh(e.target.value); markChanged();}} 
                      className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0">Disabled</option>
                      <option value="1">1 Minute</option>
                      <option value="5">5 Minutes</option>
                      <option value="15">15 Minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Notification Channels</h2>
                  <p className="text-sm text-slate-500">Control how you receive alerts from the system.</p>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">In-App Alerts</h4>
                      <p className="text-sm text-slate-500">Receive toast popups while using the application.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notifApp} onChange={() => {setNotifApp(!notifApp); markChanged();}} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Email Alerts</h4>
                      <p className="text-sm text-slate-500">Receive digests and urgent alerts to your work email.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notifEmail} onChange={() => {setNotifEmail(!notifEmail); markChanged();}} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Event Subscriptions</h2>
                </div>
                <div className="p-6 space-y-4">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer">
                    <input type="checkbox" checked={notifNewRequest} onChange={() => {setNotifNewRequest(!notifNewRequest); markChanged();}} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                    <div>
                      <span className="text-sm text-slate-900 font-semibold block">New Clearance Requests</span>
                      <span className="text-xs text-slate-500">Notify me immediately when a student hits our department queue.</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer">
                    <input type="checkbox" checked={notifAppeal} onChange={() => {setNotifAppeal(!notifAppeal); markChanged();}} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                    <div>
                      <span className="text-sm text-slate-900 font-semibold block">Appeal Submissions</span>
                      <span className="text-xs text-slate-500">Notify me when a student appeals a rejection I issued.</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer">
                    <input type="checkbox" checked={notifOverdue} onChange={() => {setNotifOverdue(!notifOverdue); markChanged();}} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                    <div>
                      <span className="text-sm text-slate-900 font-semibold block">Overdue SLA Warning</span>
                      <span className="text-xs text-slate-500">Notify me when a request has been sitting un-reviewed for too long.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security & Password */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full border-8 border-emerald-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-600">100%</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Security Score</h3>
                <p className="text-sm text-slate-500 mb-4">Your administrative account is highly secure.</p>
                <div className="w-full max-w-sm space-y-2 text-sm text-left">
                  <div className="flex justify-between items-center bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                    <span className="text-emerald-800 font-semibold">2FA Enabled</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Change Password</h2>
                  <p className="text-sm text-slate-500">Administrators must use strong passwords.</p>
                </div>
                <div className="p-6">
                  <div className="max-w-md space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Current Password</label>
                      <Input type="password" placeholder="••••••••" onChange={markChanged} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">New Password</label>
                      <Input type="password" placeholder="••••••••" onChange={markChanged} />
                      <div className="flex gap-1 mt-1">
                        <div className="h-1 flex-1 bg-emerald-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-emerald-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-emerald-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Confirm New Password</label>
                      <Input type="password" placeholder="••••••••" onChange={markChanged} />
                    </div>
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs font-medium space-y-1 border border-blue-100">
                      <p className="mb-2 font-bold text-blue-900">Password Requirements:</p>
                      <p className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-2 text-blue-500" /> Minimum 10 characters</p>
                      <p className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-2 text-blue-500" /> Uppercase & lowercase letters</p>
                      <p className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-2 text-blue-500" /> Numbers & special characters</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-lg">Theme & Interface</h2>
                </div>
                <div className="p-6 space-y-8">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Color Theme</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button 
                        onClick={() => {setTheme("light"); markChanged();}}
                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-colors ${theme === 'light' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className={`font-medium ${theme === 'light' ? 'text-blue-900' : 'text-slate-700'}`}>Light Mode</span>
                      </button>
                      <button 
                        onClick={() => {setTheme("dark"); markChanged();}}
                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-colors ${theme === 'dark' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className={`font-medium ${theme === 'dark' ? 'text-blue-900' : 'text-slate-700'}`}>Dark Mode</span>
                      </button>
                      <button 
                        onClick={() => {setTheme("system"); markChanged();}}
                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-colors ${theme === 'system' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <Laptop2 className={`w-5 h-5 ${theme === 'system' ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className={`font-medium ${theme === 'system' ? 'text-blue-900' : 'text-slate-700'}`}>System Default</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Table Density</h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {setDensity("compact"); markChanged();}}
                        className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${density === 'compact' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                      >
                        Compact
                      </button>
                      <button 
                        onClick={() => {setDensity("comfortable"); markChanged();}}
                        className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${density === 'comfortable' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                      >
                        Comfortable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Sessions */}
          {activeTab === "sessions" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg">Active Sessions</h2>
                    <p className="text-sm text-slate-500">Manage devices currently logged into your admin account.</p>
                  </div>
                  <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-200 bg-white">
                    Terminate All Other Sessions
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-medium">Device & Browser</th>
                        <th className="px-6 py-3 font-medium">Location & IP</th>
                        <th className="px-6 py-3 font-medium">Activity</th>
                        <th className="px-6 py-3 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sessions.map((session) => (
                        <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${session.current ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                <session.icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 flex items-center gap-2">
                                  {session.device} 
                                  {session.current && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-emerald-200">This Device</span>}
                                </span>
                                <span className="text-xs text-slate-500">{session.browser}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-700">{session.location}</span>
                              <span className="text-xs text-slate-500 font-mono">{session.ip}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{session.time}</td>
                          <td className="px-6 py-4 text-right">
                            {!session.current && (
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Revoke</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Data placeholders */}
          {activeTab === "privacy" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-10 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Database className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Data & Export Options</h2>
              <p className="text-slate-500 max-w-md mb-8">Export your administrative configuration data or download an archive of your recent department reports.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm"><Download className="w-4 h-4 mr-2" /> Export Settings Profile</Button>
            </div>
          )}

        </div>
      </div>

      {/* Floating Save Bar */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between z-50 animate-in slide-in-from-bottom-8 duration-300 border border-slate-700">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <p className="text-sm font-medium">You have unsaved changes</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setHasChanges(false)} className="text-slate-300 hover:text-white hover:bg-slate-800 hidden sm:inline-flex">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white shadow-sm px-6">
              Save Changes
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
