import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0B0B0B]/95 backdrop-blur-md border-t border-[#C9A24B]/35 px-3 sm:px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 sm:gap-2.5 max-w-md mx-auto">
        <a
          href="tel:9656874312"
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 bg-[#C9A24B] active:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs tracking-wider uppercase rounded-sm gold-glow whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden min-[360px]:inline">Call: 9656874312</span>
          <span className="min-[360px]:hidden">Call Now</span>
        </a>

        <a
          href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20wall%20texture%20finishes%20for%20my%20property%20in%20Kerala."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 border border-[#C9A24B] active:bg-[#C9A24B]/20 text-[#C9A24B] font-bold text-xs tracking-wider uppercase rounded-sm gold-outline-glow whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
