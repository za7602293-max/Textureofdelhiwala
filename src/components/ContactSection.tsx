import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { GoldDivider, SectionKicker } from './GoldOrnament.tsx';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    textureInterest: 'Italian Stucco / Marmorino',
    projectType: 'Luxury Villa / Residence',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);

    // Direct WhatsApp navigation without popup blocker
    const message = `Hello Muhammad Arif,\nI am submitting a project inquiry through your website:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Location: ${formData.location || 'Kerala'}\n• Texture Interest: ${formData.textureInterest}\n• Property Type: ${formData.projectType}\n• Details: ${formData.notes || 'Looking for site measurement and sample swatches.'}`;
    
    setTimeout(() => {
      window.location.href = `https://wa.me/919656874312?text=${encodeURIComponent(message)}`;
    }, 400);
  };

  const keralaDistricts = [
    'Wayanad', 'Kozhikode', 'Kannur', 'Malappuram', 'Ernakulam (Kochi)',
    'Thrissur', 'Palakkad', 'Kottayam', 'Kasaragod', 'Alappuzha',
    'Idukki', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram'
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0E0E0E] text-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker>BESPOKE CONSULTATION</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4"
          >
            Commission Your <span className="gold-gradient-text">Royal Wall Art</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-[#F8F5EE]/75 font-light max-w-2xl mx-auto leading-relaxed">
            Connect directly with Muhammad Arif for on-site sample presentations, laser area assessments, and transparent quotations anywhere in Kerala.
          </p>
          <GoldDivider className="mt-2" />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Direct Connect & Location Info (5 cols) */}
          <div className="lg:col-span-5 bg-[#141414] border border-[#C9A24B]/30 p-5 sm:p-8 rounded-sm flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#C9A24B] block mb-1">
                  DIRECT CONTACT
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F8F5EE]">
                  Muhammad Arif
                </h3>
                <p className="text-xs text-[#C9A24B] uppercase tracking-wider font-medium">
                  Texture of Delhi Wala
                </p>
              </div>

              {/* Direct Action Cards */}
              <div className="space-y-4 mb-8">
                {/* Phone Call Card */}
                <a
                  href="tel:9656874312"
                  className="flex items-center gap-4 p-4 bg-[#0B0B0B] border border-[#C9A24B]/30 hover:border-[#C9A24B] rounded-sm transition-all group"
                >
                  <div className="p-3 bg-[#C9A24B] text-[#0B0B0B] rounded-sm font-bold group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#C9A24B] font-semibold block">
                      Call Directly (24/7 Support)
                    </span>
                    <span className="font-mono text-lg font-bold text-[#FFF1CA] group-hover:text-[#C9A24B] transition-colors">
                      +91 96568 74312
                    </span>
                  </div>
                </a>

                {/* WhatsApp Chat Card */}
                <a
                  href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20would%20like%20to%20consult%20you%20regarding%20interior%20wall%20texture%20finishes%20in%20Kerala."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#0B0B0B] border border-[#C9A24B]/30 hover:border-[#C9A24B] rounded-sm transition-all group"
                >
                  <div className="p-3 border border-[#C9A24B] text-[#C9A24B] bg-[#C9A24B]/10 rounded-sm font-bold group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#C9A24B] font-semibold block">
                      Instant WhatsApp Consultation
                    </span>
                    <span className="text-sm font-semibold text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors">
                      Chat with Arif & Send Photos
                    </span>
                  </div>
                </a>
              </div>

              {/* Physical Location Details */}
              <div className="p-4 bg-[#0B0B0B] border border-white/10 rounded-sm space-y-3 mb-6 text-xs text-white/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FFF1CA] block">Workshop & Operations:</span>
                    <span>Mananthavady, Wayanad District, Kerala - 670645</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FFF1CA] block">Service Hours:</span>
                    <span>Monday – Sunday: 8:00 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* All Kerala Coverage Strip */}
            <div className="pt-4 border-t border-[#C9A24B]/20">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A24B] block mb-2">
                All Kerala Service Radius:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-white/60">
                {keralaDistricts.map((dst) => (
                  <span key={dst} className="bg-[#0B0B0B] px-2 py-0.5 border border-white/5 rounded-sm">
                    {dst}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#141414] border-2 border-[#C9A24B]/40 p-5 sm:p-8 rounded-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-[#C9A24B]/20 border border-[#C9A24B] text-[#C9A24B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#F8F5EE] mb-2">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-sm text-white/80 font-light max-w-md mx-auto mb-6">
                  Thank you, {formData.name}. Muhammad Arif has received your project details and will connect with you via WhatsApp or Phone to schedule your on-site measurement.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#C9A24B] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm gold-glow"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F8F5EE] mb-1">
                    Book Site Inspection & Swatch Presentation
                  </h3>
                  <p className="text-xs text-[#F8F5EE]/70 font-light">
                    Fill in your details below and we’ll immediately review your wall project requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A24B] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Nambiar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-white/10 focus:border-[#C9A24B] text-sm text-[#F8F5EE] px-3.5 py-3 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A24B] mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9656874312"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-white/10 focus:border-[#C9A24B] text-sm text-[#F8F5EE] px-3.5 py-3 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A24B] mb-1.5">
                      Site City / District in Kerala
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mananthavady / Calicut / Kochi"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-white/10 focus:border-[#C9A24B] text-sm text-[#F8F5EE] px-3.5 py-3 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A24B] mb-1.5">
                      Preferred Finish
                    </label>
                    <select
                      value={formData.textureInterest}
                      onChange={(e) => setFormData({ ...formData, textureInterest: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-white/10 focus:border-[#C9A24B] text-sm text-[#F8F5EE] px-3.5 py-3 rounded-sm focus:outline-none transition-colors"
                    >
                      <option value="Italian Stucco / Marmorino">Italian Stucco / Marmorino (Mirror Gloss)</option>
                      <option value="Cemento Architectural Concrete">Cemento Architectural Concrete (Matte)</option>
                      <option value="3D Royal Sculptural Relief">3D Royal Sculptural Relief</option>
                      <option value="Metallic Velvet & Gold Leaf">Metallic Velvet & Gold Leaf</option>
                      <option value="Multiple Finishes / Need Advice">Multiple Finishes / Need Advice</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A24B] mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#0B0B0B] border border-white/10 focus:border-[#C9A24B] text-sm text-[#F8F5EE] px-3.5 py-3 rounded-sm focus:outline-none transition-colors"
                  >
                    <option value="New Luxury Villa">New Luxury Villa</option>
                    <option value="Home Interior Renovation">Home Interior Renovation</option>
                    <option value="Resort / Hospitality Space">Resort / Hospitality Space</option>
                    <option value="Architectural Studio / Cafe">Architectural Studio / Cafe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A24B] mb-1.5">
                    Wall Dimensions or Specific Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Approximate square feet, room type, or specific dates for site visit..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#0B0B0B] border border-white/10 focus:border-[#C9A24B] text-sm text-[#F8F5EE] px-3.5 py-2.5 rounded-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-sm uppercase tracking-wider rounded-sm gold-glow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#0B0B0B]" />
                  <span>Request Site Inspection & Quote</span>
                </button>

                <p className="text-[11px] text-center text-white/50 font-light">
                  Direct connection with Muhammad Arif. 100% privacy guaranteed. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
