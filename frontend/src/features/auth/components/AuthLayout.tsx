import { ReactNode } from 'react';
import { Link } from 'react-router';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side: Branding / Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-700 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <svg className="absolute -top-24 -left-24 w-96 h-96 text-white opacity-50" fill="currentColor" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-1/2 h-1/2 text-blue-400 opacity-30 transform translate-x-1/4 translate-y-1/4" fill="currentColor" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-700 font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Madda Walabu University</span>
          </Link>
          <div className="mt-20 max-w-md">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              e-Clearance & Workflow System
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Experience a seamless, digital, and automated clearance process. Access your documents, certificates, and academic status from anywhere.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-200">
          &copy; {new Date().getFullYear()} MWU. Enterprise Digital Transformation.
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};
