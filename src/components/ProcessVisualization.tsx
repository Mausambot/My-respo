import { motion } from "motion/react";
import { Compass, FileText, ClipboardList, Shovel, HardHat, Hammer, Zap, Eye, CheckCircle } from "lucide-react";
import { Language } from "../types";

interface ProcessVisualizationProps {
  lang: Language;
}

export default function ProcessVisualization({ lang }: ProcessVisualizationProps) {
  
  const workflowStages = [
    {
      id: 1,
      icon: <Compass className="w-5 h-5" />,
      title_en: "Site Survey / Geotech",
      title_es: "Estudio Topográfico",
      desc_en: "Analyze ground grade core parameters and logistics lanes in Querétaro.",
      desc_es: "Estudio geotécnico de suelo y determinación de coordenadas topográficas."
    },
    {
      id: 2,
      icon: <FileText className="w-5 h-5" />,
      title_en: "Planning & Budgets",
      title_es: "Planeación y Costos",
      desc_en: "Finalize Gantt milestone schedules and allocate metal raw stock materials.",
      desc_es: "Cronograma robusto e integración de suministros metálicos y de concreto."
    },
    {
      id: 3,
      icon: <ClipboardList className="w-5 h-5" />,
      title_en: "Blueprint CAD Design",
      title_es: "Diseño de Planos CAD",
      desc_en: "Draft structural drawings and calculations verified by certified perito.",
      desc_es: "Modelado tridimensional de estructuras de acero con firma pericial."
    },
    {
      id: 4,
      icon: <Shovel className="w-5 h-5" />,
      title_en: "Ground Preparation",
      title_es: "Preparación del Terreno",
      desc_en: "Execute major heavy grading, cutting, and soil compaction.",
      desc_es: "Conformación de plataformas con compactación estabilizada pesada."
    },
    {
      id: 5,
      icon: <HardHat className="w-5 h-5" />,
      title_en: "Foundation Pouring",
      title_es: "Cimentación de Concreto",
      desc_en: "Pour deep reinforced pile support footings and post-tensioned floor slabs.",
      desc_es: "Vaciado de concreto estructural de alta resistencia para zapatas."
    },
    {
      id: 6,
      icon: <Hammer className="w-5 h-5" />,
      title_en: "Structural Framework",
      title_es: "Súperestructura",
      desc_en: "Erect heavy-gauge rigid steel frames and industrial structural portals.",
      desc_es: "Montaje de columnas rígidas de acero y armaduras metálicas de claro libre."
    },
    {
      id: 7,
      icon: <Zap className="w-5 h-5" />,
      title_en: "Utilities Integration",
      title_es: "Instalación de Servicios",
      desc_en: "Install pressurized water loops and high-voltage substation switchgear.",
      desc_es: "Termofusión de colectores hidráulicos e interconexión a subestaciones CFE."
    },
    {
      id: 8,
      icon: <Eye className="w-5 h-5" />,
      title_en: "Official Inspections",
      title_es: "Auditorías de SCT / CFE",
      desc_en: "Authorize core structural integrity and state-level safety clearances.",
      desc_es: "Pruebas hidrostáticas y de aislamiento eléctrico bajo normas federales."
    },
    {
      id: 9,
      icon: <CheckCircle className="w-5 h-5" />,
      title_en: "Project Handover",
      title_es: "Entrega de Llave",
      desc_en: "Final walk-through, telemetry code synchronization, and certified delivery.",
      desc_es: "Entrega de actas oficiales de obra y traspaso operativo de activos de red."
    }
  ];

  return (
    <div className="py-20 bg-[#070b13] border-t border-white/5 relative z-10 select-none">
      <div className="absolute inset-0 blueprint-grid-fine opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-white">
        
        {/* Section Headings */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#F97316] font-bold">
            {lang === 'en' ? "CERTIFIED WORKFLOW STREAM" : "SECUENCIA DE INGENIERÍA CERTIFICADA"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight mt-1.5">
            {lang === 'en' ? "THE CONSTRUCTION ROADMAP" : "PROCESO EJECUTIVO DE OBRA"}
          </h2>
          <p className="text-xs text-concrete mt-3 leading-relaxed">
            {lang === 'en'
              ? "We implement a strict, sequential 9-phase system ensuring every civil highway bypass or high-voltage substation meets exact tolerances."
              : "Desarrollamos un protocolo riguroso de 9 etapas consecutivas que garantiza cero desviaciones estructurales desde la geotecnia hasta la entrega."}
          </p>
        </div>

        {/* Diagonal Progression workflow list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowStages.map((stage) => (
            <div 
              key={stage.id}
              className="group bg-slate-900/40 p-5 rounded-lg border border-white/5 hover:border-construction/30 transition-all flex gap-4 relative overflow-hidden"
            >
              {/* Telemetry numbering backdrop */}
              <div className="absolute -bottom-8 -right-4 font-mono text-8xl font-black text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none">
                {String(stage.id).padStart(2, '0')}
              </div>

              {/* Step indicator circle icon */}
              <div className="w-10 h-10 rounded-lg bg-construction/10 border border-construction/30 flex items-center justify-center text-construction group-hover:bg-construction group-hover:text-slate-950 transition-colors shrink-0">
                {stage.icon}
              </div>

              {/* Texts */}
              <div className="space-y-1 relative z-10">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="text-construction font-black">PH-{String(stage.id).padStart(2, '0')}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-white group-hover:text-construction transition-colors">
                    {lang === 'en' ? stage.title_en : stage.title_es}
                  </span>
                </div>
                <p className="text-xs text-concrete leading-relaxed">
                  {lang === 'en' ? stage.desc_en : stage.desc_es}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
