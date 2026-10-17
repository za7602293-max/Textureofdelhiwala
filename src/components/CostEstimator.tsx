import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, MessageCircle, Calendar, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { GoldDivider, SectionKicker } from './GoldOrnament.tsx';

interface TextureTier {
  id: string;
  name: string;
  rateMin: number;
  rateMax: number;
  durationPer100SqFt: number; // in days
}

const textureTiers: TextureTier[] = [
  { id: 'cemento', name: 'Cemento Micro-Concrete', rateMin: 140, rateMax: 180, durationPer100SqFt: 1 },
  { id: 'italian', name: 'Italian Stucco / Marmorino', rateMin: 210, rateMax: 280, durationPer100SqFt: 1.5 },
  { id: 'royal3d', name: '3D Royal Sculptural Relief', rateMin: 280, rateMax: 380, durationPer100SqFt: 2 },
  { id: 'metallic', name: 'Metallic Velvet & Gold Leaf', rateMin: 190, rateMax: 260, durationPer100SqFt: 1.2 },
];

const keralaDistricts = [
  'Wayanad (Mananthavady / Bathery / Kalpetta)',
  'Kozhikode (Calicut)',
  'Kannur & Thalassery',
  'Malappuram & Manjeri',
  'Ernakulam & Kochi',
  'Thrissur',
  'Palakkad',
  'Kottayam',
  'Thiruvananthapuram',
  'Kasaragod',
  'Alappuzha',
  'Other Kerala Location',
];

