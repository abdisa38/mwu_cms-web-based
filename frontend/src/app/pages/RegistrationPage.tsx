import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { ArrowLeft, ArrowRight, Check, UploadCloud, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  studentId: z.string().min(3, "Student ID is required"),
  college: z.string().min(2, "College is required"),
  department: z.string().min(2, "Department is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function RegistrationPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      studentId: "",
      college: "",
      department: "",
      password: "",
      confirmPassword: "",
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["firstName", "lastName", "email", "phoneNumber"];
    if (step === 2) fieldsToValidate = ["studentId", "college", "department"];
    if (step === 3) fieldsToValidate = ["password", "confirmPassword"];
    
    if (step < 4) {
      const isStepValid = await trigger(fieldsToValidate as any);
      if (isStepValid) setStep(step + 1);
    }
  };

  const prevStep = () => setStep(Math.max(step - 1, 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
    }
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    if (step < 4) {
      await nextStep();
      return;
    }

    if (!idDocument) {
      toast.error("Please upload your Student ID Card");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber || "");
      formData.append("studentId", data.studentId);
      formData.append("college", data.college);
      formData.append("department", data.department);
      formData.append("password", data.password);
      formData.append("idDocument", idDocument);
      formData.append("roleSlug", "student");

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message || "Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-8">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium text-slate-900">First Name</label>
                      <Input {...register("firstName")} placeholder="John" />
                      {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium text-slate-900">Last Name</label>
                      <Input {...register("lastName")} placeholder="Doe" />
                      {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Personal Email</label>
                    <Input {...register("email")} type="email" placeholder="john.doe@example.com" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Phone Number</label>
                    <Input {...register("phoneNumber")} type="tel" placeholder="+251 91 234 5678" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Academic Information</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Student ID</label>
                    <Input {...register("studentId")} placeholder="UGR/1234/12" />
                    {errors.studentId && <p className="text-xs text-red-500">{errors.studentId.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">College / Faculty</label>
                    <Input {...register("college")} placeholder="College of Computing" />
                    {errors.college && <p className="text-xs text-red-500">{errors.college.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Department</label>
                    <Input {...register("department")} placeholder="Computer Science" />
                    {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Security</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Password</label>
                    <Input {...register("password")} type="password" placeholder="••••••••" />
                    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Confirm Password</label>
                    <Input {...register("confirmPassword")} type="password" placeholder="••••••••" />
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Upload Documents</h2>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {!idDocument ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-4">
                        <UploadCloud className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-500 mt-1">Upload your Student ID Card (PDF, JPG, PNG)</p>
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-slate-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 line-clamp-1">{idDocument.name}</p>
                          <p className="text-xs text-slate-500">{(idDocument.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setIdDocument(null)} className="text-slate-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 px-8 py-6 bg-slate-50/50 flex justify-between items-center">
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={prevStep} className="text-slate-600">
                  Previous
                </Button>
              ) : (
                <div />
              )}
              
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} className="bg-slate-900 text-white hover:bg-slate-800 ml-auto">
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-700 ml-auto">
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
