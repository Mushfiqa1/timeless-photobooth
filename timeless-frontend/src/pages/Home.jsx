import React from 'react';
import cameraHero from '../assets/hero-camera.jpg'; 

const Home = () => {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden flex items-end">
      {/* Background Attraction - Full Screen */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cameraHero} 
          alt="Vintage Heritage Photo Booth" 
          className="w-full h-full object-cover object-center animate-in fade-in duration-1000" 
        />
        {/* Subtle Bottom Gradient to ensure the 'Explore' link is visible on all photos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Minimalist Navigation Prompt - Optimized for thumb-tapping on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-16 md:pb-24">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
          <button 
            onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-8 text-white text-[10px] uppercase tracking-[0.6em] font-bold"
          >
            <span className="w-16 h-px bg-white group-hover:w-28 transition-all duration-700"></span>
            Explore the experience
          </button>
        </div>
      </div>
      
      {/* High-End Design Detail: Vertical Side Label (Hidden on small mobile screens for clarity) */}
      <div className="absolute right-12 bottom-32 hidden lg:block opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">
        <span className="text-white text-[10px] uppercase tracking-[0.8em] vertical-text select-none">
          EST. 2025 • Timeless
        </span>
      </div>
    </main>
  );
};

export default Home;