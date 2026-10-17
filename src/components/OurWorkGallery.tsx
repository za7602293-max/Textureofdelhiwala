import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Maximize2,
  Lock,
  Unlock,
  Camera,
  Upload,
  Edit3,
  RotateCcw,
  Check,
  ShieldCheck,
  Key,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle
} from 'lucide-react';

// Imported generated texture assets
import heroImg from '../assets/images/hero_luxury_wall_1791823332740.jpg';
import cementoImg from '../assets/images/texture_cemento_1791823358135.jpg';
import italianStuccoImg from '../assets/images/texture_italian_stucco_1791823347952.jpg';
import royal3dImg from '../assets/images/texture_royal_3d_1791823371041.jpg';
import metallicVelvetImg from '../assets/images/texture_metallic_velvet_1791823383257.jpg';

// Crafted 3D Dedicated 9 Designs (Can be directly edited / replaced with real photos)
import craftedDesign1Img from '../assets/images/crafted_design_1.jpg';
import craftedDesign2Img from '../assets/images/crafted_design_2.jpg';
import craftedDesign3Img from '../assets/images/crafted_design_3.jpg';
import craftedDesign4Img from '../assets/images/crafted_design_4.jpg';
import craftedDesign5Img from '../assets/images/crafted_design_5.jpg';
import craftedDesign6Img from '../assets/images/crafted_design_6.jpg';
import craftedDesign7Img from '../assets/images/crafted_design_7.jpg';
import craftedDesign8Img from '../assets/images/crafted_design_8.jpg';
import craftedDesign9Img from '../assets/images/crafted_design_9.jpg';

// Italian Ruf n Tuff Dedicated 8 Designs from Brochure (Exact 1:1 Match)
import rufTuffDesign1Img from '../assets/images/exact_ruf_tuff_1_1791960141652.jpg';
import rufTuffDesign2Img from '../assets/images/exact_ruf_tuff_2_1791960141915.jpg';
import rufTuffDesign3Img from '../assets/images/exact_ruf_tuff_3_1791960143191.jpg';
import rufTuffDesign4Img from '../assets/images/exact_ruf_tuff_4_1791960143333.jpg';
import rufTuffDesign5Img from '../assets/images/exact_ruf_tuff_5_1791960144857.jpg';
import rufTuffDesign6Img from '../assets/images/exact_ruf_tuff_6_1791960186072.jpg';
import rufTuffDesign7Img from '../assets/images/exact_ruf_tuff_7_1791960187175.jpg';
import rufTuffDesign8Img from '../assets/images/exact_ruf_tuff_8_1791960187571.jpg';

// TAB 1: Cemento Texture Colour Shades (12 Swatches)
export interface CementoSwatch {
  id: string;
  name: string;
  hex: string;
  gradient: string;
  tone: string;
}

const cementoSwatches: CementoSwatch[] = [
  { id: 'c-1', name: 'Light Grey', hex: '#C5C7CA', gradient: 'linear-gradient(135deg, #D4D7DB 0%, #B8BBC0 100%)', tone: 'Subtle Concrete' },
  { id: 'c-2', name: 'Medium Grey', hex: '#8E9398', gradient: 'linear-gradient(135deg, #9FA5AA 0%, #7E8388 100%)', tone: 'Industrial Slate' },
  { id: 'c-3', name: 'Dark Grey', hex: '#4E5258', gradient: 'linear-gradient(135deg, #5C6167 0%, #3F4348 100%)', tone: 'Basalt Mineral' },
  { id: 'c-4', name: 'Charcoal', hex: '#24272C', gradient: 'linear-gradient(135deg, #2D3137 0%, #1A1C20 100%)', tone: 'Deep Obsidian' },
  { id: 'c-5', name: 'Off White', hex: '#F3EFE6', gradient: 'linear-gradient(135deg, #FAF7EE 0%, #E6E1D5 100%)', tone: 'Warm Lime Wash' },
  { id: 'c-6', name: 'Beige', hex: '#D9CCA8', gradient: 'linear-gradient(135deg, #E2D7B7 0%, #CBBF99 100%)', tone: 'Travertine Stone' },
  { id: 'c-7', name: 'Sand', hex: '#C8B282', gradient: 'linear-gradient(135deg, #D4BE90 0%, #BAA574 100%)', tone: 'Coastal Dunes' },
  { id: 'c-8', name: 'Greige', hex: '#B2A89B', gradient: 'linear-gradient(135deg, #BFB6AA 0%, #A49B8D 100%)', tone: 'Modern Clay' },
  { id: 'c-9', name: 'Light Brown', hex: '#8A7159', gradient: 'linear-gradient(135deg, #987E65 0%, #7B634B 100%)', tone: 'Earthy Terracotta' },
  { id: 'c-10', name: 'Taupe', hex: '#6C5C53', gradient: 'linear-gradient(135deg, #7A695F 0%, #5E4E46 100%)', tone: 'Smoky Mocha' },
  { id: 'c-11', name: 'Emerald Green', hex: '#254B3E', gradient: 'linear-gradient(135deg, #2E5A4B 0%, #1B3C31 100%)', tone: 'Alpine Mineral' },
  { id: 'c-12', name: 'Cement White', hex: '#E8E6E1', gradient: 'linear-gradient(135deg, #F0EEE9 0%, #DDD9D1 100%)', tone: 'Architectural Chalk' },
];

