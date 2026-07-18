import { StudentRecord } from "../../../data/types";
import { GraduationCap, Building2, BookOpen, Award, Bookmark, Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function AcademicInfoTab({ student }: { student: StudentRecord }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-slate-500" /> Academic Profile
          </h3>
          <Button variant="outline" className="text-xs py-1 h-8">Update Status</Button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">College / Faculty</label>
            <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-slate-400" /> {student.college}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
            <div className="text-sm font-medium text-slate-900">{student.department}</div>
          </div>
          
          <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Program</label>
                <div className="text-sm text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {student.program}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Degree Type</label>
                <div className="text-sm text-slate-700 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-slate-400" /> {student.degree}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Student Category</label>
                <div className="text-sm text-slate-700 flex items-center gap-2">
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" /> {student.studentCategory}
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Current Year Level</label>
                <div className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-max">Year {student.yearLevel}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Admission Year</label>
                <div className="text-sm text-slate-700 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {student.admissionYear}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Expected Graduation</label>
                <div className="text-sm text-slate-700 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" /> {student.expectedGraduation}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Academic Advisor</label>
          <div className="text-sm font-medium text-slate-900">{student.advisor}</div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1 text-right">Academic Standing</label>
          <div className="text-sm font-semibold text-emerald-600 text-right">{student.academicStatus}</div>
        </div>
      </div>
    </div>
  );
}
