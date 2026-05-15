import React from 'react';
import cameraHero from '../assets/hero-camera.png'; 

const Home = () => {
  return (
    /* Added bg-[#1a1a1a] to blend with the photo's shadows when zoomed out */
    <main className="relative h-screen w-full overflow-hidden flex items-end bg-[#1a1a1a]">
      <div className="absolute inset-0 z-0">
        <img 
          src={cameraHero} 
          alt="Heritage Booth" 
          /* Changed 'object-cover' to 'object-contain' for a "zoomed out" look.
             Used 'p-12' (padding) to give the booth some breathing room from the edges.
          */
          className="w-full h-full object-contain p-4 md:p-12" 
        />
        {/* Subtle gradient overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-24">
         <button 
           onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
           className="flex items-center gap-8 text-white text-[10px] uppercase tracking-[0.6em] font-bold hover:opacity-70 transition-opacity"
         >
           <span className="w-16 h-px bg-white"></span>
           Explore the experience
         </button>
      </div>
    </main>
  );
};

export default Home;