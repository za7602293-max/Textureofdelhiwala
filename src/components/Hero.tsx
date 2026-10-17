import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, MessageCircle, Star, ChevronDown, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { Hero3DBackground } from './Hero3DBackground.tsx';
import heroImg from '../assets/images/hero_luxury_wall_1791823332740.jpg';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 140]);
  const scaleParallax = useTransform(scrollY, [0, 800], [1.05, 1.18]);

  // Heading words for staggered reveal
  const headingWords = ["Turn", "Your", "Plain", "Walls", "Into", "Art"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#0B0B0B]"
    >
      {/* Background with Slow Zoom Parallax & Gradient Overlay */}
      <motion.div
        style={{ y: yParallax, scale: scaleParallax }}
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        <img
          src={heroImg}
          alt="Luxury textured slate wall with antique gold veining"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
        />
      </motion.div>

      {/* Interactive 3D Bas-Relief & Floating Gold Dust Scene */}
      <Hero3DBackground />

      {/* Royal Dark Gradient Scrims: Multi-layer for contrast & richness */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]/35 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0B0B]/45 to-[#0B0B0B] z-10 pointer-events-none" />

      {/* Subtle Royal Gold Vignette Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A24B 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Brand Medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-5 drop-shadow-[0_0_20px_rgba(201,162,75,0.45)]"
        >
          <BrandLogo size={64} showText={false} className="sm:hidden" />
          <BrandLogo size={84} showText={false} className="hidden sm:flex" />
        </motion.div>

        {/* Small Gold Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 mb-5 sm:mb-6 rounded-full border border-[#C9A24B]/35 bg-[#141414]/80 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[#C9A24B]">
            INTERIOR WALL TEXTURES
          </span>
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
        </motion.div>

        {/* Big Heading: Words revealing one by one */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-[#F8F5EE] tracking-tight leading-[1.12] sm:leading-[1.1] max-w-4xl mb-5 sm:mb-6"
          style={{ textWrap: 'balance' }}
        >
          {headingWords.map((word, index) => {
            return (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-1.5 min-[400px]:mr-2.5 sm:mr-4 ${
                  word === "Art" ? "gold-gradient-text italic font-normal" : ""
                } ${word === "Plain" ? "text-white/70" : ""}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-lg md:text-xl text-[#F8F5EE]/85 max-w-2xl font-light tracking-wide mb-8 sm:mb-10 px-2 leading-relaxed"
        >
          Cemento, Italian, 3D and Royal textures.{' '}
          <span className="text-[#C9A24B] font-medium">All Kerala service</span> based in Mananthavady, Wayanad.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col min-[480px]:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
        >
          {/* Button 1: Solid Gold */}
          <a
            href="tel:9656874312"
            className="w-full min-[480px]:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase rounded-sm gold-glow transition-all whitespace-nowrap group shadow-lg"
          >
            <Phone className="w-4 h-4 text-[#0B0B0B] group-hover:scale-110 transition-transform" />
            <span>Call Now: 9656874312</span>
          </a>

          {/* Button 2: Gold Outline */}
          <a
            href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20want%20to%20inquire%20about%20interior%20wall%20texture%20finishes%20for%20my%20property%20in%20Kerala."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-[480px]:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-[#C9A24B] hover:border-[#FFF1CA] text-[#C9A24B] hover:text-[#FFF1CA] font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase rounded-sm gold-outline-glow transition-all whitespace-nowrap group"
          >
            <MessageCircle className="w-4 h-4 text-[#C9A24B] group-hover:scale-110 transition-transform" />
            <span>WhatsApp Us</span>
          </a>
        </motion.div>

        {/* Five Gold Stars & Google Rating Proof */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#141414]/85 border border-[#C9A24B]/30 backdrop-blur-md"
        >
          <div className="flex items-center gap-1 text-[#C9A24B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C9A24B] stroke-none drop-shadow-[0_0_4px_rgba(201,162,75,0.6)]" />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide text-[#F8F5EE]">
            5 Star Rated on Google
          </span>
          <span className="text-xs text-[#C9A24B]/70 hidden min-[440px]:inline">· 100+ Kerala Projects</span>
        </motion.div>
      </div>

      {/* Bouncing Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer select-none"
        onClick={() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] tracking-[0.25em] text-[#C9A24B]/80 uppercase font-medium">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="p-1 rounded-full text-[#C9A24B]"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
