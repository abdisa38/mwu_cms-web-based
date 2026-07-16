import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  HelpCircle,
  MoreVertical,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
  FileText,
  Building2,
  X,
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  History,
  ShieldCheck,
  RotateCcw,
  Award
} from "lucide-react";

export function ApprovedRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<"reopen" | "export" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [reopenReason, setReopenReason] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const approvedData = [
    { id: "REQ-2024-8850", name: "Betelhem Alemu", studentId: "UGR/7654/12", program: "Regular", type: "Transfer", approvedDate: "Today", officer: "Sarah Officer", processTime: "2h 15m", avatar: "BA", certStatus: "Generated" },
    { id: "REQ-2024-8834", name: "Dawit Tadesse", studentId: "UGR/6543/11", program: "Extension", type: "Graduation", approvedDate: "Yesterday", officer: "Sarah Officer", processTime: "1d 4h", avatar: "DT", certStatus: "Issued" },
    { id: "REQ-2024-8812", name: "Helen Tesfaye", studentId: "UGR/3210/12", program: "Regular", type: "Graduation", approvedDate: "Oct 24, 2023", officer: "Abebe Kebede", processTime: "45m", avatar: "HT", certStatus: "Waiting Registrar" },
    { id: "REQ-2024-8799", name: "Kidist Belay", studentId: "UGR/8765/11", program: "Summer", type: "Withdrawal", approvedDate: "Oct 23, 2023", officer: "Sarah Officer", processTime: "3d 2h", avatar: "KB", certStatus: "Issued" },
    { id: "REQ-2024-8750", name: "Yosef Mengistu", studentId: "UGR/5678/10", program: "Regular", type: "Graduation", approvedDate: "Oct 20, 2023", officer: "Abebe Kebede", processTime: "12h 30m", avatar: "YM", certStatus: "Issued" },
  ];

  const handleRowClick = (req: any) => {
    setSelectedRequest(req);
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
      setSelectedRows(approvedData.map(req => req.id));
    } else {
      setSelectAll(false);
      setSelectedRows([]);
    }
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setActionSuccess(true);
      setTimeout(() => {
        setIsActionModalOpen(null);
        setActionSuccess(false);
        setReopenReason("");
        setIsDrawerOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500 relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Approved Requests</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Approval History Center
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {selectedRows.length > 0 ? (
            <div className="flex items-center gap-2 mr-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg animate-in slide-in-from-right-4">
              <span className="text-sm font-bold text-blue-700">{selectedRows.length} selected</span>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm ml-2 h-8" onClick={() => setIsActionModalOpen("export")}>
                <Download className="w-4 h-4 mr-1" /> Export Selected
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
                <RefreshCw className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Refresh</span>
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none" onClick={() => setIsActionModalOpen("export")}>
                <Download className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Download Report</span>
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
                <HelpCircle className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Help</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Approved Today</p>
          <p className="text-2xl font-bold text-emerald-600 flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> 24</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Approved This Week</p>
          <p className="text-2xl font-bold text-slate-900">142</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Approved This Month</p>
          <p className="text-2xl font-bold text-slate-900">589</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Historical</p>
          <p className="text-2xl font-bold text-slate-900">8,432</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Avg Process Time</p>
          <p className="text-2xl font-bold text-slate-900">4.2<span className="text-sm font-normal text-slate-500 ml-1">hrs</span></p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-100 rounded-full blur-xl -mr-4 -mt-4"></div>
          <p className="text-sm font-bold text-emerald-800 mb-1 relative z-10">Approval Rate</p>
          <p className="text-2xl font-bold text-emerald-600 relative z-10">92%</p>
        </div>
      </div>

      {/* Advanced Main History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Student Name, ID, Request # or Officer..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full lg:w-auto">
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select className="h-10 pl-9 pr-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto appearance-none">
                <option>Approval Date: All Time</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <select className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
              <option>Any Clearance Type</option>
              <option>Graduation</option>
              <option>Withdrawal</option>
              <option>Transfer</option>
            </select>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-4 w-full sm:w-auto">
              <Filter className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-700">Advanced</span>
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
                <th className="px-6 py-4 font-semibold">Student & Request</th>
                <th className="px-6 py-4 font-semibold">Approval Context</th>
                <th className="px-6 py-4 font-semibold">Processing Info</th>
                <th className="px-6 py-4 font-semibold">Overall Progress</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {approvedData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => handleRowClick(row)}
                  className={`transition-colors cursor-pointer group ${
                    selectedRows.includes(row.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                  }`}
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
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm border border-emerald-200">
                        {row.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{row.name}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="font-medium">{row.studentId}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-400">{row.id}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700">{row.type}</span>
                      <span className="text-xs text-slate-500">{row.program}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-xs font-semibold text-slate-900 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" /> {row.approvedDate}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>By {row.officer}</span>
                        <span>•</span>
                        <span>{row.processTime}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {row.certStatus === 'Generated' || row.certStatus === 'Issued' ? (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded shadow-sm">
                        <Award className="w-3.5 h-3.5 mr-1" /> Certificate {row.certStatus}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded shadow-sm">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {row.certStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="bg-white border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50 shadow-sm h-8" onClick={() => handleRowClick(row)}>
                        <Eye className="w-4 h-4 mr-1.5" /> View
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
          <span>Showing 1 to 5 of 8,432 approved requests</span>
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

      {/* FULL SCREEN DETAILS DRAWER (Right Side) */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] lg:w-[600px] xl:w-[700px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {selectedRequest && (
          <>
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors bg-white border border-slate-200 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    Approval Record
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded shadow-sm">Verified</span>
                  </h2>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedRequest.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white shadow-sm h-8 hidden sm:flex text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50" onClick={() => setIsActionModalOpen("reopen")}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reopen Request
                </Button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors bg-white border border-slate-200 shadow-sm">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
              
              {/* Approval Summary Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm animate-in slide-in-from-top-2 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900 flex items-center mb-1">
                      <CheckCircle2 className="w-6 h-6 mr-2 text-emerald-600" /> 
                      Successfully Approved
                    </h3>
                    <p className="text-sm text-emerald-800 font-medium">Library Department has cleared this student.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-0.5">Approved On</p>
                    <p className="text-sm font-bold text-emerald-900">{selectedRequest.approvedDate}</p>
                  </div>
                </div>
                
                <div className="relative z-10 bg-white/60 backdrop-blur border border-emerald-100 rounded-xl p-4 mt-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Officer Notes</p>
                  <p className="text-sm text-slate-700 italic border-l-2 border-emerald-300 pl-3">"All books returned in good condition. No outstanding fines. Approved for graduation clearance."</p>
                  <p className="text-xs text-emerald-600 font-medium mt-3 flex items-center justify-end">
                    Processed by: {selectedRequest.officer} • Time taken: {selectedRequest.processTime}
                  </p>
                </div>
              </div>

              {/* Student Profile Block */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl border-4 border-white shadow-md shrink-0">
                  {selectedRequest.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{selectedRequest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-slate-700">{selectedRequest.studentId}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-slate-600 font-medium">{selectedRequest.type} Clearance</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white hidden sm:flex shadow-sm">
                  Full Profile <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Academic Context Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Academic Context</h4>
                <div className="bg-white rounded-xl border border-slate-200 p-5 grid grid-cols-2 gap-y-4 gap-x-4 shadow-sm">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">College</p>
                    <p className="font-medium text-slate-900 text-sm">College of Computing</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Department</p>
                    <p className="font-medium text-slate-900 text-sm">Computer Science</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Program</p>
                    <p className="font-medium text-slate-900 text-sm">{selectedRequest.program}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Original Submission Date</p>
                    <p className="font-medium text-slate-900 text-sm">Oct 20, 2023</p>
                  </div>
                </div>
              </div>

              {/* Verified Documents */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">Verified Documents</h4>
                <div className="space-y-2">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between group hover:border-blue-300 transition-colors shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">Library_Clearance_Form_Signed.pdf</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-medium text-emerald-600 flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> Verified</span>
                          <span className="text-[10px] text-slate-400">• 1.2 MB</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="bg-white shadow-sm px-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white shadow-sm px-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Audit Timeline */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                  <span className="flex items-center"><History className="w-5 h-5 mr-2 text-slate-400" /> Complete Audit Trail</span>
                  <Button variant="ghost" size="sm" className="text-blue-600 h-8 text-xs">Export Logs</Button>
                </h4>
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="space-y-6 border-l-2 border-slate-100 ml-3">
                    <div className="relative pl-6">
                      <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white bg-blue-500 shadow-sm z-10 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900">Certificate Generated</h5>
                      <p className="text-xs text-slate-500 mt-0.5">System Action • Today at 10:15 AM</p>
                    </div>
                    
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-300 shadow-sm z-10"></div>
                      <h5 className="text-sm font-bold text-slate-900">Registrar Final Approval</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Aman Registrar • Today at 10:00 AM</p>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-emerald-100 bg-emerald-500 shadow-sm z-10 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mt-1">
                        <h5 className="text-sm font-bold text-emerald-900">Library Approval Recorded</h5>
                        <p className="text-xs text-emerald-700 mt-0.5 font-medium">By {selectedRequest.officer} • {selectedRequest.approvedDate}</p>
                      </div>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-300 shadow-sm z-10"></div>
                      <h5 className="text-sm font-bold text-slate-900">Documents Verified</h5>
                      <p className="text-xs text-slate-500 mt-0.5">System Action • Oct 20, 2023</p>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-300 shadow-sm z-10"></div>
                      <h5 className="text-sm font-bold text-slate-900">Student Submitted Request</h5>
                      <p className="text-xs text-slate-500 mt-0.5">John Doe • Oct 20, 2023</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] shrink-0 z-20 flex gap-3">
              <Button variant="outline" className="flex-1 bg-white border-slate-300 text-slate-700 shadow-sm h-12">
                <Printer className="w-4 h-4 mr-2" /> Print Record
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-sm h-12 text-base">
                <Download className="w-4 h-4 mr-2" /> Download Report
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Report / Reopen Action Modals */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {actionSuccess ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${isActionModalOpen === 'export' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                  {isActionModalOpen === 'export' ? <Download className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {isActionModalOpen === 'export' ? 'Export Successful' : 'Request Reopened'}
                </h3>
                <p className="text-slate-600">
                  {isActionModalOpen === 'export' ? 'Your report has been downloaded successfully.' : 'The request has been moved back to the pending queue and the student has been notified.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleActionSubmit} className="flex flex-col h-full">
                <div className={`px-6 py-4 border-b flex justify-between items-center ${isActionModalOpen === 'export' ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'}`}>
                  <h3 className={`text-lg font-bold flex items-center ${isActionModalOpen === 'export' ? 'text-blue-900' : 'text-red-900'}`}>
                    {isActionModalOpen === 'export' ? <Download className="w-5 h-5 mr-2 text-blue-600" /> : <AlertCircle className="w-5 h-5 mr-2 text-red-600" />}
                    {isActionModalOpen === 'export' ? 'Export Selected Records' : 'Reopen Approval Record'}
                  </h3>
                  <button type="button" onClick={() => setIsActionModalOpen(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  {isActionModalOpen === 'export' ? (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">You are about to export {selectedRows.length} approved records.</p>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Export Format</label>
                        <select className="w-full h-11 px-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                          <option value="pdf">PDF Summary Report</option>
                          <option value="csv">Excel / CSV Data Export</option>
                          <option value="zip">ZIP Archive (with Documents)</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                        <p><strong>Warning:</strong> Reopening this record will pull it back from the Registrar's queue. The student will be notified.</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Reason for Reopening <span className="text-red-500">*</span></label>
                        <textarea 
                          required
                          value={reopenReason}
                          onChange={(e) => setReopenReason(e.target.value)}
                          placeholder="Provide an administrative reason for reopening this approved record..." 
                          className="w-full min-h-[100px] p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
                  <Button type="button" variant="ghost" onClick={() => setIsActionModalOpen(null)} disabled={actionLoading}>Cancel</Button>
                  <Button 
                    type="submit" 
                    className={`shadow-sm px-6 ${isActionModalOpen === 'export' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`} 
                    isLoading={actionLoading}
                  >
                    {isActionModalOpen === 'export' ? 'Generate Export' : 'Confirm Reopen'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
