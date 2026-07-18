import { useState } from "react";
import { Search, Plus, UploadCloud, Download, RefreshCw } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { StudentKPIs } from "./components/StudentKPIs";
import { StudentFilters } from "./components/StudentFilters";
import { StudentTable } from "./components/StudentTable";
import { mockStudents } from "./data/mockStudents";
import { StudentRecord } from "./data/types";
import { StudentProfileWorkspace } from "./components/workspace/StudentProfileWorkspace";
import { ImportStudentsModal } from "./components/modals/ImportStudentsModal";

export function StudentDatabasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">Students</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Student Database</h1>
          <p className="text-slate-500 text-sm mt-1">Official university-wide student management center.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Global Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by ID, Name, Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-sm transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="px-3" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-2 text-slate-600" onClick={() => setIsImportModalOpen(true)}>
              <UploadCloud className="w-4 h-4" />
              <span className="hidden lg:inline">Import</span>
            </Button>
            <Button variant="outline" className="gap-2 text-slate-600">
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Export</span>
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Student</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-8 overflow-y-auto">
        <StudentKPIs students={mockStudents} />
        <StudentFilters />
        <StudentTable 
          students={mockStudents} 
          onSelectStudent={setSelectedStudent}
        />
      </div>

      {/* Workspace Overlay */}
      {selectedStudent && (
        <StudentProfileWorkspace 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}

      {/* Modals */}
      <ImportStudentsModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

    </div>
  );
}
