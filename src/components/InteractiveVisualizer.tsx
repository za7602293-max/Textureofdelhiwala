import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles, MessageCircle, Eye, Sliders } from 'lucide-react';
import { GoldDivider, SectionKicker } from './GoldOrnament.tsx';
import italianStuccoImg from '../assets/images/texture_italian_stucco_1791823347952.jpg';
import cementoImg from '../assets/images/texture_cemento_1791823358135.jpg';
import royal3dImg from '../assets/images/texture_royal_3d_1791823371041.jpg';
import metallicVelvetImg from '../assets/images/texture_metallic_velvet_1791823383257.jpg';
import heroImg from '../assets/images/hero_luxury_wall_1791823332740.jpg';

interface TextureOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  tone: string;
  lightProfile: string;
  recommendedFor: string;
}

const textureOptions: TextureOption[] = [
  {
    id: 'hero-slate',
    name: 'Imperial Black & Gold',
    subtitle: 'Charcoal Plaster with Gold Veining',
    image: heroImg,
    tone: 'Deep Obsidian & Rich Gold Leaf',
    lightProfile: 'High contrast architectural spotlights enhance gold filaments',
    recommendedFor: 'Double-height living rooms, premium resorts in Wayanad',
  },
  {
    id: 'italian',
    name: 'Italian Marmorino',
    subtitle: 'Burnished High-Gloss Venetian Stucco',
    image: italianStuccoImg,
    tone: 'Warm Crema & Travertine Amber',
    lightProfile: 'Glass-smooth specular reflection under pendant chandeliers',
    recommendedFor: 'Formal living rooms, palace dining halls, corporate suites',
  },
  {
    id: 'cemento',
    name: 'Architectural Cemento',
    subtitle: 'Raw Troweled Micro-Concrete',
    image: cementoImg,
    tone: 'Matte Greige & Ash Stone',
    lightProfile: 'Soft diffuse shadows highlight artisanal trowel float marks',
    recommendedFor: 'Minimalist Kerala villas, contemporary cafes, gallery walls',
  },
  {
    id: 'royal-3d',
    name: 'Royal 3D Wave Relief',
    subtitle: 'Sculptured Bas-Relief Wall Art',
    image: royal3dImg,
    tone: 'Ivory Champagne & Gold Crests',
    lightProfile: 'Dramatic rake lighting casts deep dimensional shadows',
    recommendedFor: 'Accent focal walls, double-height voids, headboard walls',
  },
  {
    id: 'metallic-velvet',
    name: 'Spun Gold Velvet',
    subtitle: 'Tactile Metallic Bronze Sheen',
    image: metallicVelvetImg,
    tone: 'Royal Amber & Brushed Bronze',
    lightProfile: 'Prismatic metallic particles shimmer as you walk past the wall',
    recommendedFor: 'Master bedrooms, luxury powder rooms, home theaters',
  },
];

