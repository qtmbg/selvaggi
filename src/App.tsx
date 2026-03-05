import { useState, useEffect } from 'react';
import { Trophy, MapPin, Info, CheckCircle, ChevronDown, Building2 } from 'lucide-react';

// 👇 PASTE YOUR GOOGLE APPS SCRIPT URL HERE 👇
const GOOGLE_SCRIPT_URL = "YOUR_WEB_APP_URL_HERE"; 

// Added interface for TypeScript compatibility
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

  // --- TAILWIND FALLBACK FOR STACKBLITZ ---
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans text-neutral-800">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden text-center p-8 border border-neutral-200">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 uppercase tracking-tight">
            Thank you for entering the SELVAGGI BUILT raffle.
          </h2>
          <div className="space-y-4 text-neutral-600 mb-8">
            <p className="bg-neutral-50 p-4 rounded-lg text-sm border border-neutral-100">
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
            className="text-orange-600 font-semibold hover:text-orange-700 underline text-sm transition-colors"
          >
            Submit another entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4 sm:px-6 lg:px-8 font-sans text-neutral-800 flex justify-center">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-neutral-200">
        
        <div className="bg-neutral-900 text-white px-6 py-8 relative overflow-hidden border-b-4 border-orange-600">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-neutral-800 opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-orange-600/10 opacity-50"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/5">
                 <Building2 size={36} className="text-orange-500" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest mb-2 uppercase text-white">
              SELVAGGI BUILT
            </h1>
            <h2 className="text-lg text-neutral-300 font-medium mb-5 tracking-wide uppercase text-sm">
              Trade Show Raffle
            </h2>
            
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-5 backdrop-blur-sm">
              <div className="flex items-start justify-center gap-3">
                <Trophy className="text-orange-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm sm:text-base font-semibold text-orange-50">
                  Enter to win a YETI Hopper M Series Backpack 
                  <span className="block text-orange-200/80 text-xs font-normal mt-1">(Approx. $275 Value)</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-neutral-300">
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full">
                <MapPin size={16} className="text-orange-500" />
                <span className="font-medium">Exhibitor Booth #857</span>
              </div>
              <div className="hidden sm:block text-neutral-600">•</div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Info size={16} className="text-orange-500" />
                <span>Winner selected post-conference</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {errors.form && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 font-medium">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-bold text-neutral-700 mb-1.5 uppercase tracking-wide text-xs">
                Full Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-orange-500 focus:ring-orange-200'} focus:outline-none focus:ring-2 transition-all bg-neutral-50 hover:bg-white`}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {errors.fullName && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-bold text-neutral-700 mb-1.5 uppercase tracking-wide text-xs">
                Company / Organization <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${errors.company ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-orange-500 focus:ring-orange-200'} focus:outline-none focus:ring-2 transition-all bg-neutral-50 hover:bg-white`}
                placeholder="Acme Corp"
                disabled={isSubmitting}
              />
              {errors.company && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-neutral-700 mb-1.5 uppercase tracking-wide text-xs">
                Work Email <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-orange-500 focus:ring-orange-200'} focus:outline-none focus:ring-2 transition-all bg-neutral-50 hover:bg-white`}
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>}
              <p className="mt-2 text-xs text-neutral-500 flex items-start gap-1.5 font-medium">
                <Info size={14} className="shrink-0 mt-0.5 text-neutral-400" />
                We will only contact the winner and send occasional project insights.
              </p>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-neutral-700 mb-1.5 uppercase tracking-wide text-xs">
                What best describes your role?
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 pr-10 rounded-md border border-neutral-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none appearance-none transition-all bg-neutral-50 hover:bg-white font-medium text-neutral-800"
                >
                  <option value="" disabled>Select a role...</option>
                  <option value="Facilities Director">Facilities Director</option>
                  <option value="Construction / Project Manager">Construction / Project Manager</option>
                  <option value="Healthcare Administrator">Healthcare Administrator</option>
                  <option value="Architect / Designer">Architect / Designer</option>
                  <option value="Capital Planning">Capital Planning</option>
                  <option value="Executive Leadership">Executive Leadership</option>
                  <option value="Vendor/Consultant">Vendor/Consultant</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-3 uppercase tracking-wide text-xs">
                Are you currently planning any construction or renovation projects?
              </label>
              <div className="space-y-3">
                {[
                  "Within the next 6 months",
                  "Within the next 12 months",
                  "Exploring ideas / early planning",
                  "Not currently"
                ].map((option) => (
                  <label key={option} className="flex items-start cursor-pointer group">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="projectTimeline"
                        value={option}
                        checked={formData.projectTimeline === option}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-5 h-5 text-orange-600 bg-neutral-100 border-neutral-300 focus:ring-orange-500 focus:ring-2"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-neutral-700 group-hover:text-neutral-900 font-medium">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="facilityType" className="block text-sm font-bold text-neutral-700 mb-1.5 uppercase tracking-wide text-xs">
                Which type of facility do you represent?
              </label>
              <div className="relative">
                <select
                  id="facilityType"
                  name="facilityType"
                  value={formData.facilityType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 pr-10 rounded-md border border-neutral-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none appearance-none transition-all bg-neutral-50 hover:bg-white font-medium text-neutral-800"
                >
                  <option value="" disabled>Select a facility type...</option>
                  <option value="Hospital / Medical Center">Hospital / Medical Center</option>
                  <option value="Outpatient / Clinic">Outpatient / Clinic</option>
                  <option value="Healthcare System Administration">Healthcare System Administration</option>
                  <option value="Medical Office Building">Medical Office Building</option>
                  <option value="Architecture / Design Firm">Architecture / Design Firm</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <label className="flex items-start cursor-pointer group bg-neutral-50 p-4 rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    name="optIn"
                    checked={formData.optIn}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-5 h-5 text-orange-600 bg-white border-neutral-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-neutral-700 group-hover:text-neutral-900 font-semibold">
                    Yes, I'd like to receive occasional project updates from SELVAGGI BUILT.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-black uppercase tracking-wider py-4 px-8 rounded-md shadow-lg shadow-orange-600/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Enter Raffle'}
              </button>
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400 mt-6">
                Powered by Selvaggi Built
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
