import React, { useState, useEffect } from 'react'; // Added useEffect

const Contact = ({ selectedService }) => { // Accept the prop here
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    services: [], date: '', message: ''
  });

  // Automatically update the message box when a service is selected above
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the following: ${selectedService}`
      }));
    }
  }, [selectedService]);

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://timeless-backend-dte0.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please check your connection.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Make sure your backend is running!");
    }
  };

  return (
    <div className="pt-48 pb-32 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl tracking-[0.25em] uppercase font-medium text-[#5D4037]">
            {isSubmitted ? "Thank You" : "Request a Quote"}
          </h2>
          <div className="h-px w-16 bg-[#D7C4B7] mx-auto"></div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-10 bg-white/40 backdrop-blur-sm p-8 md:p-16 rounded-3xl border border-[#E0DED7]/60 shadow-xl animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/80">First Name *</label>
                <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-transparent border-b border-[#D7C4B7] py-2 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/80">Last Name *</label>
                <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-transparent border-b border-[#D7C4B7] py-2 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/80">Email Address *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-[#D7C4B7] py-2 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/80">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-[#D7C4B7] py-2 outline-none" />
              </div>
            </div>

            <div className="space-y-2 w-full md:w-1/2">
              <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/80">Event Date *</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#D7C4B7] py-2 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D4037]/80">Vision *</label>
              <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us about your celebration..." className="w-full bg-transparent border-b border-[#D7C4B7] py-2 outline-none resize-none"></textarea>
            </div>

            <div className="pt-10 flex justify-center">
              <button type="submit" className="px-16 py-4 bg-[#5D4037] text-white uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#818C78] transition-all duration-500">
                Send Request
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-1000">
            <p className="text-lg italic text-[#818C78] mb-8">We’ve received your inquiry and will reach out shortly.</p>
            <button onClick={() => setIsSubmitted(false)} className="text-[10px] uppercase tracking-[0.4em] text-[#5D4037] border-b border-[#D7C4B7] pb-1">Send another message</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;