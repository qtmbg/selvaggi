import { useState, useEffect } from 'react';
import { Trophy, MapPin, Info, CheckCircle, ChevronDown, Building2 } from 'lucide-react';

// 👇 PASTE YOUR GOOGLE APPS SCRIPT URL HERE 👇
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbEYxfy4os-vYRNscVB680-YqHv9DhDu_M9WafKo0o_vRQRwX8wZwszT6IxM0fIUmVWA/exec"; 

// Interface for TypeScript compatibility
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

  // --- STYLING FIX: INJECTING TAILWIND & GLOBAL RESET ---
  useEffect(() => {
    // 1. Force Tailwind CDN for the utility classes
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
    
    // 2. Global Reset to prevent "Ugly" default browser styles
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
      input, select { -webkit-appearance: none; border-radius: 4px; }
      * { box-sizing: border-box; }
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company / Organization is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: "Something went wrong saving your entry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared Constants for Branding
  const BRAND_ORANGE = "#ea580c";
  const BRAND_DARK = "#171717";

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden text-center p-8 border border-gray-200">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
            Entry Confirmed.
          </h2>
          <div className="space-y-4 text-gray-600 mb-8">
            <p className="bg-gray-50 p-4 rounded border border-gray-100 text-sm">
              The winner of the YETI Hopper M Series Backpack will be contacted after the show.
            </p>
            <p className="text-sm">
              Visit us at <strong>Exhibitor Booth #857</strong> for project discussions.
            </p>
          </div>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="font-bold hover:underline text-sm"
            style={{ color: BRAND_ORANGE }}
          >
            Submit another entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 flex justify-center" style={{ backgroundColor: '#f3f4f6' }}>
      <div className="max-w-lg w-full bg-white shadow-2xl overflow-hidden" style={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        
        {/* Header Section - HARDCODED STYLES FOR VERCEL FIX */}
        <div style={{ backgroundColor: BRAND_DARK, color: 'white', padding: '40px 24px', position: 'relative', borderBottom: `4px solid ${BRAND_ORANGE}` }}>
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <Building2 size={36} style={{ color: '#f97316' }} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 uppercase" style={{ letterSpacing: '0.2em' }}>
              SELVAGGI BUILT
            </h1>
            <h2 className="text-xs font-bold mb-6 uppercase tracking-widest" style={{ color: '#a3a3a3' }}>
              Trade Show Raffle
            </h2>
            
            <div style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
              <div className="flex items-center justify-center gap-3">
                <Trophy style={{ color: '#f97316' }} size={20} />
                <p className="text-sm sm:text-base font-bold text-white">
                  Win a YETI Hopper M Series Backpack 
                  <span className="block text-gray-400 text-[10px] font-normal mt-1 uppercase tracking-widest">(Approx. $275 Value)</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#737373' }}>
              <div className="flex items-center gap-2">
                <MapPin size={12} style={{ color: '#f97316' }} />
                <span>Booth #857</span>
              </div>
              <div className="hidden sm:block">|</div>
              <div className="flex items-center gap-2">
                <Info size={12} style={{ color: '#f97316' }} />
                <span>Post-Show Selection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Field: Name */}
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Full Name <span style={{ color: BRAND_ORANGE }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', fontSize: '14px' }}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{errors.fullName}</p>}
            </div>

            {/* Field: Company */}
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Company / Organization <span style={{ color: BRAND_ORANGE }}>*</span>
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', fontSize: '14px' }}
                placeholder="Company Name"
              />
              {errors.company && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{errors.company}</p>}
            </div>

            {/* Field: Email */}
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Work Email <span style={{ color: BRAND_ORANGE }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', fontSize: '14px' }}
                placeholder="email@work.com"
              />
              {errors.email && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{errors.email}</p>}
            </div>

            {/* Field: Role */}
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Professional Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', fontSize: '14px', appearance: 'none' }}
                >
                  <option value="" disabled>Select role...</option>
                  <option value="Facilities Director">Facilities Director</option>
                  <option value="Construction / Project Manager">Construction / Project Manager</option>
                  <option value="Healthcare Administrator">Healthcare Administrator</option>
                  <option value="Architect / Designer">Architect / Designer</option>
                  <option value="Capital Planning">Capital Planning</option>
                  <option value="Executive Leadership">Executive Leadership</option>
                  <option value="Vendor/Consultant">Vendor/Consultant</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Field: Timeline */}
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.15em]">
                Project Timeline
              </label>
              <div className="space-y-3">
                {["Within the next 6 months", "Within the next 12 months", "Exploring ideas / early planning", "Not currently"].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="projectTimeline"
                      value={option}
                      checked={formData.projectTimeline === option}
                      onChange={handleChange}
                      style={{ accentColor: BRAND_ORANGE }}
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Field: Opt-in */}
            <label className="flex items-start cursor-pointer p-4 border border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
              <input
                type="checkbox"
                name="optIn"
                checked={formData.optIn}
                onChange={handleChange}
                style={{ marginTop: '4px', accentColor: BRAND_ORANGE }}
              />
              <span className="ml-3 text-[11px] font-bold text-gray-700 uppercase tracking-wide leading-relaxed">
                Yes, I'd like to receive occasional project updates from SELVAGGI BUILT.
              </span>
            </label>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  backgroundColor: isSubmitting ? '#9ca3af' : BRAND_ORANGE, 
                  color: 'white', 
                  padding: '20px', 
                  border: 'none', 
                  fontWeight: '900', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.2em', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer' 
                }}
              >
                {isSubmitting ? 'Processing...' : 'Enter Raffle'}
              </button>
              <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mt-8">
                Selvaggi Built Quality
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
