import React from 'react';
import { Phone, MessageCircle, MapPin, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-[#C9A24B]/30 pt-16 pb-32 sm:pb-36 lg:pb-16 text-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Craftsmanship */}
          <div className="lg:col-span-1">
            <BrandLogo size={46} className="mb-4" />
            <p className="text-xs text-[#F8F5EE]/70 font-light leading-relaxed mb-4">
              Master interior wall textures, Italian stucco, and 3D architectural finishes brought from historic Delhi ateliers directly to Kerala’s finest homes and resorts.
            </p>
            <p className="text-[11px] text-[#C9A24B] font-medium">
              Founder & Master Artisan: Muhammad Arif
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] block mb-4">
              Explore Portfolio
            </span>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#projects" className="text-[#C9A24B] font-semibold hover:text-[#FFF1CA] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#C9A24B] rounded-full" />
                  <span>Our Projects (Real Sites)</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A24B] transition-colors">
                  Texture Gallery & Brochure
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9A24B] transition-colors">
                  Italian Stucco & Marmorino
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9A24B] transition-colors">
                  Cemento Concrete Finish
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9A24B] transition-colors">
                  3D Royal Sculptural Relief
                </a>
              </li>
              <li>
                <a href="#visualizer" className="hover:text-[#C9A24B] transition-colors">
                  Interactive Room Visualizer
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#C9A24B] transition-colors">
                  Kerala Cost Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Hubs */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] block mb-4">
              Regional Operations
            </span>
            <div className="text-xs text-white/70 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">Headquarters:</strong> Mananthavady, Wayanad, Kerala - 670645
              </p>
              <p>
                <strong className="text-white">Active Hubs:</strong> Kozhikode (Calicut), Kochi (Ernakulam), Kannur, Thrissur, Malappuram, Kasaragod.
              </p>
              <p className="text-[#C9A24B]/90 font-medium pt-1">
                All 14 Districts of Kerala Covered
              </p>
            </div>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] block mb-4">
              Connect With Arif
            </span>
            <div className="space-y-3 text-xs">
              <a
                href="tel:9656874312"
                className="flex items-center gap-2.5 text-white/80 hover:text-[#C9A24B] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A24B]" />
                <span className="font-mono text-sm">+91 96568 74312</span>
              </a>

              <a
                href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20would%20like%20to%20discuss%20a%20wall%20texture%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/80 hover:text-[#C9A24B] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A24B]" />
                <span>WhatsApp Instant Support</span>
              </a>

              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#C9A24B]/30 hover:border-[#C9A24B] text-[#C9A24B] text-[11px] rounded-sm transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Gold Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Texture of Delhi Wala. All rights reserved. Handcrafted in Kerala.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#C9A24B]/70">
            <span>Mananthavady, Wayanad</span>
            <span>·</span>
            <span>All Kerala Service</span>
            <span>·</span>
            <span className="text-[#C9A24B]">Direct: 9656874312</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
