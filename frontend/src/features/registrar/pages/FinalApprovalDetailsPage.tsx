import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useGetGlobalQueueDetailsQuery, useFinalApproveClearanceMutation, useFinalRejectClearanceMutation } from '../api/registrarApi';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, ShieldCheck, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export const FinalApprovalDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetGlobalQueueDetailsQuery(id as string, { skip: !id });
  
  const [approve] = useFinalApproveClearanceMutation();
  const [reject] = useFinalRejectClearanceMutation();
  
  const [remarks, setRemarks] = useState('');
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const clearance = data?.data?.clearance;

  const handleApprove = async () => {
    try {
      await approve({ clearanceId: id!, remarks }).unwrap();
      toast.success('Clearance completed! Certificate generated.');
      setIsApproveOpen(false);
      navigate('/registrar/queue');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to complete clearance.');
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
      navigate('/registrar/queue');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to reject clearance.');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading final clearance data...</div>;
  if (!clearance) return <div className="p-8 text-center text-slate-500">Record not found.</div>;

  const allApproved = clearance.workflow.every((stage: any) => stage.status === 'APPROVED');
  const isPendingFinal = clearance.status === 'PENDING';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/registrar/queue" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Registrar Final Review</h1>
            <p className="text-slate-500 mt-1">ID: #{clearance._id.substring(0, 8).toUpperCase()} • {clearance.type.replace('_', ' ')}</p>
          </div>
        </div>
        
        {isPendingFinal ? (
          <div className="flex items-center space-x-3">
            <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none">
                  <XCircle className="mr-2 h-4 w-4" /> Reject & Return
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Clearance</DialogTitle>
                  <DialogDescription>
                    Return this clearance to the student. They will be notified of the reason.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Reason for Rejection *</Label>
                    <textarea 
                      className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g. Incomplete ID copy..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleReject}>Reject</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" disabled={!allApproved}>
                  <ShieldCheck className="mr-2 h-4 w-4" /> Final Authorization
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Final Authorization</DialogTitle>
                  <DialogDescription>
                    You are granting the final system approval. This will instantly lock the clearance record and generate the official digital certificate.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {!allApproved && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start space-x-3 mb-4">
                      <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">
                        Warning: Some departments have not yet approved this clearance. Final authorization is blocked.
                      </p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Registrar Note (Optional)</Label>
                    <textarea 
                      className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Official registrar closing note..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsApproveOpen(false)}>Cancel</Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleApprove} disabled={!allApproved}>Confirm & Generate Certificate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Log
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Checklist */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Department Approval Chain</h2>
              <span className={`text-xs font-bold px-2 py-1 rounded ${allApproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {allApproved ? 'All Cleared' : 'Incomplete'}
              </span>
            </div>
            <div className="p-0">
              <div className="divide-y divide-slate-100">
                {clearance.workflow.map((stage: any) => (
                  <div key={stage.department} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">{stage.departmentName}</h4>
                      {stage.remarks && (
                        <p className="text-sm text-slate-600 mt-1">"{stage.remarks}"</p>
                      )}
                      <p className="text-xs text-slate-400 mt-2">
                        {stage.approver ? `Handled by: ${stage.approver.name}` : 'Not yet reviewed'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {stage.status === 'APPROVED' && <span className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold"><CheckCircle className="h-4 w-4 mr-1"/> Cleared</span>}
                      {stage.status === 'REJECTED' && <span className="flex items-center text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold"><XCircle className="h-4 w-4 mr-1"/> Rejected</span>}
                      {stage.status === 'PENDING' && <span className="flex items-center text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold">Pending</span>}
                      
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

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Student Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500">Full Name</p>
                <p className="font-medium text-slate-900">{clearance.student?.firstName} {clearance.student?.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Student ID</p>
                <p className="font-medium text-slate-900">{clearance.student?.studentId}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Department</p>
                <p className="font-medium text-slate-900">{clearance.student?.department || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Initiated On</p>
                <p className="font-medium text-slate-900">{new Date(clearance.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
