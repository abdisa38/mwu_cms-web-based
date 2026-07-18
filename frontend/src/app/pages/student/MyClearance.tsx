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
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  FileText,
  UploadCloud,
  Eye,
  RefreshCw,
  PhoneCall,
  Award
} from "lucide-react";

export function MyClearance() {
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [appealLoading, setAppealLoading] = useState(false);
  const [appealSuccess, setAppealSuccess] = useState(false);
  const [appealReason, setAppealReason] = useState("");

  const handleAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppealLoading(true);
    setTimeout(() => {
      setAppealLoading(false);
      setAppealSuccess(true);
      setTimeout(() => {
        setIsAppealModalOpen(false);
        setAppealSuccess(false);
        setAppealReason("");
      }, 2000);
    }, 1500);
  };

  const timelineSteps = [
    { title: 'Student Submitted', officer: 'System', date: 'Oct 24, 2023', time: '09:00 AM', status: 'completed', icon: CheckCircle2, remarks: 'Submitted successfully' },
    { title: 'Library Review', officer: 'Sarah Officer', date: 'Oct 25, 2023', time: '11:30 AM', status: 'rejected', icon: XCircle, remarks: 'Unreturned book (Intro to Algorithms)' },
    { title: 'Dormitory Review', officer: 'Abebe Kebede', date: 'Pending', time: '-', status: 'pending', icon: Clock, remarks: 'Waiting for review' },
    { title: 'Cafeteria Review', officer: 'Pending', date: '-', time: '-', status: 'waiting', icon: Clock, remarks: '-' },
    { title: 'Bookstore Review', officer: 'Pending', date: '-', time: '-', status: 'waiting', icon: Clock, remarks: '-' },
    { title: 'Department Head Review', officer: 'Pending', date: '-', time: '-', status: 'waiting', icon: Clock, remarks: '-' },
    { title: 'Registrar Final Review', officer: 'Pending', date: '-', time: '-', status: 'waiting', icon: Clock, remarks: '-' },
    { title: 'Certificate Generated', officer: 'System', date: '-', time: '-', status: 'waiting', icon: Award, remarks: '-' },
  ];

  const departmentStatus = [
    { dept: 'Library', officer: 'Sarah Officer', status: 'Rejected', date: 'Oct 25, 2023', remarks: 'Unreturned book' },
    { dept: 'Student Cafe', officer: 'Helen T.', status: 'Approved', date: 'Oct 25, 2023', remarks: 'Cleared' },
    { dept: 'Sports Department', officer: 'Dawit S.', status: 'Approved', date: 'Oct 24, 2023', remarks: 'Cleared' },
    { dept: 'Dormitory', officer: 'Abebe Kebede', status: 'Pending', date: '-', remarks: 'In queue' },
    { dept: 'Bookstore', officer: '-', status: 'Waiting', date: '-', remarks: '-' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">My Clearance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Clearance Tracker</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Filter className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Printer className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Print</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm px-3 flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Timeline + Progress) */}
        <div className="space-y-6">
          {/* Current Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center gap-6">
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Circle */}
                <path
                  className="text-slate-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress Circle (37%) */}
                <path
                  className="text-blue-600"
                  strokeWidth="3"
                  strokeDasharray="37, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-900">37%</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Current Progress</h3>
              <p className="text-sm text-slate-500 mb-2">3 of 8 Departments Cleared</p>
              <p className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md inline-block">
                Est. Completion: 3 Days
              </p>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Clearance Timeline</h3>
            </div>
            <div className="p-6">
              <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                {timelineSteps.map((step, i) => {
                  let colorClass = 'text-slate-400 bg-slate-100 border-slate-200';
                  let iconColor = 'text-slate-500';
                  
                  if (step.status === 'completed') {
                    colorClass = 'text-emerald-600 bg-emerald-50 border-emerald-200';
                    iconColor = 'text-emerald-600';
                  } else if (step.status === 'rejected') {
                    colorClass = 'text-red-600 bg-red-50 border-red-200';
                    iconColor = 'text-red-600';
                  } else if (step.status === 'pending') {
                    colorClass = 'text-amber-600 bg-amber-50 border-amber-200';
                    iconColor = 'text-amber-600';
                  }

                  return (
                    <div key={i} className="relative pl-6">
                      <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${colorClass}`}>
                        <step.icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${step.status !== 'waiting' ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Officer: <span className="font-medium text-slate-700">{step.officer}</span>
                        </p>
                        {step.status !== 'waiting' && (
                          <div className="mt-2 bg-slate-50 rounded-lg p-2 border border-slate-100 text-xs">
                            <div className="flex justify-between text-slate-500 mb-1">
                              <span>{step.date}</span>
                              <span>{step.time}</span>
                            </div>
                            <p className={`font-medium ${step.status === 'rejected' ? 'text-red-600' : 'text-slate-700'}`}>
                              {step.remarks}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Cards + Tables) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Clearance Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40 -mr-20 -mt-20 pointer-events-none" />
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 relative z-10 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Clearance Record</p>
                <h2 className="text-3xl font-bold text-slate-900">REQ-2024-8932</h2>
                <span className="inline-flex mt-2 items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                  <span className="flex h-2 w-2 rounded-full bg-amber-600 mr-2 animate-pulse"></span>
                  Action Required
                </span>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-slate-500 mb-1">Clearance Type</p>
                <p className="font-semibold text-slate-900">Graduation (Regular)</p>
                <p className="text-xs text-slate-400 mt-1">Started: Oct 24, 2023</p>
              </div>
            </div>

            {/* Clearance Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-slate-100 relative z-10">
              <div>
                <p className="text-xs text-slate-500 mb-1">Student ID</p>
                <p className="font-medium text-slate-900">UGR/1234/12</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Department</p>
                <p className="font-medium text-slate-900">Computer Science</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Program</p>
                <p className="font-medium text-slate-900">Undergraduate</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Academic Year</p>
                <p className="font-medium text-slate-900">2023/2024</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 relative z-10">
              <Button variant="outline" className="bg-white" disabled>
                <Eye className="w-4 h-4 mr-2 text-slate-400" /> View Certificate
              </Button>
              <Button variant="outline" className="bg-white text-slate-700 hover:text-blue-600">
                <PhoneCall className="w-4 h-4 mr-2" /> Contact Registrar
              </Button>
            </div>
          </div>

          {/* Rejection Warning Banner */}
          <div className="bg-red-50 rounded-2xl border border-red-200 shadow-sm p-6 animate-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-red-900">Library Clearance Rejected</h3>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-sm" onClick={() => setIsAppealModalOpen(true)}>
                    Submit Appeal
                  </Button>
                </div>
                <p className="text-red-800 mb-4">
                  Your clearance was rejected by <span className="font-semibold">Sarah Officer</span> on Oct 25, 2023.
                </p>
                <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">Officer's Remarks:</h4>
                  <p className="text-sm text-slate-600 italic border-l-2 border-slate-300 pl-3 py-1">
                    "Student has an unreturned book: 'Introduction to Algorithms, 3rd Edition'. Please return the book to the main library desk or pay the replacement fee."
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Resolution Steps:</h4>
                    <ol className="list-decimal list-inside text-sm text-slate-600 space-y-1">
                      <li>Return the book to the library OR pay the fine.</li>
                      <li>Obtain a digital receipt or evidence of return.</li>
                      <li>Click "Submit Appeal" to upload your evidence.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Uploaded Documents</h3>
              <Button variant="outline" size="sm" className="bg-white h-8">
                <UploadCloud className="w-4 h-4 mr-2" /> Upload More
              </Button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">Student_ID_Card.pdf</p>
                  <p className="text-xs text-slate-500">1.2 MB • Uploaded Oct 24</p>
                </div>
                <button className="text-slate-400 hover:text-blue-600 p-2"><Eye className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">Clearance_Form_Signed.jpg</p>
                  <p className="text-xs text-slate-500">2.4 MB • Uploaded Oct 24</p>
                </div>
                <button className="text-slate-400 hover:text-blue-600 p-2"><Eye className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Department Status Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Department Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Department</th>
                    <th className="px-6 py-3 font-medium">Officer</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departmentStatus.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.dept}</td>
                      <td className="px-6 py-4 text-slate-600">{row.officer}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                          row.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                          row.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{row.date}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs max-w-[200px] truncate">{row.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Appeal Modal */}
      {isAppealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {appealSuccess ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Appeal Submitted!</h3>
                <p className="text-slate-600">Your evidence has been uploaded and sent to the Library Department for review.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">Submit Appeal</h3>
                  <button onClick={() => setIsAppealModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleAppealSubmit} className="p-6 space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-800">
                    <AlertCircle className="w-5 h-5 shrink-0 text-blue-600" />
                    <p>Appealing for the <strong>Library Department</strong>. Please provide a clear explanation and attach any proof (e.g., receipt of return).</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Explanation / Reason</label>
                    <textarea 
                      required
                      value={appealReason}
                      onChange={(e) => setAppealReason(e.target.value)}
                      placeholder="Explain how you resolved the issue..." 
                      className="w-full min-h-[100px] p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Upload Evidence (Optional)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-sm font-medium text-slate-700">Click to upload evidence</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <Button type="button" variant="ghost" onClick={() => setIsAppealModalOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" isLoading={appealLoading}>
                      Submit Appeal
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