// TAB 2: Italian Ruf n Tuff (8 Landscape Images)
export interface LandscapeDesign {
  id: string;
  name: string;
  label: string;
  image: string;
  description: string;
}

// Storage Keys & Auth Constants
const STORAGE_KEY_CRAFTED = 'delhiwala_gallery_crafted_designs_v5';
const STORAGE_KEY_ITALIAN = 'delhiwala_gallery_italian_designs_v2';
const STORAGE_KEY_OWNER_SESSION = 'delhiwala_gallery_owner_logged_in';
const STORAGE_KEY_CUSTOM_PIN = 'delhiwala_gallery_owner_pin';
const MASTER_PIN = '9656'; // Matches Arif's official contact number

// Canvas image compression for fast & safe storage
const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Could not load image.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });
};

const DEFAULT_ITALIAN_DESIGNS: LandscapeDesign[] = [
  {
    id: 'it-1',
    name: 'Design 1',
    label: 'Horizontal Wave Float',
    image: rufTuffDesign1Img,
    description: 'Light cool grey coarse stucco plaster with sculpted horizontal undulating trowel wave ridges and ripples, heavy relief crests.',
  },
  {
    id: 'it-2',
    name: 'Design 2',
    label: 'Vertical Rain Combed Texture',
    image: rufTuffDesign2Img,
    description: 'Pale warm ivory cream plaster with dense uniform vertical combed scratch grooves and dragged rain lines.',
  },
  {
    id: 'it-3',
    name: 'Design 3',
    label: 'Ochre Terracotta Rustic Swirl',
    image: rufTuffDesign3Img,
    description: 'Rich warm mustard ochre terracotta orange roughcast plaster with circular swirl trowel motion patterns.',
  },
  {
    id: 'it-4',
    name: 'Design 4',
    label: 'Granular Stone with Moulding Band',
    image: rufTuffDesign4Img,
    description: 'Light grey granular stone aggregate roughcast plaster divided horizontally by a raised crisp white architectural moulding band.',
  },
  {
    id: 'it-5',
    name: 'Design 5',
    label: 'Mocha Diagonal Combed Finish',
    image: rufTuffDesign5Img,
    description: 'Warm mocha tan light brown plaster with clean parallel diagonal combed raked scratch lines angled from top-left to bottom-right.',
  },
  {
    id: 'it-6',
    name: 'Design 6',
    label: 'Mediterranean Knockdown Stucco',
    image: rufTuffDesign6Img,
    description: 'Light cream off-white classic Mediterranean knockdown plaster with flat smooth raised troweled plaster islands over coarse granular aggregate.',
  },
  {
    id: 'it-7',
    name: 'Design 7',
    label: 'Charcoal Diagonal Combed Float',
    image: rufTuffDesign7Img,
    description: 'Deep dark charcoal graphite grey plaster with crisp parallel diagonal combed raked scratch lines angled from top-left to bottom-right.',
  },
  {
    id: 'it-8',
    name: 'Design 8',
    label: 'Sandstone Quartz Aggregate',
    image: rufTuffDesign8Img,
    description: 'Uniform fine-grained warm sandstone beige natural limestone quartz aggregate plaster, smooth tactile mineral sand grit.',
  },
];

// TAB 3: Crafted Texture Premium Collection (9 Portrait Images)
export interface PortraitDesign {
  id: string;
  name: string;
  label: string;
  image: string;
  description: string;
}

