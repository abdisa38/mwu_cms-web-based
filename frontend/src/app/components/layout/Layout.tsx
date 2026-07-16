import { Outlet, Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import mwuLogo from "../../../imports/download.jfif";
import { Button } from "../ui/Button";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/" className="flex items-center gap-3">
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-10 h-10 object-contain rounded-md" />
            <span className="font-bold text-xl text-slate-900 hidden sm:block tracking-tight">
              MWU e-Clearance
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/verify" className="hover:text-blue-600 transition-colors">Verify Certificate</Link>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQs</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <ImageWithFallback src={mwuLogo} alt="MWU Logo" className="w-8 h-8 grayscale opacity-70" />
            <span>&copy; {new Date().getFullYear()} Madda Walabu University. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
