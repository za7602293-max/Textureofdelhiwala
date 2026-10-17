import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  iconSvg: React.ReactNode;
}

const servicesList: ServiceItem[] = [
  {
    id: 'wall-textures',
    name: 'Wall Textures',
    description: 'Custom textures that give your walls a unique character.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
        <path d="m5 2 5 5" />
        <path d="M2 13h15" />
        <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
      </svg>
    ),
  },
  {
    id: 'royal-play',
    name: 'Royal Play',
    description: 'Rich, glossy finishes with a royal, palace-like feel.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z" />
        <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        <circle cx="5" cy="4" r="1.5" fill="currentColor" />
        <circle cx="19" cy="4" r="1.5" fill="currentColor" />
        <path d="M5 20h14" />
      </svg>
    ),
  },
  {
    id: 'italian-texture',
    name: 'Italian Texture',
    description: 'Premium Italian rough and tough designs for a bold look.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
        <path d="M2 9h20" />
        <path d="m10 3 2 6-2 12" />
        <path d="m14 3-2 6 2 12" />
      </svg>
    ),
  },
  {
    id: '3d-wall-designs',
    name: '3D Wall Designs',
    description: 'Raised mandala, floral and feather art on your walls.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4Z" />
        <path d="M12 22a4 4 0 0 0 4-4c0-3-4-6-4-6s-4 3-4 6a4 4 0 0 0 4 4Z" />
        <path d="M2 12a4 4 0 0 0 4 4c3 0 6-4 6-4s-3-4-6-4a4 4 0 0 0-4 4Z" />
        <path d="M22 12a4 4 0 0 0-4-4c-3 0-6 4-6 4s3 4 6 4a4 4 0 0 0 4-4Z" />
      </svg>
    ),
  },
  {
    id: 'teakwood-grains',
    name: 'Teakwood Grains',
    description: 'Natural wood grain finish on walls and surfaces.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M7 6c2 1 3 3 3 6s-1 5-3 6" />
        <path d="M17 6c-2 1-3 3-3 6s1 5 3 6" />
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'interior-exterior',
    name: 'Interior & Exterior Work',
    description: 'Textures that last for homes, offices and showrooms.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <path d="M19 10v6" />
      </svg>
    ),
  },
  {
    id: 'cemento-texture',
    name: 'Cemento Texture',
    description: 'Smooth cement and marble look in 12 modern shades.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
        <path d="M7 7h.01" />
        <path d="M17 7h.01" />
        <path d="M7 17h.01" />
        <path d="M17 17h.01" />
      </svg>
    ),
  },
  {
    id: 'rustic-texture',
    name: 'Rustic Texture',
    description: 'Earthy, handcrafted finish with natural charm.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
        <path d="M4.14 15.08 8.5 12" />
        <circle cx="18" cy="6" r="2" />
      </svg>
    ),
  },
  {
    id: 'liquid-wallpaper',
    name: 'Liquid Wallpaper Texture',
    description: 'Seamless wallpaper look without joints or peeling.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1Z" />
        <path d="M4 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4Z" />
        <line x1="8" y1="9" x2="13" y2="9" />
        <line x1="8" y1="13" x2="11" y2="13" />
      </svg>
    ),
  },
  {
    id: 'spray-paint-polish',
    name: 'Spray Paint & Polish',
    description: 'Smooth, shiny finish for walls, doors and furniture.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 4-2 2 6 6 2-2a2.8 2.8 0 0 0 0-4l-2-2a2.8 2.8 0 0 0-4 0Z" />
        <path d="m13 6-8.5 8.5a2.12 2.12 0 0 0-.6 1.5V19h3a2.12 2.12 0 0 0 1.5-.6L17 10" />
        <path d="m3 21 3-3" />
        <path d="M19 19h.01" />
        <path d="M15 15h.01" />
      </svg>
    ),
  },
];

