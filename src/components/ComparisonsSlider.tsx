import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { ArrowRightLeft, HelpCircle } from "lucide-react";
import { Language } from "../types";

interface ComparisonsSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  lang: Language;
}

export default function ComparisonsSlider({ 
  beforeUrl, 
  afterUrl, 
  beforeLabel, 
  afterLabel, 
  lang 
}: ComparisonsSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragRef.current) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!dragRef.current) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    dragRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const bLabel = beforeLabel || (lang === 'en' ? "BEFORE" : "ANTES");
  const aLabel = afterLabel || (lang === 'en' ? "COMPLETED" : "COMPLETADO");

  return (
    <div className="flex flex-col gap-2 w-full">
      <div 
        id="comparisons-slider-container"
        ref={containerRef}
        onMouseDown={() => { dragRef.current = true; }}
        onTouchStart={() => { dragRef.current = true; }}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        className="relative w-full h-80 sm:h-96 md:h-[450px] overflow-hidden rounded-lg border border-white/10 select-none cursor-ew-resize bg-slate-950"
      >
        {/* Before Image (underneath, right side) */}
        <img 
          src={beforeUrl} 
          alt="Before Construction" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Badge Label */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-md border border-white/5 font-mono text-[10px] text-white tracking-widest uppercase z-20">
          {bLabel}
        </div>

        {/* After Image (clipped on top, left side) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden" 
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={afterUrl} 
            alt="Completed Infrastructure" 
            className="absolute inset-y-0 left-0 w-full h-full object-cover pointer-events-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width || "100%", maxWidth: "none" }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* After Badge Label */}
        <div className="absolute top-4 left-4 bg-construction/90 backdrop-blur px-3 py-1.5 rounded-md font-mono text-[10px] text-white tracking-widest uppercase z-20">
          {aLabel}
        </div>

        {/* Slider line separator */}
        <div 
          className="absolute inset-y-0 w-1 bg-construction/80 cursor-ew-resize z-25 group"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable Icon Handler Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-construction text-white flex items-center justify-center border-2 border-slate-900 shadow-xl group-hover:scale-110 active:scale-95 transition-transform">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      {/* Visual Guideline Footer hint */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-concrete uppercase tracking-wider">
        <HelpCircle className="w-3.5 h-3.5 text-construction" />
        <span>{lang === 'en' ? "Drag the central slider to compare engineering progression" : "Arrastra el deslizador central para comparar el progreso"}</span>
      </div>
    </div>
  );
}
