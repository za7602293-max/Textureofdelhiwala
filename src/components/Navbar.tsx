import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface NavbarProps {
  onOpenEstimator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Projects', href: '#projects' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visualizer', href: '#visualizer' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#C9A24B]/40 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#0B0B0B]/85 via-[#0B0B0B]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
            {/* Zone 1: Brand Wordmark & Circular Gold Emblem */}
            <a
              href="#home"
              className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B]"
            >
              <BrandLogo size={36} className="sm:hidden" />
              <BrandLogo size={42} className="hidden sm:flex" />
            </a>

            {/* Zone 2: Desktop Navigation Links (Single Line, Clean Underline) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm tracking-wide font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[#F8F5EE]/80 hover:text-[#C9A24B] transition-colors py-1 whitespace-nowrap group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A24B] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* WhatsApp Quick Link (Tablet/Desktop) */}
              <a
                href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20wall%20texture%20finishes%20for%20my%20property%20in%20Kerala."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-[#C9A24B] border border-[#C9A24B]/60 rounded-sm gold-outline-glow transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Call Now Button */}
              <a
                href="tel:9656874312"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#0B0B0B] bg-[#C9A24B] hover:bg-[#E5C378] rounded-sm gold-glow transition-all whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden min-[400px]:inline">9656874312</span>
                <span className="min-[400px]:hidden">Call</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-1.5 sm:p-2 text-[#C9A24B] border border-[#C9A24B]/30 hover:border-[#C9A24B] bg-[#141414] rounded-sm transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Royal Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#0B0B0B]/98 backdrop-blur-xl border-b border-[#C9A24B]/40 px-6 py-8 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Royal Top Border Detail */}
            <div className="w-16 h-[2px] bg-[#C9A24B] mx-auto mb-6" />

            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-lg tracking-wide text-[#F8F5EE] hover:text-[#C9A24B] transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#C9A24B]/30 flex flex-col gap-3">
              <a
                href="tel:9656874312"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#C9A24B] text-[#0B0B0B] font-semibold text-sm rounded-sm gold-glow"
              >
                <Phone className="w-4 h-4" />
                <span>Call Arif: 9656874312</span>
              </a>
              <a
                href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20wall%20texture%20finishes%20in%20Kerala."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#C9A24B] text-[#C9A24B] font-semibold text-sm rounded-sm gold-outline-glow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[11px] text-center text-[#C9A24B]/70 tracking-wider uppercase mt-2">
                Mananthavady, Wayanad · All Kerala Service
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
