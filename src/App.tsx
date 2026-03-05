import { useState, useEffect } from 'react';
import { Trophy, MapPin, Info, CheckCircle, ChevronDown, Calendar, User, Building, Mail, CheckSquare, Square, Building2 } from 'lucide-react';

// 👇 PASTE YOUR GOOGLE APPS SCRIPT URL HERE 👇
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7Dat8yK1NVk98bbOBs-d8etcoMEdw5OBWM0206cisMj_hz764025E6j9T4Hni9HGX7w/exec"; 

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

  useEffect(() => {
    // Hard reset for Global Styles - Dark Premium Theme
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      html, body { 
        margin: 0; 
        padding: 0; 
        background-color: #000000; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #333;
      }
      * { box-sizing: border-box; }
      input[type="text"], input[type="email"], select, button { 
        font-family: inherit; 
        outline: none;
        appearance: none;
        -webkit-appearance: none;
      }
      @media (max-width: 600px) {
        .app-container { padding: 0 !important; }
        .form-card { border-radius: 0 !important; border: none !important; box-shadow: none !important; }
        .header-section { padding: 50px 20px 40px 20px !important; }
        .body-section { padding: 30px 20px !important; }
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  const handleChange = (e: any) => {
    const target = e.target;
    const { name, value } = target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectTimeline = (value: string) => {
    setFormData(prev => ({ ...prev, projectTimeline: value }));
  };

  const toggleOptIn = () => {
    setFormData(prev => ({ ...prev, optIn: !prev.optIn }));
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

  // Harmonized branding colors
  const BRAND_ORANGE = "#E35205"; 
  const BRAND_DARK = "#111111";

  // --- SUCCESS SCREEN ---
  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '450px', width: '100%', backgroundColor: 'white', padding: '50px 40px', textAlign: 'center', borderTop: `12px solid ${BRAND_ORANGE}`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <CheckCircle size={64} color="#16a34a" style={{ marginBottom: '24px', margin: '0 auto 24px auto' }} />
          <h2 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '16px', color: '#111' }}>Good Luck!</h2>
          <p style={{ color: '#555', lineHeight: '1.6', fontSize: '16px', marginBottom: '32px', fontWeight: '500' }}>
            Your entry has been confirmed. The winner of the YETI Hopper M Series Backpack ($300+ Value) will be contacted after the show.
          </p>
          <div style={{ padding: '20px', backgroundColor: '#000', color: 'white', fontWeight: '900', fontSize: '14px', letterSpacing: '4px', marginBottom: '32px' }}>BOOTH #857</div>
          <a 
            href="https://selvaggibuilt.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: 'block', 
              backgroundColor: BRAND_ORANGE, 
              color: 'white', 
              padding: '24px', 
              textDecoration: 'none', 
              fontWeight: '900', 
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              fontSize: '15px', 
              transition: 'transform 0.2s',
              boxShadow: `0 10px 20px -5px ${BRAND_ORANGE}80`
            }}
          >
            Visit Our Website
          </a>
        </div>
      </div>
    );
  }

  // --- MAIN FORM SCREEN ---
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#000000' }}>
      <div className="form-card" style={{ maxWidth: '500px', width: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Header Section (Reverted to Stark Black) */}
        <div className="header-section" style={{ backgroundColor: BRAND_DARK, color: 'white', padding: '70px 40px 50px 40px', textAlign: 'center', borderBottom: `10px solid ${BRAND_ORANGE}` }}>
          
          {/* Pure Code Typography Logo */}
          <div style={{ marginBottom: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Building2 size={48} color={BRAND_ORANGE} style={{ marginBottom: '16px' }} />
            <h1 style={{ fontSize: '46px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: '0.95', margin: '0', color: 'white' }}>
              SELVAGGI<br/>BUILT
            </h1>
          </div>
          
          <div style={{ width: '60px', height: '4px', backgroundColor: BRAND_ORANGE, margin: '20px auto' }}></div>
          <p style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '5px', textTransform: 'uppercase', color: '#888', margin: '0 0 40px 0' }}>Trade Show Raffle</p>
          
          {/* High Contrast Prize Callout Box */}
          <div style={{ backgroundColor: 'rgba(234, 88, 12, 0.08)', border: `1px solid ${BRAND_ORANGE}40`, padding: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '35px' }}>
            <Trophy color={BRAND_ORANGE} size={32} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Win a YETI Hopper</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>$300+ Value</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#777' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color={BRAND_ORANGE} /> Booth 857</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={16} color={BRAND_ORANGE} /> Post-Show</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="body-section" style={{ padding: '50px 40px', backgroundColor: '#ffffff' }}>
          <form onSubmit={handleSubmit}>
            
            <div style={{ marginBottom: '35px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>
                <User size={14} color={BRAND_ORANGE} /> Full Name *
              </label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Required"
                style={{ width: '100%', padding: '18px', border: '2px solid #eee', backgroundColor: '#fcfcfc', fontSize: '16px', fontWeight: '600', color: '#111' }} />
            </div>

            <div style={{ marginBottom: '35px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>
                <Building size={14} color={BRAND_ORANGE} /> Company *
              </label>
              <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Required"
                style={{ width: '100%', padding: '18px', border: '2px solid #eee', backgroundColor: '#fcfcfc', fontSize: '16px', fontWeight: '600', color: '#111' }} />
            </div>

            <div style={{ marginBottom: '35px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>
                <Mail size={14} color={BRAND_ORANGE} /> Work Email *
              </label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Required"
                style={{ width: '100%', padding: '18px', border: '2px solid #eee', backgroundColor: '#fcfcfc', fontSize: '16px', fontWeight: '600', color: '#111' }} />
            </div>

            <div style={{ marginBottom: '45px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>Professional Role</label>
              <div style={{ position: 'relative' }}>
                <select name="role" value={formData.role} onChange={handleChange}
                  style={{ width: '100%', padding: '18px', border: '2px solid #eee', backgroundColor: '#fcfcfc', fontSize: '16px', fontWeight: '600', color: '#111', borderRadius: 0 }}>
                  <option value="" disabled>Select Role...</option>
                  <option value="Facilities Director">Facilities Director</option>
                  <option value="Construction Manager">Construction Manager</option>
                  <option value="Healthcare Admin">Healthcare Admin</option>
                  <option value="Architect / Designer">Architect / Designer</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={20} style={{ position: 'absolute', right: '18px', top: '20px', color: '#aaa', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* UPGRADED PROJECT TIMELINE - BOLD TILES */}
            <div style={{ padding: '40px 25px', backgroundColor: BRAND_DARK, marginBottom: '45px', border: '1px solid #222' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <Calendar size={20} color={BRAND_ORANGE} />
                <span style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: 'white' }}>Current Project Planning?</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: "Within 6 months", label: "ASAP (0-6 MONTHS)" },
                  { id: "Within 12 months", label: "WITHIN 1 YEAR" },
                  { id: "Early planning", label: "EARLY PLANNING" },
                  { id: "Not currently", label: "NOT AT THIS TIME" }
                ].map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => selectTimeline(opt.id)}
                    style={{ 
                      padding: '24px', 
                      backgroundColor: formData.projectTimeline === opt.id ? BRAND_ORANGE : '#1a1a1a',
                      border: `1px solid ${formData.projectTimeline === opt.id ? BRAND_ORANGE : '#333'}`,
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontWeight: '900',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: formData.projectTimeline === opt.id ? 'white' : '#777',
                      transition: 'all 0.1s ease-in-out'
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '45px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>Facility Type</label>
              <div style={{ position: 'relative' }}>
                <select name="facilityType" value={formData.facilityType} onChange={handleChange}
                  style={{ width: '100%', padding: '18px', border: '2px solid #eee', backgroundColor: '#fcfcfc', fontSize: '16px', fontWeight: '600', color: '#111', borderRadius: 0 }}>
                  <option value="" disabled>Select Facility...</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Outpatient">Outpatient / Clinic</option>
                  <option value="Medical Office">Medical Office Building</option>
                  <option value="Architectural Firm">Architectural Firm</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={20} style={{ position: 'absolute', right: '18px', top: '20px', color: '#aaa', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* CUSTOM BULLETPROOF CHECKBOX SECTION */}
            <div onClick={toggleOptIn}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '25px', backgroundColor: '#fcfcfc', border: '2px solid #eee', cursor: 'pointer', marginBottom: '50px' }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {formData.optIn ? (
                  <CheckSquare size={28} color={BRAND_ORANGE} strokeWidth={2.5} />
                ) : (
                  <Square size={28} color="#ccc" strokeWidth={2} />
                )}
              </div>
              <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', lineHeight: '1.6', letterSpacing: '0.5px', color: '#333' }}>
                Yes, I'd like to receive occasional project updates from Selvaggi Built.
              </span>
            </div>

            {/* Submit Section */}
            <div style={{ paddingBottom: '20px' }}>
              <button type="submit" disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  backgroundColor: isSubmitting ? '#444' : BRAND_ORANGE, 
                  color: 'white', 
                  padding: '28px', 
                  border: 'none', 
                  fontWeight: '900', 
                  textTransform: 'uppercase', 
                  letterSpacing: '6px', 
                  fontSize: '18px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: `0 15px 30px -10px ${BRAND_ORANGE}80`
                }}>
                {isSubmitting ? 'PROCESSING...' : 'ENTER RAFFLE'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <span style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '5px', color: '#444', textTransform: 'uppercase' }}>Selvaggi Built Quality</span>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