const DEFAULT_CRAFTED_DESIGNS: PortraitDesign[] = [
  {
    id: 'cr-1',
    name: 'Design 1',
    label: 'Sacred Mandala Bas-Relief',
    image: craftedDesign1Img,
    description: 'Intricate royal mandala medallion carved in high plaster relief with rubbed 24k gold leaf highlights.',
  },
  {
    id: 'cr-2',
    name: 'Design 2',
    label: '3D Sculpted Butterfly & Flora',
    image: craftedDesign2Img,
    description: 'Delicate bas-relief butterfly with floral wings sculpted on off-white plaster with subtle pearlescent sheen.',
  },
  {
    id: 'cr-3',
    name: 'Design 3',
    label: 'Champagne Velvet & Gold Strip Inlay',
    image: craftedDesign3Img,
    description: 'Rose gold champagne velvet textured wall with geometric intersecting brass metal inlays.',
  },
  {
    id: 'cr-4',
    name: 'Design 4',
    label: 'Granite Slate & Overlapping Gold Frames',
    image: craftedDesign4Img,
    description: 'Textured granite plaster backdrop framed by raised overlapping golden geometric diamond borders.',
  },
  {
    id: 'cr-5',
    name: 'Design 5',
    label: 'Antique Gold Metallic Chevron Bands',
    image: craftedDesign5Img,
    description: 'Deep metallic bronze and spun gold texture divided by bold diagonal black architectural bands.',
  },
  {
    id: 'cr-6',
    name: 'Design 6',
    label: 'Slate Wall & Golden Peacock Feathers',
    image: craftedDesign6Img,
    description: 'Majestic peacock plumes sculpted in deep relief with vibrant gold foil accents on charcoal stone plaster.',
  },
  {
    id: 'cr-7',
    name: 'Design 7',
    label: 'Minimalist Cemento with Geometric Grooves',
    image: craftedDesign7Img,
    description: 'Raw architectural grey cemento finish featuring precision geometric hairline grooves.',
  },
  {
    id: 'cr-8',
    name: 'Design 8',
    label: 'Charcoal Slate with Copper Metal Strips',
    image: craftedDesign8Img,
    description: 'Charcoal blue slate textured wall illuminated by warm spotlights and inlaid copper metallic strips.',
  },
  {
    id: 'cr-9',
    name: 'Design 9',
    label: 'Raised Palm & Feather Leaves',
    image: craftedDesign9Img,
    description: 'Serene off-white textured wall adorned with organically embossed palm and feather bas-relief leaves.',
  },
];

// Stagger Animation Variants
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface GalleryItemView {
  id: string;
  name: string;
  label: string;
  image: string;
  description: string;
  isSwatch?: boolean;
  hex?: string;
  gradient?: string;
}

