import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Shield, Users, Check, Phone } from 'lucide-react';
import { GoldDivider, SectionKicker } from './GoldOrnament.tsx';

export const DelhiHeritage: React.FC = () => {
  const points = [
    {
      title: 'Delhi Master Craftsmen Lineage',
      desc: 'Trained under historic Delhi architectural plasterers, mastering intricate trowel pressure, authentic burnishing, and 3D stucco carving.',
    },
    {
      title: 'Engineered for Kerala Monsoons',
      desc: 'Specially adapted formulas with breathable nano-sealers that resist Wayanad rain dampness, fungal spores, and high coastal humidity.',
    },
    {
      title: 'Zero Dust & Odorless Execution',
      desc: 'We treat your home like a palace. Full floor and furniture masking, low-dust sanding with HEPA vacuums, and eco-friendly low-VOC materials.',
    },
    {
      title: 'Direct Supervision by Muhammad Arif',
      desc: 'No subcontracted third parties. Muhammad Arif personally leads every project from surface assessment to the final wax burnish.',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#0E0E0E] text-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Visual Card / Royal Certificate Frame (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative p-5 sm:p-10 bg-[#141414] border-2 border-[#C9A24B]/40 rounded-sm shadow-[0_0_50px_rgba(201,162,75,0.08)]">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-l-2 border-[#C9A24B]" />
              <div className="absolute top-2 right-2 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-r-2 border-[#C9A24B]" />
              <div className="absolute bottom-2 left-2 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-l-2 border-[#C9A24B]" />
              <div className="absolute bottom-2 right-2 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-r-2 border-[#C9A24B]" />

              <div className="text-center">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C9A24B] block mb-2">
                  THE ARTISAN STORY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EE] mb-1">
                  Muhammad Arif
                </h3>
                <p className="text-xs text-[#C9A24B] tracking-wider uppercase mb-5 sm:mb-6 font-medium">
                  Master Texture Artisan & Founder
                </p>

                <div className="w-16 h-[1.5px] bg-[#C9A24B]/50 mx-auto mb-6" />

                <p className="text-xs text-[#F8F5EE]/80 font-light leading-relaxed mb-6 italic">
                  "Texture is not merely paint on a surface—it is the play of ambient light, the memory of stone, and the soul of the room. We brought Delhi’s imperial wall artistry to the blessed landscapes of Kerala."
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-[#C9A24B]/20 mb-6 text-center">
                  <div>
                    <div className="font-mono text-2xl font-bold text-[#FFF1CA]">12+</div>
                    <div className="text-[10px] text-[#C9A24B] uppercase tracking-wider">Years Mastery</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-[#FFF1CA]">100%</div>
                    <div className="text-[10px] text-[#C9A24B] uppercase tracking-wider">All Kerala Service</div>
                  </div>
                </div>

                <a
                  href="tel:9656874312"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#C9A24B] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm gold-glow hover:bg-[#E5C378] transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Consult Muhammad Arif: 9656874312</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Explanatory Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <SectionKicker>ROYAL CRAFTSMANSHIP IN KERALA</SectionKicker>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-6 leading-tight"
            >
              Imperial Delhi Heritage,{' '}
              <span className="gold-gradient-text">Engineered for God’s Own Country</span>
            </motion.h2>

            <p className="text-sm sm:text-base text-[#F8F5EE]/75 font-light leading-relaxed mb-8">
              Based at Mananthavady in the lush heart of Wayanad, <strong>Texture of Delhi Wala</strong> brings the timeless elegance of royal North Indian plaster traditions together with European Italian stucco techniques to high-end villas, resorts, and modern architectural residences across all 14 districts of Kerala.
            </p>

            <div className="space-y-5 mb-8">
              {points.map((pt, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-1.5 bg-[#C9A24B]/15 border border-[#C9A24B]/40 rounded-sm text-[#C9A24B] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#F8F5EE] mb-1">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-[#F8F5EE]/70 font-light leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#C9A24B]">
              <span className="flex items-center gap-1.5 font-medium">
                <Compass className="w-4 h-4" /> Headquartered in Mananthavady, Wayanad
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Shield className="w-4 h-4" /> 10-Year Guarantee
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4" /> Dedicated Master Crew
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
