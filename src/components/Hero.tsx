import { motion } from "motion/react";
import { HardHat, Flame, ArrowUpRight, ShieldCheck, Map } from "lucide-react";
import { Language } from "../types";

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center py-16 px-6 overflow-hidden bg-gradient-to-b from-[#070b13] to-[#0c1220] border-b border-white/5 font-display blueprint-grid select-none">
      
      {/* 1. Cinematic Background Elements: Floating Blueprint grid lines & Crane vector */}
      <div className="absolute inset-0 blueprint-grid-fine opacity-25 pointer-events-none" />

      {/* Floating Laser Vector Lines */}
      <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-construction/20 to-transparent pointer-events-none" />
      <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-safety/10 to-transparent pointer-events-none animate-pulse" />

      {/* Stylized Overhead Crane Boom Arm Animation */}
      <div className="absolute top-10 right-0 left-0 h-20 opacity-10 pointer-events-none z-0">
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="w-full h-full text-construction flex justify-end pr-20"
        >
          <div className="w-96 flex flex-col items-end">
            {/* Crane Truss */}
            <div className="w-80 h-3 bg-gradient-to-r from-transparent via-construction to-construction relative">
              <div className="absolute -bottom-8 right-6 w-0.5 h-8 bg-dashed bg-white border border-dashed border-white/30" />
              <div className="absolute -bottom-10 right-4 w-4 h-4 rounded-full bg-safety animate-pulse" />
            </div>
            {/* Support Tower stub */}
            <div className="w-2.5 h-16 bg-construction -mt-1" />
          </div>
        </motion.div>
      </div>

      {/* Vertical Telemetry Side Ribbon (Ruler style) */}
      <div className="absolute left-6 inset-y-12 w-0.5 border-l border-dashed border-white/10 hidden md:flex flex-col justify-between text-[9px] font-mono text-concrete/40 z-10">
        <span>GRID_ALT_0.00</span>
        <span>GRID_ALT_2.50</span>
        <span>GRID_ALT_5.00</span>
        <span>GRID_ALT_7.50</span>
        <span>GRID_ALT_10.00</span>
      </div>

      {/* 2. Main High-End Brand Content Deck */}
      <div className="max-w-4xl text-center relative z-10 px-4">
        
        {/* Top telemetry badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#111827]/80 backdrop-blur border border-construction/30 rounded-full px-3.5 py-1.5 text-[10px] font-mono tracking-widest text-[#f8fafc] mb-6 shadow-lg"
        >
          <span className="w-1.5 h-1.5 bg-construction rounded-full inline-block animate-ping" />
          <span>{lang === 'en' ? "MEXICO'S LEADING CONTRACTOR" : "LIDER CONTRATISTA DE INFRAESTRUCTURA"}</span>
        </motion.div>

        {/* Heavy display headings */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold pb-2 tracking-tighter leading-[1.05] text-[#f8fafc]"
        >
          {lang === 'en' ? (
            <>
              Engineering <span className="text-construction glow-orange">Infrastructure</span>.<br />
              Building Tomorrow.
            </>
          ) : (
            <>
              Ingeniería de <span className="text-construction glow-orange">Infraestructura</span>.<br />
              Construyendo el Mañana.
            </>
          )}
        </motion.h1>

        {/* Multi-language industrial descriptions */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-concrete text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          {lang === 'en' ? (
            "Delivering reliable civil construction, utility installations, high-voltage networks, and specialized industrial facilities across Mexico."
          ) : (
            "Entregando soluciones confiables de construcción de carreteras, instalaciones de servicios de agua, redes eléctricas de alta tensión y plantas industriales en todo México."
          )}
        </motion.p>

        {/* CTA Button Anchors */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full sm:w-auto"
        >
          {/* Main Inquiry Portal */}
          <a
            href="#projects-section"
            className="bg-gradient-to-r from-construction to-safety hover:opacity-90 text-slate-950 font-extrabold px-8 py-3.5 rounded text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-xl font-display cursor-pointer"
          >
            <span>{lang === 'en' ? "ACTIVATE COMMAND DESK" : "ACTIVAR CENTRO DE OBRA"}</span>
            <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
          </a>

          {/* Real-time calculator trigger */}
          <a
            href="#quote-calculator-section"
            className="bg-slate-950 hover:bg-slate-900 border border-white/10 text-white font-bold px-8 py-3.5 rounded text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-md font-display cursor-pointer"
          >
            <span>{lang === 'en' ? "REQUEST CODES / PRE-ESTIMATE" : "SOLICITAR COTIZACIÓN RÁPIDA"}</span>
          </a>
        </motion.div>

        {/* Mini technical telemetry stats line */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-6 border-t border-white/5 flex flex-wrap justify-center items-center gap-6 text-[10px] font-mono text-concrete uppercase tracking-widest"
        >
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-construction" />
            <span>HQ Santa Rosa, Qro.</span>
          </div>
          <div className="hidden sm:inline text-slate-700">•</div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-safety" />
            <span>4.1 Rating</span>
          </div>
          <div className="hidden sm:inline text-slate-700">•</div>
          <div className="flex items-center gap-1 animate-pulse">
            <Map className="w-3.5 h-3.5 text-sky-500" />
            <span>Active Gaza bypass works</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
