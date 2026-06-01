import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, MapPin, Calendar, Layers, ShieldCheck, Milestone, CheckCircle, Activity, Globe, X, ExternalLink } from "lucide-react";
import { Language, Project } from "../types";
import ComparisonsSlider from "./ComparisonsSlider";

interface ProjectDashboardProps {
  lang: Language;
}

export default function ProjectDashboard({ lang }: ProjectDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'civil' | 'utility' | 'industrial' | 'engineering'>('all');

  useEffect(() => {
    // Acquire live telemetry project registries
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (e) {
        console.error("Telemetry failed to synchronize active projects database:", e);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div id="projects-section" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto text-white select-none">
      
      {/* Container Headings */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8 relative">
        <div className="absolute inset-0 blueprint-grid-fine opacity-10 pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#F97316] font-bold uppercase">
            <Activity className="w-4 h-4 text-construction animate-pulse" />
            <span>{lang === 'en' ? "ACTIVE TENDERS & ASSETS" : "CENTRO DE CONTROL DE BITÁCORAS DE OBRA"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
            {lang === 'en' ? "COMMAND CONSOLE • ACTIVE PROJECTS" : "CONSOLA DE CONTROL • OBRAS ACTIVAS"}
          </h2>
          <p className="text-xs text-concrete max-w-xl">
            {lang === 'en'
              ? "Real-time engineering checkpoints, completion metrics, and drone-surveyed assets for Utility De Mexico S.A. De C.V. operations."
              : "Verifique avances de obra, porcentajes reales, diagramas de jalón y bitácoras de campo certificadas del estado de Querétaro."}
          </p>
        </div>

        {/* Filter categories tabs panel */}
        <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider relative z-10">
          {['all', 'civil', 'utility', 'industrial'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
                activeFilter === filter 
                  ? "bg-construction text-slate-150 border-construction font-bold font-mono" 
                  : "bg-slate-950 text-concrete border-white/5 hover:border-white/20"
              }`}
            >
              {filter === 'all' ? (lang === 'en' ? "All Assets" : "Todo") : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid containing Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((p) => {
          const isOngoing = p.progress < 100;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="bg-[#111827]/70 rounded-xl border border-white/5 hover:border-construction/30 p-6 flex flex-col justify-between overflow-hidden relative cursor-pointer group transition-all duration-300"
            >
              <div className="absolute inset-0 blueprint-grid opacity-0 group-hover:opacity-10 pointer-events-none transition-all" />

              <div>
                {/* Header: Status light indicator, location */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-concrete uppercase">
                    <MapPin className="w-3.5 h-3.5 text-construction" />
                    <span>{lang === 'en' ? p.location_en : p.location_es}</span>
                  </div>
                  
                  {/* Visual Glow Beacon */}
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase ${
                    isOngoing 
                      ? "bg-amber-950/40 border border-amber-500/30 text-amber-400" 
                      : "bg-green-950/40 border border-green-500/30 text-green-400"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${isOngoing ? "bg-amber-400" : "bg-green-400"}`} />
                    <span>{lang === 'en' ? p.status_en : p.status_es}</span>
                  </div>
                </div>

                {/* Title and Category */}
                <h3 className="text-lg font-extrabold font-display uppercase tracking-wide group-hover:text-construction transition-colors leading-tight">
                  {lang === 'en' ? p.name_en : p.name_es}
                </h3>
                <span className="text-[10px] font-mono text-concrete uppercase tracking-widest block mt-1.5">
                  Category: {p.category} // {p.client}
                </span>

                {/* Description snippet */}
                <p className="text-xs text-concrete leading-relaxed mt-4 line-clamp-2">
                  {lang === 'en' ? p.description_en : p.description_es}
                </p>
              </div>

              {/* Progress metric footer bar */}
              <div className="mt-8 border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between items-end font-mono text-xs">
                  <span className="text-concrete uppercase tracking-widest text-[10px]">
                    {lang === 'en' ? "CALIBRATED PROGRESS" : "PROGRESO DE OBRA"}
                  </span>
                  <span className="font-bold text-construction">{p.progress}%</span>
                </div>
                {/* Custom visual progress bar */}
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-construction to-safety transition-all duration-300"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                {/* Micro telemetry footer metrics */}
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1 uppercase">
                  <span>Valuation: {p.budget}</span>
                  <span>{lang === 'en' ? "CLICK TO INSPECT TRANSITION" : "CLIC PARA CONTROL DE LOSA"}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* High-End Comparative Slide-Over Panel Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Dark glass backdrop layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Solid Drawer pane inside */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full md:w-[600px] xl:w-[680px] h-full bg-[#0a0e17] border-l border-white/10 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Close handle top bar */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-xs font-mono text-concrete uppercase tracking-widest">
                    Project Command File // {selectedProject.id.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-1 px-2.5 rounded bg-slate-900 border border-white/10 text-concrete hover:text-white text-xs font-mono transition-all cursor-pointer flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    <span>{lang === 'en' ? "Close" : "Cerrar"}</span>
                  </button>
                </div>

                {/* Core Title */}
                <div>
                  <h3 className="text-2xl font-bold font-display uppercase tracking-wide leading-tight">
                    {lang === 'en' ? selectedProject.name_en : selectedProject.name_es}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-concrete mt-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-construction" />
                      {lang === 'en' ? selectedProject.location_en : selectedProject.location_es}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-safety" />
                      {selectedProject.timeline}
                    </span>
                    <span>•</span>
                    <span className="text-construction font-bold">Val: {selectedProject.budget}</span>
                  </div>
                </div>

                {/* Extended Description */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-concrete uppercase tracking-widest font-bold">
                    {lang === 'en' ? "Logistics Details" : "Especificaciones de Obra"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-white/5 font-sans">
                    {lang === 'en' ? selectedProject.description_en : selectedProject.description_es}
                  </p>
                </div>

                {/* Before-and-After Comparisons Draggable slider */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-concrete uppercase tracking-widest font-bold">
                    {lang === 'en' ? "Comparative Drone Photogrammetry" : "Fotogrametría Comparativa"}
                  </h4>
                  <ComparisonsSlider 
                    beforeUrl={selectedProject.beforeUrl}
                    afterUrl={selectedProject.afterUrl}
                    lang={lang}
                  />
                </div>

                {/* Milestones timeline track inside */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-concrete uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Milestone className="w-4 h-4 text-construction" />
                    <span>{lang === 'en' ? "Checkpoint Milestones Log" : "Bitácoras de Criterio de Enlace de CFE"}</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.milestones.map((m, mIdx) => (
                      <div 
                        key={mIdx}
                        className="flex items-start gap-3 bg-slate-950/40 p-3 rounded-lg border border-white/5"
                      >
                        <div className="mt-0.5">
                          {m.status === 'completed' ? (
                            <CheckCircle className="w-4.5 h-4.5 text-green-500" />
                          ) : m.status === 'active' ? (
                            <Activity className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                          ) : (
                            <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-705 shrink-0" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-sans font-semibold text-white truncate">
                            {lang === 'en' ? m.title_en : m.title_es}
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase mt-0.5">
                            <span>{m.date}</span>
                            <span className={m.status === 'completed' ? 'text-green-500' : m.status === 'active' ? 'text-amber-500' : 'text-slate-600'}>
                              {m.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Slideshow metadata footer */}
              <div className="border-t border-white/5 pt-4 mt-6 text-[10px] font-mono text-concrete/40 flex justify-between uppercase tracking-widest">
                <span>SYSTEM DISPATCH ID: {selectedProject.id}</span>
                <span>UTILITY DE MEXICO SECURITY PLATFORM</span>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
