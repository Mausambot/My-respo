import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { History, Compass, Hammer, Building, Star, CheckCircle, ChevronRight } from "lucide-react";
import { Language } from "../types";

interface TimelineProps {
  lang: Language;
}

export default function Timeline({ lang }: TimelineProps) {
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  // Corporate timeline data logs
  const timelineLogs = [
    {
      year: "2010",
      title_en: "Founding in Juregui, Querétaro",
      title_es: "Fundación en Juréguilla, Querétaro",
      desc_en: "Utility De Mexico set up corporate headquarters in Santa Rosa Jáuregui with a fleet of 5 grading machines, servicing local concrete municipal works.",
      desc_es: "Utility De México establece su sede en Santa Rosa Jáuregui con una flota de 5 motoconformadoras, atendiendo contratos locales de pavimentación."
    },
    {
      year: "2015",
      title_en: "CFE Substation Certification",
      title_es: "Certificación Federal ante la CFE",
      desc_en: "Earned national certification to build high-voltage electrical network installations and concrete explosion wall firewalls for the Comisión Federal de Electricidad.",
      desc_es: "Obtención de certificaciones federales clave para construir subestaciones de alta tensión y muros de contención especiales para la CFE."
    },
    {
      year: "2020",
      title_en: "Infrastructure Scale-up",
      title_es: "Expansión a Infraestructura Pesada",
      desc_en: "Expanded construction capabilities to major highways, deep water HDPE lines, and bypass loops (Avenida Gaza logistics corridor), deploying advanced laser positioning technology.",
      desc_es: "Ampliación de capacidades operativas para construir autopistas interestatales, colectores hidrológicos de PEAD y el libramiento de Avenida Gaza."
    },
    {
      year: "2026",
      title_en: "Modern Command Center",
      title_es: "Centro de Control Inteligente",
      desc_en: "Operational command center deployed to oversee active SCT and CEA works in Bajío. Reaching a verified contractor rating index of 4.1/5 across Querétaro.",
      desc_es: "Lanzamiento de la plataforma de control en tiempo real para supervisar obras activas de la SCT y CEA en Querétaro, logrando una calificación de 4.1/5."
    }
  ];

  return (
    <div id="about-section" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto text-white select-none">
      
      {/* Headings */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="flex justify-center items-center gap-2 text-[10px] font-mono tracking-widest text-construction font-bold uppercase mb-2">
          <History className="w-4 h-4 animate-pulse" />
          <span>{lang === 'en' ? "OUR MISSION & LOGS" : "HISTORIA Y BITÁCORAS"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
          {lang === 'en' ? "ENGINEERING JOURNEY" : "TRAYECTORIA DE INGENIERÍA"}
        </h2>
        <p className="text-xs text-concrete mt-3 leading-relaxed">
          {lang === 'en' 
            ? "Since 2010, Utility De Mexico S.A. De C.V. has forged high-performance assets across Central Mexico, earning trust through unwavering structural integrity."
            : "Desde 2010, Utility De México S.A. De C.V. ha edificado activos estratégicos de alto desempeño en el Bajío, consolidando la confianza industrial."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Historical Timeline Navigator */}
        <div className="lg:col-span-6 bg-[#111827]/60 backdrop-blur rounded-xl border border-white/5 p-6 relative">
          <div className="absolute inset-0 blueprint-grid-fine opacity-10 pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
            <span className="text-xs font-mono text-concrete uppercase tracking-widest">
              {lang === 'en' ? "Chronological Timeline" : "Línea Temporal de Obra"}
            </span>
            <span className="text-[10px] font-mono text-construction">LOC: CENT_BASE_MX</span>
          </div>

          {/* Timeline Selector Buttons */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 max-w-full">
            {timelineLogs.map((item, idx) => (
              <button
                key={item.year}
                onClick={() => setActiveYearIndex(idx)}
                className={`flex-1 mx-auto py-2.5 px-4 rounded font-mono text-xs font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                  activeYearIndex === idx 
                    ? "bg-construction text-slate-950 border-construction glow-border-orange" 
                    : "bg-slate-950 text-concrete border-white/5 hover:border-white/20"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Focused Timeline Year logs content */}
          <div className="h-44 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYearIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-construction font-display font-medium text-base">
                  <CheckCircle className="w-4 h-4 text-safety" />
                  <h4>{lang === 'en' ? timelineLogs[activeYearIndex].title_en : timelineLogs[activeYearIndex].title_es}</h4>
                </div>
                <p className="text-xs text-concrete leading-relaxed">
                  {lang === 'en' ? timelineLogs[activeYearIndex].desc_en : timelineLogs[activeYearIndex].desc_es}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Visual Blueprint-to-Building Transformation Animation */}
        <div className="lg:col-span-6 bg-[#111827]/80 rounded-xl border border-white/5 p-6 relative flex flex-col justify-between align-middle min-h-[300px]">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

          <div className="border-b border-white/10 pb-3 mb-4">
            <h4 className="text-xs font-mono text-concrete uppercase tracking-widest">
              {lang === 'en' ? "Structural Phase Progression Drawing" : "Diagrama de Evolución de Fase de Losa"}
            </h4>
          </div>

          {/* Interactive Steps Visual Map */}
          <div className="grid grid-cols-3 gap-4 text-center">
            
            {/* Phase 1: Blueprint */}
            <div className="border border-white/5 rounded-lg p-4 bg-slate-950 relative flex flex-col items-center">
              <div className="w-10 h-10 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction mb-2">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase text-white tracking-widest">PHASE 01</span>
              <span className="text-[9px] font-mono text-concrete uppercase tracking-wider mt-1">
                {lang === 'en' ? "Cad Blueprint" : "Análisis Cad"}
              </span>
            </div>

            {/* Phase 2: Pouring */}
            <div className="border border-white/5 rounded-lg p-4 bg-slate-950 relative flex flex-col items-center">
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 text-construction">
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded bg-safety/10 border border-safety/30 flex items-center justify-center text-safety mb-2">
                <Hammer className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase text-white tracking-widest">PHASE 02</span>
              <span className="text-[9px] font-mono text-concrete uppercase tracking-wider mt-1">
                {lang === 'en' ? "Pouring concrete" : "Colado de loza"}
              </span>
            </div>

            {/* Phase 3: Completed */}
            <div className="border border-white/5 rounded-lg p-4 bg-slate-950 relative flex flex-col items-center">
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 text-construction">
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mb-2">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase text-white tracking-widest">PHASE 03</span>
              <span className="text-[9px] font-mono text-concrete uppercase tracking-wider mt-1">
                {lang === 'en' ? "Completion" : "Estructura Lista"}
              </span>
            </div>

          </div>

          <div className="mt-6 p-3 bg-slate-950 border border-white/5 rounded font-mono text-[9px] text-[#f8fafc] tracking-widest text-center uppercase">
            {lang === 'en' ? "Telemetry diagnostics active // structural integrity status" : "Diagnóstico de telemetría activo // integridad estructural óptima"}
          </div>

        </div>

      </div>
    </div>
  );
}
