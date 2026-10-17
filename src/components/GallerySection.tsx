import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, MessageCircle, MapPin, Maximize2 } from 'lucide-react';
import { GoldDivider, SectionKicker } from './GoldOrnament.tsx';
import heroImg from '../assets/images/hero_luxury_wall_1791823332740.jpg';
import italianStuccoImg from '../assets/images/texture_italian_stucco_1791823347952.jpg';
import cementoImg from '../assets/images/texture_cemento_1791823358135.jpg';
import royal3dImg from '../assets/images/texture_royal_3d_1791823371041.jpg';
import metallicVelvetImg from '../assets/images/texture_metallic_velvet_1791823383257.jpg';

interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'stucco' | 'cemento' | 'royal3d' | 'metallic';
  categoryLabel: string;
  location: string;
  image: string;
  aspect: string;
  description: string;
  artisanNote: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Double-Height Slate & Gold Accent',
    category: 'metallic',
    categoryLabel: 'Slate & Gold Leaf',
    location: 'Wayanad Hilltop Villa, Meppadi',
    image: heroImg,
    aspect: 'col-span-1 md:col-span-2 row-span-2',
    description: 'A grand 22-foot accent wall with deep slate plaster infused with hand-feathered 24k gold leaf veins. Lit by recessed warm architectural spots.',
    artisanNote: '4 coats of moisture sealant applied to endure Wayanad monsoon mist.',
  },
  {
    id: 'g-2',
    title: 'Venetian Mirror Marmorino Wall',
    category: 'stucco',
    categoryLabel: 'Italian Stucco',
    location: 'Beachfront Penthouse, Kozhikode (Calicut)',
    image: italianStuccoImg,
    aspect: 'col-span-1',
    description: 'Classic Venetian marble plaster polished using Japanese stainless trowels for a mirror-like shine reflecting the Arabian Sea sunsets.',
    artisanNote: '100% natural Italian slaked lime with zero volatile organic compounds.',
  },
  {
    id: 'g-3',
    title: 'Raw Architectural Concrete Lounge',
    category: 'cemento',
    categoryLabel: 'Cemento Concrete',
    location: 'Modern Villa, Mananthavady, Wayanad',
    image: cementoImg,
    aspect: 'col-span-1',
    description: 'Seamless minimalist concrete finish with deliberate subtle float strokes, offering an authentic industrial feel for contemporary living.',
    artisanNote: 'Matte protective polyurethane coat resistant to fingerprints and stains.',
  },
  {
    id: 'g-4',
    title: '3D Royal Wave Dining Backdrop',
    category: 'royal3d',
    categoryLabel: '3D Royal Relief',
    location: 'Architectural Residence, Ernakulam (Kochi)',
    image: royal3dImg,
    aspect: 'col-span-1 md:col-span-2',
    description: 'Sculptural bas-relief undulating wave texture creating majestic chiaroscuro shadows behind a custom teakwood dining table.',
    artisanNote: 'Hand-sculpted in Delhi craft tradition over 5 days of micro-layering.',
  },
  {
    id: 'g-5',
    title: 'Champagne Bronze Velvet Master Suite',
    category: 'metallic',
    categoryLabel: 'Metallic Velvet',
    location: 'Boutique Coffee Estate Resort, Kalpetta',
    image: metallicVelvetImg,
    aspect: 'col-span-1',
    description: 'Tactile suede metallic finish with deep golden undertones that shimmer softly in warm ambient room light.',
    artisanNote: 'Ultra-soft touch with high scrub resistance for hospitality durability.',
  },
];

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'stucco' | 'cemento' | 'royal3d' | 'metallic'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'stucco', label: 'Italian Stucco' },
    { id: 'cemento', label: 'Cemento Concrete' },
    { id: 'royal3d', label: '3D Royal Relief' },
    { id: 'metallic', label: 'Metallic & Gold' },
  ] as const;

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#0B0B0B] text-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionKicker>MASTERWORK PORTFOLIO</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4"
          >
            Curated Kerala <span className="gold-gradient-text">Wall Projects</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-[#F8F5EE]/75 font-light max-w-xl mx-auto leading-relaxed">
            Real spaces elevated across Wayanad, Kozhikode, Kochi, and Kannur. Every project is executed personally under Muhammad Arif’s master supervision.
          </p>
          <GoldDivider className="mt-2" />
        </div>

        {/* Filter Controls (Buttons complying with design constitution) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-[0_0_15px_rgba(201,162,75,0.4)]'
                    : 'bg-[#141414] text-white/70 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#141414] border border-[#C9A24B]/20 hover:border-[#C9A24B]/70 rounded-sm overflow-hidden flex flex-col cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E1E1E]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent pointer-events-none" />

                  {/* Corner Enlarge Badge */}
                  <div className="absolute top-3 right-3 p-2 bg-[#0B0B0B]/80 backdrop-blur-md rounded-sm border border-[#C9A24B]/40 text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Unboxed Location Kicker */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-[#C9A24B] bg-[#0B0B0B]/85 px-2.5 py-1 rounded-sm border border-[#C9A24B]/30">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate max-w-[200px]">{item.location}</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C9A24B]/80 block mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F8F5EE]/70 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#C9A24B]">
                    <span className="font-medium">View Project Details</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full bg-[#141414] border border-[#C9A24B]/50 rounded-sm overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-[#0B0B0B]/80 border border-[#C9A24B]/40 text-[#C9A24B] rounded-sm hover:bg-[#C9A24B] hover:text-[#0B0B0B] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto h-72 md:h-full bg-black">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-1">
                        {selectedImage.categoryLabel}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#F8F5EE] mb-2">
                        {selectedImage.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#C9A24B] mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{selectedImage.location}</span>
                      </div>

                      <p className="text-sm text-white/80 font-light leading-relaxed mb-6">
                        {selectedImage.description}
                      </p>

                      <div className="p-3.5 bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm mb-6">
                        <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                          Artisan's Note:
                        </span>
                        <p className="text-xs text-white/70 italic">
                          "{selectedImage.artisanNote}"
                        </p>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20a%20wall%20finish%20similar%20to%20your%20project:%20"${encodeURIComponent(
                        selectedImage.title
                      )}"%20(${encodeURIComponent(selectedImage.location)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs tracking-wider uppercase rounded-sm gold-glow transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire This Look for My Wall</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
