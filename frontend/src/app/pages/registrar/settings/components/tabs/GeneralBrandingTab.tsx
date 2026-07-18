import { useState } from "react";
import { Building2, Palette, Globe, Image as ImageIcon, Upload, Monitor } from "lucide-react";
import { GeneralSettings, BrandingSettings } from "../../data/types";
import { Button } from "@/app/components/ui/Button";

interface Props {
  generalData: GeneralSettings;
  brandingData: BrandingSettings;
  onDirty: () => void;
}

export function GeneralBrandingTab({ generalData, brandingData, onDirty }: Props) {
  const [general, setGeneral] = useState(generalData);
  const [branding, setBranding] = useState(brandingData);

  const handleGeneralChange = (field: keyof GeneralSettings, value: string) => {
    setGeneral({ ...general, [field]: value });
    onDirty();
  };

  const handleBrandingChange = (field: keyof BrandingSettings, value: string) => {
    setBranding({ ...branding, [field]: value });
    onDirty();
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      
      {/* General Settings */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">General Configuration</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">System Name</label>
            <input 
              type="text" 
              value={general.systemName}
              onChange={(e) => handleGeneralChange('systemName', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">System Short Name</label>
            <input 
              type="text" 
              value={general.shortName}
              onChange={(e) => handleGeneralChange('shortName', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">System Description</label>
            <textarea 
              value={general.description}
              onChange={(e) => handleGeneralChange('description', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-20 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Default Timezone</label>
            <select 
              value={general.timezone}
              onChange={(e) => handleGeneralChange('timezone', e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="Africa/Addis_Ababa">Ethiopia / East Africa Time (EAT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Academic Year Format</label>
            <select 
              value={general.academicYearFormat}
              onChange={(e) => handleGeneralChange('academicYearFormat', e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="YYYY/YY">2026/27</option>
              <option value="YYYY-YYYY">2026-2027</option>
            </select>
          </div>
        </div>
      </section>

      {/* University Branding */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">University Branding</h2>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Logo Upload */}
          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-500"/> Official Logos</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-40 h-40 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-slate-600">Main Logo</span>
                <span className="text-xs text-slate-400 mt-1">PNG, max 2MB</span>
              </div>
              <div className="w-40 h-40 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-slate-600">Favicon</span>
                <span className="text-xs text-slate-400 mt-1">ICO/PNG, 32x32</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full" />

          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-slate-500"/> Brand Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Color</label>
                <div className="flex gap-2">
                  <input type="color" value={branding.primaryColor} onChange={(e) => handleBrandingChange('primaryColor', e.target.value)} className="w-10 h-10 p-0 border-0 rounded overflow-hidden cursor-pointer" />
                  <input type="text" value={branding.primaryColor} onChange={(e) => handleBrandingChange('primaryColor', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono uppercase" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Secondary Color</label>
                <div className="flex gap-2">
                  <input type="color" value={branding.secondaryColor} onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)} className="w-10 h-10 p-0 border-0 rounded overflow-hidden cursor-pointer" />
                  <input type="text" value={branding.secondaryColor} onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono uppercase" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Accent Color</label>
                <div className="flex gap-2">
                  <input type="color" value={branding.accentColor} onChange={(e) => handleBrandingChange('accentColor', e.target.value)} className="w-10 h-10 p-0 border-0 rounded overflow-hidden cursor-pointer" />
                  <input type="text" value={branding.accentColor} onChange={(e) => handleBrandingChange('accentColor', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono uppercase" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full" />

          {/* Live Preview Box */}
          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2"><Monitor className="w-4 h-4 text-slate-500"/> Live UI Preview</h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-6 flex justify-center">
              {/* Fake UI component showing the brand colors */}
              <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                <div className="h-16 px-4 flex items-center justify-between" style={{ backgroundColor: branding.primaryColor }}>
                  <div className="font-bold text-white text-sm">MWU Portal</div>
                  <div className="w-6 h-6 rounded-full bg-white/20" />
                </div>
                <div className="p-6">
                  <div className="h-4 w-3/4 bg-slate-200 rounded mb-4" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded mb-6" />
                  <button className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90" style={{ backgroundColor: branding.accentColor }}>
                    Primary Action
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
