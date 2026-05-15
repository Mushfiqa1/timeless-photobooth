import React from 'react';
// These imports are correct for Vite/React
import pic1 from '../assets/gallery/pic1.gif';
import pic2 from '../assets/gallery/pic2.gif';
import pic3 from '../assets/gallery/pic3.gif';
import pic4 from '../assets/gallery/pic4.gif';

const Gallery = () => {
  const images = [pic1, pic2, pic3, pic4];

  return (
    <section id="gallery" className="bg-[#FAF9F6] py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light uppercase tracking-[0.4em] text-gray-800">
            The Experience
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((gif, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-sm shadow-sm bg-gray-200 aspect-[4/3]"
            >
              <img 
                src={gif} 
                alt={`Timeless Experience ${index + 1}`}
                /* 'block' and 'object-center' help GIFs render correctly without extra spacing */
                className="block w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                /* Adding loading="lazy" helps if the GIFs are large files */
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;