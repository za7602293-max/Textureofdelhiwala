import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionKicker } from './GoldOrnament.tsx';

interface GoogleReviewItem {
  id: string;
  name: string;
  initial: string;
  avatarBg?: string;
  review: string;
  badge: string;
  relativeTime: string;
}

const googleReviewsList: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Shahzad Abbasi',
    initial: 'S',
    avatarBg: '#5B8C5A',
    review: 'Value for money, good job, saves time. My double-storey building was completed in only 97 days, with paint, POP and decoration.',
    badge: '3 reviews',
    relativeTime: 'Google Review',
  },
  {
    id: 'rev-2',
    name: 'Aysha Malik',
    initial: 'A',
    avatarBg: '#0288D1',
    review: "Best work. I'm very happy to have joined this site. Best construction work, thanks. Nazma Interior Designer.",
    badge: 'Interior Designer',
    relativeTime: 'Google Review',
  },
  {
    id: 'rev-3',
    name: 'Mohammad Sadiq',
    initial: 'M',
    avatarBg: '#E65100',
    review: 'Value for money. Saves your valuable time, with material and work, all construction. All work is best.',
    badge: 'Local Guide · 8 reviews',
    relativeTime: 'Google Review',
  },
  {
    id: 'rev-4',
    name: 'Tabish Khan',
    initial: 'T',
    avatarBg: '#7B1FA2',
    review: 'Good work. With materials, saves money and time.',
    badge: '3 reviews',
    relativeTime: 'Google Review',
  },
  {
    id: 'rev-5',
    name: 'MOHD Istakhar',
    initial: 'M',
    avatarBg: '#C2185B',
    review: 'Good job. Saves money and time.',
    badge: 'Verified Client',
    relativeTime: 'Google Review',
  },
  {
    id: 'rev-6',
    name: 'Ahsan Malik',
    initial: 'A',
    avatarBg: '#00796B',
    review: 'Nice construction site, as per the location.',
    badge: '4 reviews',
    relativeTime: 'Google Review',
  },
];

