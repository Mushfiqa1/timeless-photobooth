import React from 'react';
import cameraHero from '../assets/hero-camera.jpg'; 

const Home = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden flex items-end">
      <div className="absolute inset-0 z-0">
        <img src={cameraHero} alt="Heritage Booth" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-24">
         {/* Update this to scroll to the Gallery first */}
         <button 
           onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
           className="flex items-center gap-8 text-white text-[10px] uppercase tracking-[0.6em] font-bold"
         >
           <span className="w-16 h-px bg-white"></span>
           Explore the experience
         </button>
      </div>
    </main>
  );
};

export default Home;