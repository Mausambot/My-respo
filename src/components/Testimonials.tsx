import { useState } from "react";
import { Star, Quote, ChevronRight, ChevronLeft, Building2 } from "lucide-react";
import { Language } from "../types";

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote_en: "Utility De Mexico delivered our 45,000 sqm Santa Rosa logistics warehouse with impeccable precision. Laser-leveled post-tensioned floors look exceptional.",
      quote_es: "Utility De México entregó nuestra nave logística de 45,000 m² en Santa Rosa con precisión impecable. Las losas de concreto superan ampliamente nuestras tolerancias.",
      author: "Ing. Martín Domínguez",
      role_en: "Operations Hub Director, ProLogis Mexico",
      role_es: "Director del Hub de Operaciones, ProLogis México",
      rating: 5,
      company: "ProLogis Mexico"
    },
    {
      quote_en: "Their execution of the high-voltage El Saucito substation and prompt interconnections with the CFE grid allowed our factories to launch with zero delays.",
      quote_es: "Su ejecución de la subestación de alta tensión El Saucito y sus prontas interconexiones con la red de CFE permitieron lanzar nuestra planta sin demoras.",
      author: "Lic. Clara Hinojosa",
      role_en: "Project Logistics Manager, Bajío Industrial Systems",
      role_es: "Gerente de Proyectos Logísticos, Sistemas Industriales del Bajío",
      rating: 5,
      company: "CFE Substation Partner"
    },
    {
      quote_en: "High-grade HDPE hydro pipe laying across the northern sector of Juriquilla was completed with stringently tested pressures. Safe, reliable, and compliant.",
      quote_es: "La colocación de tuberías de PEAD de alta densidad en el sector norte de Juriquilla se completó con estrictas pruebas de presión. Seguras e íntegras.",
      author: "Ing. Ramón Velázquez",
      role_en: "Chief Hydraulics Supervisor, CEA Querétaro",
      role_es: "Supervisor en Jefe de Redes Hidráulicas, CEA Querétaro",
      rating: 4,
      company: "CEA Querétaro Audits"
    }
  ];

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="py-20 px-6 sm:px-8 bg-gradient-to-b from-[#0c1220] to-[#070b13] relative z-10 select-none border-t border-white/5">
      <div className="absolute inset-0 blueprint-grid-fine opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-white">
        
        {/* Headings */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-construction font-bold">
            {lang === 'en' ? "CERTIFIED FEEDBACK AUDITS" : "AUDITORÍAS DE SATISFACCIÓN DE CLIENTES"}
          </span>
          <h2 className="text-3xl font-extrabold font-display uppercase tracking-tight mt-1.5">
            {lang === 'en' ? "TESTIMONIAL ARCHIVES" : "CONTRATISTAS Y SOCIOS"}
          </h2>
        </div>

        {/* Carousel slide card */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          
          {/* Big quotes icon background decoration */}
          <div className="absolute top-2 left-2 text-white/[0.03] pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="relative z-10 space-y-4">
            
            {/* Stars rating */}
            <div className="flex gap-1 text-safety">
              {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 fill-current" />
              ))}
            </div>

            {/* Testimonials quote content */}
            <p className="text-sm sm:text-base italic leading-relaxed text-slate-250 font-sans">
              "{lang === 'en' ? reviews[activeIndex].quote_en : reviews[activeIndex].quote_es}"
            </p>

            {/* Author spec signature */}
            <div className="flex justify-between items-end pt-4 border-t border-white/5">
              <div>
                <h4 className="font-extrabold font-display text-white text-sm">
                  {reviews[activeIndex].author}
                </h4>
                <p className="text-xs text-concrete font-mono uppercase tracking-widest mt-0.5">
                  {lang === 'en' ? reviews[activeIndex].role_en : reviews[activeIndex].role_es}
                </p>
              </div>

              {/* Company Logo representation */}
              <div className="flex items-center gap-1.5 bg-[#070b13] px-3 py-1.5 rounded border border-white/5 text-[10px] font-mono text-concrete uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-construction" />
                <span>{reviews[activeIndex].company}</span>
              </div>
            </div>

          </div>

          {/* Stepper Controllers */}
          <div className="flex justify-end gap-2 mt-6 relative z-10">
            <button 
              onClick={prevReview}
              className="w-8 h-8 rounded bg-[#070b13] border border-white/10 hover:border-construction flex items-center justify-center text-concrete hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextReview}
              className="w-8 h-8 rounded bg-[#070b13] border border-white/10 hover:border-construction flex items-center justify-center text-concrete hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
