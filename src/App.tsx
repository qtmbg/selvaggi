import { useState, useEffect } from 'react';
import { Trophy, MapPin, Info, CheckCircle, ChevronDown, Building2, Calendar, User, Building, Mail } from 'lucide-react';

// 👇 PASTE YOUR GOOGLE APPS SCRIPT URL HERE 👇
const GOOGLE_SCRIPT_URL = "YOUR_WEB_APP_URL_HERE"; 

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
    // Hard reset for Global Styles - No Tailwind needed
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      html, body { 
        margin: 0; 
        padding: 0; 
        background-color: #111111; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #333;
      }
      * { box-sizing: border-box; }
      input, select, button { 
        font-family: inherit; 
        outline: none;
      }
      select {
        -webkit-appearance: none;
        background-image: none;
      }
      @media (max-width: 600px) {
        .app-container { padding: 0 !important; }
        .form-card { border-radius: 0 !important; border: none !important; }
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  const handleChange = (e: any) => {
    const target = e.target;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectTimeline = (value: string) => {
    setFormData(prev => ({ ...prev, projectTimeline: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new window.FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, String(formData[key as keyof FormData]));
      });
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const BRAND_ORANGE = "#ea580c";
  const BRAND_DARK = "#171717";

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#111' }}>
        <div style={{ maxWidth: '450px', width: '100%', backgroundColor: 'white', padding: '40px', textAlign: 'center', borderTop: `10px solid ${BRAND_ORANGE}` }}>
          <CheckCircle size={60} color="#16a34a" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '16px' }}>Entry Confirmed</h2>
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>The winner of the YETI Hopper M Series Backpack will be contacted after the show.</p>
          <div style={{ padding: '15px', backgroundColor: '#f5f5f5', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px', color: '#888', marginBottom: '32px' }}>BOOTH #857</div>
          <button onClick={() => setIsSubmitted(false)} style={{ background: 'none', border: 'none', color: BRAND_ORANGE, fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${BRAND_ORANGE}`, cursor: 'pointer', paddingBottom: '4px' }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#111' }}>
      <div className="form-card" style={{ maxWidth: '500px', width: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Header Section */}
        <div style={{ backgroundColor: BRAND_DARK, color: 'white', padding: '60px 30px', textAlign: 'center', borderBottom: `8px solid ${BRAND_ORANGE}` }}>
          <div style={{ display: 'inline-block', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: '25px' }}>
            <Building2 size={45} color={BRAND_ORANGE} />
          </div>
          <h1 style={{ fontSize: '38px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.25em', lineHeight: '1', margin: '0 0 10px 0' }}>SELVAGGI<br/>BUILT</h1>
          <div style={{ width: '50px', height: '4px', backgroundColor: BRAND_ORANGE, margin: '20px auto' }}></div>
          <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase', color: '#777', margin: '0 0 30px 0' }}>Trade Show Raffle</p>
          
          <div style={{ backgroundColor: '#222', border: '1px solid #333', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
            <Trophy color={BRAND_ORANGE} size={28} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Win a YETI Hopper</p>
              <p style={{ margin: '3px 0 0 0', fontSize: '10px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>$275 Value</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#555' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color={BRAND_ORANGE} /> Booth 857</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={14} color={BRAND_ORANGE} /> Post-Show</span>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '40px 30px' }}>
          <form onSubmit={handleSubmit}>
            
            {/* Input Groups */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '10px' }}>
                <User size={12} /> Full Name *
              </label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="REQUIRED"
                style={{ width: '100%', padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontSize: '15px', fontWeight: '500' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '10px' }}>
                <Building size={12} /> Company *
              </label>
              <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="REQUIRED"
                style={{ width: '100%', padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontSize: '15px', fontWeight: '500' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '10px' }}>
                <Mail size={12} /> Work Email *
              </label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="REQUIRED"
                style={{ width: '100%', padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontSize: '15px', fontWeight: '500' }} />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '10px' }}>Professional Role</label>
              <div style={{ position: 'relative' }}>
                <select name="role" value={formData.role} onChange={handleChange}
                  style={{ width: '100%', padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontSize: '15px', fontWeight: '500', borderRadius: 0 }}>
                  <option value="" disabled>SELECT ROLE...</option>
                  <option value="Facilities Director">Facilities Director</option>
                  <option value="Construction Manager">Construction Manager</option>
                  <option value="Healthcare Admin">Healthcare Admin</option>
                  <option value="Architect / Designer">Architect / Designer</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '18px', color: '#aaa', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* UPGRADED PROJECT TIMELINE - HIGH SPEED TILES */}
            <div style={{ padding: '30px 20px', backgroundColor: '#f8f8f8', border: '1px solid #eee', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Calendar size={18} color={BRAND_ORANGE} />
                <span style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Project Planning?</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: "Within 6 months", label: "0-6 Months Out" },
                  { id: "Within 12 months", label: "6-12 Months Out" },
                  { id: "Early planning", label: "Early Planning" },
                  { id: "Not currently", label: "Not Currently" }
                ].map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => selectTimeline(opt.id)}
                    style={{ 
                      padding: '20px', 
                      backgroundColor: formData.projectTimeline === opt.id ? '#fff7ed' : 'white',
                      border: `2px solid ${formData.projectTimeline === opt.id ? BRAND_ORANGE : '#ddd'}`,
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontWeight: '800',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: formData.projectTimeline === opt.id ? BRAND_ORANGE : '#444'
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '10px' }}>Facility Type</label>
              <div style={{ position: 'relative' }}>
                <select name="facilityType" value={formData.facilityType} onChange={handleChange}
                  style={{ width: '100%', padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontSize: '15px', fontWeight: '500', borderRadius: 0 }}>
                  <option value="" disabled>SELECT FACILITY...</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Outpatient">Outpatient / Clinic</option>
                  <option value="Medical Office">Medical Office Building</option>
                  <option value="Architectural Firm">Architectural Firm</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '18px', color: '#aaa', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Checkbox Section */}
            <div onClick={() => handleChange({ target: { name: 'optIn', type: 'checkbox', checked: !formData.optIn } } as any)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #eee', cursor: 'pointer', marginBottom: '40px' }}>
              <input type="checkbox" name="optIn" checked={formData.optIn} readOnly
                style={{ width: '22px', height: '22px', flexShrink: 0, accentColor: BRAND_ORANGE }} />
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', lineHeight: '1.5', letterSpacing: '0.5px' }}>
                Yes, I'd like to receive occasional project updates from Selvaggi Built.
              </span>
            </div>

            {/* Submit Section */}
            <div>
              <button type="submit" disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  backgroundColor: isSubmitting ? '#999' : BRAND_ORANGE, 
                  color: 'white', 
                  padding: '24px', 
                  border: 'none', 
                  fontWeight: '900', 
                  textTransform: 'uppercase', 
                  letterSpacing: '5px', 
                  fontSize: '16px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 20px -5px rgba(234, 88, 12, 0.4)'
                }}>
                {isSubmitting ? 'SENDING...' : 'ENTER RAFFLE'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <span style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '4px', color: '#bbb', textTransform: 'uppercase' }}>Selvaggi Built Quality</span>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
