import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const normalized = status.toUpperCase();
  
  const styles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
    COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const defaultStyle = 'bg-slate-100 text-slate-800 border-slate-200';
  const appliedStyle = styles[normalized] || defaultStyle;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${appliedStyle}`}>
      {status.replace('_', ' ')}
    </span>
  );
};
