import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ShieldCheck,
  Droplets,
  Clock,
  MapPin,
  Calendar,
  Layers,
  Camera,
  Upload,
  Check,
  RotateCcw,
  X,
  Loader2,
  Sparkles
} from 'lucide-react';
import { GoldDivider, SectionKicker } from './GoldOrnament.tsx';

// Real Project Images
import realLivingRoomImg from '../assets/images/project_real_living_room_1.jpg';
import geometricWallImg from '../assets/images/project_real_geometric_wall_2.jpg';
import exteriorElevationImg from '../assets/images/project_real_exterior_elevation_3.jpg';
import popCeilingImg from '../assets/images/project_real_pop_ceiling_4.jpg';

export interface TextureService {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  timeline: string;
  scope: string;
  description: string;
  image: string;
  features: string[];
  idealFor: string;
  finishType: string;
  sheen: string;
}

const DEFAULT_PROJECTS: TextureService[] = [
  {
    id: 'project-classical-wall-panelling',
    title: 'Classical Wall Panelling & Dual-Tone Drawing Room',
    subtitle: 'Bespoke POP Moulding Panelling with Matte Black & Champagne Stucco',
    category: 'Luxury Living Room & TV Wall Panelling',
    location: 'Mananthavady, Wayanad, Kerala',
    timeline: 'Completed in 16 Days',
    scope: '4,800 sq.ft Villa · Living Room Feature Wall & TV Unit',
    description: 'Master drawing and living room transformation executed for a luxury residence in Wayanad. Classical recessed wall panelling with dual-tone black and warm champagne beige Italian stucco, integrated brass sconce lamps, chandelier cove illumination, and bespoke Delhi-crafted POP architectural mouldings.',
    image: realLivingRoomImg,
    features: [
      'Dual-Tone Black & Warm Champagne Stucco',
      'Classical Handcrafted POP Wall Mouldings',
      'Integrated Brass Sconce Lamp Fixtures',
      'Symmetric TV Unit Framing & Chandelier Cove',
    ],
    idealFor: 'Living Room Feature Walls, Double-Height Foyers, Formal Drawing Rooms',
    finishType: 'Dual-Tone Italian Lime Plaster & Hand-Crafted POP Mouldings',
    sheen: 'Velvet Matte & Low-Sheen Satin Stucco',
  },
  {
    id: 'project-geometric-accent-wall',
    title: 'Olive Geometric Accent Wall & Circular POP Ceiling',
    subtitle: 'Precision Angular Geometric Colour Blocking with Vertical Pinstripe Detailing',
    category: 'Designer Bedroom / Lounge Feature Wall',
    location: 'Malappuram, Kerala',
    timeline: 'Completed in 7 Days',
    scope: 'Master Bedroom Feature Wall & Circular False Ceiling',
    description: 'Custom contemporary geometric accent wall executed in calming multi-tone olive green, sage, and warm off-white. Features ultra-crisp vertical white pinstripe line work, angular geometric triangles, and an integrated suspended circular POP ceiling with warm ambient halo cove illumination.',
    image: geometricWallImg,
    features: [
      'Multi-Tone Olive Green & Cream Geometric Design',
      'Crisp Vertical Pinstripe Line Work',
      'Integrated Circular POP False Ceiling with Halo Light',
      'Warm Recessed Spotlights & Smooth Finish',
    ],
    idealFor: 'Master Bedroom Accent Walls, Modern Lounges, Contemporary Living Rooms',
    finishType: 'Multi-Tone Olive Acrylic Enamel & POP Architectural Relief',
    sheen: 'Ultra-Smooth Eggshell & Soft Satin',
  },
  {
    id: 'project-exterior-villa-elevation',
    title: 'Multi-Storey Villa Elevation & Architectural Facade Lighting',
    subtitle: 'Monsoon-Proof Exterior Texture with Integrated Soffit Night Illumination',
    category: 'Exterior Villa Elevation & Facade Illumination',
    location: 'Beach Road, Kozhikode (Calicut), Kerala',
    timeline: 'Completed in 21 Days',
    scope: 'Full Multi-Tier Residence Exterior Elevation & Soffits',
    description: 'Complete exterior facade transformation for a multi-storey Kerala residence. Applied heavy-relief weather-shield Italian Ruf n Tuff mineral aggregate plaster engineered to withstand coastal monsoon humidity, accented with integrated multi-color LED soffit downlighting that illuminates the curved balcony arches and architectural cornices at night.',
    image: exteriorElevationImg,
    features: [
      'Monsoon-Proof Heavy Aggregate Exterior Plaster',
      'Architectural Dual-Tone Soffit LED Night Lighting',
      'Multi-Tier Curved Balcony & Cornice Work',
      'Algae & Heavy Rain Resistant Protective Finish',
    ],
    idealFor: 'Full Building Exterior, Modern Tropical Villas, Multi-Storey Facades',
    finishType: 'Monsoon-Proof Italian Ruf n Tuff Exterior Texture & Facade LED Profiling',
    sheen: 'Weather-Shield Mineral Matte Aggregate',
  },
  {
    id: 'project-pop-false-ceiling',
    title: 'Concentric Wave POP False Ceiling & Warm Cove Lighting',
    subtitle: 'Sculpted Circular POP Ceiling Architecture with Concealed Golden LED Strips',
    category: 'Master Bedroom & Living False Ceiling',
    location: 'Mananthavady, Wayanad / Kannur, Kerala',
    timeline: 'Completed in 9 Days',
    scope: 'Living Hall & Bedroom False Ceiling with Wall Profiling',
    description: 'Authentic Delhi-craftsmanship POP false ceiling executed by Muhammad Arif and senior artisans. Multi-level circular concentric rings seamlessly transitioning into sweeping S-curve cove channels, concealed warm 3000K golden LED illumination, ambient recessed downlights, and complementary textured wall profiling paired with polished marble flooring.',
    image: popCeilingImg,
    features: [
      'Concentric Circular & S-Curve POP Ceiling Mould',
      'Concealed Ambient Warm Golden LED Cove Channels',
      'Integrated Recessed Spotlights & Mood Lights',
      'Delhi-Grade Crack-Free Heavy Duty POP Reinforcement',
    ],
    idealFor: 'Living Rooms, Master Bedrooms, Dining Halls, Luxury Apartment Suites',
    finishType: 'Delhi-Grade Fine POP Plasterwork with Multi-Layer Cove Channels',
    sheen: 'Seamless Snow White Matte with Warm Glow Illumination',
  },
];

