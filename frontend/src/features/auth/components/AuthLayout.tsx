import { ReactNode } from 'react';
import { Link } from 'react-router';
import bannerImage from '../../../public/images.jfif';

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
        {/* Background Image / Banner inside a Card */}
        <div className="absolute inset-0 p-12 flex items-center justify-center opacity-90">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-blue-800/50 backdrop-blur-sm border border-blue-400/20 flex flex-col relative">
            <img 
              src={bannerImage}
              alt="MWU Banner" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              onError={(e) => {
                // Fallback styling if image is missing
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-blue-700 font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">Madda Walabu University</span>
            </Link>
          </div>
          
          <div className="max-w-md pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              e-Clearance & Workflow System
            </h1>
            <p className="text-blue-50 text-lg leading-relaxed drop-shadow-sm font-medium">
              Experience a seamless, digital, and automated clearance process. Access your documents, certificates, and academic status from anywhere.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-200/80 font-medium">
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
