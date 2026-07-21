import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here you would typically log the error to Sentry, DataDog, etc.
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-500 max-w-md mb-6">
            A critical error occurred while rendering this module. Our engineering team has been notified.
          </p>
          <div className="bg-white p-4 rounded-lg border border-slate-200 w-full max-w-lg overflow-auto mb-6 text-left text-xs font-mono text-slate-700 h-32">
            {this.state.error?.message}
          </div>
          <Button onClick={this.handleReset} className="bg-slate-900 hover:bg-slate-800">
            <RefreshCcw className="mr-2 h-4 w-4" /> Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
