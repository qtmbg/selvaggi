import { useState, useEffect } from 'react';
import { Trophy, MapPin, Info, CheckCircle, ChevronDown, Building2, Calendar } from 'lucide-react';

// 👇 PASTE YOUR GOOGLE APPS SCRIPT URL HERE 👇
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbEYxfy4os-vYRNscVB680-YqHv9DhDu_M9WafKo0o_vRQRwX8wZwszT6IxM0fIUmVWA/exec"; 

interface FormData {
  fullName: string;
  company: string;
  email: string;
  role: string;
  projectTimeline: string;
  facilityType: string;
  optIn: boolean;
}

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    role: '',
    projectTimeline: '',
    facilityType: '',
    optIn: false
  });
  
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
    
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      html, body { 
        margin: 0; 
        padding: 0; 
        background-color: #171717; 
        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      * { box-sizing: border-box; }
      input, select { 
        -webkit-appearance: none; 
        border-radius: 0 !important; 
        font-size: 16px !important;
      }
      .field-group { margin-bottom: 32px; width: 100%; }
      .timeline-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      @media (max-width: 480px) { .timeline-grid { grid-template-columns: 1fr; } }
      
      .timeline-tile {
        border: 2px solid #e5e7eb;
        padding: 20px 16px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: #fcfcfc;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .timeline-tile.selected {
        border-color: #ea580c;
        background-color: #fff7ed;
        box-shadow: 0 4px 12px rgba(234, 88, 12, 0.15);
      }
      .timeline-tile span {
        font-size: 11px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #404040;
      }
      .timeline-tile.selected span {
        color: #ea580c;
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const selectTimeline = (value: string) => {
    setFormData(prev => ({ ...prev, projectTimeline: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const data = new window.FormData();
      (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
        data.append(key, String(formData[key]));
      });
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrors({ form: "Error saving. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const BRAND_ORANGE = "#ea580c";
  const BRAND_DARK = "#171717";

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-neutral-900">
        <div className="max-w-md w-full bg-white text-center p-10 border-t-8 border-orange-600 shadow-2xl">
          <CheckCircle size={48} className="text-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Entry Confirmed</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">The winner of the YETI Hopper M Series Backpack will be contacted after the show.</p>
          <div className="bg-neutral-100 p-4 mb-8 text-xs font-bold uppercase tracking-widest text-neutral-500">Booth #857</div>
          <button onClick={() => setIsSubmitted(false)} className="font-black uppercase tracking-widest text-sm border-b-2 border-orange-600 pb-1" style={{ color: BRAND_ORANGE }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-neutral-900 sm:py-10">
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col">
        
        {/* Header Section */}
        <div style={{ backgroundColor: BRAND_DARK, color: 'white', padding: '60px 24px', textAlign: 'center', borderBottom: `8px solid ${BRAND_ORANGE}` }}>
          <Building2 size={44} style={{ color: BRAND_ORANGE, margin: '0 auto 20px' }} />
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-[0.25em] leading-none mb-4">SELVAGGI<br/>BUILT</h1>
          <div style={{ width: '60px', height: '3px', backgroundColor: BRAND_ORANGE, margin: '24px auto' }}></div>
          
          <div className="bg-neutral-800 border border-neutral-700 p-5 mb-8">
            <div className="flex items-center justify-center gap-4">
              <Trophy style={{ color: BRAND_ORANGE }} size={24} />
              <div className="text-left">
                <p className="text-sm font-black uppercase tracking-widest text-white">Win a YETI Hopper</p>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Approx. $275 Value</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-orange-600" /> Booth 857</span>
            <span className="flex items-center gap-2"><Info size={14} className="text-orange-600" /> Post-Show</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 sm:p-12">
          <form onSubmit={handleSubmit}>
            
            <div className="field-group">
              <label className="block text-[10px] font-black text-neutral-400 mb-2 uppercase tracking-[0.2em]">Full Name *</label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                className="w-full p-4 border border-neutral-200 bg-neutral-50 text-neutral-900 outline-none focus:border-orange-600 transition-colors" placeholder="REQUIRED" />
            </div>

            <div className="field-group">
              <label className="block text-[10px] font-black text-neutral-400 mb-2 uppercase tracking-[0.2em]">Company / Org *</label>
              <input type="text" name="company" required value={formData.company} onChange={handleChange}
                className="w-full p-4 border border-neutral-200 bg-neutral-50 text-neutral-900 outline-none focus:border-orange-600 transition-colors" placeholder="REQUIRED" />
            </div>

            <div className="field-group">
              <label className="block text-[10px] font-black text-neutral-400 mb-2 uppercase tracking-[0.2em]">Work Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full p-4 border border-neutral-200 bg-neutral-50 text-neutral-900 outline-none focus:border-orange-600 transition-colors" placeholder="REQUIRED" />
            </div>

            <div className="field-group">
              <label className="block text-[10px] font-black text-neutral-400 mb-2 uppercase tracking-[0.2em]">Professional Role</label>
              <div className="relative">
                <select name="role" value={formData.role} onChange={handleChange}
                  className="w-full p-4 border border-neutral-200 bg-neutral-50 text-neutral-900 outline-none appearance-none cursor-pointer">
                  <option value="" disabled>SELECT ROLE...</option>
                  <option value="Facilities Director">Facilities Director</option>
                  <option value="Construction Manager">Construction Manager</option>
                  <option value="Healthcare Admin">Healthcare Admin</option>
                  <option value="Architect / Designer">Architect / Designer</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* UPGRADED PROJECT TIMELINE - FAST TILES */}
            <div className="field-group bg-neutral-50 p-6 -mx-6 sm:mx-0 border-y sm:border border-neutral-200">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={14} className="text-orange-600" />
                <label className="block text-[11px] font-black text-neutral-900 uppercase tracking-[0.1em]">
                  Current Project Planning?
                </label>
              </div>
              
              <div className="timeline-grid">
                {[
                  { val: "Within 6 months", label: "0-6 Months" },
                  { val: "Within 12 months", label: "6-12 Months" },
                  { val: "Early planning", label: "Early Planning" },
                  { val: "Not currently", label: "Not Currently" }
                ].map((opt) => (
                  <div 
                    key={opt.val}
                    onClick={() => selectTimeline(opt.val)}
                    className={`timeline-tile ${formData.projectTimeline === opt.val ? 'selected' : ''}`}
                  >
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="block text-[10px] font-black text-neutral-400 mb-2 uppercase tracking-[0.2em]">Facility Type</label>
              <div className="relative">
                <select name="facilityType" value={formData.facilityType} onChange={handleChange}
                  className="w-full p-4 border border-neutral-200 bg-neutral-50 text-neutral-900 outline-none appearance-none cursor-pointer">
                  <option value="" disabled>SELECT FACILITY...</option>
                  <option value="Hospital / Medical Center">Hospital / Medical Center</option>
                  <option value="Outpatient / Clinic">Outpatient / Clinic</option>
                  <option value="Healthcare Admin">Healthcare Admin</option>
                  <option value="Medical Office Building">Medical Office Building</option>
                  <option value="Architecture / Design Firm">Architecture / Design Firm</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Opt-in Clean Design */}
            <div className="mt-10 p-5 bg-neutral-50 border border-neutral-200 cursor-pointer" 
                 onClick={() => handleChange({ target: { name: 'optIn', type: 'checkbox', checked: !formData.optIn } } as any)}>
              <div className="flex items-start gap-4">
                <input type="checkbox" name="optIn" checked={formData.optIn} onChange={handleChange}
                  style={{ accentColor: BRAND_ORANGE, width: '22px', height: '22px', flexShrink: 0 }} />
                <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest leading-relaxed">
                  I'd like to receive occasional project updates from SELVAGGI BUILT.
                </span>
              </div>
            </div>

            {/* Big Action Button */}
            <div className="mt-10">
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-neutral-400 text-white font-black uppercase tracking-[0.4em] py-6 px-8 shadow-xl transition-all active:scale-[0.97]"
                style={{ fontSize: '15px' }}>
                {isSubmitting ? 'PROCESSING...' : 'ENTER RAFFLE'}
              </button>
              <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-neutral-400 mt-10">
                SELVAGGI BUILT QUALITY
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
