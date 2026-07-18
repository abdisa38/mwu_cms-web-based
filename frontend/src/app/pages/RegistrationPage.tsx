import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export function RegistrationPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();

  const nextStep = () => setStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4 bg-slate-50">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Progress Header */}
          <div className="border-b border-slate-200 px-8 py-6 bg-slate-50/50">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Create an account</h1>
            <p className="text-slate-500 text-sm mb-6">Complete your registration to start the clearance process.</p>
            
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i < step ? "bg-blue-600 text-white" : 
                    i === step ? "bg-white border-2 border-blue-600 text-blue-600" : 
                    "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-slate-400 px-1">
              <span className={step >= 1 ? "text-slate-900" : ""}>Personal</span>
              <span className={step >= 2 ? "text-slate-900" : ""}>Academic</span>
              <span className={step >= 3 ? "text-slate-900" : ""}>Security</span>
              <span className={step >= 4 ? "text-slate-900" : ""}>Uploads</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-slate-900">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-slate-900">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Personal Email</label>
                  <Input type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Phone Number</label>
                  <Input type="tel" placeholder="+251 91 234 5678" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Academic Information</h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Student ID</label>
                  <Input placeholder="UGR/1234/12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">College / Faculty</label>
                  <Input placeholder="College of Computing" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Department</label>
                  <Input placeholder="Computer Science" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Security</h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Upload Documents</h2>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-4">
                    <ArrowRight className="w-6 h-6 text-slate-400 rotate-[-90deg]" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">Upload your Student ID Card (PDF, JPG, PNG)</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-200 px-8 py-6 bg-slate-50/50 flex justify-between items-center">
            {step > 1 ? (
              <Button variant="ghost" onClick={prevStep} className="text-slate-600">
                Previous
              </Button>
            ) : (
              <div />
            )}
            
            {step < totalSteps ? (
              <Button onClick={nextStep} className="bg-slate-900 text-white hover:bg-slate-800 ml-auto">
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => navigate('/student')} className="bg-blue-600 text-white hover:bg-blue-700 ml-auto">
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
