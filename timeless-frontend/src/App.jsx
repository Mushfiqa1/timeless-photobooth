import React from 'react';
import logo from './assets/logo.png';
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  // Smooth scroll function for high-end UX
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#5D4037] font-serif selection:bg-[#818C78] selection:text-white relative">
      {/* Subtle Grain Overlay for a film-like texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>

      {/* Transparent Header - Inspired by Retrospect */}
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

      {/* Page Sequence */}
      <section id="home"><Home /></section>
      
      {/* Gallery Section */}
      <section id="gallery" className="py-40 bg-white text-center border-b border-[#E0DED7]/30">
        <h2 className="text-[14px] uppercase tracking-[0.6em] font-light text-[#818C78] mb-4">Portfolio</h2>
        <h3 className="text-4xl uppercase tracking-[0.2em] mb-16">The Gallery</h3>
        <div className="h-[600px] bg-[#FAF9F6] mx-auto max-w-6xl rounded-sm border border-[#E0DED7]/50 flex items-center justify-center italic text-[#818C78]">
          Gallery Grid Coming Soon
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-40 text-center bg-[#FAF9F6]">
        <h3 className="text-4xl uppercase tracking-[0.2em] font-light mb-20">Packages</h3>
        <div className="flex flex-wrap justify-center gap-16 px-6">
          <div className="p-20 border border-[#D7C4B7] bg-white/50 rounded-sm w-80 italic hover:border-[#818C78] transition-all duration-500 cursor-pointer hover:-translate-y-2">
            The Heritage
          </div>
          <div className="p-20 border border-[#D7C4B7] bg-white/50 rounded-sm w-80 italic hover:border-[#818C78] transition-all duration-500 cursor-pointer hover:-translate-y-2">
            The Botanical
          </div>
        </div>
      </section>

      <section id="contact"><Contact /></section>

      <footer className="py-20 text-center border-t border-[#E0DED7]/30">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#818C78]">Toronto • Ontario</p>
      </footer>
    </div>
  );
}

export default App;