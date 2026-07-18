import { useState } from "react";
import { Mail, Bell, Send, Settings, ShieldAlert, CheckCircle2 } from "lucide-react";
import { NotificationSettings, EmailSettings } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface Props {
  notifData: NotificationSettings;
  emailData: EmailSettings;
  onDirty: () => void;
}

export function CommunicationTab({ notifData, emailData, onDirty }: Props) {
  const [notif, setNotif] = useState(notifData);
  const [email, setEmail] = useState(emailData);
  const [testEmailStatus, setTestEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNotifChange = (field: keyof NotificationSettings, value: any) => {
    setNotif({ ...notif, [field]: value });
    onDirty();
  };

  const handleNotifPrefChange = (field: keyof NotificationSettings["preferences"], value: boolean) => {
    setNotif({ ...notif, preferences: { ...notif.preferences, [field]: value } });
    onDirty();
  };

  const handleEmailChange = (field: keyof EmailSettings, value: any) => {
    setEmail({ ...email, [field]: value });
    onDirty();
  };

  const handleTestEmail = () => {
    setTestEmailStatus("loading");
    setTimeout(() => {
      setTestEmailStatus("success");
      setTimeout(() => setTestEmailStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      
      {/* Email Configuration */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Email Configuration</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Service Connected</span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email Provider</label>
              <select 
                value={email.provider}
                onChange={(e) => handleEmailChange('provider', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="SMTP">SMTP (Custom)</option>
                <option value="AWS SES">AWS SES</option>
                <option value="SendGrid">SendGrid</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">SMTP Host</label>
              <input 
                type="text" 
                value={email.smtpHost}
                onChange={(e) => handleEmailChange('smtpHost', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">SMTP Port</label>
              <input 
                type="text" 
                value={email.smtpPort}
                onChange={(e) => handleEmailChange('smtpPort', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Encryption</label>
              <select 
                value={email.encryption}
                onChange={(e) => handleEmailChange('encryption', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">From Name</label>
              <input 
                type="text" 
                value={email.fromName}
                onChange={(e) => handleEmailChange('fromName', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">From Email</label>
              <input 
                type="email" 
                value={email.fromEmail}
                onChange={(e) => handleEmailChange('fromEmail', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900 text-sm">Test Connection</h4>
              <p className="text-xs text-slate-500 mt-0.5">Send a test email to verify your SMTP configuration.</p>
            </div>
            <Button 
              variant={testEmailStatus === "success" ? "outline" : "primary"}
              onClick={handleTestEmail}
              disabled={testEmailStatus === "loading"}
              className={testEmailStatus === "success" ? "text-emerald-600 border-emerald-200 bg-emerald-50" : ""}
            >
              {testEmailStatus === "loading" ? "Sending..." : 
               testEmailStatus === "success" ? <><CheckCircle2 className="w-4 h-4 mr-2"/> Sent Successfully</> :
               <><Send className="w-4 h-4 mr-2"/> Send Test Email</>}
            </Button>
          </div>
        </div>
      </section>

      {/* Notification Delivery */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">Notification Delivery</h2>
        </div>
        
        <div className="p-6">
          <h3 className="text-sm font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">Global Channels</h3>
          <div className="flex gap-4 mb-8">
            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 flex-1">
              <div>
                <div className="font-bold text-slate-900">In-App Notifications</div>
                <div className="text-xs text-slate-500">Show bell alerts in dashboard</div>
              </div>
              <input type="checkbox" checked={notif.inAppEnabled} onChange={(e) => handleNotifChange('inAppEnabled', e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
            </label>
            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 flex-1">
              <div>
                <div className="font-bold text-slate-900">Email Notifications</div>
                <div className="text-xs text-slate-500">Send alerts to university email</div>
              </div>
              <input type="checkbox" checked={notif.emailEnabled} onChange={(e) => handleNotifChange('emailEnabled', e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
            </label>
          </div>

          <h3 className="text-sm font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">Event Triggers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {[
              { key: 'clearanceStarted', label: "Clearance Started" },
              { key: 'approval', label: "Department Approval" },
              { key: 'rejection', label: "Department Rejection" },
              { key: 'documentRequest', label: "Document Request" },
              { key: 'deadlineReminder', label: "Deadline Reminder" },
              { key: 'overdue', label: "Overdue Alert" },
              { key: 'certificateGenerated', label: "Certificate Generated" },
            ].map(pref => (
              <label key={pref.key} className="flex items-center justify-between group cursor-pointer">
                <span className="text-sm text-slate-700 group-hover:text-slate-900">{pref.label}</span>
                <input 
                  type="checkbox" 
                  checked={notif.preferences[pref.key as keyof NotificationSettings["preferences"]]} 
                  onChange={(e) => handleNotifPrefChange(pref.key as any, e.target.checked)} 
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300" 
                />
              </label>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
