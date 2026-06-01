import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Layers, Image as ImageIcon, Sparkles, X, ZoomIn, Eye } from "lucide-react";
import { Language } from "../types";

interface GalleryProps {
  lang: Language;
}

export default function Gallery({ lang }: GalleryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'machinery' | 'drone' | 'teams'>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Asset mock entries representing beautiful industrial/civil scenes in Santa Rosa Jáuregui
  const galleryItems = [
    {
      id: "gal-1",
      category: "machinery",
      title_en: "Heavy Grading Operations",
      title_es: "Nivelación con Motoconformadora",
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
      aspect: "aspect-video"
    },
    {
      id: "gal-2",
      category: "drone",
      title_en: "Avenida Gaza Bypass Aerial View",
      title_es: "Vista Aérea del Libramiento Gaza",
      src: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1000&q=80",
      aspect: "aspect-square"
    },
    {
      id: "gal-3",
      category: "teams",
      title_en: "Structural Quality Control Inspection",
      title_es: "Inspección de Control de Calidad",
      src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
      aspect: "aspect-video"
    },
    {
      id: "gal-4",
      category: "machinery",
      title_en: "Laser-Level Floor Slab Casting",
      title_es: "Colado de Losa Nivelada por Láser",
      src: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1000&q=80",
      aspect: "aspect-square"
    },
    {
      id: "gal-5",
      category: "drone",
      title_en: "Subsurface Utility Hydration Mains",
      title_es: "Tuberías Subterráneas de PEAD",
      src: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80",
      aspect: "aspect-video"
    },
    {
      id: "gal-6",
      category: "teams",
      title_en: "Gantt Timeline Engineering Alignment",
      title_es: "Alineación de Cronograma de Ingenieros",
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
      aspect: "aspect-square"
    }
  ];

  const filteredItems = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
   <div id="gallery-section" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto text-white select-none">
    
   {/* Structural Headings */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8 relative">
        <div className="absolute inset-0 blueprint-grid-fine opacity-10 pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-construction font-bold uppercase">
            <Camera className="w-4 h-4 animate-pulse" />
            <span>{lang === 'en' ? "CERTIFIED PHOTOGRAMMETRY LOGS" : "REGISTROS VISUALES DE CAMPO"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
            {lang === 'en' ? "OPERATIONS ARCHIVES" : "ÁLBUM OPERATIVO DE CAMPO"}
          </h2>
          <p className="text-xs text-concrete max-w-xl">
            {lang === 'en'
              ? "Drone perspective, on-site personnel operations, and concrete pouring checkpoints under SCT highway specs."
              : "Consigne capturas de campo, nivelaciones de suelo, izajes de marcos rígidos e interconexiones de redes de agua."}
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider relative z-10">
          {[
            { value: "all", label_en: "All Images", label_es: "Todo" },
            { value: "machinery", label_en: "Machinery", label_es: "Maquinaria" },
            { value: "drone", label_en: "Drone Layout", label_es: "Vistas Aéreas" },
            { value: "teams", label_en: "Personnel Operations", label_es: "Cuadrillas" }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
                activeTab === tab.value 
                  ? "bg-construction text-slate-150 border-construction font-bold font-mono" 
                  : "bg-slate-950 text-concrete border-white/5 hover:border-white/20"
              }`}
            >
              {lang === 'en' ? tab.label_en : tab.label_es}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style Visual Grid layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => setLightboxImage(item.src)}
            className="break-inside-avoid bg-[#111827] rounded-xl overflow-hidden border border-white/5 hover:border-construction/40 cursor-pointer group hover:scale-[1.01] transition-all duration-300 relative"
          >
            {/* Standard Image Rendering with REFERRERPOLICY */}
            <img 
              src={item.src} 
              alt={lang === 'en' ? item.title_en : item.title_es}
              className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Hover overlay masking */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-construction/95 text-slate-950 flex items-center justify-center border border-slate-900 shadow-xl">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[9px] font-mono text-construction uppercase tracking-widest font-bold">Category: {item.category}</span>
                <h4 className="font-bold text-xs font-mono uppercase tracking-wide text-white mt-1">
                  {lang === 'en' ? item.title_en : item.title_es}
                </h4>
              </div>
            </div>

            {/* Standard static title below (if overlay doesn't render) */}
            <div className="p-3 bg-slate-950/40 text-left border-t border-white/5 flex justify-between items-center z-10">
              <span className="text-[10px] font-mono text-concrete uppercase truncate max-w-[80%]">
                {lang === 'en' ? item.title_en : item.title_es}
              </span>
              <Eye className="w-3.5 h-3.5 text-slate-705" />
            </div>

          </div>
        ))}
      </div>

      {/* Heavy Lightbox Zoom Render */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#0a0e17] rounded-xl border border-white/15 overflow-hidden shadow-2xl"
            >
              {/* Image zoom */}
              <img 
                src={lightboxImage} 
                alt="Enlarged Photogrammetry" 
                className="w-full h-auto max-h-[80vh] object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Close float */}
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 bg-construction/90 text-slate-950 p-2 rounded-full hover:scale-105 transition-transform cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
