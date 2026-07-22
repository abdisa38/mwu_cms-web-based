import { Link } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, CheckCircle2, Shield, Zap, FileText, ChevronDown } from "lucide-react";
import { useGetPublicStatsQuery } from "@/api/publicApi";
import { useState } from "react";

export function LandingPage() {
  const { data: statsResponse, isLoading } = useGetPublicStatsQuery();
  const stats = statsResponse?.data;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-blue-50/50 to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none" />
        
        <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-3 py-1 text-sm text-blue-600 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            MWU Digital Transformation
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Digital University Clearance <br className="hidden md:block" />
            <span className="text-blue-600">Made Simple</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-slate-600 md:text-xl leading-relaxed mb-10">
            Complete your university clearance digitally without the paperwork.
            Fast, secure, and fully automated process for Madda Walabu University students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white">
                Learn More
              </Button>
            </a>
          </div>
          
          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-8 text-slate-500">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {isLoading ? "..." : `${(stats?.totalStudentsCleared || 0) / 1000}k+`}
              </span>
              <span className="text-sm font-medium">Students Cleared</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {isLoading ? "..." : `${stats?.totalDepartments || 0}+`}
              </span>
              <span className="text-sm font-medium">Departments</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {isLoading ? "..." : `${stats?.avgApprovalTimeHours || 0}hr`}
              </span>
              <span className="text-sm font-medium">Average Approval</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
              Everything you need for clearance
            </h2>
            <p className="text-slate-600 text-lg max-w-[600px] mx-auto">
              Our platform provides all the tools necessary for a seamless and rapid clearance process.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-amber-500" />}
              title="Fast Digital Clearance"
              description="Skip the long lines and physical offices. Submit your clearance request online in minutes."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              title="Real-time Tracking"
              description="Monitor the status of your clearance request in real-time across all departments."
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-blue-500" />}
              title="Department Approval"
              description="Departments get a centralized dashboard to review and approve student requests instantly."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-indigo-500" />}
              title="Secure Authentication"
              description="Enterprise-grade security protecting your personal data and university records."
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="w-full py-24 bg-slate-50 border-y border-slate-200">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-lg max-w-[600px] mx-auto">
              Got questions? We've got answers. Here are some of the most common inquiries.
            </p>
          </div>
          
          <div className="space-y-4">
            <FaqItem 
              question="How long does the clearance process take?" 
              answer="With the new digital system, the average clearance time is under 24 hours. Most departments process requests automatically once you initiate them." 
            />
            <FaqItem 
              question="Do I need to visit any offices physically?" 
              answer="No, the entire process is handled digitally. Exceptions are made only if there are specific unresolved issues (like unreturned books) that require your physical presence." 
            />
            <FaqItem 
              question="How do I get my final clearance certificate?" 
              answer="Once all departments have approved your request, the Registrar office will issue a digital clearance certificate with a secure QR code which you can download." 
            />
            <FaqItem 
              question="Is my digital certificate valid for employers?" 
              answer="Yes! Employers and institutions can easily verify the authenticity of your digital certificate using the public Verify Certificate portal on this website." 
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-20 bg-blue-600 text-white">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6 text-white">
            Ready to start your clearance?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-[600px] mx-auto">
            Join thousands of students who have already completed their clearance process online.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 border-0 h-14 px-8 text-base">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all">
      <button 
        className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      )}
    </div>
  );
}
