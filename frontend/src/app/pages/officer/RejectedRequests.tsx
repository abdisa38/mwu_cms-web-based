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
  ChevronDown,
  X,
  AlertCircle,
  RefreshCw,
  MoreHorizontal,
  History,
  Scale,
  Ban,
  ArrowUpRight,
  UploadCloud
} from "lucide-react";

export function RejectedRequests() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<"approve-appeal" | "reject-appeal" | "request-info" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const rejectedData = [
    { id: "REQ-2024-8850", name: "Dawit Tadesse", studentId: "UGR/6543/11", program: "Regular", type: "Graduation", rejectedDate: "Oct 25, 2023", officer: "Sarah Officer", reason: "Unreturned Book", priority: "High", appealStatus: "Appeal Pending", avatar: "DT", overdue: true },
    { id: "REQ-2024-8812", name: "Sara Mohammed", studentId: "UGR/5432/12", program: "Extension", type: "Withdrawal", rejectedDate: "Oct 24, 2023", officer: "Abebe Kebede", reason: "Outstanding Fee", priority: "Medium", appealStatus: "No Appeal", avatar: "SM", overdue: false },
    { id: "REQ-2024-8799", name: "John Doe", studentId: "UGR/1234/12", program: "Regular", type: "Graduation", rejectedDate: "Oct 23, 2023", officer: "Sarah Officer", reason: "Missing Documents", priority: "Medium", appealStatus: "Appeal Reviewed", avatar: "JD", overdue: false },
    { id: "REQ-2024-8750", name: "Betelhem Alemu", studentId: "UGR/7654/12", program: "Summer", type: "Transfer", rejectedDate: "Oct 20, 2023", officer: "Sarah Officer", reason: "Disciplinary Issue", priority: "High", appealStatus: "Appeal Rejected", avatar: "BA", overdue: false },
  ];

  const filteredData = activeTab === "All" ? rejectedData : rejectedData.filter(q => q.appealStatus === activeTab);

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
      setSelectedRows(rejectedData.map(req => req.id));
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
            <span className="text-slate-900 font-medium">Rejected Requests</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Rejection & Appeal Center
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
              <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
                <HelpCircle className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Help</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Rejected</p>
          <p className="text-2xl font-bold text-slate-900">42</p>
        </div>
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-amber-100 rounded-full blur-xl -mr-4 -mt-4"></div>
          <p className="text-sm font-bold text-amber-800 mb-1 relative z-10">Pending Appeals</p>
          <p className="text-2xl font-bold text-amber-600 relative z-10">1</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Resolved Appeals</p>
          <p className="text-2xl font-bold text-emerald-600">14</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Appeal Success Rate</p>
          <p className="text-2xl font-bold text-slate-900">85%</p>
        </div>
      </div>

      {/* Advanced Main Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg w-full lg:w-auto overflow-x-auto no-scrollbar">
            {['All', 'No Appeal', 'Appeal Pending', 'Appeal Reviewed', 'Appeal Rejected'].map(tab => (
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
                placeholder="Search by Name, ID, Reason..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
            </div>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-4 w-full sm:w-auto">
              <Filter className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-700">Filters</span>
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
                <th className="px-6 py-4 font-semibold">Rejection Context</th>
                <th className="px-6 py-4 font-semibold">Officer / Date</th>
                <th className="px-6 py-4 font-semibold">Appeal Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row, i) => (
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
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm border border-slate-200">
                        {row.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{row.name}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="font-medium">{row.studentId}</span>
                          <span>•</span>
                          <span>{row.program}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{row.reason}</span>
                      <span className="text-xs text-slate-500">{row.type} • {row.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700">{row.rejectedDate}</span>
                      <span className="text-xs text-slate-500">By {row.officer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.appealStatus === 'Appeal Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm animate-pulse' :
                      row.appealStatus === 'Appeal Reviewed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' :
                      row.appealStatus === 'Appeal Rejected' ? 'bg-red-50 text-red-700 border-red-200 shadow-sm' :
                      'bg-slate-50 text-slate-600 border-slate-200 shadow-sm'
                    }`}>
                      {row.appealStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="bg-white border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50 shadow-sm h-8" onClick={() => handleRowClick(row)}>
                        Manage
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
          <span>Showing 1 to 4 of 42 rejected requests</span>
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

      {/* FULL SCREEN REJECTION/APPEAL DRAWER (Right Side) */}
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
                    Appeal Management
                    {selectedRequest.priority === 'High' && <span className="text-[10px] font-bold uppercase tracking-wider text-red-100 bg-red-600 px-2 py-0.5 rounded shadow-sm">High Priority</span>}
                  </h2>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedRequest.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white shadow-sm h-8 hidden sm:flex">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message
                </Button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
              
              {/* Rejection Banner Context */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm animate-in slide-in-from-top-2 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-red-100 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-red-900 flex items-center mb-1">
                      <Ban className="w-6 h-6 mr-2 text-red-600" /> 
                      Request Rejected
                    </h3>
                    <p className="text-sm text-red-800 font-medium">Reason: {selectedRequest.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-0.5">Rejected On</p>
                    <p className="text-sm font-bold text-red-900">{selectedRequest.rejectedDate}</p>
                  </div>
                </div>
                
                <div className="relative z-10 bg-white/80 backdrop-blur border border-red-100 rounded-xl p-4 mt-2 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Officer Notes</p>
                  <p className="text-sm text-slate-700 italic border-l-2 border-red-300 pl-3">"Student has not returned the book 'Introduction to Algorithms'. Need proof of return or receipt of fine payment before clearing."</p>
                </div>
              </div>

              {/* Student Profile Block */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xl border-4 border-white shadow-md shrink-0 relative z-10">
                  {selectedRequest.avatar}
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-bold text-slate-900">{selectedRequest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-slate-700">{selectedRequest.studentId}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-slate-600 font-medium">{selectedRequest.type} Clearance</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white shadow-sm relative z-10">
                  Full Profile <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Appeal Section */}
              {selectedRequest.appealStatus === "Appeal Pending" && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                    <Scale className="w-4 h-4 mr-2" /> Appeal Submitted by Student
                  </h4>
                  <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 shadow-sm">
                    <p className="text-sm text-amber-900 font-medium mb-3">Student's Explanation:</p>
                    <p className="text-sm text-amber-800 italic bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
                      "I returned the book yesterday afternoon to the main campus library desk. I have attached the return receipt they gave me as evidence."
                    </p>
                    
                    <div className="mt-5 pt-5 border-t border-amber-200">
                      <p className="text-sm font-semibold text-amber-900 mb-3 flex items-center"><UploadCloud className="w-4 h-4 mr-2" /> Uploaded Evidence</p>
                      <div className="bg-white border border-amber-100 p-3 rounded-xl flex items-center justify-between group hover:border-amber-300 transition-colors shadow-sm cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">Book_Return_Receipt.pdf</p>
                            <p className="text-xs text-slate-500">854 KB • Uploaded Today</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-4 h-4 mr-2" /> View PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Complete Audit Timeline */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                  <span className="flex items-center"><History className="w-5 h-5 mr-2 text-slate-400" /> Rejection & Appeal History</span>
                </h4>
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="space-y-6 border-l-2 border-slate-100 ml-3">
                    
                    {selectedRequest.appealStatus === "Appeal Pending" && (
                      <div className="relative pl-6">
                        <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-amber-100 bg-amber-500 shadow-sm z-10 flex items-center justify-center animate-pulse">
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mt-0">
                          <h5 className="text-sm font-bold text-amber-900">Appeal Submitted</h5>
                          <p className="text-xs text-amber-700 mt-0.5 font-medium">By {selectedRequest.name} • Today, 08:30 AM</p>
                        </div>
                      </div>
                    )}

                    <div className="relative pl-6">
                      <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-red-100 bg-red-500 shadow-sm z-10 flex items-center justify-center">
                        <XCircle className="w-3 h-3 text-white" />
                      </div>
                      <h5 className="text-sm font-bold text-slate-900">Request Rejected</h5>
                      <p className="text-xs text-slate-500 mt-0.5">By {selectedRequest.officer} • {selectedRequest.rejectedDate}</p>
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

            {/* Officer Action Footer (Sticky Bottom) */}
            <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] shrink-0 z-20">
              {selectedRequest.appealStatus === "Appeal Pending" ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-center mb-4">Appeal Decision</h4>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-sm h-12 text-base"
                      onClick={() => setIsActionModalOpen("approve-appeal")}
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" /> Approve Appeal
                    </Button>
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700 shadow-sm h-12 text-base"
                      onClick={() => setIsActionModalOpen("reject-appeal")}
                    >
                      <XCircle className="w-5 h-5 mr-2" /> Reject Appeal
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-white border-slate-300 text-slate-700 shadow-sm h-12 px-4 shrink-0"
                      onClick={() => setIsActionModalOpen("request-info")}
                      title="Request More Info"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-2">
                  <p className="text-sm text-slate-500 italic">No active appeal pending for this rejection.</p>
                </div>
              )}
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
                  isActionModalOpen === 'approve-appeal' ? 'bg-emerald-100 text-emerald-600' : 
                  isActionModalOpen === 'reject-appeal' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {isActionModalOpen === 'approve-appeal' ? <CheckCircle2 className="w-10 h-10" /> : 
                   isActionModalOpen === 'reject-appeal' ? <XCircle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {isActionModalOpen === 'approve-appeal' ? 'Appeal Approved' : 
                   isActionModalOpen === 'reject-appeal' ? 'Appeal Rejected' : 'Request Sent'}
                </h3>
                <p className="text-slate-600">The student has been notified and the queue has been updated.</p>
              </div>
            ) : (
              <form onSubmit={handleActionSubmit} className="flex flex-col h-full">
                <div className={`px-6 py-4 border-b flex justify-between items-center ${
                  isActionModalOpen === 'approve-appeal' ? 'bg-emerald-50 border-emerald-100' : 
                  isActionModalOpen === 'reject-appeal' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'
                }`}>
                  <h3 className={`text-lg font-bold flex items-center ${
                    isActionModalOpen === 'approve-appeal' ? 'text-emerald-900' : 
                    isActionModalOpen === 'reject-appeal' ? 'text-red-900' : 'text-blue-900'
                  }`}>
                    {isActionModalOpen === 'approve-appeal' ? <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" /> : 
                     isActionModalOpen === 'reject-appeal' ? <AlertCircle className="w-5 h-5 mr-2 text-red-600" /> : 
                     <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />}
                    
                    {isActionModalOpen === 'approve-appeal' ? 'Approve Appeal' : 
                     isActionModalOpen === 'reject-appeal' ? 'Reject Appeal' : 'Request Information'}
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

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">
                      Officer Remarks {isActionModalOpen !== 'approve-appeal' && <span className="text-red-500">*</span>}
                    </label>
                    <textarea 
                      required={isActionModalOpen !== 'approve-appeal'}
                      placeholder={isActionModalOpen === 'approve-appeal' ? "Add any internal notes here..." : "Provide detailed instructions for the student..."} 
                      className={`w-full min-h-[100px] p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 shadow-sm resize-none ${
                        isActionModalOpen === 'approve-appeal' ? 'focus:ring-emerald-500 focus:border-emerald-500' : 
                        isActionModalOpen === 'reject-appeal' ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    ></textarea>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
                  <Button type="button" variant="ghost" onClick={() => setIsActionModalOpen(null)} disabled={actionLoading}>Cancel</Button>
                  <Button 
                    type="submit" 
                    className={`shadow-sm px-6 ${
                      isActionModalOpen === 'approve-appeal' ? 'bg-emerald-600 hover:bg-emerald-700' : 
                      isActionModalOpen === 'reject-appeal' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`} 
                    isLoading={actionLoading}
                  >
                    {isActionModalOpen === 'approve-appeal' ? 'Approve' : 
                     isActionModalOpen === 'reject-appeal' ? 'Reject' : 'Send Request'}
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
