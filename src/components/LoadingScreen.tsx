import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HardHat, Activity, Cpu } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [diagnosticText, setDiagnosticText] = useState("Initializing Telemetry...");

  const statusLogs = [
    "Loading Architectural Blueprint Engines...",
    "Cargando Planos y Modelos de Estructura...",
    "Calibrating Laser Grade Sensors...",
    "Calibrando Rejilla Geodésica de Obra...",
    "Establishing CFE Substation Integration...",
    "Estableciendo Enlace de Datos CFE El Saucito...",
    "Deploying Maya Automated Logistics AI...",
    "Cargando Asistente Virtual de Ingeniería...",
    "System Operational. Decoupling Gantt Girders.",
    "Todo Listo. Abriendo Centro de Comando de Obra."
  ];

  useEffect(() => {
    // Increment the progress bar beautifully
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Stagger diagnostic text lines with progress
    const idx = Math.min(Math.floor((progress / 100) * statusLogs.length), statusLogs.length - 1);
    setDiagnosticText(statusLogs[idx]);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-[#0b0f19] text-white flex flex-col justify-between p-8 z-50 overflow-hidden font-display blueprint-grid blueprint-grid-fine">
      {/* Top Bar Telemetry */}
      <div className="flex justify-between items-center text-xs text-concrete uppercase font-mono tracking-widest border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-construction animate-pulse" />
          <span>UTILITY DE MEXICO S.A. DE C.V.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">LOC: 20.6978° N, 100.4439° W</span>
          <span className="text-construction col-span-1">DIAG-SEC-01 // COLD_INTR_OK</span>
        </div>
      </div>

      {/* Center Cinematic Wireframe Drawing */}
      <div className="flex-1 flex flex-col justify-center items-center relative py-12">
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Blueprint Rotating Compass */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-dashed border-construction/20 flex items-center justify-center"
          >
            <div className="w-[90%] h-[90%] rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-[70%] h-[70%] rounded-full border border-dashed border-construction/10" />
            </div>
            {/* Axis points */}
            <span className="absolute top-1 text-[8px] font-mono text-construction/40">N</span>
            <span className="absolute bottom-1 text-[8px] font-mono text-construction/40 font-bold">S</span>
            <span className="absolute right-1 text-[8px] font-mono text-construction/40">E</span>
            <span className="absolute left-1 text-[8px] font-mono text-construction/40">W</span>
          </motion.div>

          {/* Wireframe Building Drawing Animation */}
          <svg viewBox="0 0 100 100" className="w-48 h-48 text-construction select-none z-10">
            {/* Ground grid */}
            <motion.path 
              d="M10,85 L90,85 M20,85 L50,60 L80,85" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeOpacity="0.3"
            />
            {/* Foundation beams */}
            <motion.rect 
              x="20" y="55" width="60" height="30" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              strokeDasharray="200"
              initial={{ strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Structural Column Supports */}
            <motion.line 
              x1="35" y1="55" x2="35" y2="25" 
              stroke="currentColor" 
              strokeWidth="1.2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="origin-bottom"
              transition={{ delay: 0.5, duration: 1.2 }}
            />
            <motion.line 
              x1="65" y1="55" x2="65" y2="25" 
              stroke="currentColor" 
              strokeWidth="1.2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="origin-bottom"
              transition={{ delay: 0.7, duration: 1.2 }}
            />
            {/* Girder Roof Truss */}
            <motion.polygon 
              points="15,25 50,10 85,25" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              strokeDasharray="150"
              initial={{ strokeDashoffset: 150 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
            />
            {/* Horizontal ties */}
            <motion.line 
              x1="35" y1="35" x2="65" y2="35" 
              stroke="currentColor" 
              strokeWidth="1.5"
              strokeDasharray="30"
              initial={{ strokeDashoffset: 30 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            />
            {/* Diagonal cross bracing */}
            <motion.line 
              x1="35" y1="55" x2="65" y2="25" 
              stroke="currentColor" 
              strokeWidth="0.7"
              strokeDasharray="50"
              strokeOpacity="0.6"
              initial={{ strokeDashoffset: 50 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 2.1, duration: 1 }}
            />
            <motion.line 
              x1="65" y1="55" x2="35" y2="25" 
              stroke="currentColor" 
              strokeWidth="0.7"
              strokeDasharray="50"
              strokeOpacity="0.6"
              initial={{ strokeDashoffset: 50 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 2.1, duration: 1 }}
            />
          </svg>

          {/* Core computer module flashing */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full border border-construction/30 bg-construction/5 animate-ping" />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="mt-8 text-center max-w-md">
          <h2 className="text-xl font-bold font-display tracking-widest text-[#f8fafc]">
            UTILITY DE MEXICO
          </h2>
          <p className="text-xs font-mono text-construction/80 uppercase tracking-widest mt-1">
            CONSTRUCCIÓN E INFRAESTRUCTURA
          </p>
        </div>
      </div>

      {/* Bottom Progress Stats & Terminal */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full mb-4">
        {/* Terminal Line */}
        <div className="flex items-center gap-2 font-mono text-xs text-concrete p-3 bg-slate-900/40 rounded border border-white/5 backdrop-blur">
          <Cpu className="text-construction animate-spin w-4.5 h-4.5" />
          <span className="text-construction/90">&gt;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={diagnosticText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="truncate"
            >
              {diagnosticText}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress Bar & Numerical readout */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              style={{ width: `${progress}%` }} 
              className="h-full bg-gradient-to-r from-construction to-safety relative transition-all duration-100"
            >
              {/* Wireframe reflection gleam */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          <span className="font-mono text-sm leading-none font-bold text-construction w-12 text-right">
            {progress}%
          </span>
        </div>
      </div>

      {/* Safety Compliance Footer Notice */}
      <div className="flex justify-between items-center text-[10px] font-mono text-concrete/40 border-t border-white/5 pt-4">
        <span>SCT / CFE STANDARD COMPLIANT INTERFACE</span>
        <span>MX ISO-9001:2026 // COMMAND_INTEGRATIVE</span>
      </div>
    </div>
  );
}
