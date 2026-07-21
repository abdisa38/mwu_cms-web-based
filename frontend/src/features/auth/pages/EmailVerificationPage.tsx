import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { useVerifyEmailMutation } from '../api/authApi';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '@/components/ui/button';

export const EmailVerificationPage = () => {
  const { token } = useParams<{ token: string }>();
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('Verification token is missing.');
        return;
      }

      try {
        await verifyEmail({ token }).unwrap();
        setStatus('success');
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.data?.message || 'Verification failed. The link may be expired or invalid.');
      }
    };

    verify();
  }, [token, verifyEmail]);

  if (status === 'loading') {
    return (
      <AuthLayout title="Verifying Email" subtitle="Please wait while we verify your account...">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Communicating with server...</p>
        </div>
      </AuthLayout>
    );
  }

  if (status === 'success') {
    return (
      <AuthLayout title="Email Verified!" subtitle="Your account is now fully active.">
        <div className="text-center py-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for verifying your university email address. You can now log in and access the MWU e-Clearance System.
          </p>
          <Link to="/login">
            <Button className="w-full h-11 text-base">
              Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Verification Failed" subtitle="We couldn't verify your email address.">
      <div className="text-center py-8">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <p className="text-slate-800 font-medium mb-2">Error Details:</p>
        <p className="text-slate-600 mb-8 p-4 bg-slate-50 rounded-lg border border-slate-100">
          {errorMessage}
        </p>
        <div className="space-y-3">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
