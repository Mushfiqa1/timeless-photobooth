import React, { useState } from 'react';
import logo from './assets/logo.png';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';

function App() {
  const [selectedService, setSelectedService] = useState("");
  const [showLegal, setShowLegal] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#5D4037] font-serif selection:bg-[#818C78] selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full h-24 flex justify-between items-center px-8 md:px-16 z-50 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <img 
            src={logo} 
            alt="Timeless Logo" 
            className="h-12 w-12 rounded-full border border-white/40 shadow-sm transition-transform group-hover:scale-105" 
          />
          <div className="flex flex-col text-white">
            <span className="text-xl font-bold tracking-tighter uppercase leading-none drop-shadow-md">Timeless</span>
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-80 mt-1.5 drop-shadow-md">Photo Booth TO</span>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-white">
            <button onClick={() => scrollToSection('gallery')} className="hover:opacity-60 transition-opacity">Gallery</button>
            <button onClick={() => scrollToSection('packages')} className="hover:opacity-60 transition-opacity">Packages</button>
          </div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-9 py-2.5 bg-white text-[#5D4037] rounded-full hover:bg-[#FAF9F6] transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl"
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home"><Home /></section>
      
      {/* 2. GALLERY SECTION (NOW FIRST AFTER HOME) */}
      <section id="gallery">
        <Gallery />
      </section>

      {/* 3. PACKAGES SECTION */}
      <Packages setSelectedService={setSelectedService} />

      {/* 4. CONTACT SECTION */}
      <section id="contact">
        <Contact selectedService={selectedService} />
      </section>

      {/* Footer with Legal Link */}
      <footer className="py-20 text-center border-t border-[#E0DED7]/30">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#818C78]">Toronto • Ontario</p>
          
          <button 
            onClick={() => setShowLegal(true)}
            className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/60 hover:text-[#818C78] transition-colors"
          >
            Terms & Privacy Policy
          </button>
        </div>
      </footer>

      {/* LEGAL MODAL OVERLAY */}
      {showLegal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-[#5D4037]/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl relative p-8 md:p-16">
            
            <button 
              onClick={() => setShowLegal(false)}
              className="absolute top-6 right-6 text-[#5D4037] hover:text-[#818C78] text-xl transition-colors"
            >
              ✕
            </button>

            <div className="space-y-16">
              <section>
                <h2 className="serif-title text-2xl mb-8 border-b border-[#E0DED7] pb-4 uppercase tracking-widest text-[#5D4037]">Terms & Conditions</h2>
                <div className="text-[11px] leading-relaxed text-[#5D4037]/80 space-y-6 text-left">
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">1. Contract & Reservation</h3>
                    <p>This agreement constitutes the entire understanding between Timeless Photo Booth TO and the Client. A 50% non-refundable retainer is required to secure the event date and selected package.</p>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">2. Payments & Pricing</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Final Balance: Due in full seven (7) days prior to the event.</li>
                      <li>Idle Hours: $75 per hour if the booth is set up but not in service.</li>
                      <li>Overtime: $150 per hour for usage beyond the agreed period.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">3. Travel & Logistics</h3>
                    <p>Service is included within the GTA. Travel fees apply beyond a 40km radius. Clients must provide adequate space and access to a 110-volt electrical outlet.</p>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">4. Cancellations & Rescheduling</h3>
                    <p>The retainer is non-refundable once the contract is signed. If cancellation occurs within 14 days of the event, the full remaining balance is due. Rescheduling is subject to availability.</p>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">5. Copyright & Image Release</h3>
                    <p>The Client grants Timeless Photo Booth TO the irrevocable right to use event images for promotional and commercial purposes.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="serif-title text-2xl mb-8 border-b border-[#E0DED7] pb-4 uppercase tracking-widest text-[#5D4037]">Privacy Policy</h2>
                <div className="text-[11px] leading-relaxed text-[#5D4037]/80 space-y-6 text-left">
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">1. Information Collection</h3>
                    <p>We collect only necessary information to fulfill bookings (contact details, event info). We do not store credit or debit card information.</p>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">2. Image Data & Galleries</h3>
                    <p>Event images are stored to create shareable online galleries. Requests for private or password-protected galleries must be submitted in writing before the event.</p>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-2 text-[#5D4037]">3. Safety & Conduct</h3>
                    <p>We reserve the right to terminate services if staff experience inappropriate or hostile behavior.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-[#E0DED7] text-center">
              <button 
                onClick={() => setShowLegal(false)}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5D4037] border-b border-[#D7C4B7] pb-1 hover:text-[#818C78] hover:border-[#818C78] transition-all"
              >
                Close Legal Notices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;