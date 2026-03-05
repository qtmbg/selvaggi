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

  // --- STYLING FIX ---
  // We inject Tailwind via CDN as a safety net, but we'll use it as the primary engine.
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4" style={{ fontFamily: 'sans-serif' }}>
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden text-center p-8 border border-gray-200">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
            Thank you for entering the SELVAGGI BUILT raffle.
          </h2>
          <div className="space-y-4 text-gray-600 mb-8">
            <p className="bg-gray-50 p-4 rounded border border-gray-100 text-sm">
              The winner of the YETI Hopper M Series Backpack (approx. $275 value) will be contacted after the show.
            </p>
            <p>
              Visit us during the show at <strong>Exhibitor Booth #857</strong> if you'd like to discuss an upcoming project.
            </p>
          </div>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ fullName: '', company: '', email: '', role: '', projectTimeline: '', facilityType: '', optIn: false });
            }}
            className="text-[#ea580c] font-bold hover:underline text-sm"
          >
            Submit another entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 flex justify-center" style={{ fontFamily: 'sans-serif' }}>
      <div className="max-w-lg w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header Section */}
        <div className="bg-[#171717] text-white px-6 py-10 relative overflow-hidden border-b-4 border-[#ea580c]">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white/5 opacity-50"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 p-3 rounded backdrop-blur-sm border border-white/5">
                 <Building2 size={36} className="text-[#f97316]" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.2em] mb-2 uppercase">
              SELVAGGI BUILT
            </h1>
            <h2 className="text-sm text-gray-400 font-bold mb-6 tracking-widest uppercase">
              Trade Show Raffle
            </h2>
            
            <div className="bg-[#f97316]/10 border border-[#f97316]/30 rounded-lg p-4 mb-6">
              <div className="flex items-start justify-center gap-3">
                <Trophy className="text-[#f97316] shrink-0 mt-0.5" size={20} />
                <p className="text-sm sm:text-base font-bold text-white">
                  Win a YETI Hopper M Series Backpack 
                  <span className="block text-gray-400 text-xs font-normal mt-1 uppercase tracking-wider">(Approx. $275 Value)</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#f97316]" />
                <span>Booth #857</span>
              </div>
              <div className="hidden sm:block text-gray-700">|</div>
              <div className="flex items-center gap-2">
                <Info size={14} className="text-[#f97316]" />
                <span>Post-Show Selection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-10">
          {errors.form && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-600 font-bold uppercase tracking-tight">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Field: Name */}
            <div>
              <label htmlFor="fullName" className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Full Name <span className="text-[#f97316]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:border-[#f97316] outline-none transition-all bg-gray-50 font-medium`}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {errors.fullName && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{errors.fullName}</p>}
            </div>

            {/* Field: Company */}
            <div>
              <label htmlFor="company" className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Company / Organization <span className="text-[#f97316]">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} focus:border-[#f97316] outline-none transition-all bg-gray-50 font-medium`}
                placeholder="Company Name"
                disabled={isSubmitting}
              />
              {errors.company && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{errors.company}</p>}
            </div>

            {/* Field: Email */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Work Email <span className="text-[#f97316]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#f97316] outline-none transition-all bg-gray-50 font-medium`}
                placeholder="email@work.com"
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{errors.email}</p>}
            </div>

            <hr className="border-gray-100" />

            {/* Field: Role */}
            <div>
              <label htmlFor="role" className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Professional Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-[#f97316] outline-none appearance-none bg-gray-50 font-medium"
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
                {[
                  "Within the next 6 months",
                  "Within the next 12 months",
                  "Exploring ideas / early planning",
                  "Not currently"
                ].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="projectTimeline"
                      value={option}
                      checked={formData.projectTimeline === option}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-4 h-4 text-[#f97316] accent-[#f97316]"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-black">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Field: Facility */}
            <div>
              <label htmlFor="facilityType" className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.15em]">
                Facility Type
              </label>
              <div className="relative">
                <select
                  id="facilityType"
                  name="facilityType"
                  value={formData.facilityType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-[#f97316] outline-none appearance-none bg-gray-50 font-medium"
                >
                  <option value="" disabled>Select facility...</option>
                  <option value="Hospital / Medical Center">Hospital / Medical Center</option>
                  <option value="Outpatient / Clinic">Outpatient / Clinic</option>
                  <option value="Healthcare System Administration">Healthcare System Administration</option>
                  <option value="Medical Office Building">Medical Office Building</option>
                  <option value="Architecture / Design Firm">Architecture / Design Firm</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Field: Opt-in */}
            <label className="flex items-start cursor-pointer group p-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                name="optIn"
                checked={formData.optIn}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-5 h-5 mt-0.5 accent-[#f97316]"
              />
              <span className="ml-3 text-xs font-bold text-gray-700 uppercase tracking-wide leading-relaxed">
                Yes, I'd like to receive occasional project updates from SELVAGGI BUILT.
              </span>
            </label>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] disabled:bg-gray-400 text-white font-black uppercase tracking-[0.2em] py-5 px-8 shadow-lg transition-all active:scale-[0.98]"
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