// Animated Counter Component
const CountUpStat: React.FC<{
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
  prefix?: string;
}> = ({ target, suffix = '', decimals = 0, label, prefix = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easedProgress * target;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center p-3.5 sm:p-6 bg-[#141414] border border-[#C9A24B]/25 rounded-sm">
      <div className="font-mono text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1CA] tabular-nums mb-1 tracking-tight flex items-baseline justify-center">
        <span>
          {prefix}
          {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        </span>
        {suffix && (
          <span className="text-[#C9A24B] text-xs min-[400px]:text-sm sm:text-base lg:text-xl font-medium ml-1">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-[10px] min-[400px]:text-xs sm:text-sm text-[#F8F5EE]/80 uppercase tracking-wider font-medium truncate">
        {label}
      </div>
    </div>
  );
};

export const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: '0px' });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const totalReviews = googleReviewsList.length;

  // Track active card index on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    if (scrollWidth <= clientWidth) return;
    const maxScroll = scrollWidth - clientWidth;
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    const index = Math.round(progress * (totalReviews - 1));
    setActiveIndex(index);
  };

  // Scroll carousel container HORIZONTALLY only — NEVER scroll the page/window!
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      const targetScrollLeft = card.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  // Step next/prev with smooth wrapping
  const handlePrev = () => {
    if (!carouselRef.current) return;
    const nextIdx = activeIndex === 0 ? totalReviews - 1 : activeIndex - 1;
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    if (!carouselRef.current) return;
    const nextIdx = (activeIndex + 1) % totalReviews;
    scrollToIndex(nextIdx);
  };

  // Auto-scroll every 4.5 seconds ONLY when Reviews section is actually visible on screen
  useEffect(() => {
    if (isPaused || !isSectionInView) return;
    const timer = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      // If at end, scroll back to 0
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveIndex(0);
      } else {
        const nextIdx = (activeIndex + 1) % totalReviews;
        scrollToIndex(nextIdx);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, isSectionInView, activeIndex, totalReviews]);

  // Mouse Drag Support for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-24 sm:py-32 bg-[#0B0B0B] text-[#F8F5EE] border-t border-[#C9A24B]/20 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C9A24B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionKicker>TESTIMONIALS</SectionKicker>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4">
            Loved By <span className="gold-gradient-text">Our Clients</span>
          </h2>

          {/* Gold ornamental divider that draws in on scroll */}
          <div className="flex items-center justify-center gap-3 py-2 max-w-md mx-auto">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B] to-[#C9A24B] origin-right"
            />
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
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A24B] to-[#C9A24B] origin-left"
            />
          </div>
        </div>

        {/* RATING SUMMARY (Centered above cards) */}
        <div className="flex flex-col items-center justify-center gap-4 mb-14 text-center">
          {/* Five Large Gold Stars with Staggered Fill */}
          <div className="flex items-center gap-1.5 text-[#C9A24B]">
            {[0, 1, 2, 3, 4].map((starIndex) => (
              <motion.div
                key={starIndex}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: starIndex * 0.1 }}
              >
                <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-[#C9A24B] stroke-none drop-shadow-[0_0_8px_rgba(201,162,75,0.7)]" />
              </motion.div>
            ))}
          </div>

          <div className="text-base sm:text-lg font-bold tracking-wide text-[#F8F5EE]">
            5 Star Rated on Google
          </div>

          {/* Gold Outline Button: See All Reviews on Google */}
          <a
            href="https://www.google.com/maps/search/Texture+of+Delhi+wala+Mananthavady+Wayanad+Kerala/@11.8028,76.0029,14z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C9A24B] text-[#C9A24B] hover:text-[#FFF1CA] hover:border-[#FFF1CA] rounded-full text-xs font-semibold tracking-wider uppercase gold-outline-glow transition-all"
          >
            <span>See All Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* REVIEW CARDS CAROUSEL */}
        <div className="relative">
          {/* Carousel Navigation Controls (Left/Right Chevrons) */}
          <div className="flex items-center justify-between sm:justify-end gap-3 mb-4 sm:mb-6">
            <span className="text-xs text-[#C9A24B]/70 sm:hidden">Swipe or use arrows</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Review"
                className="p-2.5 rounded-sm border border-[#C9A24B]/40 hover:border-[#C9A24B] bg-[#141414] text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B0B0B] transition-all active:scale-95 shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Review"
                className="p-2.5 rounded-sm border border-[#C9A24B]/40 hover:border-[#C9A24B] bg-[#141414] text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B0B0B] transition-all active:scale-95 shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Track (Native Smooth Horizontal Scroll with Snap - NEVER disappears!) */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {googleReviewsList.map((review) => (
              <div
                key={review.id}
                className="group relative bg-[#141414] border border-[#C9A24B]/35 hover:border-[#C9A24B] rounded-sm p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(201,162,75,0.35)] shrink-0 select-none snap-start w-[85vw] max-w-[340px] sm:w-[calc((100%-1.5rem)/2)] sm:max-w-none lg:w-[calc((100%-3rem)/3)]"
              >
                {/* Large Faded Gold Quote Mark */}
                <Quote className="absolute top-4 right-4 w-10 h-10 text-[#C9A24B]/15 group-hover:text-[#C9A24B]/25 transition-colors pointer-events-none" />

                <div>
                  {/* Five Gold Stars */}
                  <div className="flex items-center gap-1 text-[#C9A24B] mb-4">
                    {[0, 1, 2, 3, 4].map((starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-[#C9A24B] stroke-none" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-[#F8F5EE]/90 font-light leading-relaxed mb-6 italic">
                    "{review.review}"
                  </p>
                </div>

                {/* Below Review: Gold Circle with Initial, Name & Google Review Label */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  {/* Reviewer Initial Gold / Color Circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white border border-[#C9A24B]/60 shadow-md shrink-0"
                    style={{ backgroundColor: review.avatarBg || '#C9A24B' }}
                  >
                    {review.initial}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors truncate">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#C9A24B]/80 font-medium">
                      <span className="font-semibold text-white/60">Google Review</span>
                      <span>·</span>
                      <span className="text-white/40 truncate">{review.badge}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gold Dot Indicators Below */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {googleReviewsList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to review ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === dotIdx
                    ? 'w-7 bg-[#C9A24B] shadow-[0_0_10px_rgba(201,162,75,0.85)]'
                    : 'w-2 bg-[#C9A24B]/30 hover:bg-[#C9A24B]/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* COUNTER STRIP BELOW CAROUSEL (4 stats counting up when scrolled into view) */}
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <CountUpStat
              target={5.0}
              decimals={1}
              suffix=""
              label="Google Rating"
            />
            <CountUpStat
              target={14}
              suffix=" Districts"
              label="All Kerala Service"
            />
            <CountUpStat
              target={97}
              suffix=" Days"
              label="Full Building Finish"
            />
            <CountUpStat
              target={10}
              suffix="+"
              label="Premium Services"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
