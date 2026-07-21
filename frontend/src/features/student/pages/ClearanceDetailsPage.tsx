import { useParams, Link } from 'react-router';
import { useGetClearanceByIdQuery } from '../api/studentApi';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressTracker } from '../components/ProgressTracker';
import { FileText, ArrowLeft, Download, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ClearanceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetClearanceByIdQuery(id as string, { skip: !id });
  
  const clearance = data?.data?.clearance;

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 animate-pulse">Loading clearance details...</div>;
  }

  if (!clearance) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Clearance Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6">The requested clearance record could not be found.</p>
        <Link to="/student/clearances">
          <Button variant="outline">Back to Clearances</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/student/clearances" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-slate-900">Clearance Request</h1>
              <StatusBadge status={clearance.status} />
            </div>
            <p className="text-slate-500 mt-1">ID: #{clearance._id.substring(0, 8).toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          {clearance.status === 'REJECTED' && (
            <Button variant="destructive">
              <MessageSquare className="mr-2 h-4 w-4" /> File Appeal
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Details (Left Col) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Request Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Clearance Type</h4>
                  <p className="font-medium text-slate-900">{clearance.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Initiated Date</h4>
                  <p className="font-medium text-slate-900">{new Date(clearance.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="sm:col-span-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Student Reason / Remarks</h4>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">{clearance.studentRemarks || 'No remarks provided.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Workflow List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Department Approvals</h2>
            </div>
            <div className="p-0">
              <div className="divide-y divide-slate-100">
                {clearance.workflow.map((stage: any) => (
                  <div key={stage.department} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50">
                    <div>
                      <h4 className="font-semibold text-slate-900">{stage.departmentName}</h4>
                      {stage.remarks && (
                        <p className="text-sm text-slate-600 mt-1 italic">"{stage.remarks}"</p>
                      )}
                      {stage.approver && (
                        <p className="text-xs text-slate-400 mt-2">
                          Handled by: {stage.approver.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <StatusBadge status={stage.status} />
                      {stage.status !== 'PENDING' && (
                        <p className="text-xs text-slate-400 mt-2">
                          {new Date(stage.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Right Col) */}
        <div className="space-y-6">
          {/* Progress Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Progress Tracker</h2>
            </div>
            <div className="p-6">
              <ProgressTracker stages={clearance.workflow} />
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Attachments</h2>
            </div>
            <div className="p-4 space-y-3">
              {clearance.attachments && clearance.attachments.length > 0 ? (
                clearance.attachments.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium text-slate-900 truncate">Document_{index + 1}.pdf</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No attachments uploaded.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
