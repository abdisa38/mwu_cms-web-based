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
  Building2,
  ChevronDown,
  X,
  AlertCircle,
  UploadCloud,
  CheckSquare
} from "lucide-react";

export function ClearanceQueue() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<"approve" | "reject" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const queueData = [
    { id: "REQ-2024-8932", name: "John Doe", studentId: "UGR/1234/12", program: "Regular", type: "Graduation", priority: "High", days: "2 days", status: "Pending", avatar: "JD" },
    { id: "REQ-2024-8915", name: "Sara Mohammed", studentId: "UGR/5432/12", program: "Extension", type: "Withdrawal", priority: "Medium", days: "5 days", status: "Pending", avatar: "SM" },
    { id: "REQ-2024-8901", name: "Abebe Kebede", studentId: "UGR/4321/11", program: "Regular", type: "Graduation", priority: "Low", days: "8 days", status: "Pending", avatar: "AK", overdue: true },
    { id: "REQ-2024-8850", name: "Betelhem Alemu", studentId: "UGR/7654/12", program: "Summer", type: "Transfer", priority: "Medium", days: "-", status: "Approved", avatar: "BA" },
    { id: "REQ-2024-8822", name: "Dawit Tadesse", studentId: "UGR/6543/11", program: "Regular", type: "Graduation", priority: "High", days: "-", status: "Rejected", avatar: "DT" },
  ];

  const filteredQueue = activeTab === "All" ? queueData : queueData.filter(q => q.status === activeTab);

  const handleRowClick = (req: any) => {
    setSelectedRequest(req);
    setIsDrawerOpen(true);
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
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Clearance Queue</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Clearance Queue
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-amber-200">
              12 Pending
            </span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Printer className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Print</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Export</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <HelpCircle className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Help</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Requests</p>
          <p className="text-2xl font-bold text-amber-600">12</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Approved Today</p>
          <p className="text-2xl font-bold text-emerald-600">24</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Rejected Today</p>
          <p className="text-2xl font-bold text-red-600">3</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Avg Review Time</p>
          <p className="text-2xl font-bold text-slate-900">4.2h</p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-red-800 mb-1">Overdue Requests</p>
          <p className="text-2xl font-bold text-red-600">1</p>
        </div>
      </div>

      {/* Main Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg w-full lg:w-auto overflow-x-auto no-scrollbar">
            {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
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
                placeholder="Search ID, Name, or Req #..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
            </div>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-4">
              <Filter className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-700">Advanced Filters</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Student Information</th>
                <th className="px-6 py-4 font-semibold">Request Details</th>
                <th className="px-6 py-4 font-semibold">Priority & Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.map((row, i) => (
                <tr 
                  key={i} 
                  onClick={() => handleRowClick(row)}
                  className={`transition-colors cursor-pointer group ${row.overdue ? 'bg-red-50/30 hover:bg-red-50/60' : 'hover:bg-blue-50/30'}`}
                >
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
                      {row.priority === 'High' ? (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 border border-red-200 px-1.5 py-0.5 rounded">High Priority</span>
                      ) : row.priority === 'Medium' ? (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">Medium</span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">Low</span>
                      )}
                      
                      {row.days !== '-' && (
                        <span className={`text-xs font-medium flex items-center ${row.overdue ? 'text-red-600' : 'text-slate-500'}`}>
                          <Clock className="w-3 h-3 mr-1" /> Waiting {row.days}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' :
                      row.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 shadow-sm' :
                      'bg-amber-50 text-amber-700 border-amber-200 shadow-sm animate-pulse'
                    }`}>
                      {row.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
                      {row.status === 'Rejected' && <XCircle className="w-3.5 h-3.5 mr-1.5" />}
                      {row.status === 'Pending' && <Clock className="w-3.5 h-3.5 mr-1.5" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" className="bg-white border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50 shadow-sm">
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Showing 1 to 5 of 12 requests</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 bg-white" disabled>Previous</Button>
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

      {/* RIGHT SIDE DRAWER: Request Details */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {selectedRequest && (
          <>
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Request Details</h2>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedRequest.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white shadow-sm h-8 hidden sm:flex">
                  <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors bg-white border border-slate-200 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Student Profile Block */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-4 border-white shadow-md shrink-0">
                  {selectedRequest.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{selectedRequest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-slate-700">{selectedRequest.studentId}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedRequest.type}</span>
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 grid grid-cols-2 gap-y-4 gap-x-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">College</p>
                  <p className="font-medium text-slate-900 text-sm">College of Computing</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                  <p className="font-medium text-slate-900 text-sm">Computer Science</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Program</p>
                  <p className="font-medium text-slate-900 text-sm">{selectedRequest.program}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Submission Date</p>
                  <p className="font-medium text-slate-900 text-sm">Oct 24, 2023</p>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center"><FileText className="w-5 h-5 mr-2 text-slate-400" /> Attached Documents</h4>
                <div className="space-y-2">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between group hover:border-blue-300 transition-colors shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">Student_ID_Scanned.pdf</p>
                        <p className="text-xs text-slate-500">1.2 MB</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-md font-medium text-xs transition-colors opacity-0 group-hover:opacity-100">
                      View
                    </button>
                  </div>
                  
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between group hover:border-blue-300 transition-colors shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">Library_Clearance_Form.jpg</p>
                        <p className="text-xs text-slate-500">2.4 MB</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-md font-medium text-xs transition-colors opacity-0 group-hover:opacity-100">
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline History */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-slate-400" /> Clearance History</h4>
                <div className="space-y-4 border-l-2 border-slate-200 ml-2">
                  <div className="relative pl-5">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
                    <h5 className="text-sm font-bold text-slate-900">Student Submitted</h5>
                    <p className="text-xs text-slate-500">Oct 24, 2023 at 09:00 AM</p>
                  </div>
                  <div className="relative pl-5">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-amber-500 shadow-sm animate-pulse"></div>
                    <h5 className="text-sm font-bold text-slate-900">Pending Library Review</h5>
                    <p className="text-xs text-slate-500">Currently assigned to you</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Officer Decision Panel (Sticky Bottom) */}
            <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0">
              {selectedRequest.status === "Pending" ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-center mb-4">Officer Decision</h4>
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
                  </div>
                  <Button variant="outline" className="w-full bg-white border-slate-300 text-slate-700 shadow-sm">
                    <MessageSquare className="w-4 h-4 mr-2" /> Request More Info
                  </Button>
                </div>
              ) : (
                <div className={`p-4 rounded-xl border text-center ${selectedRequest.status === 'Approved' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  <h4 className={`font-bold ${selectedRequest.status === 'Approved' ? 'text-emerald-800' : 'text-red-800'}`}>
                    Request {selectedRequest.status}
                  </h4>
                  <p className={`text-sm mt-1 ${selectedRequest.status === 'Approved' ? 'text-emerald-600' : 'text-red-600'}`}>
                    This request has already been processed.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Approve/Reject Action Modal */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {actionSuccess ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${isActionModalOpen === 'approve' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {isActionModalOpen === 'approve' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Successfully {isActionModalOpen === 'approve' ? 'Approved' : 'Rejected'}
                </h3>
                <p className="text-slate-600">The student has been notified and the queue has been updated.</p>
              </div>
            ) : (
              <form onSubmit={handleActionSubmit} className="flex flex-col h-full">
                <div className={`px-6 py-4 border-b flex justify-between items-center ${isActionModalOpen === 'approve' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <h3 className={`text-lg font-bold flex items-center ${isActionModalOpen === 'approve' ? 'text-emerald-900' : 'text-red-900'}`}>
                    {isActionModalOpen === 'approve' ? <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" /> : <AlertCircle className="w-5 h-5 mr-2 text-red-600" />}
                    {isActionModalOpen === 'approve' ? 'Confirm Approval' : 'Reject Clearance'}
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

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">
                      Officer Remarks {isActionModalOpen === 'reject' && <span className="text-red-500">*</span>}
                    </label>
                    <textarea 
                      required={isActionModalOpen === 'reject'}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder={isActionModalOpen === 'approve' ? "Optional notes..." : "Provide detailed instructions for the student to resolve this issue..."} 
                      className={`w-full min-h-[100px] p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 shadow-sm resize-none ${isActionModalOpen === 'approve' ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    ></textarea>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
                  <Button type="button" variant="ghost" onClick={() => setIsActionModalOpen(null)} disabled={actionLoading}>Cancel</Button>
                  <Button 
                    type="submit" 
                    className={`shadow-sm px-6 ${isActionModalOpen === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`} 
                    isLoading={actionLoading}
                  >
                    {isActionModalOpen === 'approve' ? 'Approve Student' : 'Reject Request'}
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
