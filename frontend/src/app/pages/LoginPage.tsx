import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mwuLogo from "@/imports/download.jfif";
import mwuBanner from "../../public/images.jfif";
import { ArrowLeft, Building, User, Lock } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "@/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: response.data.user, token: response.token }));
      
      toast.success("Login successful!");
      
      // Redirect based on role
      const role = response.data.user.role;
      if (role === 'STUDENT') navigate("/student");
      else if (role === 'REGISTRAR') navigate("/registrar");
      else navigate("/officer");
      
    } catch (err: any) {
      toast.error(err.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full bg-white">
      {/* Left side - Illustration / Info (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 flex-col p-12 text-white relative overflow-hidden">
        {/* Decorative Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-90"></div>
        
        {/* Top Back Link */}
        <div className="relative z-10 mb-10">
          <Link to="/" className="inline-flex items-center text-blue-100 hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        {/* Beautiful Card with Banner Image */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2">
            <div className="relative h-64 w-full rounded-xl overflow-hidden">
              <img 
                src={mwuBanner} 
                alt="MWU Banner" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-white leading-tight">
                Streamline your university clearance process.
              </h2>
              <p className="text-blue-100 text-base leading-relaxed mb-6">
                The MWU e-Clearance System provides a seamless, secure, and fast way to manage your university clearance from anywhere.
              </p>
              
              <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" /> Students
                </div>
                <div className="w-1 h-1 rounded-full bg-blue-400" />
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" /> Staff
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 lg:p-24 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-12 h-12 mb-6 rounded-md object-contain" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-600">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900" htmlFor="studentId">
                Student ID or Email
              </label>
              <Input 
                id="studentId" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com" 
                required 
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                  className="h-12 text-base pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Lock className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input type="checkbox" id="remember" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">
                Remember for 30 days
              </label>
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-6" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Register now
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center gap-4 border-t border-slate-200 pt-8">
            <Link to="/officer">
              <Button variant="ghost" size="sm" className="text-xs text-slate-500">
                Continue as Staff
              </Button>
            </Link>
            <div className="w-px h-6 bg-slate-200"></div>
            <Link to="/registrar">
              <Button variant="ghost" size="sm" className="text-xs text-slate-500">
                Continue as Registrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
