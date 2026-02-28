import React, { useState, useEffect } from 'react';

const packages = [
  {
    id: "essential",
    name: "The Essential",
    duration: "2 Hours",
    basePrice: 500,
    reasoning: "Perfect for intimate gatherings and birthday parties.",
    includesDesign: false,
    includesGreenScreen: false,
    features: ["Professional attendant", "Standard fabric backdrop", "3 digital templates", "Curated prop kit"]
  },
  {
    id: "signature",
    name: "The Signature",
    duration: "3 Hours",
    basePrice: 750,
    isPopular: true,
    includesDesign: true, 
    includesGreenScreen: true, 
    reasoning: "Our most popular choice for weddings. Includes unlimited physical prints.",
    features: ["Everything in Essential", "Unlimited physical prints", "Custom print layouts", "Green screen technology"]
  },
  {
    id: "grand",
    name: "The Grand",
    duration: "4 Hours",
    basePrice: 1000,
    includesDesign: true, 
    includesGreenScreen: true, 
    reasoning: "The ultimate event experience with white-glove coordination and branding.",
    features: ["Everything in Signature", "Full brand customization", "Premium fabric backdrop", "VIP online gallery", "White Glove Design Service"]
  }
];

const Packages = ({ setSelectedService }) => { // Accept the prop here
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (selectedPkg?.includesDesign || selectedPkg?.includesGreenScreen) {
      const autoAddons = [];
      if (selectedPkg.includesDesign) autoAddons.push('design');
      if (selectedPkg.includesGreenScreen) autoAddons.push('green');
      setSelectedAddons(prev => Array.from(new Set([...prev, ...autoAddons])));
    }
  }, [selectedPkg]);

  const toggleAddon = (id) => {
    if (id === 'design' && selectedPkg?.includesDesign) return;
    if (id === 'green' && selectedPkg?.includesGreenScreen) return;
    
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSelect = (pkg) => {
    setSelectedPkg(pkg);
    
    // Convert IDs to readable names for the email summary
    const addonsNames = selectedAddons.map(id => {
      if (id === 'design') return "Custom Print Design";
      if (id === 'idle') return "Idle Hours";
      if (id === 'green') return "Green Screen";
      return id;
    });

    const summary = `Selected ${pkg.name} (${pkg.duration}) with: ${addonsNames.length > 0 ? addonsNames.join(", ") : "no additional add-ons"}.`;
    
    // Update the central state in App.jsx
    setSelectedService(summary); 
    
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="bg-[#FAF9F6] py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="serif-title text-center text-4xl mb-16">Our Packages</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`package-card ${pkg.isPopular ? 'popular' : ''} ${selectedPkg?.id === pkg.id ? 'border-[#818C78] bg-[#fdfcf9]' : ''}`}>
              <div>
                {pkg.isPopular && <span className="popular-badge">⭐ MOST POPULAR</span>}
                <h3 className="serif-title text-2xl mb-2">{pkg.name}</h3>
                <p className="text-[#818C78] font-bold text-xl mb-6">${pkg.basePrice}</p>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map(f => <li key={f} className="text-sm">✓ {f}</li>)}
                </ul>
              </div>
              <button 
                onClick={() => handleSelect(pkg)}
                className="w-full py-3 mb-6 border border-[#5D4037] text-[10px] uppercase font-bold hover:bg-[#5D4037] hover:text-white transition-all"
              >
                {selectedPkg?.id === pkg.id ? 'Package Selected' : `Select ${pkg.name}`}
              </button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto pt-12 border-t border-[#E0DED7]">
          <h4 className="serif-title text-center text-2xl mb-4">Customize Your Experience</h4>
          <p className="text-center text-xs text-gray-500 mb-12">Enhance your package with these optional add-ons.</p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <span className="font-bold text-[#5D4037]">Custom Print Design</span>
              <span className="text-[10px] text-[#818C78] uppercase mb-2">+$100 (Free in Signature/Grand)</span>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-4 px-4">Handcrafted layouts matching your branding. Every photo becomes a branded keepsake.</p>
              <button onClick={() => toggleAddon('design')} className={`w-12 h-6 rounded-full relative transition-all ${selectedAddons.includes('design') ? 'bg-[#818C78]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${selectedAddons.includes('design') ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="font-bold text-[#5D4037]">Idle Hours</span>
              <span className="text-[10px] text-[#818C78] uppercase mb-2">+$75 per hour</span>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-4 px-4">Covers attendant standby time for early setups before the party starts.</p>
              <button onClick={() => toggleAddon('idle')} className={`w-12 h-6 rounded-full relative transition-all ${selectedAddons.includes('idle') ? 'bg-[#818C78]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${selectedAddons.includes('idle') ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="font-bold text-[#5D4037]">Green Screen</span>
              <span className="text-[10px] text-[#818C78] uppercase mb-2">Included in Signature/Grand</span>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-4 px-4">Transport guests to any location instantly using virtual backdrop software.</p>
              <button onClick={() => toggleAddon('green')} className={`w-12 h-6 rounded-full relative transition-all ${selectedAddons.includes('green') ? 'bg-[#818C78]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${selectedAddons.includes('green') ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;