export const CostEstimator: React.FC = () => {
  const [areaSqFt, setAreaSqFt] = useState<number>(240);
  const [selectedTierId, setSelectedTierId] = useState<string>('italian');
  const [district, setDistrict] = useState<string>('Wayanad (Mananthavady / Bathery / Kalpetta)');
  const [wallCount, setWallCount] = useState<number>(1);
  const [moisturePrimer, setMoisturePrimer] = useState<boolean>(true);

  const currentTier = textureTiers.find((t) => t.id === selectedTierId) || textureTiers[1];

  // Calculations
  const primerCostPerSqFt = moisturePrimer ? 25 : 0;
  const minCost = Math.round(areaSqFt * (currentTier.rateMin + primerCostPerSqFt));
  const maxCost = Math.round(areaSqFt * (currentTier.rateMax + primerCostPerSqFt));
  const estimatedDays = Math.max(2, Math.ceil((areaSqFt / 100) * currentTier.durationPer100SqFt));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const whatsappInquiryUrl = `https://wa.me/919656874312?text=${encodeURIComponent(
    `Hello Muhammad Arif, I used your Kerala Texture Calculator:\n\n• Texture: ${currentTier.name}\n• Approx Area: ${areaSqFt} sq ft (${wallCount} wall/s)\n• Location: ${district}\n• Kerala Monsoon Primer: ${moisturePrimer ? 'Yes (Included)' : 'Standard'}\n• Estimated Range: ${formatCurrency(minCost)} - ${formatCurrency(maxCost)}\n\nPlease let me know when you can visit the site for laser measurement.`
  )}`;

  return (
    <section id="calculator" className="relative py-24 sm:py-32 bg-[#0E0E0E] text-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker>TRANSPARENT KERALA PRICING</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4"
          >
            Instant Wall <span className="gold-gradient-text">Cost Estimator</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-[#F8F5EE]/75 font-light max-w-2xl mx-auto leading-relaxed">
            Select your wall area and preferred finish to estimate bespoke execution across Wayanad, Calicut, Kochi, or any Kerala location.
          </p>
          <GoldDivider className="mt-2" />
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#141414] border border-[#C9A24B]/30 p-6 sm:p-8 rounded-sm">
            {/* 1. Texture Type Selector */}
            <div className="mb-8">
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#C9A24B] mb-3">
                1. Select Desired Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {textureTiers.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`text-left p-3.5 rounded-sm border transition-all ${
                        isSelected
                          ? 'border-[#C9A24B] bg-[#C9A24B]/15 text-[#FFF1CA] shadow-[0_0_15px_rgba(201,162,75,0.2)]'
                          : 'border-white/10 bg-[#1A1A1A] text-white/70 hover:border-white/30'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm leading-tight mb-1">
                        {tier.name}
                      </div>
                      <div className="text-[11px] text-[#C9A24B] font-mono tabular-nums">
                        ₹{tier.rateMin} – ₹{tier.rateMax} / sq.ft
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Wall Area Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-[#C9A24B]">
                  2. Approximate Wall Area
                </label>
                <div className="font-mono text-base font-bold text-[#FFF1CA] tabular-nums bg-[#0B0B0B] px-3 py-1 border border-[#C9A24B]/30 rounded-sm">
                  {areaSqFt} <span className="text-xs text-[#C9A24B]">sq.ft</span>
                </div>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="10"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#C9A24B]"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-mono">
                <span>50 sq.ft (Niche/Accent)</span>
                <span>500 sq.ft (Hallway)</span>
                <span>1500+ sq.ft (Full Villa)</span>
              </div>
            </div>

            {/* 3. Number of Walls & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#C9A24B] mb-2">
                  3. Number of Walls
                </label>
                <select
                  value={wallCount}
                  onChange={(e) => setWallCount(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-white/10 text-white/90 text-xs rounded-sm p-3 focus:outline-none focus:border-[#C9A24B]"
                >
                  <option value={1}>1 Primary Accent Wall</option>
                  <option value={2}>2 Walls (Living / Dining)</option>
                  <option value={3}>3 Walls</option>
                  <option value={4}>4+ Walls (Full Suite)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#C9A24B] mb-2">
                  4. Kerala District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 text-white/90 text-xs rounded-sm p-3 focus:outline-none focus:border-[#C9A24B]"
                >
                  {keralaDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Kerala Monsoon Primer Checkbox */}
            <div className="p-3.5 bg-[#0B0B0B] border border-white/10 rounded-sm flex items-start gap-3">
              <input
                type="checkbox"
                id="monsoonPrimer"
                checked={moisturePrimer}
                onChange={(e) => setMoisturePrimer(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#C9A24B] cursor-pointer rounded"
              />
              <label htmlFor="monsoonPrimer" className="text-xs text-white/80 cursor-pointer">
                <span className="font-semibold text-[#FFF1CA]">
                  Include Hydrophobic Kerala Monsoon Barrier Primer (+₹25/sq.ft)
                </span>
                <p className="text-[11px] text-white/50 font-light mt-0.5">
                  Recommended for Wayanad hills and coastal areas to prevent efflorescence and dampness.
                </p>
              </label>
            </div>
          </div>

          {/* Estimate Summary & Direct WhatsApp Booking (5 cols) */}
          <div className="lg:col-span-5 bg-[#141414] border-2 border-[#C9A24B]/40 p-5 sm:p-8 rounded-sm flex flex-col justify-between shadow-[0_0_30px_rgba(201,162,75,0.08)]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-[#C9A24B]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F5EE]">
                  Estimated Investment
                </h3>
              </div>

              <div className="py-5 sm:py-6 border-y border-[#C9A24B]/20 mb-6">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#C9A24B] font-semibold mb-1">
                  Estimated Total (Labor & Materials)
                </div>
                <div className="font-mono text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-[#FFF1CA] tabular-nums mb-1">
                  {formatCurrency(minCost)} <span className="text-lg sm:text-xl font-normal text-white/50">–</span> {formatCurrency(maxCost)}
                </div>
                <div className="text-[11px] sm:text-xs text-white/60 font-light">
                  Inclusive of surface prep, imported texture putty, trowel artistry & protective coat.
                </div>
              </div>

              {/* Specification Breakdown */}
              <div className="space-y-3 mb-6 text-xs text-white/80">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/60">Selected Texture:</span>
                  <span className="font-semibold text-[#C9A24B]">{currentTier.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/60">Coverage Area:</span>
                  <span className="font-mono">{areaSqFt} sq.ft ({wallCount} wall/s)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/60">Estimated Duration:</span>
                  <span className="font-mono text-[#FFF1CA]">{estimatedDays} Working Days</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/60">Coverage Zone:</span>
                  <span className="truncate max-w-[200px] text-right">{district.split('(')[0]}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 mb-8 text-[11px] text-[#C9A24B]/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                  <span>Free on-site sample swatch inspection in Kerala</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                  <span>Exact quotation with laser measurement before start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                  <span>10-Year non-peel warranty on finished texture</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm gold-glow transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-[#0B0B0B]" />
                <span>Get Exact Quote on WhatsApp</span>
              </a>

              <a
                href="tel:9656874312"
                className="w-full py-3 px-4 border border-[#C9A24B]/50 hover:border-[#C9A24B] text-[#C9A24B] font-semibold text-xs tracking-wider uppercase rounded-sm gold-outline-glow transition-all flex items-center justify-center gap-2"
              >
                <span>Call Arif Directly: 9656874312</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