export const InteractiveVisualizer: React.FC = () => {
  const [selectedTexture, setSelectedTexture] = useState<TextureOption>(textureOptions[0]);
  const [lightingMode, setLightingMode] = useState<'warm' | 'daylight'>('warm');
  const [roomPreset, setRoomPreset] = useState<'living' | 'master' | 'foyer'>('living');

  return (
    <section id="visualizer" className="relative py-24 sm:py-32 bg-[#0B0B0B] text-[#F8F5EE] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A24B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionKicker>INTERACTIVE EXPERIENCE</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4"
          >
            Texture & Light <span className="gold-gradient-text">Visualizer</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-[#F8F5EE]/75 font-light max-w-xl mx-auto leading-relaxed">
            Witness how artisanal textures respond to natural tropical daylight versus warm evening architectural lighting.
          </p>
          <GoldDivider className="mt-2" />
        </div>

        {/* Visualizer Workspace Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#141414] border border-[#C9A24B]/30 rounded-sm overflow-hidden p-4 sm:p-6 lg:p-8">
          {/* Main Visualizer Stage (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Viewport Frame with lighting effects */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden border border-[#C9A24B]/20 bg-[#0B0B0B] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedTexture.id}-${lightingMode}-${roomPreset}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <img
                    src={selectedTexture.image}
                    alt={selectedTexture.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter transition-all duration-700"
                    style={{
                      filter:
                        lightingMode === 'warm'
                          ? 'sepia(0.2) brightness(0.95) contrast(1.1)'
                          : 'brightness(1.05) contrast(1.02) saturate(0.95)',
                    }}
                  />

                  {/* Dynamic Lighting Overlay */}
                  {lightingMode === 'warm' ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C9A24B]/25 via-transparent to-black/60 pointer-events-none mix-blend-color-dodge" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/15 pointer-events-none" />
                  )}

                  {/* Ceiling Spotlight Beam simulation */}
                  {lightingMode === 'warm' && (
                    <div className="absolute -top-10 left-1/3 w-72 h-72 bg-[#FFF2CC]/20 rounded-full blur-[60px] pointer-events-none" />
                  )}

                  {/* Unboxed Room State Overlay */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-[#F8F5EE] bg-[#0B0B0B]/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#C9A24B]/30">
                    <span className="font-serif font-bold text-[#C9A24B]">{selectedTexture.name}</span>
                    <span className="text-[#C9A24B]/60">·</span>
                    <span className="capitalize">{lightingMode} Lighting</span>
                    <span className="text-[#C9A24B]/60">·</span>
                    <span className="capitalize">{roomPreset} Setting</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Lighting & Room Toggle Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-5 sm:mt-6 pt-4 border-t border-white/10">
              {/* Lighting Switch */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C9A24B]/80 mr-1">
                  Lighting:
                </span>
                <button
                  onClick={() => setLightingMode('warm')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
                    lightingMode === 'warm'
                      ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-[0_0_15px_rgba(201,162,75,0.4)]'
                      : 'bg-[#1E1E1E] text-[#F8F5EE]/70 hover:text-white border border-white/10'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Warm Spotlights</span>
                </button>
                <button
                  onClick={() => setLightingMode('daylight')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
                    lightingMode === 'daylight'
                      ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-[0_0_15px_rgba(201,162,75,0.4)]'
                      : 'bg-[#1E1E1E] text-[#F8F5EE]/70 hover:text-white border border-white/10'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Natural Daylight</span>
                </button>
              </div>

              {/* Room Settings */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C9A24B]/80 mr-1">
                  Space:
                </span>
                {(['living', 'master', 'foyer'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setRoomPreset(preset)}
                    className={`px-2.5 sm:px-3 py-1.5 text-xs capitalize font-medium rounded-sm transition-all ${
                      roomPreset === preset
                        ? 'border border-[#C9A24B] text-[#C9A24B] bg-[#C9A24B]/10'
                        : 'text-white/60 hover:text-white border border-white/5 bg-[#1E1E1E]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Texture Selector & Architectural Details (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-6 lg:border-l border-white/10 mt-8 lg:mt-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B]">
                  Select Wall Finish
                </span>
                <span className="text-[11px] text-white/50">{textureOptions.length} Artisanal Finishes</span>
              </div>

              {/* Selectable Finish Cards */}
              <div className="space-y-2.5 mb-6">
                {textureOptions.map((opt) => {
                  const isSelected = selectedTexture.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedTexture(opt)}
                      className={`w-full text-left p-3 rounded-sm transition-all flex items-center gap-3.5 border ${
                        isSelected
                          ? 'border-[#C9A24B] bg-[#C9A24B]/10 shadow-[0_0_20px_rgba(201,162,75,0.15)]'
                          : 'border-white/10 bg-[#1A1A1A]/70 hover:border-white/25 hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-sm overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={opt.image}
                          alt={opt.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-serif text-sm font-bold truncate ${
                              isSelected ? 'text-[#C9A24B]' : 'text-[#F8F5EE]'
                            }`}
                          >
                            {opt.name}
                          </h4>
                          {isSelected && (
                            <span className="w-2 h-2 rotate-45 bg-[#C9A24B] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#F8F5EE]/60 truncate font-light">
                          {opt.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Finish Specifications */}
              <div className="p-4 bg-[#0B0B0B] border border-[#C9A24B]/25 rounded-sm mb-6 space-y-2 text-xs">
                <div>
                  <span className="text-[#C9A24B] font-semibold">Tonal Palette: </span>
                  <span className="text-[#F8F5EE]/80">{selectedTexture.tone}</span>
                </div>
                <div>
                  <span className="text-[#C9A24B] font-semibold">Light Interaction: </span>
                  <span className="text-[#F8F5EE]/80">{selectedTexture.lightProfile}</span>
                </div>
                <div>
                  <span className="text-[#C9A24B] font-semibold">Architectural Fit: </span>
                  <span className="text-[#F8F5EE]/80">{selectedTexture.recommendedFor}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action for Selected Texture */}
            <a
              href={`https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20tested%20the%20visualizer%20and%20loved%20the%20${encodeURIComponent(
                selectedTexture.name
              )}%20texture%20in%20${lightingMode}%20lighting.%20Please%20share%20site%20visit%20rates%20for%20Kerala.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs tracking-wider uppercase rounded-sm gold-glow transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire This Finish On WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
