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
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  FileText,
  Building2,
  X,
  AlertCircle,
  UploadCloud,
  CheckSquare,
  RefreshCw,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";

export function PendingRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<"approve" | "reject" | "info" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const pendingData = [
    { id: "REQ-2024-8932", name: "John Doe", studentId: "UGR/1234/12", program: "Regular", type: "Graduation", priority: "High", submitted: "Oct 24, 2023", daysWaiting: 2, status: "Under Review", officer: "Sarah Officer", avatar: "JD", overdue: false },
    { id: "REQ-2024-8915", name: "Sara Mohammed", studentId: "UGR/5432/12", program: "Extension", type: "Withdrawal", priority: "Medium", submitted: "Oct 21, 2023", daysWaiting: 5, status: "Pending", officer: "Unassigned", avatar: "SM", overdue: false },
    { id: "REQ-2024-8901", name: "Abebe Kebede", studentId: "UGR/4321/11", program: "Regular", type: "Graduation", priority: "Critical", submitted: "Oct 18, 2023", daysWaiting: 8, status: "Pending", officer: "Sarah Officer", avatar: "AK", overdue: true },
    { id: "REQ-2024-8890", name: "Dawit Tadesse", studentId: "UGR/6543/11", program: "Regular", type: "Graduation", priority: "Low", submitted: "Oct 25, 2023", daysWaiting: 1, status: "Pending", officer: "Unassigned", avatar: "DT", overdue: false },
    { id: "REQ-2024-8888", name: "Betelhem Alemu", studentId: "UGR/7654/12", program: "Summer", type: "Transfer", priority: "Medium", submitted: "Oct 23, 2023", daysWaiting: 3, status: "Under Review", officer: "Sarah Officer", avatar: "BA", overdue: false },
  ];

  const handleRowClick = (req: any) => {
    setSelectedRequest(req);
    setIsDrawerOpen(true);
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation(); // prevent row click opening drawer
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
      setSelectedRows(pendingData.map(req => req.id));
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
        setRejectReason("");
        setIsDrawerOpen(false); // Close drawer after action
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500 relative">
      
      {/* Live Notice Banner */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-sm animate-in slide-in-from-top-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          Live Queue Updates Active
        </div>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Connected</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Pending Requests</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Action Required Queue
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-amber-200">
              5 Pending
            </span>
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
            </>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Pending</p>
          <p className="text-2xl font-bold text-slate-900">5</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Today</p>
          <p className="text-2xl font-bold text-blue-600">1</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">High Priority</p>
          <p className="text-2xl font-bold text-amber-600">2</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Avg Waiting Time</p>
          <p className="text-2xl font-bold text-slate-900">3.8<span className="text-sm font-normal text-slate-500 ml-1">days</span></p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-red-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-100 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <p className="text-sm font-bold text-red-800 mb-1 relative z-10">Overdue Requests</p>
          <p className="text-2xl font-bold text-red-600 relative z-10">1</p>
        </div>
      </div>

      {/* Advanced Main Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Student Name, ID, or Request #..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full lg:w-auto">
            <select className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
              <option>All Priorities</option>
              <option>Critical & High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
              <option>Any Clearance Type</option>
              <option>Graduation</option>
              <option>Withdrawal</option>
              <option>Transfer</option>
            </select>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-4 w-full sm:w-auto">
              <Filter className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-700">More Filters</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-4 w-10">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="px-6 py-4 font-semibold">Student Information</th>
                <th className="px-6 py-4 font-semibold">Request Context</th>
                <th className="px-6 py-4 font-semibold">SLA / Waiting</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Assignment</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingData.map((row, i) => (
                <tr 
                  key={row.id} 
                  onClick={() => handleRowClick(row)}
                  className={`transition-colors cursor-pointer group ${
                    selectedRows.includes(row.id) ? 'bg-blue-50/50' :
                    row.overdue ? 'bg-red-50/30 hover:bg-red-50/60' : 'hover:bg-blue-50/30'
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
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                        {row.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{row.name}</span>
                        <span className="text-xs font-medium text-slate-500">{row.studentId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700">{row.id}</span>
                      <span className="text-xs text-slate-500">{row.type} • {row.program}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`text-xs font-medium flex items-center ${row.overdue ? 'text-red-600 font-bold' : 'text-amber-600'}`}>
                        <Clock className="w-3.5 h-3.5 mr-1" /> {row.daysWaiting} Days Waiting
                      </span>
                      {row.overdue && (
                        <div className="w-full bg-red-100 rounded-full h-1 mt-1">
                          <div className="bg-red-600 h-1 rounded-full w-full"></div>
                        </div>
                      )}
                      {!row.overdue && (
                        <div className="w-full bg-slate-100 rounded-full h-1 mt-1">
                          <div className="bg-amber-400 h-1 rounded-full" style={{ width: `${(row.daysWaiting / 5) * 100}%` }}></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {row.priority === 'Critical' ? (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-100 bg-red-600 border border-red-700 px-2 py-0.5 rounded shadow-sm"><AlertCircle className="w-3 h-3 mr-1" /> Critical</span>
                    ) : row.priority === 'High' ? (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded">High</span>
                    ) : row.priority === 'Medium' ? (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">Medium</span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Low</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold ${row.officer === 'Unassigned' ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                      {row.officer}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-8" onClick={() => handleRowClick(row)}>
                        Review
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
          <span>Showing 1 to 5 of 5 pending requests</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 bg-white" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-8 bg-white" disabled>Next</Button>
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

      {/* FULL SCREEN REVIEW DRAWER (Right Side) */}
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
                    Review Request
                    {selectedRequest.priority === 'Critical' && <span className="text-[10px] font-bold uppercase tracking-wider text-red-100 bg-red-600 px-2 py-0.5 rounded shadow-sm">Critical</span>}
                  </h2>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedRequest.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white shadow-sm h-8 hidden sm:flex">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message Student
                </Button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
              
              {/* SLA Banner */}
              {selectedRequest.overdue ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 shadow-sm animate-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900">SLA Violation: Request Overdue</h4>
                    <p className="text-xs text-red-700 mt-0.5">This request has exceeded the 5-day SLA target. Please process immediately.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 shadow-sm">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-bold text-blue-900">SLA Target Tracker</h4>
                      <span className="text-xs font-bold text-blue-700">{selectedRequest.daysWaiting} of 5 Days</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-1.5 mt-2">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(selectedRequest.daysWaiting / 5) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Profile Block */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-4 border-white shadow-md shrink-0 relative z-10">
                  {selectedRequest.avatar}
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-bold text-slate-900">{selectedRequest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-slate-700">{selectedRequest.studentId}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedRequest.type} Clearance</span>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-32 h-32 bg-slate-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
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
                    <p className="text-xs text-slate-500 mb-1">Submission Date</p>
                    <p className="font-medium text-slate-900 text-sm">{selectedRequest.submitted}</p>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">Document Review</h4>
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between group hover:border-blue-400 transition-colors shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">Student_ID_Scanned.pdf</p>
                        <p className="text-xs text-slate-500 mt-0.5">Required • 1.2 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 mr-2" /> View PDF
                    </Button>
                  </div>
                  
                  <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between group hover:border-blue-400 transition-colors shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">Library_Clearance_Form.jpg</p>
                        <p className="text-xs text-slate-500 mt-0.5">Supporting • 2.4 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 mr-2" /> View Image
                    </Button>
                  </div>
                </div>
              </div>

              {/* Clearance History Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Clearance History</h4>
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="space-y-6 border-l-2 border-slate-100 ml-2">
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
                      <h5 className="text-sm font-bold text-slate-900">Student Submitted</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{selectedRequest.submitted} at 09:00 AM</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
                      <h5 className="text-sm font-bold text-slate-900">Dormitory Department Approved</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Oct 25, 2023 at 11:30 AM</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-amber-100 bg-amber-500 shadow-sm animate-pulse flex items-center justify-center"></div>
                      <h5 className="text-sm font-bold text-amber-700">Pending Library Review (Current)</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Awaiting your decision</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Officer Decision Panel (Sticky Bottom) */}
            <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] shrink-0 z-20">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Record Decision</h4>
                <button className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">Save as Draft</button>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-sm h-12 text-base"
                  onClick={() => setIsActionModalOpen("approve")}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Approve
                </Button>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700 shadow-sm h-12 text-base"
                  onClick={() => setIsActionModalOpen("reject")}
                >
                  <XCircle className="w-5 h-5 mr-2" /> Reject
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white border-slate-300 text-slate-700 shadow-sm h-12 px-4 shrink-0"
                  onClick={() => setIsActionModalOpen("info")}
                  title="Request More Info"
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Modals */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {actionSuccess ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                  isActionModalOpen === 'approve' ? 'bg-emerald-100 text-emerald-600' : 
                  isActionModalOpen === 'reject' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {isActionModalOpen === 'approve' ? <CheckCircle2 className="w-10 h-10" /> : 
                   isActionModalOpen === 'reject' ? <XCircle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {isActionModalOpen === 'approve' ? 'Successfully Approved' : 
                   isActionModalOpen === 'reject' ? 'Successfully Rejected' : 'Request Sent'}
                </h3>
                <p className="text-slate-600">The student has been notified and the queue has been updated.</p>
              </div>
            ) : (
              <form onSubmit={handleActionSubmit} className="flex flex-col h-full">
                <div className={`px-6 py-4 border-b flex justify-between items-center ${
                  isActionModalOpen === 'approve' ? 'bg-emerald-50 border-emerald-100' : 
                  isActionModalOpen === 'reject' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'
                }`}>
                  <h3 className={`text-lg font-bold flex items-center ${
                    isActionModalOpen === 'approve' ? 'text-emerald-900' : 
                    isActionModalOpen === 'reject' ? 'text-red-900' : 'text-blue-900'
                  }`}>
                    {isActionModalOpen === 'approve' ? <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" /> : 
                     isActionModalOpen === 'reject' ? <AlertCircle className="w-5 h-5 mr-2 text-red-600" /> : 
                     <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />}
                    
                    {isActionModalOpen === 'approve' ? 'Confirm Approval' : 
                     isActionModalOpen === 'reject' ? 'Reject Clearance' : 'Request Information'}
                  </h3>
                  <button type="button" onClick={() => setIsActionModalOpen(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-slate-700">{selectedRequest?.studentId}</span>
                    <span className="text-sm font-bold text-slate-900">{selectedRequest?.name}</span>
                  </div>

                  {isActionModalOpen === 'reject' && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">Reason for Rejection <span className="text-red-500">*</span></label>
                      <select required className="w-full h-11 px-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm">
                        <option value="">Select a standard reason...</option>
                        <option value="unreturned">Unreturned Property / Books</option>
                        <option value="fee">Outstanding Fee</option>
                        <option value="damage">Property Damage</option>
                        <option value="documents">Missing Documents</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}

                  {isActionModalOpen === 'info' && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">Information Needed <span className="text-red-500">*</span></label>
                      <select required className="w-full h-11 px-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                        <option value="">Select category...</option>
                        <option value="documents">Missing/Unclear Documents</option>
                        <option value="clarification">Information Clarification</option>
                        <option value="contact">Contact Office Immediately</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">
                      {isActionModalOpen === 'approve' ? 'Optional Notes' : 'Detailed Remarks'} 
                      {isActionModalOpen !== 'approve' && <span className="text-red-500">*</span>}
                    </label>
                    <textarea 
                      required={isActionModalOpen !== 'approve'}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder={isActionModalOpen === 'approve' ? "Add any internal notes here..." : "Provide detailed instructions for the student to resolve this issue..."} 
                      className={`w-full min-h-[100px] p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 shadow-sm resize-none ${
                        isActionModalOpen === 'approve' ? 'focus:ring-emerald-500 focus:border-emerald-500' : 
                        isActionModalOpen === 'reject' ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    ></textarea>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
                  <Button type="button" variant="ghost" onClick={() => setIsActionModalOpen(null)} disabled={actionLoading}>Cancel</Button>
                  <Button 
                    type="submit" 
                    className={`shadow-sm px-6 ${
                      isActionModalOpen === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 
                      isActionModalOpen === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`} 
                    isLoading={actionLoading}
                  >
                    {isActionModalOpen === 'approve' ? 'Approve Student' : 
                     isActionModalOpen === 'reject' ? 'Reject Request' : 'Send Request'}
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
