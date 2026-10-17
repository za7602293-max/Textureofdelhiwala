import React from 'react';
import { motion } from 'motion/react';

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 py-4 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent origin-right"
      />
      <div className="flex items-center gap-1.5 text-[#C9A24B]">
        <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A24B] bg-[#0B0B0B]" />
        <span className="w-2 h-2 rotate-45 bg-[#C9A24B]" />
        <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A24B] bg-[#0B0B0B]" />
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#C9A24B] to-transparent origin-left"
      />
    </div>
  );
};

export const RoyalCornerFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}> = ({ children, className = '', glow = false }) => {
  return (
    <div
      className={`relative p-6 sm:p-8 bg-[#141414]/90 backdrop-blur-md border border-[#C9A24B]/30 ${
        glow ? 'shadow-[0_0_40px_rgba(201,162,75,0.12)]' : ''
      } ${className}`}
    >
      {/* Top Left Corner */}
      <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#C9A24B] pointer-events-none" />
      <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-[#C9A24B]/70 rotate-45 pointer-events-none" />

      {/* Top Right Corner */}
      <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#C9A24B] pointer-events-none" />
      <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#C9A24B]/70 rotate-45 pointer-events-none" />

      {/* Bottom Left Corner */}
      <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#C9A24B] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-[#C9A24B]/70 rotate-45 pointer-events-none" />

      {/* Bottom Right Corner */}
      <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#C9A24B] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-[#C9A24B]/70 rotate-45 pointer-events-none" />

      {children}
    </div>
  );
};

export const SectionKicker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="w-6 h-[1px] bg-[#C9A24B]/60" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A24B]">
        {children}
      </span>
      <span className="w-6 h-[1px] bg-[#C9A24B]/60" />
    </div>
  );
};
