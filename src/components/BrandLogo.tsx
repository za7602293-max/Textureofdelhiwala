import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'horizontal' | 'badge';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  variant = 'horizontal',
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Circular Emblem: Textures of Delhi Wala */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-full group cursor-pointer"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(201,162,75,0.4)] transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Royal Gold Gradients */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2CC" />
              <stop offset="25%" stopColor="#DFC077" />
              <stop offset="50%" stopColor="#C9A24B" />
              <stop offset="75%" stopColor="#E5C378" />
              <stop offset="100%" stopColor="#8A6724" />
            </linearGradient>

            <linearGradient id="goldRoller" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A6724" />
              <stop offset="30%" stopColor="#E5C378" />
              <stop offset="60%" stopColor="#FFF2CC" />
              <stop offset="100%" stopColor="#8A6724" />
            </linearGradient>

            {/* Circular Text Paths */}
            {/* Top Arc for "TEXTURES OF DELHI WALA" */}
            <path
              id="topTextArc"
              d="M 32,120 A 88,88 0 1,1 208,120"
              fill="none"
            />
            {/* Bottom Arc for "INTERIOR WALL TEXTURES" */}
            <path
              id="bottomTextArc"
              d="M 205,120 A 85,85 0 0,1 35,120"
              fill="none"
            />
          </defs>

          {/* Background Medallion Disc */}
          <circle cx="120" cy="120" r="114" fill="#FAF7EE" />
          <circle cx="120" cy="120" r="114" stroke="url(#goldGrad)" strokeWidth="1.5" />

          {/* Outer Ornamental Ring */}
          <circle cx="120" cy="120" r="110" stroke="url(#goldGrad)" strokeWidth="2" />
          <circle cx="120" cy="120" r="105" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="2.5 2" />

          {/* Inner Frame Ring */}
          <circle cx="120" cy="120" r="76" stroke="url(#goldGrad)" strokeWidth="1.2" />

          {/* TOP ARC TEXT: "TEXTURES OF DELHI WALA" */}
          <text
            fill="#8A6724"
            className="font-serif font-bold tracking-[0.2em]"
            style={{
              fontSize: '15.5px',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              letterSpacing: '0.18em',
            }}
          >
            <textPath
              href="#topTextArc"
              startOffset="50%"
              textAnchor="middle"
              fill="url(#goldGrad)"
              stroke="#5A4010"
              strokeWidth="0.3"
            >
              TEXTURES OF DELHI WALA
            </textPath>
          </text>

          {/* BOTTOM ARC TEXT: "INTERIOR WALL TEXTURES" */}
          <text
            style={{
              fontSize: '10px',
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: '0.22em',
              fontWeight: 600,
            }}
          >
            <textPath
              href="#bottomTextArc"
              startOffset="50%"
              textAnchor="middle"
              fill="#5A4010"
            >
              INTERIOR WALL TEXTURES
            </textPath>
          </text>

          {/* Left Laurel Branch */}
          <g transform="translate(32, 140) rotate(-22)" stroke="url(#goldGrad)" strokeWidth="1" fill="none">
            <path d="M 0,0 C 5,10 8,24 8,36" />
            <path d="M 1,4 C -4,2 -6,7 -2,9 C 2,11 3,7 1,4 Z" fill="url(#goldGrad)" />
            <path d="M 3,12 C -2,11 -4,16 0,18 C 3,19 5,15 3,12 Z" fill="url(#goldGrad)" />
            <path d="M 5,20 C 0,20 -1,25 3,27 C 6,28 7,24 5,20 Z" fill="url(#goldGrad)" />
            <path d="M 7,28 C 3,29 3,34 7,35 C 10,35 10,31 7,28 Z" fill="url(#goldGrad)" />
            {/* Right side leaves of left branch */}
            <path d="M 2,7 C 6,4 9,8 6,11 C 3,13 1,10 2,7 Z" fill="url(#goldGrad)" />
            <path d="M 4,15 C 8,13 10,17 8,20 C 5,21 3,18 4,15 Z" fill="url(#goldGrad)" />
            <path d="M 6,23 C 10,22 11,26 9,29 C 7,30 5,26 6,23 Z" fill="url(#goldGrad)" />
          </g>

          {/* Right Laurel Branch */}
          <g transform="translate(208, 140) scale(-1, 1) rotate(-22)" stroke="url(#goldGrad)" strokeWidth="1" fill="none">
            <path d="M 0,0 C 5,10 8,24 8,36" />
            <path d="M 1,4 C -4,2 -6,7 -2,9 C 2,11 3,7 1,4 Z" fill="url(#goldGrad)" />
            <path d="M 3,12 C -2,11 -4,16 0,18 C 3,19 5,15 3,12 Z" fill="url(#goldGrad)" />
            <path d="M 5,20 C 0,20 -1,25 3,27 C 6,28 7,24 5,20 Z" fill="url(#goldGrad)" />
            <path d="M 7,28 C 3,29 3,34 7,35 C 10,35 10,31 7,28 Z" fill="url(#goldGrad)" />
            {/* Inner leaves */}
            <path d="M 2,7 C 6,4 9,8 6,11 C 3,13 1,10 2,7 Z" fill="url(#goldGrad)" />
            <path d="M 4,15 C 8,13 10,17 8,20 C 5,21 3,18 4,15 Z" fill="url(#goldGrad)" />
            <path d="M 6,23 C 10,22 11,26 9,29 C 7,30 5,26 6,23 Z" fill="url(#goldGrad)" />
          </g>

          {/* ============================================================== */}
          {/* CENTER MONUMENT: QUTUB MINAR WITH SPLIT BLACK & GOLD CONTRAST */}
          {/* ============================================================== */}
          <g id="qutubMinar">
            {/* Base / Tier 1 */}
            {/* Left Half (Black) */}
            <polygon points="106,165 120,165 120,132 109,132" fill="#0B0B0B" />
            <line x1="107" y1="148" x2="120" y2="148" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            <line x1="108" y1="157" x2="120" y2="157" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            {/* Left Balcony 1 */}
            <rect x="108" y="130" width="12" height="2.5" fill="#0B0B0B" />
            <line x1="108" y1="131" x2="120" y2="131" stroke="#FFFFFF" strokeWidth="0.6" />

            {/* Right Half (Gold) */}
            <polygon points="120,165 134,165 131,132 120,132" fill="url(#goldGrad)" />
            <line x1="120" y1="148" x2="133" y2="148" stroke="#5A4010" strokeWidth="0.8" opacity="0.7" />
            <line x1="120" y1="157" x2="134" y2="157" stroke="#5A4010" strokeWidth="0.8" opacity="0.7" />
            {/* Right Balcony 1 */}
            <rect x="120" y="130" width="12" height="2.5" fill="url(#goldGrad)" stroke="#5A4010" strokeWidth="0.4" />

            {/* Tier 2 */}
            {/* Left Half (Black) */}
            <polygon points="110,130 120,130 120,102 112,102" fill="#0B0B0B" />
            <line x1="111" y1="116" x2="120" y2="116" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            {/* Left Balcony 2 */}
            <rect x="111" y="100" width="9" height="2.2" fill="#0B0B0B" />
            <line x1="111" y1="101" x2="120" y2="101" stroke="#FFFFFF" strokeWidth="0.6" />

            {/* Right Half (Gold) */}
            <polygon points="120,130 130,130 128,102 120,102" fill="url(#goldGrad)" />
            <line x1="120" y1="116" x2="129" y2="116" stroke="#5A4010" strokeWidth="0.8" opacity="0.7" />
            {/* Right Balcony 2 */}
            <rect x="120" y="100" width="9" height="2.2" fill="url(#goldGrad)" stroke="#5A4010" strokeWidth="0.4" />

            {/* Tier 3 */}
            {/* Left Half (Black) */}
            <polygon points="112.5,100 120,100 120,78 114.5,78" fill="#0B0B0B" />
            <line x1="113.5" y1="89" x2="120" y2="89" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            {/* Left Balcony 3 */}
            <rect x="113.5" y="76" width="6.5" height="2" fill="#0B0B0B" />

            {/* Right Half (Gold) */}
            <polygon points="120,100 127.5,100 125.5,78 120,78" fill="url(#goldGrad)" />
            <line x1="120" y1="89" x2="126.5" y2="89" stroke="#5A4010" strokeWidth="0.8" opacity="0.7" />
            {/* Right Balcony 3 */}
            <rect x="120" y="76" width="6.5" height="2" fill="url(#goldGrad)" stroke="#5A4010" strokeWidth="0.4" />

            {/* Tier 4 & Spire */}
            {/* Left Half (Black) */}
            <polygon points="115,76 120,76 120,60 117,60" fill="#0B0B0B" />
            <polygon points="117,60 120,60 120,53 118,53" fill="#0B0B0B" />
            <circle cx="119" cy="51" r="1.5" fill="#0B0B0B" />

            {/* Right Half (Gold) */}
            <polygon points="120,76 125,76 123,60 120,60" fill="url(#goldGrad)" />
            <polygon points="120,60 123,60 122,53 120,53" fill="url(#goldGrad)" />
            <circle cx="121" cy="51" r="1.5" fill="url(#goldGrad)" />

            {/* Central Vertical Division Line */}
            <line x1="120" y1="50" x2="120" y2="165" stroke="#C9A24B" strokeWidth="0.6" />
          </g>

          {/* ============================================================== */}
          {/* PAINT ROLLER: HORIZONTAL CYLINDER WITH LEFT VERTICAL HANDLE   */}
          {/* ============================================================== */}
          <g id="paintRoller" transform="translate(0, 5)">
            {/* Roller Metal Wire Rod (Curving from right side, under, to handle) */}
            <path
              d="M 148,168 L 152,168 A 3,3 0 0,1 155,171 L 155,178 A 3,3 0 0,1 152,181 L 97,181 A 3,3 0 0,1 94,178 L 94,152"
              stroke="url(#goldGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Roller Cylinder Barrel */}
            <rect
              x="97"
              y="163"
              width="50"
              height="18"
              rx="5"
              fill="url(#goldRoller)"
              stroke="#5A4010"
              strokeWidth="1.2"
              className="drop-shadow-sm"
            />
            {/* Roller End Caps */}
            <rect x="96" y="165" width="2" height="14" rx="1" fill="#4A3408" />
            <rect x="146" y="165" width="2" height="14" rx="1" fill="#4A3408" />

            {/* Roller Fine Tactile Knurled Stippling Lines */}
            <line x1="102" y1="166" x2="142" y2="166" stroke="#FFF2CC" strokeWidth="0.8" opacity="0.7" />
            <line x1="100" y1="172" x2="144" y2="172" stroke="#FFF2CC" strokeWidth="1.2" opacity="0.9" />
            <line x1="102" y1="178" x2="142" y2="178" stroke="#8A6724" strokeWidth="0.8" opacity="0.5" />

            {/* Roller Handle Neck Flange */}
            <path d="M 88,152 L 100,152 L 97,149 L 91,149 Z" fill="url(#goldGrad)" stroke="#5A4010" strokeWidth="0.8" />

            {/* Roller Vertical Grip Handle on the Left */}
            <rect
              x="89"
              y="118"
              width="10"
              height="31"
              rx="2.5"
              fill="url(#goldGrad)"
              stroke="#5A4010"
              strokeWidth="1"
            />
            {/* Grip Ergonomic Texture Ridges */}
            <line x1="91" y1="126" x2="97" y2="126" stroke="#5A4010" strokeWidth="1" />
            <line x1="91" y1="131" x2="97" y2="131" stroke="#5A4010" strokeWidth="1" />
            <line x1="91" y1="136" x2="97" y2="136" stroke="#5A4010" strokeWidth="1" />
            <line x1="91" y1="141" x2="97" y2="141" stroke="#5A4010" strokeWidth="1" />
            {/* Handle hanging hole at top */}
            <circle cx="94" cy="122" r="1.5" fill="#FAF7EE" stroke="#5A4010" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <span className="font-serif text-sm min-[380px]:text-base sm:text-lg font-bold tracking-tight text-[#F8F5EE] leading-none group-hover:text-[#C9A24B] transition-colors truncate">
            Texture of <span className="gold-gradient-text">Delhi Wala</span>
          </span>
          <span className="hidden min-[360px]:block text-[8px] min-[380px]:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] text-[#C9A24B]/80 uppercase mt-0.5 font-medium truncate">
            Royal Wall Art · Wayanad
          </span>
        </div>
      )}
    </div>
  );
};
