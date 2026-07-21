import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useStartClearanceMutation } from '../api/studentApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const startClearanceSchema = z.object({
  type: z.enum(['GRADUATION', 'WITHDRAWAL', 'TRANSFER', 'ACADEMIC_DISMISSAL'], {
    required_error: 'Please select a clearance type',
  }),
  reason: z.string().min(10, 'Please provide a brief reason (min 10 chars)'),
});

type StartClearanceForm = z.infer<typeof startClearanceSchema>;

export const StartClearancePage = () => {
  const [step, setStep] = useState(1);
  const [startClearance, { isLoading }] = useStartClearanceMutation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<StartClearanceForm>({
    resolver: zodResolver(startClearanceSchema),
  });

  const clearanceType = watch('type');

  const onSubmit = async (data: StartClearanceForm) => {
    try {
      await startClearance(data).unwrap();
      toast.success('Clearance request submitted successfully!');
      navigate('/student/dashboard');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to submit clearance request');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Start New Clearance</h1>
        <p className="text-slate-500 mt-1">Follow the steps below to initiate your clearance process.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
        <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
        <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Step 1: Type & Reason */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Request Details</h2>
              
              <div className="space-y-3">
                <Label>Clearance Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['GRADUATION', 'WITHDRAWAL', 'TRANSFER', 'ACADEMIC_DISMISSAL'].map((type) => (
                    <label 
                      key={type}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${clearanceType === type ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                      <input 
                        type="radio" 
                        value={type}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                        {...register('type')}
                      />
                      <span className="ml-3 font-medium text-slate-900 capitalize">
                        {type.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason / Remarks</Label>
                <textarea
                  id="reason"
                  rows={4}
                  className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  placeholder="Please provide any additional information..."
                  {...register('reason')}
                ></textarea>
                {errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason.message}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" onClick={() => setStep(2)}>Next Step</Button>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Supporting Documents</h2>
              <p className="text-sm text-slate-500">Please upload your student ID copy and any relevant letters.</p>
              
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" type="button" onClick={() => setStep(1)}>Back</Button>
                <Button type="button" onClick={() => setStep(3)}>Next Step</Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Review & Submit</h2>
              
              <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</h4>
                  <p className="font-medium text-slate-900">{clearanceType?.replace('_', ' ')}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</h4>
                  <p className="font-medium text-slate-900">{watch('reason')}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Documents</h4>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
                    <FileText className="h-4 w-4" />
                    <span>ID_Copy.pdf (Ready to upload)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  By submitting this request, you agree to the MWU Clearance Policy. Your request will be routed to the appropriate departments.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" type="button" onClick={() => setStep(2)}>Back</Button>
                <Button type="submit" isLoading={isLoading}>Submit Request</Button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
