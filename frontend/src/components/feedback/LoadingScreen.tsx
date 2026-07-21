import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  fullScreen?: boolean;
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  fullScreen = false, 
  message = "Loading data..." 
}) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-12 min-h-[400px]";

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 animate-pulse">{message}</p>
    </div>
  );
};
