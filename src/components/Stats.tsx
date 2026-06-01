import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Award, Layers, Users, Star } from "lucide-react";
import { Language } from "../types";

interface StatsProps {
  lang: Language;
}

export default function Stats({ lang }: StatsProps) {
  // Stats counters state
  const [projectsCount, setProjectsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [workforceCount, setWorkforceCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0.0);

  useEffect(() => {
    // Elegant incremental tally simulation
    const duration = 2000; // 2 seconds total running
    const steps = 40;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      if (stepCount >= steps) {
        setProjectsCount(150);
        setYearsCount(18);
        setWorkforceCount(450);
        setSatisfactionCount(4.1);
        clearInterval(timer);
      } else {
        const ratio = stepCount / steps;
        setProjectsCount(Math.floor(ratio * 150));
        setYearsCount(Math.floor(ratio * 18));
        setWorkforceCount(Math.floor(ratio * 450));
        setSatisfactionCount(parseFloat((ratio * 4.1).toFixed(1)));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0b0f19] border-y border-white/5 py-12 px-6 sm:px-8 relative z-10 font-display select-none">
      <div className="absolute inset-0 blueprint-grid-fine opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Stat 1: Projects */}
        <div className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-lg border border-white/5 relative group hover:border-construction/30 transition-all">
          <div className="w-10 h-10 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction mb-3 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-center leading-none">
            <span>{projectsCount}</span>
            <span className="text-construction font-bold ml-0.5">+</span>
          </div>
          <span className="text-[10px] font-mono text-concrete uppercase tracking-widest mt-2">
            {lang === 'en' ? "Projects Completed" : "Proyectos Completados"}
          </span>
        </div>

        {/* Stat 2: Years */}
        <div className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-lg border border-white/5 relative group hover:border-construction/30 transition-all">
          <div className="w-10 h-10 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-center leading-none">
            <span>{yearsCount}</span>
            <span className="text-construction font-bold ml-0.5">+</span>
          </div>
          <span className="text-[10px] font-mono text-concrete uppercase tracking-widest mt-2">
            {lang === 'en' ? "Years Industrial Experience" : "Años de Experiencia Industrial"}
          </span>
        </div>

        {/* Stat 3: Staff */}
        <div className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-lg border border-white/5 relative group hover:border-construction/30 transition-all">
          <div className="w-10 h-10 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction mb-3 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-center leading-none">
            <span>{workforceCount}</span>
            <span className="text-construction font-bold ml-0.5">+</span>
          </div>
          <span className="text-[10px] font-mono text-concrete uppercase tracking-widest mt-2">
            {lang === 'en' ? "Skilled Workforce" : "Ingenieros y Operadores"}
          </span>
        </div>

        {/* Stat 4: Satisfaction */}
        <div className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-lg border border-white/5 relative group hover:border-construction/30 transition-all">
          <div className="w-10 h-10 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction mb-3 group-hover:scale-105 transition-transform">
            <Star className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-center leading-none">
            <span>{satisfactionCount.toFixed(1)}</span>
            <span className="text-construction font-bold ml-1">/ 5</span>
          </div>
          <span className="text-[10px] font-mono text-concrete uppercase tracking-widest mt-2">
            {lang === 'en' ? "Client Satisfaction" : "Índice de Satisfacción"}
          </span>
        </div>

      </div>
    </div>
  );
}
