import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Phone, CheckCircle2, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { TextureService } from './ServicesSection.tsx';

interface TextureModalProps {
  service: TextureService | null;
  onClose: () => void;
}

export const TextureModal: React.FC<TextureModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl w-full max-h-[92vh] bg-[#141414] border-2 border-[#C9A24B]/50 rounded-sm overflow-hidden flex flex-col shadow-2xl my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close specifications dialog"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-[#0B0B0B]/80 border border-[#C9A24B]/40 text-[#C9A24B] rounded-sm hover:bg-[#C9A24B] hover:text-[#0B0B0B] transition-colors shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-48 sm:h-64 w-full bg-[#0B0B0B] overflow-hidden shrink-0">
            <img
              src={service.image}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 right-12">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#C9A24B] block mb-0.5 sm:mb-1">
                {service.category}
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#F8F5EE] leading-tight">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            <p className="text-sm text-white/85 font-light leading-relaxed">
              {service.description}
            </p>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#0B0B0B] border border-[#C9A24B]/20 rounded-sm text-xs">
              {service.location && (
                <div>
                  <span className="text-white/50 block">Site Location:</span>
                  <span className="font-semibold text-[#FFF1CA]">{service.location}</span>
                </div>
              )}
              {service.timeline && (
                <div>
                  <span className="text-white/50 block">Execution Timeline:</span>
                  <span className="font-semibold text-[#C9A24B]">{service.timeline}</span>
                </div>
              )}
              <div>
                <span className="text-white/50 block">Finish Type:</span>
                <span className="font-semibold text-[#FFF1CA]">{service.finishType}</span>
              </div>
              <div>
                <span className="text-white/50 block">Sheen Level:</span>
                <span className="font-semibold text-[#FFF1CA]">{service.sheen}</span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-white/5">
                <span className="text-white/50 block">Ideal Applications:</span>
                <span className="font-semibold text-[#C9A24B]">{service.idealFor}</span>
              </div>
            </div>

            {/* Feature List */}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A24B] block mb-3">
                Key Performance Attributes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                  service.title
                )}%20texture%20for%20my%20property%20in%20Kerala.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm gold-glow flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href="tel:9656874312"
                className="flex-1 py-3 px-4 border border-[#C9A24B] hover:bg-[#C9A24B]/10 text-[#C9A24B] font-bold text-xs uppercase tracking-wider rounded-sm gold-outline-glow flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call 9656874312</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
