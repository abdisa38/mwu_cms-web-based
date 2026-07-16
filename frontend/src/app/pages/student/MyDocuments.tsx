import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText,
  UploadCloud,
  Eye,
  RefreshCw,
  FolderOpen,
  Image as ImageIcon,
  File as FileIcon,
  ShieldCheck,
  HardDrive,
  Grid,
  List,
  MoreVertical,
  Trash2,
  Edit2,
  History,
  ScanLine,
  HelpCircle,
  X
} from "lucide-react";

export function MyDocuments() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeCategory, setActiveCategory] = useState("All Documents");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { name: "All Documents", count: 12 },
    { name: "Student ID", count: 1 },
    { name: "Profile Photo", count: 1 },
    { name: "Supporting Documents", count: 5 },
    { name: "Appeal Documents", count: 2 },
    { name: "Certificates", count: 0 },
    { name: "Other Documents", count: 3 },
  ];

  const documents = [
    { id: 1, name: "Student_ID_Scanned.jpg", category: "Student ID", type: "Image", ext: "JPG", size: "1.2 MB", date: "Oct 24, 2023", status: "Verified", icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, name: "Profile_Photo_Official.png", category: "Profile Photo", type: "Image", ext: "PNG", size: "2.4 MB", date: "Oct 24, 2023", status: "Verified", icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-50" },
    { id: 3, name: "Library_Return_Receipt.pdf", category: "Appeal Documents", type: "Document", ext: "PDF", size: "0.8 MB", date: "Oct 26, 2023", status: "Pending", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 4, name: "Clearance_Form_Signed.pdf", category: "Supporting Documents", type: "Document", ext: "PDF", size: "1.5 MB", date: "Oct 24, 2023", status: "Rejected", remarks: "Blurry scan", officer: "Sarah Officer", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
    { id: 5, name: "Transcript_Copy.pdf", category: "Supporting Documents", type: "Document", ext: "PDF", size: "3.1 MB", date: "Oct 20, 2023", status: "Verified", icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: 6, name: "Medical_Clearance.pdf", category: "Supporting Documents", type: "Document", ext: "PDF", size: "1.1 MB", date: "Oct 22, 2023", status: "Verified", icon: FileText, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  const filteredDocs = activeCategory === "All Documents" 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setIsUploadModalOpen(false);
            setUploadProgress(0);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">My Documents</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Document Management</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <RefreshCw className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <ScanLine className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Scan</span>
          </Button>
          <Button onClick={() => setIsUploadModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-sm px-4 flex-1 sm:flex-none">
            <UploadCloud className="w-4 h-4 mr-2" /> Upload Document
          </Button>
        </div>
      </div>

      {/* Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Documents</p>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-50 rounded-full blur-xl -mr-4 -mt-4"></div>
          <p className="text-sm font-medium text-slate-500 mb-1 relative z-10">Verified</p>
          <p className="text-2xl font-bold text-emerald-700 relative z-10">9</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-amber-50 rounded-full blur-xl -mr-4 -mt-4"></div>
          <p className="text-sm font-medium text-slate-500 mb-1 relative z-10">Pending</p>
          <p className="text-2xl font-bold text-amber-700 relative z-10">2</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-red-50 rounded-full blur-xl -mr-4 -mt-4"></div>
          <p className="text-sm font-medium text-slate-500 mb-1 relative z-10">Rejected</p>
          <p className="text-2xl font-bold text-red-700 relative z-10">1</p>
        </div>
        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-sm flex flex-col col-span-2 md:col-span-4 lg:col-span-1">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-slate-300 flex items-center"><HardDrive className="w-4 h-4 mr-1"/> Storage</p>
            <span className="text-xs text-slate-400">45%</span>
          </div>
          <p className="text-xl font-bold text-white mb-2">22.5 <span className="text-sm font-normal text-slate-400">/ 50 MB</span></p>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Panel */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hidden lg:block">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Categories</h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.name 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FolderOpen className={`w-4 h-4 ${activeCategory === cat.name ? 'text-blue-500' : 'text-slate-400'}`} />
                      <span className="truncate">{cat.name}</span>
                    </div>
                    {cat.count > 0 && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        activeCategory === cat.name ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Category Dropdown */}
          <div className="lg:hidden bg-white rounded-xl border border-slate-200 shadow-sm p-2">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name} ({cat.count})</option>
              ))}
            </select>
          </div>
          
          {/* Security Badge */}
          <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4 mt-4 hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="font-semibold text-emerald-900 text-sm">Secure Storage</h4>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              All documents are encrypted at rest and in transit. Only authorized department officers can view your files.
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 space-y-4 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button variant="outline" size="sm" className="bg-white border-slate-200 shadow-sm">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
              <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Document Content Area */}
          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FileIcon className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No documents found</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                There are no documents in the "{activeCategory}" category. Upload a new document to get started.
              </p>
              <Button onClick={() => setIsUploadModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <UploadCloud className="w-4 h-4 mr-2" /> Upload Document
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group overflow-hidden flex flex-col">
                  {/* Card Header / Thumbnail Area */}
                  <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative p-4 group-hover:bg-slate-100 transition-colors">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-white/50 ${doc.bg} ${doc.color}`}>
                      <doc.icon className="w-8 h-8" />
                    </div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-600 border border-slate-200/50 shadow-sm">
                      {doc.ext}
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white rounded-md shadow-sm border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm truncate" title={doc.name}>{doc.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 truncate">{doc.category} • {doc.size}</p>
                    
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {doc.status === 'Verified' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                         doc.status === 'Rejected' ? <XCircle className="w-4 h-4 text-red-500" /> :
                         <Clock className="w-4 h-4 text-amber-500" />}
                        <span className={`text-xs font-medium ${
                          doc.status === 'Verified' ? 'text-emerald-700' :
                          doc.status === 'Rejected' ? 'text-red-700' : 'text-amber-700'
                        }`}>{doc.status}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{doc.date}</span>
                    </div>

                    {/* Quick Hover Actions (Overlays bottom of card) */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t border-slate-200 translate-y-full group-hover:translate-y-0 transition-transform flex justify-center gap-2">
                      <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors tooltip-trigger" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Replace">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Document Name</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Size</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Uploaded</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${doc.bg} ${doc.color}`}>
                            <doc.icon className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-slate-900 truncate max-w-[200px]">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{doc.category}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{doc.size}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' :
                          doc.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200/50' :
                          'bg-amber-50 text-amber-700 border border-amber-200/50'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{doc.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Download className="w-4 h-4" /></button>
                          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            
            {showSuccess ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload Complete!</h3>
                <p className="text-slate-600">Your document has been securely saved to the system.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">Upload New Document</h3>
                  <button onClick={() => !isUploading && setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600 disabled:opacity-50">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Document Category <span className="text-red-500">*</span></label>
                    <select className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900">
                      <option value="">Select a category...</option>
                      {categories.filter(c => c.name !== "All Documents").map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {!isUploading ? (
                    <div className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <p className="text-base font-bold text-slate-900 mb-1">Drag & drop your file here</p>
                      <p className="text-sm text-slate-500 mb-6">or click to browse from your device</p>
                      
                      <div className="flex gap-4 text-xs font-medium text-slate-400 bg-white px-4 py-2 rounded-lg border border-slate-200">
                        <span>PDF, PNG, JPG</span>
                        <span className="w-px h-4 bg-slate-300"></span>
                        <span>Max 5 MB</span>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">Scanned_Document_001.pdf</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-slate-500">Uploading... {uploadProgress}%</p>
                            <p className="text-xs font-medium text-blue-600">~2s remaining</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-200 ease-out" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsUploadModalOpen(false)} disabled={isUploading}>Cancel</Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 px-6" 
                    onClick={handleSimulateUpload}
                    disabled={isUploading}
                  >
                    Start Upload
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
