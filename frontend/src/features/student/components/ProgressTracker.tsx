import React from 'react';
import { Check, Clock, X } from 'lucide-react';

export interface WorkflowStage {
  id: string;
  departmentName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedAt?: string;
}

interface ProgressTrackerProps {
  stages: WorkflowStage[];
}

export const ProgressTracker = ({ stages }: ProgressTrackerProps) => {
  return (
    <div className="relative">
      {/* Connecting Line */}
      <div className="absolute top-4 left-4 bottom-4 w-0.5 bg-slate-200 -z-10" />
      
      <div className="space-y-6">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-start">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 shrink-0 bg-white
              ${stage.status === 'APPROVED' ? 'border-green-500' : 
                stage.status === 'REJECTED' ? 'border-red-500' : 'border-slate-300'}`}
            >
              {stage.status === 'APPROVED' && <Check className="h-4 w-4 text-green-500" />}
              {stage.status === 'REJECTED' && <X className="h-4 w-4 text-red-500" />}
              {stage.status === 'PENDING' && <Clock className="h-4 w-4 text-slate-400" />}
            </div>
            <div className="ml-4 flex-1">
              <h4 className={`text-sm font-medium ${
                stage.status === 'PENDING' ? 'text-slate-500' : 'text-slate-900'
              }`}>
                {stage.departmentName}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {stage.status === 'APPROVED' ? `Approved on ${new Date(stage.approvedAt!).toLocaleDateString()}` : 
                 stage.status === 'REJECTED' ? 'Action required' : 'Waiting for approval'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
