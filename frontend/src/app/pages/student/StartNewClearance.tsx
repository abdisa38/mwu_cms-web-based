import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import {
  ChevronRight, Save, HelpCircle, GraduationCap, XOctagon, 
  ArrowRightLeft, AlertTriangle, Briefcase, FileText, UploadCloud,
  CheckCircle2, Clock, CheckSquare, X, Info, ShieldCheck,
  ChevronLeft, FileCheck2
} from "lucide-react";

export function StartNewClearance() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [clearanceType, setClearanceType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const totalSteps = 5; // Step 6 is success

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const saveDraft = () => {
    setLastSaved(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(6); // Success Step
    }, 2000);
  };

  const clearanceTypes = [
    { id: 'graduation', title: 'Graduation Clearance', icon: GraduationCap, desc: 'For students who have completed all academic requirements for graduation.' },
    { id: 'withdrawal', title: 'Withdrawal Clearance', icon: XOctagon, desc: 'For students officially withdrawing from the university before graduation.' },
    { id: 'transfer', title: 'Transfer Clearance', icon: ArrowRightLeft, desc: 'For students transferring to another university or program.' },
    { id: 'dismissal', title: 'Academic Dismissal', icon: AlertTriangle, desc: 'For students leaving due to academic dismissal.' },
    { id: 'staff', title: 'Staff Clearance', icon: Briefcase, desc: 'For staff members completing their tenure or transitioning roles.' },
  ];

  const steps = [
    "Clearance Type",
    "Student Info",
    "Academic Info",
    "Upload Documents",
    "Review"
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 md:pb-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Start New Clearance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Start New Clearance</h1>
        </div>
        
        {step < 6 && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            {lastSaved && (
              <span className="text-xs font-medium text-slate-400 flex items-center mr-2">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Saved {lastSaved}
              </span>
            )}
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm flex-1 md:flex-none" onClick={saveDraft}>
              <Save className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm flex-1 md:flex-none text-slate-600">
              <HelpCircle className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Help</span>
            </Button>
            <Button variant="ghost" className="text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={() => navigate('/student')}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {step < 6 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Stepper Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 hidden md:block">
            <div className="flex items-center justify-between relative max-w-3xl mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />
              {steps.map((label, i) => {
                const stepNum = i + 1;
                const isCompleted = stepNum < step;
                const isCurrent = stepNum === step;
                return (
                  <div key={stepNum} className="relative flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-sm transition-colors z-10 ${
                      isCompleted ? 'bg-blue-600 border-blue-100 text-white' : 
                      isCurrent ? 'bg-white border-blue-600 text-blue-600' : 
                      'bg-white border-slate-200 text-slate-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                    </div>
                    <span className={`absolute top-12 text-xs font-semibold whitespace-nowrap ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Mobile Stepper */}
          <div className="md:hidden px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-blue-600">{steps[step-1]}</span>
          </div>

          <div className="p-6 md:p-8 flex-1 min-h-[400px]">
            <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="h-full">
              
              {/* STEP 1: Type Selection */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Clearance Type</h2>
                    <p className="text-slate-600">Choose the type of clearance you are applying for. This will determine your workflow.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {clearanceTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setClearanceType(type.id)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                          clearanceType === type.id 
                            ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-500/10' 
                            : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                            clearanceType === type.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <type.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={`font-bold ${clearanceType === type.id ? 'text-blue-900' : 'text-slate-900'}`}>{type.title}</h3>
                            <p className={`text-sm mt-1 ${clearanceType === type.id ? 'text-blue-700' : 'text-slate-500'}`}>{type.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Student Info */}
              {step === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Student Information</h2>
                    <p className="text-slate-600">Verify your details and provide contact information.</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" /> University Records (Auto-filled)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Full Name</p>
                        <p className="font-medium text-slate-900">John Doe</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Student ID</p>
                        <p className="font-medium text-slate-900">UGR/1234/12</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">University Email</p>
                        <p className="font-medium text-slate-900">john.doe@mwu.edu.et</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">College</p>
                        <p className="font-medium text-slate-900">College of Computing</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Department</p>
                        <p className="font-medium text-slate-900">Computer Science</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Program</p>
                        <p className="font-medium text-slate-900">Undergraduate Regular</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">Contact Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900">Current Phone Number <span className="text-red-500">*</span></label>
                        <Input defaultValue="+251 91 234 5678" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900">Emergency Contact Name <span className="text-red-500">*</span></label>
                        <Input placeholder="e.g. Abebe Kebede" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900">Emergency Phone Number <span className="text-red-500">*</span></label>
                        <Input placeholder="e.g. +251 92..." required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900">Current Address <span className="text-red-500">*</span></label>
                        <Input placeholder="City, Sub-city, Woreda" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900 flex justify-between">
                        <span>Reason for Clearance <span className="text-red-500">*</span></span>
                        <span className="text-xs text-slate-400">Max 200 characters</span>
                      </label>
                      <textarea 
                        required
                        placeholder="Provide any additional context for your clearance..." 
                        className="w-full min-h-[100px] p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Academic Info */}
              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Academic Information</h2>
                    <p className="text-slate-600">Provide details regarding your academic status.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Admission Year <span className="text-red-500">*</span></label>
                      <select required className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900">
                        <option value="">Select Year</option>
                        <option value="2012">2012 E.C.</option>
                        <option value="2013">2013 E.C.</option>
                        <option value="2014">2014 E.C.</option>
                        <option value="2015">2015 E.C.</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Expected Graduation Year</label>
                      <select className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900">
                        <option value="">Select Year</option>
                        <option value="2016" selected>2016 E.C.</option>
                        <option value="2017">2017 E.C.</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Current Semester <span className="text-red-500">*</span></label>
                      <select required className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900">
                        <option value="">Select Semester</option>
                        <option value="1">Semester I</option>
                        <option value="2" selected>Semester II</option>
                        <option value="summer">Summer</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Latest CGPA (Optional)</label>
                      <Input type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.45" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-slate-900">Academic Advisor Name (Optional)</label>
                      <Input placeholder="e.g. Dr. Abebe Kebede" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Documents */}
              {step === 4 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Required Documents</h2>
                    <p className="text-slate-600">Upload all necessary documents to support your clearance request.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Document Checklist */}
                    <div className="md:col-span-1 space-y-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-semibold text-slate-900 mb-4">Checklist</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Student ID Copy</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Profile Photo</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Supporting Letter <span className="text-red-500">*</span></span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
                        <Info className="w-5 h-5 shrink-0 text-blue-600" />
                        <p>Accepted formats: JPG, PNG, PDF. Maximum file size: 5MB per file.</p>
                      </div>
                    </div>

                    {/* Upload Area */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer bg-white h-48">
                        <UploadCloud className="w-10 h-10 text-blue-500 mb-3" />
                        <p className="text-base font-semibold text-slate-900">Drag & drop files here</p>
                        <p className="text-sm text-slate-500 mt-1 mb-4">or click to browse from your computer</p>
                        <Button size="sm" variant="outline" className="bg-white">Browse Files</Button>
                      </div>

                      {/* Uploaded Files Preview */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-900">Uploaded Files</h4>
                        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between group hover:border-emerald-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Student_ID_Scanned.jpg</p>
                              <p className="text-xs text-slate-500">1.2 MB • Upload complete</p>
                            </div>
                          </div>
                          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between group hover:border-emerald-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Profile_Photo_Recent.png</p>
                              <p className="text-xs text-slate-500">2.4 MB • Upload complete</p>
                            </div>
                          </div>
                          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review */}
              {step === 5 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Confirmation</h2>
                    <p className="text-slate-600">Please review all information before submitting your clearance request.</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-semibold text-slate-900">Summary</h3>
                      <button onClick={() => setStep(1)} className="text-sm text-blue-600 font-medium hover:underline">Edit Request</button>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/30">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Clearance Type</p>
                          <p className="font-medium text-slate-900 flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                            Graduation Clearance
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Student Name</p>
                          <p className="font-medium text-slate-900">John Doe (UGR/1234/12)</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Contact Details</p>
                          <p className="text-slate-900 text-sm">+251 91 234 5678</p>
                          <p className="text-slate-900 text-sm">john.doe@mwu.edu.et</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Required Departments</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {['Library', 'Dormitory', 'Cafeteria', 'Bookstore', 'Dept. Head', 'Registrar'].map(dept => (
                              <span key={dept} className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 shadow-sm">{dept}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Expected Processing Time</p>
                          <p className="font-medium text-slate-900 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-amber-500" />
                            3 - 5 Business Days
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t border-slate-200 bg-amber-50/50">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input type="checkbox" required className="peer sr-only" />
                          <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                          </div>
                        </div>
                        <div className="text-sm text-slate-700">
                          <span className="font-semibold text-slate-900 block mb-0.5">Declaration of Truth</span>
                          I hereby declare that all the information provided is correct and complete. I understand that any false information may lead to the rejection of my clearance and disciplinary action.
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={prevStep}
                    disabled={step === 1 || isSubmitting}
                    className={`${step === 1 ? 'invisible' : ''} text-slate-600`}
                  >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                {step < totalSteps ? (
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 shadow-sm px-6"
                    disabled={step === 1 && !clearanceType}
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="bg-emerald-600 hover:bg-emerald-700 shadow-sm px-8"
                    isLoading={isSubmitting}
                  >
                    Submit Clearance Request
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 6: Success Page */}
      {step === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 text-center animate-in zoom-in-95 duration-500 max-w-2xl mx-auto my-12 relative overflow-hidden">
          {/* Confetti-like decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-64 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-md">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted Successfully!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Your clearance request has been forwarded to the respective departments. You will receive notifications as it progresses.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Request Number</span>
                <span className="font-bold text-lg text-blue-900">REQ-2024-8933</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Clearance Type</span>
                <span className="font-semibold text-slate-900">Graduation</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Status</span>
                <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-sm font-semibold text-amber-700">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                  Pending Review
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white h-12 px-6" onClick={() => navigate('/student')}>
                Return to Dashboard
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 shadow-md" onClick={() => navigate('/student/clearance')}>
                <FileCheck2 className="w-5 h-5 mr-2" /> Track My Clearance
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