const STORAGE_KEY_PROJECTS = 'delhiwala_real_projects_v4';
const STORAGE_KEY_OWNER_SESSION = 'delhiwala_gallery_owner_logged_in';

// Offscreen canvas compression for fast storage
const compressProjectImage = (file: File): Promise<string> => {
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
        const maxDim = 1280;
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
          resolve(canvas.toDataURL('image/jpeg', 0.84));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Could not load image file.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Could not read image file.'));
    reader.readAsDataURL(file);
  });
};

interface ServicesSectionProps {
  onSelectService: (service: TextureService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [projects, setProjects] = useState<TextureService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved projects', e);
    }
    return DEFAULT_PROJECTS;
  });

  // Owner Mode Check
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const checkOwner = () => {
      setIsOwner(sessionStorage.getItem(STORAGE_KEY_OWNER_SESSION) === 'true');
    };
    checkOwner();
    window.addEventListener('storage', checkOwner);
    const interval = setInterval(checkOwner, 1500);
    return () => {
      window.removeEventListener('storage', checkOwner);
      clearInterval(interval);
    };
  }, []);

  // Edit Project Photo Modal
  const [editTarget, setEditTarget] = useState<TextureService | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editTimeline, setEditTimeline] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const openEditModal = (project: TextureService) => {
    setEditTarget(project);
    setPreviewImage(project.image);
    setEditTitle(project.title);
    setEditLocation(project.location);
    setEditTimeline(project.timeline);
    setEditDescription(project.description);
  };

  const handleSaveProject = () => {
    if (!editTarget) return;
    const updated = projects.map((p) => {
      if (p.id === editTarget.id) {
        return {
          ...p,
          title: editTitle.trim() || p.title,
          location: editLocation.trim() || p.location,
          timeline: editTimeline.trim() || p.timeline,
          description: editDescription.trim() || p.description,
          image: previewImage || p.image,
        };
      }
      return p;
    });
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch (err) {
      console.error('Storage error', err);
    }
    setEditTarget(null);
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset all project photos to original showroom showcase?')) {
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      setProjects(DEFAULT_PROJECTS);
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#0B0B0B] text-[#F8F5EE]">
      {/* Anchor alias so #collection still smoothly scrolls here */}
      <div id="collection" className="absolute -top-24 pointer-events-none" />

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#0B0B0B] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker>REAL EXECUTED PORTFOLIO</SectionKicker>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EE] mb-4"
          >
            Our <span className="gold-gradient-text">Projects</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-[#F8F5EE]/75 max-w-2xl mx-auto font-light leading-relaxed">
            Real residential villas, luxury apartments, and architectural wall transformations executed across Wayanad, Calicut, Kochi, Kannur, and Malappuram by Muhammad Arif and our master Delhi artisans.
          </p>
          <GoldDivider className="mt-2" />
        </div>

        {/* Projects Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#141414] border border-[#C9A24B]/30 hover:border-[#C9A24B] transition-all duration-500 overflow-hidden rounded-sm flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Subtle Gold Hairline Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C9A24B] z-20 transition-all group-hover:scale-110" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C9A24B] z-20 transition-all group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C9A24B] z-20 transition-all group-hover:scale-110" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C9A24B] z-20 transition-all group-hover:scale-110" />

              {/* Real Project Image Frame */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#1E1E1E]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
                  <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#0B0B0B] bg-[#C9A24B] rounded-sm font-mono shadow-md">
                    Real Site Execution
                  </span>
                  <span className="px-2 py-0.5 text-[10px] text-[#F8F5EE] bg-black/75 backdrop-blur-md border border-[#C9A24B]/40 rounded-sm flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-[#C9A24B]" />
                    <span>{project.timeline}</span>
                  </span>
                </div>

                {/* Location Bar on Image Base */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[#FFF1CA] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#C9A24B]/30 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>{project.location}</span>
                  </span>
                  <span className="text-[11px] text-[#C9A24B] bg-black/80 px-2 py-1 rounded-sm border border-[#C9A24B]/20 font-mono hidden sm:inline-block">
                    {project.scope}
                  </span>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#C9A24B] block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl min-[400px]:text-2xl sm:text-3xl font-bold text-[#F8F5EE] group-hover:text-[#C9A24B] transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs font-medium tracking-wide text-[#C9A24B]/90 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#F8F5EE]/75 font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 py-4 border-t border-b border-[#C9A24B]/20 mb-6 text-xs text-[#F8F5EE]/85">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => onSelectService(project)}
                    className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold tracking-wider uppercase text-[#C9A24B] hover:text-[#FFF1CA] transition-colors group/btn py-2"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>

                  <a
                    href={`https://wa.me/919656874312?text=Hello%20Muhammad%20Arif,%20I%20am%20inquiring%20about%20your%20project%20"${encodeURIComponent(
                      project.title
                    )}"%20in%20${encodeURIComponent(project.location)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0B0B0B] bg-[#C9A24B] hover:bg-[#E5C378] rounded-sm gold-glow transition-all whitespace-nowrap shadow-md flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>Inquire About This Project</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kerala Monsoon-Proof Engineering Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-6 sm:p-8 bg-[#141414] border border-[#C9A24B]/30 rounded-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0B0B0B] border border-[#C9A24B]/40 rounded-sm text-[#C9A24B] shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#F8F5EE] mb-1">Damp & Monsoon Proof</h4>
                <p className="text-xs text-[#F8F5EE]/70 font-light leading-relaxed">
                  Specialized primers and hydrophobic sealers engineered against Wayanad and coastal Kerala humidity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0B0B0B] border border-[#C9A24B]/40 rounded-sm text-[#C9A24B] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#F8F5EE] mb-1">10-Year Guarantee</h4>
                <p className="text-xs text-[#F8F5EE]/70 font-light leading-relaxed">
                  Non-peeling, UV-stable pigments hand-buffed for enduring luster that outlasts standard paints 3x.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0B0B0B] border border-[#C9A24B]/40 rounded-sm text-[#C9A24B] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#F8F5EE] mb-1">Zero Dust Execution</h4>
                <p className="text-xs text-[#F8F5EE]/70 font-light leading-relaxed">
                  Quiet, odorless application with meticulous floor masking. Perfect for furnished luxury homes and resorts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OWNER EDIT PROJECT PHOTO MODAL */}
      <AnimatePresence>
        {editTarget && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setEditTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative max-w-lg w-full bg-[#131313] border-2 border-[#C9A24B] rounded-sm p-6 shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditTarget(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-[#C9A24B] p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A24B]">
                  Owner Project Editor
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F8F5EE] mb-4">
                Update Project · <span className="text-[#C9A24B]">{editTarget.title}</span>
              </h3>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {/* Photo Preview */}
                <div className="bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm p-2 flex flex-col items-center">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black rounded-sm border border-[#C9A24B]/30">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2 text-[#C9A24B]">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-xs font-mono">Compressing image...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Button */}
                <div>
                  <label className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer transition-all shadow-md">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>{isUploading ? 'Optimizing Image...' : 'Choose Project Photo from Phone / Files'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setIsUploading(true);
                          const compressed = await compressProjectImage(file);
                          setPreviewImage(compressed);
                          setIsUploading(false);
                        } catch (err: unknown) {
                          setIsUploading(false);
                          const msg = err instanceof Error ? err.message : 'Error uploading image';
                          alert(msg);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Edit fields */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-medium text-[#FFF1CA] mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm text-xs text-[#F8F5EE] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#FFF1CA] mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm text-xs text-[#F8F5EE] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#FFF1CA] mb-1">
                        Timeline
                      </label>
                      <input
                        type="text"
                        value={editTimeline}
                        onChange={(e) => setEditTimeline(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm text-xs text-[#F8F5EE] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#FFF1CA] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-sm text-xs text-[#F8F5EE] outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditTarget(null)}
                    className="px-4 py-2 border border-white/20 text-white/80 hover:bg-white/5 text-xs font-semibold rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProject}
                    className="px-5 py-2 bg-[#C9A24B] hover:bg-[#E5C378] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export const textureServices = DEFAULT_PROJECTS;
