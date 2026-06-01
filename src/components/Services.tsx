import { motion } from "motion/react";
import { Hammer, Zap, Factory, Landmark, Cpu, HardHat, Compass } from "lucide-react";
import { Language } from "../types";

interface ServicesProps {
  lang: Language;
}

export default function Services({ lang }: ServicesProps) {
  
  const servicesList = [
    {
      id: "civil",
      icon: <Hammer className="w-6 h-6 text-construction" />,
      title_en: "Heavy Civil Construction",
      title_es: "Construcción Civil Pesada",
      desc_en: "Municipal highways, regional bridges, concrete bypass loops, retaining barriers, and arterial paving to SCT (Federal Communications and Transport) regulations.",
      desc_es: "Pavimentación estructural de autopistas, libramientos estatales, puentes estructurales y obras civiles alineadas a la normativa federal de la SCT.",
      indicators_en: ["Asphalt Paving", "Overpass Beams", "Retaining Walls"],
      indicators_es: ["Asfalto Estructural", "Trabes y Pilastras", "Muros Mecánicamente Estabilizados"]
    },
    {
      id: "utility",
      icon: <Zap className="w-6 h-6 text-safety" />,
      title_en: "Utility Network Installation",
      title_es: "Instalaciones de Servicios Públicos",
      desc_en: "Pressurized hydrologics mains complying with CEA, high-voltage electrical transformers, substation layout, fire suppressants, and deep municipal drainage pipelines.",
      desc_es: "Tuberías de presión de PEAD auditadas por la CEA, redes eléctricas de alta tensión, subestaciones industriales certificadas ante la CFE e infraestructuras de drenajes.",
      indicators_en: ["HDPE Pipe Fusion", "Substations (CFE)", "Hydraulic Mains (CEA)"],
      indicators_es: ["Termofusión PEAD", "Subestaciones CFE", "Colectores CEA Querétaro"]
    },
    {
      id: "industrial",
      icon: <Factory className="w-6 h-6 text-construction" />,
      title_en: "Industrial Construction",
      title_es: "Edificación Industrial",
      desc_en: "Structural portal frame warehouse erection, high-load capacities laser-leveled post-tensioned concrete flooring slabs, deep machine beds, and insulated cladding.",
      desc_es: "Montaje de naves industriales de marcos rígidos, pisos de concreto postensados nivelados por láser para cargas críticas, cimentaciones pesadas de maquinaria y paneles aislados.",
      indicators_en: ["Laser-Leveled Slabs", "Structural Girders", "Insulated Shroud Cladding"],
      indicators_es: ["Losas Postensadas", "Marcos Rígidos Metálicos", "Láminas y Aislamiento Térmico"]
    },
    {
      id: "consulting",
      icon: <Landmark className="w-6 h-6 text-safety" />,
      title_en: "Engineering Consulting",
      title_es: "Consultoría y Firma de Perito",
      desc_en: "CAD blueprint modeling, geotechnical surveying, site logistics pre-planning, timeline optimization metrics, and official structural perito certifications.",
      desc_es: "Diseño CAD tridimensional, análisis periciales, firmas de corresponsabilidad estructural, estudios geotécnicos de suelo y planes de logística constructiva.",
      indicators_en: ["CAD Blueprinting", "Geotech Drilling", "Pericial Structural Sign-Off"],
      indicators_es: ["Ingeniería de Planos", "Muestreos de Geotecnia", "Firma y Registro de Perito"]
    }
  ];

  return (
    <div id="services-section" className="py-20 px-6 sm:px-8 bg-gradient-to-b from-[#0c1220] to-[#070b13] relative select-none">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto text-white">
        
        {/* Headings */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 text-[10px] font-mono tracking-widest text-construction font-bold uppercase mb-2">
            <Compass className="w-4 h-4 text-construction animate-spin-slow" />
            <span>{lang === 'en' ? "CAPABILITIES DECK" : "ESPECIALIDADES DE INGENIERÍA"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
            {lang === 'en' ? "INFRASTRUCTURE SERVICES" : "SERVICIOS DE INFRAESTRUCTURA"}
          </h2>
          <p className="text-xs text-concrete mt-3 leading-relaxed">
            {lang === 'en' 
              ? "Utility De Mexico deploys specialized heavy machinery, advanced geotechnical calibrations, and certified labor across four critical industrial categories."
              : "Desplegamos maquinaria pesada especializada, calibraciones geotécnicas y cuadrillas certificadas a través de cuatro categorías de ingeniería estructural."}
          </p>
        </div>

        {/* Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="group hover:-translate-y-1.5 bg-[#111827]/80 rounded-xl border border-white/5 hover:border-construction/40 p-6 relative flex flex-col justify-between overflow-hidden transition-all duration-300 min-h-[380px]"
            >
              {/* Card structural holographic blueprint grid background on hover */}
              <div className="absolute inset-0 blueprint-grid-fine opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300" />

              {/* Icon layout */}
              <div className="mb-6 relative z-10">
                <div className="w-12 h-12 rounded bg-slate-950 flex items-center justify-center p-2 inline-block border border-white/5 group-hover:bg-[#111827] group-hover:border-construction/40 transition-all">
                  {service.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-3 relative z-10 flex-grow">
                <h3 className="font-extrabold font-display text-base tracking-wide uppercase text-white group-hover:text-construction transition-colors">
                  {lang === 'en' ? service.title_en : service.title_es}
                </h3>
                <p className="text-xs text-concrete leading-relaxed">
                  {lang === 'en' ? service.desc_en : service.desc_es}
                </p>
              </div>

              {/* Indicators tag list feet */}
              <div className="mt-8 border-t border-white/5 pt-4 space-y-1.5 relative z-10">
                {(lang === 'en' ? service.indicators_en : service.indicators_es).map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] font-mono text-concrete/70 group-hover:text-white uppercase transition-colors">
                    <span className="w-1 h-1 bg-construction rounded-full shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

              {/* Corner Telemetry Coordinates marker decoration */}
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-750 opacity-10 group-hover:opacity-30 uppercase transition-opacity">
                CMD_D_REF_{service.id.toUpperCase()}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