// Staggered Container Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Item Variants (Fade in and slide up)
const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const OurServices: React.FC = () => {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#0B0B0B] text-[#F8F5EE] border-t border-[#C9A24B]/20 overflow-hidden"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#C9A24B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Small gold text */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-5 h-[1px] bg-[#C9A24B]/60" />
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C9A24B]">
              WHAT WE DO
            </span>
            <span className="w-5 h-[1px] bg-[#C9A24B]/60" />
          </div>

          {/* Heading in serif font */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4">
            Our <span className="gold-gradient-text">Services</span>
          </h2>

          {/* Thin gold ornamental divider line that draws in from the center when it scrolls into view */}
          <div className="flex items-center justify-center gap-3 py-2 max-w-md mx-auto">
            {/* Left drawing line (origin right) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B] to-[#C9A24B] origin-right"
            />

            {/* Center Royal Ornament */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-1.5 text-[#C9A24B] px-1"
            >
              <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A24B] bg-[#0B0B0B]" />
              <span className="w-2 h-2 rotate-45 bg-[#C9A24B]" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A24B] bg-[#0B0B0B]" />
            </motion.div>

            {/* Right drawing line (origin left) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A24B] to-[#C9A24B] origin-left"
            />
          </div>
        </div>

        {/* SERVICE CARDS (1 column on narrow mobile, 2 columns on phablets, 3 on tablet, 4 on desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6"
        >
          {servicesList.map((service, index) => {
            const waUrl = `https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20"${encodeURIComponent(
              service.name
            )}"%20for%20my%20property%20in%20Kerala.`;

            return (
              <motion.a
                key={service.id}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="group relative bg-[#141414] rounded-sm p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden block"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Outer Thin Gold Border (with subtle draw-in scale) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="absolute inset-0 border border-[#C9A24B]/35 rounded-sm transition-all duration-300 group-hover:border-[#C9A24B] group-hover:shadow-[0_0_25px_rgba(201,162,75,0.4)] pointer-events-none"
                />

                {/* Animated Drawing In Corners */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#C9A24B]/60 transition-all duration-300 group-hover:border-[#C9A24B] group-hover:scale-125" />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#C9A24B]/60 transition-all duration-300 group-hover:border-[#C9A24B] group-hover:scale-125" />
                <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#C9A24B]/60 transition-all duration-300 group-hover:border-[#C9A24B] group-hover:scale-125" />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#C9A24B]/60 transition-all duration-300 group-hover:border-[#C9A24B] group-hover:scale-125" />

                {/* Card Top: Small Gold Line Icon */}
                <div>
                  <div className="mb-3 sm:mb-4 inline-flex items-center justify-center p-2.5 sm:p-3 rounded-sm bg-[#0B0B0B] border border-[#C9A24B]/30 text-[#C9A24B] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:border-[#C9A24B] shadow-inner">
                    {service.iconSvg}
                  </div>

                  {/* Service Name */}
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors mb-1.5 sm:mb-2 leading-tight">
                    {service.name}
                  </h3>

                  {/* One-line Description */}
                  <p className="text-xs sm:text-sm text-[#F8F5EE]/70 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Subtle Action Hint */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C9A24B]/70 group-hover:text-[#C9A24B] transition-colors">
                  <span className="font-medium">Inquire Finish</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* BOTTOM CALL TO ACTION STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-16 p-5 sm:p-8 bg-[#141414] border border-[#C9A24B]/35 rounded-sm flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left shadow-[0_0_30px_rgba(201,162,75,0.08)]"
        >
          <div className="flex-1">
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#F8F5EE] mb-1">
              Not sure which texture suits you?
            </p>
            <p className="text-xs sm:text-sm text-[#F8F5EE]/70 font-light">
              Call us for a free consultation. Muhammad Arif will personally guide you through sample swatches & site recommendations across Kerala.
            </p>
          </div>

          <div className="flex flex-col min-[440px]:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:9656874312"
              className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm gold-glow transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#0B0B0B]" />
              <span>Call 9656874312</span>
            </a>

            <a
              href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20would%20like%20a%20free%20consultation%20regarding%20the%20best%20texture%20for%20my%20walls."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#C9A24B] hover:border-[#FFF1CA] text-[#C9A24B] hover:text-[#FFF1CA] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm gold-outline-glow transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
