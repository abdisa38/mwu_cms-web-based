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
  GraduationCap,
  Calendar,
  Award,
  Clock,
  History,
  Laptop,
  Smartphone,
  AlertCircle,
  X,
  User
} from "lucide-react";

export function StudentProfile() {
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
    { date: "Oct 22, 2023", time: "11:20 PM", device: "Unknown Device", browser: "Firefox", location: "Unknown", status: "Failed", current: false },
  ];

  const activities = [
    { title: "Profile Updated", desc: "Updated emergency contact information.", date: "Today, 10:30 AM", icon: Edit, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Clearance Submitted", desc: "Started graduation clearance workflow.", date: "Oct 24, 2023", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Document Uploaded", desc: "Uploaded 'Student_ID_Scanned.jpg'.", date: "Oct 24, 2023", icon: Camera, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Password Changed", desc: "Security credentials updated successfully.", date: "Oct 15, 2023", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-24 md:pb-0 animate-in fade-in duration-500">
      
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">My Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Student Account</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="bg-white border-slate-200 shadow-sm px-4 flex-1 sm:flex-none">
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Export</span>
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
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 w-full relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            </div>
            
            <div className="px-6 sm:px-8 pb-8 relative">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 sm:-mt-16 mb-6">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-slate-100 shadow-md flex items-center justify-center text-4xl font-bold text-blue-600 overflow-hidden">
                    JD
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center" title="Verified Account">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">John Doe</h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                      UGR/1234/12
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">Computer Science • Year 4</p>
                </div>

                <div className="w-full sm:w-auto flex flex-col gap-2">
                  <Link to="/student/clearance" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm">View Clearance</Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Account Status</p>
                  <p className="font-medium text-emerald-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> Active & Verified</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Enrollment</p>
                  <p className="font-medium text-slate-900">Regular Undergraduate</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Clearance Status</p>
                  <p className="font-medium text-amber-600 flex items-center"><Clock className="w-4 h-4 mr-1"/> In Progress</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Profile Completion</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">85%</span>
                  </div>
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
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Full Name</label>
                    {isEditing ? <Input defaultValue="John Doe" disabled className="bg-slate-50 text-slate-500" /> : <p className="font-medium text-slate-900">John Doe</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Date of Birth</label>
                    {isEditing ? <Input type="date" defaultValue="2000-01-01" /> : <p className="font-medium text-slate-900">Jan 01, 2000</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">University Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {isEditing ? <Input defaultValue="john.doe@mwu.edu.et" disabled className="bg-slate-50 text-slate-500" /> : <p className="font-medium text-slate-900">john.doe@mwu.edu.et</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Personal Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {isEditing ? <Input type="email" defaultValue="johndoe@gmail.com" /> : <p className="font-medium text-slate-900">johndoe@gmail.com</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {isEditing ? <Input type="tel" defaultValue="+251 91 234 5678" /> : <p className="font-medium text-slate-900">+251 91 234 5678</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Address</label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                      {isEditing ? <textarea className="w-full h-20 p-2 border border-slate-200 rounded-lg text-sm resize-none" defaultValue="Bale Robe Campus Dormitory Block 4, Room 102"></textarea> : <p className="font-medium text-slate-900">Bale Robe Campus Dormitory Block 4, Room 102</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact (Editable) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-slate-200 bg-amber-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center"><AlertCircle className="w-5 h-5 mr-2 text-amber-500" /> Emergency Contact</h3>
                {(!isEditing && <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md uppercase tracking-wider">Action Needed</span>)}
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Contact Name <span className="text-red-500">*</span></label>
                    {isEditing ? <Input defaultValue="Abebe Kebede" required /> : <p className="font-medium text-slate-900">Abebe Kebede</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Relationship <span className="text-red-500">*</span></label>
                    {isEditing ? (
                      <select className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="father" selected>Father</option>
                        <option value="mother">Mother</option>
                        <option value="sibling">Sibling</option>
                        <option value="guardian">Guardian</option>
                      </select>
                    ) : <p className="font-medium text-slate-900">Father</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Emergency Phone <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {isEditing ? <Input type="tel" defaultValue="+251 92 345 6789" required /> : <p className="font-medium text-slate-900">+251 92 345 6789</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Actions Bar */}
            {isEditing && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-lg sticky bottom-4 z-40 flex items-center justify-between animate-in slide-in-from-bottom-4">
                <p className="text-sm font-medium text-slate-600 hidden sm:block">You have unsaved changes.</p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none px-8" isLoading={isSaving}>Save Changes</Button>
                </div>
              </div>
            )}
          </form>

          {/* Academic Information (Read Only) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center"><GraduationCap className="w-5 h-5 mr-2 text-slate-400" /> Academic Information</h3>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 flex gap-3 text-sm text-slate-600">
                <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0" />
                <p>This information is synchronized securely with the MWU Registrar database. If you spot an error, please contact the registrar office.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">College</p>
                  <p className="font-medium text-slate-900">College of Computing</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Department</p>
                  <p className="font-medium text-slate-900">Computer Science</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Program</p>
                  <p className="font-medium text-slate-900">Undergraduate (Regular)</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Admission Year</p>
                  <p className="font-medium text-slate-900">2012 E.C.</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Expected Graduation</p>
                  <p className="font-medium text-slate-900">2016 E.C.</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Academic Advisor</p>
                  <p className="font-medium text-slate-900">Dr. Tadesse M.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebars / Logs) */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          
          {/* Clearance & Docs Summary Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900">System Modules</h3>
            </div>
            <div className="p-2 space-y-1">
              <Link to="/student/clearance" className="flex flex-col p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 group-hover:text-blue-600">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" /> Active Clearance
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 ml-7">
                  <span>3/8 Departments Cleared</span>
                  <span className="font-bold text-amber-600">37%</span>
                </div>
              </Link>
              
              <Link to="/student/documents" className="flex flex-col p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 group-hover:text-blue-600">
                    <Building2 className="w-5 h-5 text-blue-500" /> My Documents
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 ml-7">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">9 Verified</span>
                  <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md">1 Rejected</span>
                </div>
              </Link>

              <Link to="/student/certificate" className="flex flex-col p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 group-hover:text-blue-600">
                    <Award className="w-5 h-5 text-slate-400" /> Official Certificate
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-xs text-slate-400 ml-7 mt-1">Not yet available</p>
              </Link>
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Login History</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {loginHistory.map((login, i) => (
                <div key={i} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${login.device.includes('iPhone') || login.device.includes('Android') ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                    {login.device.includes('iPhone') || login.device.includes('Android') ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
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
              <button className="text-xs font-semibold text-blue-600 hover:underline">View Full Audit Log</button>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Recent Activity</h3>
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

