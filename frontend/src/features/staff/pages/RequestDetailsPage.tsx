import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useGetQueueItemDetailsQuery, useApproveClearanceMutation, useRejectClearanceMutation } from '../api/staffApi';
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

export const RequestDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetQueueItemDetailsQuery(id as string, { skip: !id });
  
  const [approve] = useApproveClearanceMutation();
  const [reject] = useRejectClearanceMutation();
  
  const [remarks, setRemarks] = useState('');
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const clearance = data?.data?.clearance;

  const handleApprove = async () => {
    try {
      await approve({ clearanceId: id!, remarks }).unwrap();
      toast.success('Clearance approved successfully!');
      setIsApproveOpen(false);
      navigate('/staff/queue');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to approve clearance.');
    }
  };

  const handleReject = async () => {
    if (!remarks.trim()) {
      toast.error('Rejection reason is mandatory.');
      return;
    }
    try {
      await reject({ clearanceId: id!, remarks }).unwrap();
      toast.success('Clearance rejected.');
      setIsRejectOpen(false);
      navigate('/staff/queue');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to reject clearance.');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading request details...</div>;
  if (!clearance) return <div className="p-8 text-center text-slate-500">Request not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/staff/queue" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Review Clearance Request</h1>
            <p className="text-slate-500 mt-1">ID: #{clearance._id.substring(0, 8).toUpperCase()} • {clearance.type.replace('_', ' ')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none">
                <XCircle className="mr-2 h-4 w-4" /> Reject Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Clearance Request</DialogTitle>
                <DialogDescription>
                  Provide a mandatory reason for rejection so the student knows what to fix.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Rejection Reason *</Label>
                  <textarea 
                    className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g. You have 2 unreturned library books..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleReject}>Confirm Rejection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2 h-4 w-4" /> Approve Clearance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Clearance</DialogTitle>
                <DialogDescription>
                  You are about to approve this clearance on behalf of your department. This action cannot be easily undone.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    By clicking approve, you confirm that the student has no outstanding obligations with your department.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Optional Remarks</Label>
                  <Input 
                    placeholder="Any closing notes..." 
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsApproveOpen(false)}>Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApprove}>Confirm Approval</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400 shrink-0">
              {clearance.student?.firstName?.charAt(0) || 'S'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">{clearance.student?.firstName} {clearance.student?.lastName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-slate-500">Student ID</p>
                  <p className="font-medium text-slate-900">{clearance.student?.studentId}</p>
                </div>
                <div>
                  <p className="text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">{clearance.student?.email}</p>
                </div>
                <div>
                  <p className="text-slate-500">Department</p>
                  <p className="font-medium text-slate-900">{clearance.student?.department || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-500">Contact</p>
                  <p className="font-medium text-slate-900">{clearance.student?.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Student Remarks</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">
                {clearance.studentRemarks || 'No remarks provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Attachments */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Student Documents</h2>
            </div>
            <div className="p-4 space-y-3">
              {clearance.attachments && clearance.attachments.length > 0 ? (
                clearance.attachments.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                    <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium text-slate-900 truncate">Document_{index + 1}.pdf</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <FileText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">No documents attached.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
