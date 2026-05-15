import React from 'react';
// Import your 4 GIFs
import pic1 from '../assets/gallery/pic1.gif';
import pic2 from '../assets/gallery/pic2.gif';
import pic3 from '../assets/gallery/pic3.gif';
import pic4 from '../assets/gallery/pic4.gif';

const Gallery = () => {
  const images = [
    { id: 1, src: pic1, alt: "Event Moments 1" },
    { id: 2, src: pic2, alt: "Event Moments 2" },
    { id: 3, src: pic3, alt: "Event Moments 3" },
    { id: 4, src: pic4, alt: "Event Moments 4" },
  ];

  return (
    <section id="gallery" className="bg-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light uppercase tracking-[0.3em] text-gray-800">The Experience</h2>
          <p className="text-gray-500 mt-4 font-light italic">Captured with Timeless Photo Booth</p>
        </div>

        {/* 2x2 Grid for 4 GIFs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-video overflow-hidden bg-gray-100 rounded-sm">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;