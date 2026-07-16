import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { 
  ChevronRight, 
  Download, 
  Printer, 
  HelpCircle,
  Edit,
  Camera,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Award,
  Clock,
  History,
  Laptop,
  Smartphone,
  AlertCircle,
  X,
  FileText,
  Shield,
  Activity,
  UserCheck,
  User,
  Briefcase,
  Globe,
  Info
} from "lucide-react";

export function OfficerAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const loginHistory = [
    { date: "Today", time: "08:15 AM", device: "Windows PC", browser: "Chrome", location: "Addis Ababa, ET", status: "Success", current: true },
    { date: "Yesterday", time: "14:30 PM", device: "iPhone 13", browser: "Safari", location: "Bale Robe, ET", status: "Success", current: false },
    { date: "Oct 24, 2023", time: "09:45 AM", device: "MacBook Pro", browser: "Safari", location: "Addis Ababa, ET", status: "Success", current: false },
  ];

  const activities = [
    { title: "Logged In", desc: "System access granted.", date: "Today, 08:15 AM", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Approved Request", desc: "Approved REQ-2024-8932 for John Doe.", date: "Today, 09:30 AM", icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Rejected Request", desc: "Rejected REQ-2024-8850 for Dawit Tadesse.", date: "Yesterday, 14:45 PM", icon: X, color: "text-red-500", bg: "bg-red-50" },
    { title: "Exported Report", desc: "Downloaded monthly approval statistics.", date: "Oct 24, 2023", icon: Download, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-24 md:pb-0 animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-sm">Profile updated successfully!</span>
            <button onClick={() => setShowSuccess(false)} className="ml-4 text-emerald-600 hover:text-emerald-800"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Account</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">My Account</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="bg-white border-slate-200 shadow-sm px-4 flex-1 sm:flex-none">
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Export Profile</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Printer className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Print</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Main Details) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Hero Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="h-32 bg-[#1E3A8A] w-full relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            </div>
            
            <div className="px-6 sm:px-8 pb-8 relative">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 sm:-mt-16 mb-6">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border-4 border-white bg-slate-100 shadow-md flex items-center justify-center text-4xl font-bold text-[#1E3A8A] overflow-hidden">
                    SO
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center" title="Verified Officer">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">Sarah Officer</h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                      EMP/8923
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Library Department • Head Librarian
                  </p>
                </div>

                <div className="w-full sm:w-auto flex flex-col gap-2">
                  <div className="flex flex-col items-center sm:items-end">
                    <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mb-2">
                      Profile 100% Complete
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Account Role</p>
                  <p className="font-medium text-slate-900 flex items-center"><UserCheck className="w-4 h-4 mr-1.5 text-blue-500"/> Department Officer</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Status</p>
                  <p className="font-medium text-emerald-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5"/> Active</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Years of Service</p>
                  <p className="font-medium text-slate-900 flex items-center"><Award className="w-4 h-4 mr-1.5 text-amber-500"/> 4 Years</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Work Email</p>
                  <p className="font-medium text-slate-900 truncate" title="sarah.officer@mwu.edu.et">sarah.o@mwu.edu.et</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            {/* Personal Information */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center"><User className="w-5 h-5 mr-2 text-slate-400" /> Personal Information</h3>
                {!isEditing && <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-blue-600 h-8">Edit</Button>}
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">First Name</label>
                    {isEditing ? <Input defaultValue="Sarah" required /> : <p className="font-medium text-slate-900">Sarah</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Last Name</label>
                    {isEditing ? <Input defaultValue="Officer" required /> : <p className="font-medium text-slate-900">Officer</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Date of Birth</label>
                    {isEditing ? <Input type="date" defaultValue="1985-05-15" /> : <p className="font-medium text-slate-900">May 15, 1985</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Nationality</label>
                    {isEditing ? <Input defaultValue="Ethiopian" /> : <p className="font-medium text-slate-900">Ethiopian</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Personal Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {isEditing ? <Input type="email" defaultValue="sarah.personal@gmail.com" /> : <p className="font-medium text-slate-900">sarah.personal@gmail.com</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {isEditing ? <Input type="tel" defaultValue="+251 91 123 4567" /> : <p className="font-medium text-slate-900">+251 91 123 4567</p>}
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Office Address / Location</label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                      {isEditing ? <textarea className="w-full min-h-[60px] p-2 border border-slate-200 rounded-lg text-sm resize-none" defaultValue="Main Campus, Library Building, Ground Floor, Office 02"></textarea> : <p className="font-medium text-slate-900">Main Campus, Library Building, Ground Floor, Office 02</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Actions Bar */}
            {isEditing && (
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 shadow-2xl sticky bottom-6 z-40 flex items-center justify-between animate-in slide-in-from-bottom-4 mx-4 lg:mx-0">
                <p className="text-sm font-medium text-white hidden sm:block flex-1">You have unsaved changes to your personal information.</p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="text-slate-300 hover:text-white hover:bg-slate-800 flex-1 sm:flex-none">Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white flex-1 sm:flex-none px-8" isLoading={isSaving}>Save Changes</Button>
                </div>
              </div>
            )}
          </form>

          {/* Employment Information (Read Only) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-slate-400" /> Employment Information</h3>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3 text-sm text-blue-800">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <p>This employment and role data is managed by HR and System Administrators. It dictates your clearance workflow permissions.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Employee ID</p>
                  <p className="font-medium text-slate-900 font-mono">EMP/8923</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Department</p>
                  <p className="font-medium text-slate-900">Library</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Position</p>
                  <p className="font-medium text-slate-900">Head Librarian</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Employment Date</p>
                  <p className="font-medium text-slate-900">Sept 01, 2019</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Employment Type</p>
                  <p className="font-medium text-slate-900">Full-Time Permanent</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Supervisor</p>
                  <p className="font-medium text-slate-900">Dr. Alemayehu (Admin)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center"><Shield className="w-5 h-5 mr-2 text-slate-400" /> Assigned Permissions</h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider">Role: Dept Officer</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">Approve Clearances</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">Reject Clearances</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">View Student Profiles</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">Direct Messaging Access</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">View Department Reports</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                  <X className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-slate-500">System Admin Access</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebars / Stats) */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          
          {/* Performance KPI Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center"><Activity className="w-4 h-4 mr-2 text-slate-500" /> Performance Summary</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processed Total</p>
                  <p className="text-2xl font-bold text-slate-900">1,432</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                  <p className="text-xl font-bold text-emerald-700">1,350</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Approvals</p>
                </div>
                <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                  <p className="text-xl font-bold text-red-700">82</p>
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Rejections</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Review Time</span>
                  <span className="text-sm font-bold text-slate-900">4.2 Hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Workload</span>
                  <span className="text-sm font-bold text-amber-600">12 Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Account Security</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">High</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Password Status</p>
                  <p className="text-xs text-slate-500">Changed 45 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Two-Factor Auth</p>
                  <p className="text-xs text-amber-600 font-medium">Not enabled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Connected Devices</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {loginHistory.slice(0,2).map((login, i) => (
                <div key={i} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${login.device.includes('iPhone') ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                    {login.device.includes('iPhone') ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-slate-900 truncate">{login.device}</p>
                      {login.current && <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{login.browser} • {login.location}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{login.date}, {login.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-200 text-center bg-slate-50/50">
              <button className="text-xs font-semibold text-blue-600 hover:underline">View All Sessions</button>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Audit Log</h3>
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
                {activities.map((item, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shrink-0 z-10 ${item.bg} ${item.color}`}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
