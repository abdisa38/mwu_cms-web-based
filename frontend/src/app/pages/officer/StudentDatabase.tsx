import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  HelpCircle,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  FileText,
  ChevronDown,
  X,
  AlertCircle,
  RefreshCw,
  MoreHorizontal,
  History,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  ArrowUpRight
} from "lucide-react";

export function StudentDatabase() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const studentData = [
    { id: "UGR/1234/12", name: "John Doe", email: "john.doe@mwu.edu.et", college: "Computing", department: "Computer Science", program: "Regular", year: "Year 4", status: "Active Clearance", accountStatus: "Active", lastActive: "2 hours ago", avatar: "JD", progress: 85, color: "text-blue-600", bg: "bg-blue-100" },
    { id: "UGR/5432/12", name: "Sara Mohammed", email: "sara.m@mwu.edu.et", college: "Engineering", department: "Software Eng", program: "Extension", year: "Year 5", status: "Cleared", accountStatus: "Active", lastActive: "1 day ago", avatar: "SM", progress: 100, color: "text-emerald-600", bg: "bg-emerald-100" },
    { id: "UGR/4321/11", name: "Abebe Kebede", email: "abebe.k@mwu.edu.et", college: "Computing", department: "Information Sys", program: "Regular", year: "Year 4", status: "Pending Review", accountStatus: "Active", lastActive: "5 mins ago", avatar: "AK", progress: 60, color: "text-amber-600", bg: "bg-amber-100" },
    { id: "UGR/7654/12", name: "Betelhem Alemu", email: "betelhem.a@mwu.edu.et", college: "Computing", department: "Computer Science", program: "Summer", year: "Year 4", status: "Rejected", accountStatus: "Active", lastActive: "3 days ago", avatar: "BA", progress: 40, color: "text-red-600", bg: "bg-red-100" },
    { id: "UGR/6543/11", name: "Dawit Tadesse", email: "dawit.t@mwu.edu.et", college: "Engineering", department: "Civil Eng", program: "Regular", year: "Year 5", status: "No Request", accountStatus: "Inactive", lastActive: "1 month ago", avatar: "DT", progress: 0, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  const filteredData = activeTab === "All" ? studentData : studentData.filter(s => s.status.includes(activeTab));

  const handleRowClick = (student: any) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAll(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectAll(true);
      setSelectedRows(studentData.map(req => req.id));
    } else {
      setSelectAll(false);
      setSelectedRows([]);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500 relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Student Database</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Department Students
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {selectedRows.length > 0 ? (
            <div className="flex items-center gap-2 mr-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg animate-in slide-in-from-right-4">
              <span className="text-sm font-bold text-blue-700">{selectedRows.length} selected</span>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm ml-2 h-8">Bulk Action <ChevronDown className="w-4 h-4 ml-1" /></Button>
            </div>
          ) : (
            <>
              <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
                <RefreshCw className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Refresh</span>
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
                <Download className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Export</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm px-4 flex-1 sm:flex-none">
                Add Student
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Students</p>
          <p className="text-2xl font-bold text-slate-900 flex items-center"><Users className="w-5 h-5 mr-2 text-blue-500" /> 1,245</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Graduating Class</p>
          <p className="text-2xl font-bold text-slate-900 flex items-center"><GraduationCap className="w-5 h-5 mr-2 text-purple-500" /> 342</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Active Clearances</p>
          <p className="text-2xl font-bold text-blue-600">89</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Reviews</p>
          <p className="text-2xl font-bold text-amber-600">12</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Rejected</p>
          <p className="text-2xl font-bold text-red-600">4</p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-100 rounded-full blur-xl -mr-4 -mt-4"></div>
          <p className="text-sm font-bold text-emerald-800 mb-1 relative z-10">Completed</p>
          <p className="text-2xl font-bold text-emerald-600 relative z-10">156</p>
        </div>
      </div>

      {/* Advanced Main Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg w-full lg:w-auto overflow-x-auto no-scrollbar">
            {['All', 'Active Clearance', 'Pending', 'Cleared', 'No Request'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Student Name, ID, Email..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
            </div>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-4 w-full sm:w-auto">
              <Filter className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-700">Filters</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative min-h-[400px]">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-4 w-10">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="px-6 py-4 font-semibold">Student Profile</th>
                <th className="px-6 py-4 font-semibold">Academic Info</th>
                <th className="px-6 py-4 font-semibold">Clearance Status</th>
                <th className="px-6 py-4 font-semibold">Account Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => handleRowClick(row)}
                  className={`transition-colors cursor-pointer group hover:bg-blue-50/30 ${selectedRows.includes(row.id) ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => handleSelectRow(e, row.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm border border-white ${row.bg} ${row.color}`}>
                        {row.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{row.name}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="font-medium">{row.id}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5">{row.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700">{row.department}</span>
                      <span className="text-xs text-slate-500">{row.program} • {row.year}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 items-start w-32">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        row.status === 'Cleared' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        row.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                        row.status === 'No Request' ? 'bg-slate-50 text-slate-600 border-slate-200' :
                        'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                      }`}>
                        {row.status}
                      </span>
                      {row.status !== 'No Request' && (
                        <div className="w-full bg-slate-100 rounded-full h-1 mt-0.5">
                          <div className={`h-1 rounded-full ${row.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${row.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900 flex items-center gap-1">
                        {row.accountStatus === 'Active' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                        {row.accountStatus}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Last active: {row.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="bg-white border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50 shadow-sm h-8" onClick={() => handleRowClick(row)}>
                        View Profile
                      </Button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors ml-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Showing 1 to 5 of 1,245 students</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 bg-white" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-8 bg-white">1</Button>
            <Button variant="outline" size="sm" className="h-8 bg-white">2</Button>
            <Button variant="outline" size="sm" className="h-8 bg-white">3</Button>
            <span className="px-2 py-1">...</span>
            <Button variant="outline" size="sm" className="h-8 bg-white">Next</Button>
          </div>
        </div>
      </div>

      {/* Overlay to darken main content when drawer is open */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* FULL SCREEN PROFILE DRAWER (Right Side) */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] lg:w-[600px] xl:w-[700px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {selectedStudent && (
          <>
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center shrink-0 z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors bg-white border border-slate-200 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
                <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  Student Profile
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white shadow-sm h-8 hidden sm:flex">
                  <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors bg-white border border-slate-200 shadow-sm">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
              
              {/* Hero Profile Block */}
              <div className="bg-white border-b border-slate-200 px-6 pb-6 pt-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className={`w-28 h-28 rounded-3xl flex items-center justify-center font-bold text-3xl border-4 border-white shadow-lg shrink-0 ${selectedStudent.bg} ${selectedStudent.color}`}>
                    {selectedStudent.avatar}
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">{selectedStudent.name}</h3>
                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shadow-sm mx-auto sm:mx-0">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                      </span>
                    </div>
                    
                    <p className="text-slate-600 font-medium mb-4 flex items-center justify-center sm:justify-start gap-2">
                      {selectedStudent.id} <span className="text-slate-300">•</span> {selectedStudent.department}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <Button size="sm" variant="outline" className="bg-white shadow-sm h-8">
                        <MessageSquare className="w-4 h-4 mr-2" /> Message
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white shadow-sm h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                        <Building2 className="w-4 h-4 mr-2" /> View Documents
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Clearance Summary Widget */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                    Clearance Overview
                    <Link to="/officer/pending" className="text-xs font-semibold text-blue-600 hover:underline flex items-center">
                      Open Full Timeline <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </h4>
                  
                  {selectedStudent.status !== 'No Request' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                          selectedStudent.status === 'Cleared' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' :
                          selectedStudent.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 shadow-sm' :
                          'bg-blue-50 text-blue-700 border-blue-200 shadow-sm animate-pulse'
                        }`}>
                          {selectedStudent.status}
                        </span>
                        <span className="text-sm font-bold text-slate-700">{selectedStudent.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
                        <div className={`h-2 rounded-full transition-all ${selectedStudent.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${selectedStudent.progress}%` }}></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                        <div className="text-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                          <p className="text-lg font-bold text-emerald-700">6</p>
                          <p className="text-[10px] font-semibold text-emerald-600 uppercase">Approved</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-amber-50 border border-amber-100">
                          <p className="text-lg font-bold text-amber-700">2</p>
                          <p className="text-[10px] font-semibold text-amber-600 uppercase">Pending</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                          <p className="text-lg font-bold text-slate-700">8</p>
                          <p className="text-[10px] font-semibold text-slate-500 uppercase">Total Depts</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-900">No Clearance Active</p>
                      <p className="text-xs text-slate-500 mt-1">This student has not initiated a clearance workflow.</p>
                    </div>
                  )}
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Contact Info */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Contact Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">University Email</p>
                          <p className="text-sm font-medium text-slate-900 break-all">{selectedStudent.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Phone Number</p>
                          <p className="text-sm font-medium text-slate-900">+251 91 234 5678</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Academic Record</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">College</p>
                        <p className="text-sm font-medium text-slate-900">{selectedStudent.college}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Program & Year</p>
                        <p className="text-sm font-medium text-slate-900">{selectedStudent.program} • {selectedStudent.year}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Expected Graduation</p>
                        <p className="text-sm font-medium text-slate-900">2016 E.C.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                    <span className="flex items-center"><History className="w-5 h-5 mr-2 text-slate-400" /> Recent Activity</span>
                    <Button variant="ghost" size="sm" className="text-blue-600 h-8 text-xs">View Audit Log</Button>
                  </h4>
                  <div className="space-y-6 border-l-2 border-slate-100 ml-2">
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-300 shadow-sm z-10"></div>
                      <h5 className="text-sm font-bold text-slate-900">Profile Viewed</h5>
                      <p className="text-xs text-slate-500 mt-0.5">By You • Just now</p>
                    </div>
                    {selectedStudent.status !== 'No Request' && (
                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm z-10"></div>
                        <h5 className="text-sm font-bold text-slate-900">Department Review Approved</h5>
                        <p className="text-xs text-slate-500 mt-0.5">By Abebe Kebede • 2 days ago</p>
                      </div>
                    )}
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-300 shadow-sm z-10"></div>
                      <h5 className="text-sm font-bold text-slate-900">Documents Uploaded</h5>
                      <p className="text-xs text-slate-500 mt-0.5">By Student • Oct 20, 2023</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Officer Action Footer (Sticky Bottom) */}
            <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] shrink-0 z-20 flex gap-3">
              <Button variant="outline" className="flex-1 bg-white border-slate-300 text-slate-700 shadow-sm h-12">
                <Printer className="w-4 h-4 mr-2" /> Print Profile
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-sm h-12 text-base">
                <Download className="w-4 h-4 mr-2" /> Download Report
              </Button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