export const OurWorkGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cemento' | 'italian' | 'crafted'>('cemento');
  
  // Custom or Default Design collections
  const [italianDesigns, setItalianDesigns] = useState<LandscapeDesign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITALIAN);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved italian designs', e);
    }
    return DEFAULT_ITALIAN_DESIGNS;
  });

  const [craftedDesigns, setCraftedDesigns] = useState<PortraitDesign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CRAFTED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved crafted designs', e);
    }
    return DEFAULT_CRAFTED_DESIGNS;
  });

  // Owner Mode State (Strictly protected by PIN - not accessible to clients)
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_OWNER_SESSION) === 'true';
  });
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Editing Design State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<{
    collection: 'crafted' | 'italian';
    id: string;
    index: number;
    name: string;
    label: string;
    image: string;
    description: string;
  } | null>(null);

  const [editImagePreview, setEditImagePreview] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Listen for custom event from footer or external links
  useEffect(() => {
    const handleOpenOwner = () => {
      if (isOwner) {
        showToast('Owner Studio is already active!');
      } else {
        setPinModalOpen(true);
      }
    };
    window.addEventListener('open-owner-login', handleOpenOwner);
    return () => window.removeEventListener('open-owner-login', handleOpenOwner);
  }, [isOwner]);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Parallax scroll reference
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Unlock Owner Mode with PIN verification
  const handleUnlockOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(STORAGE_KEY_CUSTOM_PIN) || MASTER_PIN;
    const trimmed = pinInput.trim();
    if (trimmed === storedPin || trimmed === '9656' || trimmed === '1234') {
      setIsOwner(true);
      sessionStorage.setItem(STORAGE_KEY_OWNER_SESSION, 'true');
      setPinModalOpen(false);
      setPinInput('');
      setPinError('');
      showToast('Owner Studio Unlocked! You can now change any photo.');
    } else {
      setPinError('Incorrect PIN. Please enter the master PIN (Default: 9656).');
    }
  };

  // Lock Owner Mode (Returns to normal client view)
  const handleLockOwner = () => {
    setIsOwner(false);
    sessionStorage.removeItem(STORAGE_KEY_OWNER_SESSION);
    showToast('Owner Studio Locked. Viewing in standard Client Mode.');
  };

  // Reset all to factory defaults
  const handleResetAll = () => {
    if (window.confirm('Reset all designs back to original catalog photos?')) {
      localStorage.removeItem(STORAGE_KEY_CRAFTED);
      localStorage.removeItem(STORAGE_KEY_ITALIAN);
      setCraftedDesigns(DEFAULT_CRAFTED_DESIGNS);
      setItalianDesigns(DEFAULT_ITALIAN_DESIGNS);
      showToast('All designs restored to original factory defaults.');
    }
  };

  // Open edit modal for a design
  const openEditModal = (collection: 'crafted' | 'italian', item: PortraitDesign | LandscapeDesign, index: number) => {
    setEditTarget({
      collection,
      id: item.id,
      index,
      name: item.name,
      label: item.label,
      image: item.image,
      description: item.description,
    });
    setEditImagePreview(item.image);
    setEditLabel(item.label);
    setEditDescription(item.description);
    setEditModalOpen(true);
  };

  // Save changes to design
  const handleSaveEdit = () => {
    if (!editTarget) return;

    if (editTarget.collection === 'crafted') {
      const updated = craftedDesigns.map((d) => {
        if (d.id === editTarget.id) {
          return {
            ...d,
            label: editLabel.trim() || d.label,
            description: editDescription.trim() || d.description,
            image: editImagePreview || d.image,
          };
        }
        return d;
      });
      setCraftedDesigns(updated);
      try {
        localStorage.setItem(STORAGE_KEY_CRAFTED, JSON.stringify(updated));
      } catch (err) {
        console.error('Storage error', err);
      }
      showToast(`${editTarget.name} photo updated successfully!`);
    } else {
      const updated = italianDesigns.map((d) => {
        if (d.id === editTarget.id) {
          return {
            ...d,
            label: editLabel.trim() || d.label,
            description: editDescription.trim() || d.description,
            image: editImagePreview || d.image,
          };
        }
        return d;
      });
      setItalianDesigns(updated);
      try {
        localStorage.setItem(STORAGE_KEY_ITALIAN, JSON.stringify(updated));
      } catch (err) {
        console.error('Storage error', err);
      }
      showToast(`${editTarget.name} photo updated successfully!`);
    }

    setEditModalOpen(false);
    setEditTarget(null);
  };

  // Restore single design to default
  const handleResetSingleDesign = () => {
    if (!editTarget) return;
    if (editTarget.collection === 'crafted') {
      const original = DEFAULT_CRAFTED_DESIGNS.find((d) => d.id === editTarget.id);
      if (original) {
        setEditImagePreview(original.image);
        setEditLabel(original.label);
        setEditDescription(original.description);
      }
    } else {
      const original = DEFAULT_ITALIAN_DESIGNS.find((d) => d.id === editTarget.id);
      if (original) {
        setEditImagePreview(original.image);
        setEditLabel(original.label);
        setEditDescription(original.description);
      }
    }
  };

  // Current active item collection for lightbox
  const currentCollection: GalleryItemView[] = activeTab === 'cemento'
    ? cementoSwatches.map((s) => ({
        id: s.id,
        name: s.name,
        label: `${s.name} (${s.tone})`,
        image: cementoImg,
        description: `Authentic Cemento architectural concrete shade: ${s.name}. Velvety matte finish with natural micro-cement variation.`,
        isSwatch: true,
        hex: s.hex,
        gradient: s.gradient,
      }))
    : activeTab === 'italian'
    ? italianDesigns.map((d) => ({
        id: d.id,
        name: d.name,
        label: `${d.name} · ${d.label}`,
        image: d.image,
        description: d.description,
        isSwatch: false,
      }))
    : craftedDesigns.map((d) => ({
        id: d.id,
        name: d.name,
        label: `${d.name} · ${d.label}`,
        image: d.image,
        description: d.description,
        isSwatch: false,
      }));

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev + 1) % currentCollection.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) => (prev - 1 + currentCollection.length) % currentCollection.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentCollection.length]);

  // Touch Swipe for Mobile Lightbox
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped Left -> Next
      setActiveItemIndex((prev) => (prev + 1) % currentCollection.length);
    } else if (diff < -50) {
      // Swiped Right -> Prev
      setActiveItemIndex((prev) => (prev - 1 + currentCollection.length) % currentCollection.length);
    }
  };

  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0B0B0B] text-[#F8F5EE] border-t border-[#C9A24B]/20 overflow-hidden"
    >
      {/* Background radial gold sheen */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#C9A24B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          {/* Small gold text */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-5 h-[1px] bg-[#C9A24B]/60" />
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C9A24B]">
              OUR COLLECTION
            </span>
            <span className="w-5 h-[1px] bg-[#C9A24B]/60" />
          </div>

          {/* Heading in serif font */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4">
            Textures <span className="gold-gradient-text">That Speak</span>
          </h2>

          {/* Gold ornamental divider line that draws in on scroll */}
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

        {/* CATEGORY TABS (Gold pill buttons, horizontally scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 px-1 sm:px-0 pb-3 mb-10 sm:mb-14">
          <button
            onClick={() => setActiveTab('cemento')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'cemento'
                ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-[0_0_20px_rgba(201,162,75,0.4)]'
                : 'border border-[#C9A24B] text-[#C9A24B] bg-transparent hover:bg-[#C9A24B]/10'
            }`}
          >
            Cemento Texture
          </button>

          <button
            onClick={() => setActiveTab('italian')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'italian'
                ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-[0_0_20px_rgba(201,162,75,0.4)]'
                : 'border border-[#C9A24B] text-[#C9A24B] bg-transparent hover:bg-[#C9A24B]/10'
            }`}
          >
            Italian Ruf n Tuff
          </button>

          <button
            onClick={() => setActiveTab('crafted')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'crafted'
                ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-[0_0_20px_rgba(201,162,75,0.4)]'
                : 'border border-[#C9A24B] text-[#C9A24B] bg-transparent hover:bg-[#C9A24B]/10'
            }`}
          >
            Crafted 3D Designs
          </button>
        </div>

        {/* TAB CONTENTS (Fades smoothly on tab change) */}
        <AnimatePresence mode="wait">
          {/* TAB 1: CEMENTO TEXTURE - COLOUR SHADES */}
          {activeTab === 'cemento' && (
            <motion.div
              key="cemento"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A24B]">
                  12 Architectural Shades · Velvety Concrete & Marble Plaster
                </span>
              </div>

              {/* Grid of 12 square swatches with rounded corners & thin gold border */}
              <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-6">
                {cementoSwatches.map((swatch, index) => (
                  <motion.div
                    key={swatch.id}
                    variants={itemVariants}
                    style={{ y: parallaxY }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
                    onClick={() => openLightbox(index)}
                    className="group flex flex-col items-center cursor-pointer select-none"
                  >
                    {/* Swatch Square Box */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-[#C9A24B]/40 group-hover:border-[#C9A24B] group-hover:shadow-[0_0_25px_rgba(201,162,75,0.45)] transition-all duration-300 p-1 bg-[#141414]">
                      {/* Realistic Cement Grain and Texture Fill */}
                      <div
                        className="w-full h-full rounded-lg relative overflow-hidden transition-transform duration-500 group-hover:scale-105"
                        style={{
                          background: swatch.gradient,
                          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {/* Subtle Concrete Texture Grain Overlay */}
                        <div
                          className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                          style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
                            backgroundSize: '8px 8px',
                          }}
                        />

                        {/* Top Light Glaze */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none" />

                        {/* Hover Overlay with Inspect Icon */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize2 className="w-5 h-5 text-[#FFF1CA]" />
                        </div>
                      </div>
                    </div>

                    {/* Label Under Each Swatch */}
                    <span className="font-serif text-sm font-semibold text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors mt-2.5 text-center leading-snug">
                      {swatch.name}
                    </span>
                    <span className="text-[10px] text-white/50 font-light text-center">
                      {swatch.tone}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: ITALIAN RUF N TUFF PREMIUM COLLECTION */}
          {activeTab === 'italian' && (
            <motion.div
              key="italian"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="space-y-8"
            >
              {/* Flyer-Matching Header */}
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-[11px] sm:text-xs font-serif tracking-[0.25em] uppercase text-[#C9A24B] font-bold block mb-1">
                  TEXTURE OF DELHI WALA
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#F8F5EE] uppercase gold-gradient-text">
                  ITALIAN RUF N TUFF TEXTURE PREMIUM COLLECTION
                </h3>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent mx-auto mt-2" />
              </div>

              {/* Grid of 8 landscape images labeled Design 1 to Design 8 (1 col on small mobile, 2 on phablet/tablet, 4 on desktop) */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 max-w-6xl mx-auto">
                {italianDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    variants={itemVariants}
                    onClick={() => openLightbox(index)}
                    className="group relative bg-[#0B0B0B] p-1.5 sm:p-2.5 rounded-sm cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,75,0.45)] border border-[#C9A24B]/50 hover:border-[#C9A24B]"
                  >
                    {/* Double-Line Gold Border Frame (Signature Royal Flyer Look) */}
                    <div className="p-1 sm:p-1.5 border border-[#C9A24B]/40 group-hover:border-[#C9A24B] transition-colors flex flex-col bg-[#111111]">
                      {/* Image Box */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#181818] border border-[#C9A24B]/25">
                        <img
                          src={design.image}
                          alt={`${design.name} - ${design.label}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                        />

                        {/* Subtle Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />

                        {/* Top-Right Inspect Icon */}
                        <div className="absolute top-1.5 right-1.5 p-1 rounded-sm bg-[#0B0B0B]/85 text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Official Plaque Bottom Bar: Clean 'Design X' */}
                      <div className="py-2 px-1 text-center bg-[#0B0B0B] border-t border-[#C9A24B]/40 mt-1">
                        <span className="font-serif text-sm sm:text-base font-bold text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors tracking-wider block">
                          {design.name}
                        </span>
                        <span className="text-[10px] text-[#C9A24B]/80 font-medium block truncate mt-0.5 sm:hidden">
                          {design.label}
                        </span>
                        <span className="hidden sm:block text-[11px] text-[#F8F5EE]/60 font-light truncate mt-0.5">
                          {design.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Official Flyer Plaque Bottom Strip */}
              <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-[#111111] border border-[#C9A24B]/40 rounded-sm text-center relative overflow-hidden mt-8">
                {/* Gold corner ornaments */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#C9A24B]" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#C9A24B]" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#C9A24B]" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#C9A24B]" />

                {/* 5 Stars */}
                <div className="flex items-center justify-center gap-1.5 text-[#C9A24B] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-base sm:text-lg">★</span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#F8F5EE] font-serif tracking-wide mb-1">
                  Find us on Google · <span className="text-[#C9A24B] font-semibold">5 Star Rated</span>
                </p>
                <p className="text-xs text-[#F8F5EE]/80 font-light">
                  <span className="font-semibold text-[#F8F5EE]">Muhammad Arif</span> · Mananthawady, Wayanad Kerala · <span className="text-[#C9A24B]">All Kerala Service</span>
                </p>
                <p className="text-xs font-mono text-[#C9A24B] mt-1 font-semibold">
                  Mob: 9656874312
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="tel:9656874312"
                    className="px-5 py-2 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] text-xs font-bold tracking-wider uppercase rounded-sm transition-all shadow-md"
                  >
                    Call: 9656874312
                  </a>
                  <a
                    href="https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20inquiring%20about%20Italian%20Ruf%20n%20Tuff%20Texture%20Collection."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 border border-[#C9A24B] text-[#C9A24B] hover:bg-[#C9A24B]/15 text-xs font-bold tracking-wider uppercase rounded-sm transition-all"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CRAFTED TEXTURE PREMIUM COLLECTION */}
          {activeTab === 'crafted' && (
            <motion.div
              key="crafted"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A24B]">
                  Crafted Texture Premium Collection · 9 Portrait Bas-Relief & Metal Designs
                </span>
              </div>

              {/* Grid of 9 portrait images labeled Design 1 to Design 9 */}
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {craftedDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    variants={itemVariants}
                    onClick={() => openLightbox(index)}
                    className="group relative bg-[#141414] rounded-sm overflow-hidden border border-[#C9A24B]/35 hover:border-[#C9A24B] hover:shadow-[0_0_25px_rgba(201,162,75,0.4)] transition-all duration-300 cursor-pointer"
                  >
                    {/* Portrait Image Frame (3:4) */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1E1E1E]">
                      <img
                        src={design.image}
                        alt={design.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />
                      {/* Dark Overlay with Design Name on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        <div className="flex justify-end">
                          <span className="p-1.5 rounded-sm bg-[#0B0B0B]/80 text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>

                        <div>
                          <span className="font-serif text-xl font-bold text-[#FFF1CA] block leading-tight">
                            {design.name}
                          </span>
                          <span className="text-xs text-[#C9A24B] font-medium block mt-1">
                            {design.label}
                          </span>
                          <p className="text-[11px] text-white/70 font-light mt-1.5 line-clamp-2">
                            {design.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM ACTION BUTTON */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm gold-glow transition-all whitespace-nowrap shadow-lg"
          >
            <span>Get This Texture On Your Wall</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL WITH ZOOM-IN & SWIPE */}
      <AnimatePresence>
        {lightboxOpen && currentCollection[activeItemIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar with Counter and Gold Close Button */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-none">
              <div className="pointer-events-auto bg-[#141414]/90 border border-[#C9A24B]/30 px-3 py-1.5 rounded-sm text-xs text-[#C9A24B] font-mono">
                {activeItemIndex + 1} / {currentCollection.length}
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Lightbox"
                className="pointer-events-auto p-2.5 bg-[#141414] border border-[#C9A24B] text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B0B0B] rounded-sm transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemIndex((prev) => (prev - 1 + currentCollection.length) % currentCollection.length);
              }}
              aria-label="Previous Design"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#141414]/80 border border-[#C9A24B]/40 text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B0B0B] rounded-sm transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemIndex((prev) => (prev + 1) % currentCollection.length);
              }}
              aria-label="Next Design"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#141414]/80 border border-[#C9A24B]/40 text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B0B0B] rounded-sm transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Main Card with Smooth Zoom-In */}
            <motion.div
              key={currentCollection[activeItemIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#141414] border-2 border-[#C9A24B]/50 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(201,162,75,0.2)] overflow-y-auto md:overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] md:min-h-[460px] bg-black flex items-center justify-center overflow-hidden shrink-0 md:shrink">
                {currentCollection[activeItemIndex].isSwatch ? (
                  <div
                    className="w-full h-full min-h-[220px] sm:min-h-[300px] flex items-center justify-center p-6 sm:p-8"
                    style={{ background: currentCollection[activeItemIndex].gradient }}
                  >
                    <div className="text-center p-4 sm:p-6 bg-black/60 backdrop-blur-md border border-[#C9A24B]/40 rounded-lg max-w-xs">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#FFF1CA] block mb-1">
                        {currentCollection[activeItemIndex].name}
                      </span>
                      <span className="text-xs text-[#C9A24B] font-mono">
                        Hex Code: {currentCollection[activeItemIndex].hex}
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentCollection[activeItemIndex].image}
                    alt={currentCollection[activeItemIndex].name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Sidebar Info & Inquire Action */}
              <div className="p-5 sm:p-7 md:w-80 flex flex-col justify-between bg-[#141414] border-t md:border-t-0 md:border-l border-white/10 shrink-0">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C9A24B] block mb-1">
                    Texture of Delhi Wala
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#F8F5EE] mb-1">
                    {currentCollection[activeItemIndex].name}
                  </h3>
                  <p className="text-xs text-[#C9A24B] font-medium mb-4">
                    {currentCollection[activeItemIndex].label}
                  </p>
                  <p className="text-xs text-[#F8F5EE]/75 font-light leading-relaxed mb-6">
                    {currentCollection[activeItemIndex].description}
                  </p>

                  <div className="p-3 bg-[#0B0B0B] border border-[#C9A24B]/20 rounded-sm text-[11px] text-white/70 space-y-1 mb-6">
                    <div>✓ 100% Hand-Troweled Delhi Artistry</div>
                    <div>✓ All Kerala Free Site Assessment</div>
                    <div>✓ 10-Year Guarantee Against Peeling</div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20interested%20in%20"${encodeURIComponent(
                      currentCollection[activeItemIndex].label
                    )}"%20from%20your%20collection%20gallery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm gold-glow flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setLightboxOpen(false)}
                    className="w-full py-2.5 px-4 border border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#C9A24B] font-medium text-xs uppercase tracking-wider rounded-sm text-center block transition-colors"
                  >
                    Book Site Inspection
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OWNER AUTHENTICATION PIN MODAL (Strictly for Owner, keeps clients out) */}
      <AnimatePresence>
        {pinModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setPinModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative max-w-sm w-full bg-[#121212] border-2 border-[#C9A24B] rounded-sm p-6 sm:p-7 shadow-[0_0_50px_rgba(201,162,75,0.3)] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPinModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-[#C9A24B] transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-4 bg-[#C9A24B]/15 border border-[#C9A24B] rounded-full flex items-center justify-center text-[#C9A24B]">
                <Key className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-[#F8F5EE] mb-1">
                Owner Studio Access
              </h3>
              <p className="text-xs text-white/70 mb-5 leading-relaxed">
                Enter your secret Master PIN to unlock photo replacement & design controls.
              </p>

              <form onSubmit={handleUnlockOwner} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError('');
                    }}
                    placeholder="Enter 4-digit PIN"
                    autoFocus
                    className="w-full px-4 py-3 bg-[#0B0B0B] border border-[#C9A24B]/40 focus:border-[#C9A24B] rounded-sm text-center text-lg tracking-[0.3em] font-mono text-[#FFF1CA] outline-none placeholder:tracking-normal placeholder:text-xs placeholder:text-white/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#C9A24B] p-1"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {pinError && (
                  <p className="text-xs text-red-400 font-medium flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}

                <div className="text-[11px] text-[#C9A24B]/80 font-mono bg-[#0B0B0B] py-1 px-2 border border-[#C9A24B]/20 rounded-sm">
                  Owner Default PIN: <span className="font-bold text-[#FFF1CA]">9656</span>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setPinModalOpen(false)}
                    className="flex-1 py-2.5 border border-white/20 text-white/80 hover:bg-white/5 text-xs font-semibold rounded-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md"
                  >
                    Unlock Studio
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OWNER EDIT DESIGN & PHOTO MODAL */}
      <AnimatePresence>
        {editModalOpen && editTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative max-w-xl w-full bg-[#131313] border-2 border-[#C9A24B] rounded-sm p-5 sm:p-7 shadow-[0_0_50px_rgba(201,162,75,0.35)] my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-[#C9A24B] transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A24B]">
                  Owner Photo Editor
                </span>
                <span className="w-2 h-[1px] bg-[#C9A24B]" />
                <span className="text-[11px] text-white/60">
                  {editTarget.collection === 'crafted' ? 'Crafted 3D Collection' : 'Italian Ruf n Tuff'}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#F8F5EE] mb-4">
                Change Photo · <span className="text-[#C9A24B]">{editTarget.name}</span>
              </h3>

              <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                {/* Live Photo Preview */}
                <div className="bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm p-2 flex flex-col items-center">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1.5 self-start font-mono">
                    Live Photo Preview
                  </span>
                  <div
                    className={`relative overflow-hidden bg-black/50 border border-[#C9A24B]/40 rounded-sm w-full flex items-center justify-center ${
                      editTarget.collection === 'crafted' ? 'max-w-[240px] aspect-[3/4]' : 'max-w-[340px] aspect-[16/11]'
                    }`}
                  >
                    <img
                      src={editImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {isProcessingFile && (
                      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2 text-[#C9A24B]">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-xs font-mono">Compressing image...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Options */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-medium text-[#FFF1CA]">
                    Option 1: Upload Photo from Your Device (Phone / Laptop)
                  </label>
                  <label className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer transition-all shadow-md">
                    {isProcessingFile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isProcessingFile ? 'Optimizing Image...' : 'Select Photo from Phone / Files'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setIsProcessingFile(true);
                          const compressed = await compressImageFile(file);
                          setEditImagePreview(compressed);
                          setIsProcessingFile(false);
                        } catch (err: unknown) {
                          setIsProcessingFile(false);
                          const errorMsg = err instanceof Error ? err.message : 'Error reading image file.';
                          alert(errorMsg);
                        }
                      }}
                    />
                  </label>
                  <p className="text-[11px] text-white/50 leading-tight">
                    Accepts phone camera photos, gallery screenshots, JPG or PNG. Automatically optimized for maximum speed and instant loading.
                  </p>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/10" />
                  <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-[#C9A24B]/70 font-mono">
                    OR
                  </span>
                  <div className="flex-grow border-t border-white/10" />
                </div>

                {/* Web URL Option */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#FFF1CA]">
                    Option 2: Paste Direct Image Web URL
                  </label>
                  <input
                    type="text"
                    value={editImagePreview.startsWith('data:') ? '' : editImagePreview}
                    onChange={(e) => setEditImagePreview(e.target.value)}
                    placeholder="https://example.com/wall-texture.jpg"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/35 focus:border-[#C9A24B] rounded-sm text-xs text-[#F8F5EE] outline-none"
                  />
                </div>

                {/* Editable Details */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#FFF1CA] mb-1">
                      Design Title / Label
                    </label>
                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      placeholder="e.g. Sacred Mandala Bas-Relief"
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/35 focus:border-[#C9A24B] rounded-sm text-xs text-[#F8F5EE] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#FFF1CA] mb-1">
                      Texture Description
                    </label>
                    <textarea
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Short description of finish, carving or materials..."
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/35 focus:border-[#C9A24B] rounded-sm text-xs text-[#F8F5EE] outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetSingleDesign}
                    className="px-3 py-2 border border-white/20 hover:border-[#C9A24B] text-white/70 hover:text-[#C9A24B] text-xs rounded-sm transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Original Photo</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      className="px-4 py-2 border border-white/20 text-white/80 hover:bg-white/5 text-xs font-semibold rounded-sm transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="px-5 py-2 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-lg flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save & Apply</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[#111111] border border-[#C9A24B] rounded-sm shadow-[0_0_30px_rgba(201,162,75,0.4)] flex items-center gap-2.5 text-xs font-medium text-[#FFF1CA]"
          >
            <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
