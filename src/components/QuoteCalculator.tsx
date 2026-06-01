import { useState, useEffect, FormEvent } from "react";
import { motion } from "motion/react";
import { Calculator, Save, FileText, CheckCircle, RefreshCcw, DollarSign, HelpCircle } from "lucide-react";
import { Language, Quote } from "../types";

interface QuoteCalculatorProps {
  lang: Language;
}

export default function QuoteCalculator({ lang }: QuoteCalculatorProps) {
  // Input fields
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [projectType, setProjectType] = useState("industrial");
  const [sizeSqm, setSizeSqm] = useState(500);
  const [locationState, setLocationState] = useState("Querétaro");
  const [budgetRange, setBudgetRange] = useState("$1M - $5M USD");
  
  // Results
  const [loading, setLoading] = useState(false);
  const [resultQuote, setResultQuote] = useState<Quote | null>(null);
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypesList = [
    { value: "civil", label_en: "Civil Construction (Roads/Highways)", label_es: "Construcción Civil (Caminos/Puentes)" },
    { value: "utility", label_en: "Utility Network Infrastructure", label_es: "Disposición de Servicios Públicos / Hidráulicos" },
    { value: "industrial", label_en: "Industrial Warehouse Facility", label_es: "Bodega o Complejo Industrial" },
    { value: "engineering", label_en: "Engineering/Planning Consulting", label_es: "Consultoría y Diseño de Ingeniería" }
  ];

  const mexicanStates = [
    { value: "Querétaro", label: "Querétaro (Industrial Hub)" },
    { value: "Nuevo León", label: "Nuevo León (Norte border rate)" },
    { value: "Jalisco", label: "Jalisco (Zona Centro rate)" },
    { value: "Ciudad de México", label: "Ciudad de México (Capitol logistics)" },
    { value: "Guanajuato", label: "Guanajuato (Bajío Corridor)" }
  ];

  // Load previous quotes from backend on mount
  const fetchSavedQuotes = async () => {
    try {
      const response = await fetch("/api/quotes");
      if (response.ok) {
        const data = await response.json();
        setSavedQuotes(data);
      }
    } catch (e) {
      console.error("Failed to load saved database quotes:", e);
    }
  };

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  const handleCalculate = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName) {
      setErrorMessage(lang === 'en' ? "Please provide a Client Name to register." : "Por favor ingrese un Nombre de Cliente.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientCompany,
          projectType,
          sizeSqm: Number(sizeSqm),
          budgetRange,
          locationState,
          timelineMonths: 12
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setResultQuote(data.quote);
          fetchSavedQuotes(); // refresh history list
        }
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Estimation failure.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(lang === 'en' ? "Server timeout. Retrying." : "Error de comunicación con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClientName("");
    setClientCompany("");
    setProjectType("industrial");
    setSizeSqm(500);
    setLocationState("Querétaro");
    setResultQuote(null);
  };

  return (
    <div id="quote-calculator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-white relative">
      
      {/* 1. Left Input panel */}
      <div className="lg:col-span-7 bg-[#111827]/80 backdrop-blur rounded-xl border border-white/5 p-6 relative overflow-hidden">
        {/* Wireframe background grid inside the panel */}
        <div className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none" />

        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6 relative z-10">
          <Calculator className="w-5 h-5 text-construction" />
          <div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider">
              {lang === 'en' ? "Estimator Terminal" : "Terminal de Cotizaciones"}
            </h3>
            <p className="text-xs text-concrete">
              {lang === 'en' ? "Configure structural inputs & state zoning metrics" : "Establezca los parámetros de ingeniería y zonificación de obra"}
            </p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4 relative z-10 text-sm">
          {errorMessage && (
            <div className="p-3 bg-red-950/50 border border-red-800 rounded text-red-300 text-xs">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                {lang === 'en' ? "Contact Name *" : "Nombre de Contacto *"}
              </label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                placeholder={lang === 'en' ? "Ing. Alejandro Ruiz" : "Ing. Alejandro Ruiz"}
                className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-construction"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                {lang === 'en' ? "Corporate Entity / Company" : "División / Empresa"}
              </label>
              <input 
                type="text" 
                value={clientCompany} 
                onChange={(e) => setClientCompany(e.target.value)} 
                placeholder="CEO Logistics Mexico S.A."
                className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-construction"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                {lang === 'en' ? "Industrial Classification" : "Clasificación de Obra"}
              </label>
              <select 
                value={projectType} 
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-construction"
              >
                {projectTypesList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {lang === 'en' ? item.label_en : item.label_es}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                {lang === 'en' ? "Mexican Territory Zoning" : "Zonificación del Estado"}
              </label>
              <select 
                value={locationState} 
                onChange={(e) => setLocationState(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-construction"
              >
                {mexicanStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-concrete uppercase tracking-widest font-semibold">
                  {lang === 'en' ? "Structural Footprint Area" : "Área de Huella Estructural"}
                </label>
                <span className="text-xs font-mono font-bold text-construction">{sizeSqm} m²</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="50"
                value={sizeSqm} 
                onChange={(e) => setSizeSqm(Number(e.target.value))}
                className="w-full accent-construction cursor-pointer py-1"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>100 m²</span>
                <span>5,000 m²</span>
                <span>10,000 m²</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                {lang === 'en' ? "Indicative Budget Target" : "Presupuesto Objetivo Indicativo"}
              </label>
              <select 
                value={budgetRange} 
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-construction"
              >
                <option value="Under $1M USD">{lang === 'en' ? "Under $1M USD" : "Menor a $1M USD"}</option>
                <option value="$1M - $5M USD">$1M - $5M USD</option>
                <option value="$5M - $15M USD">$5M - $15M USD</option>
                <option value="Over $15M USD">{lang === 'en' ? "Over $15M" : "Mayor a $15M USD"}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-construction to-safety hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold py-2.5 px-4 rounded flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-wider"
            >
              <Calculator className="w-4 h-4" />
              {loading ? (lang === 'en' ? "PROCESSING..." : "PROCESANDO...") : (lang === 'en' ? "GENERATE COST PROJECTION" : "GENERAR PROYECCIÓN DE COSTO")}
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="bg-slate-900 hover:bg-slate-800 border border-white/10 rounded px-4 py-2.5 text-concrete hover:text-white text-xs font-mono"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* 2. Right Result panel */}
      <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between">
        {resultQuote ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111827] border-2 border-construction/40 rounded-xl p-6 relative flex-grow flex flex-col justify-between"
          >
            {/* Stamp marker */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-construction/10 border border-construction/30 rounded px-2 py-0.5 font-mono text-[9px] text-construction font-bold tracking-widest">
              <CheckCircle className="w-3 h-3" />
              <span>RECORD SAVED</span>
            </div>

            <div className="border-b border-white/10 pb-4 mb-4">
              <div className="text-[10px] font-mono text-construction tracking-widest font-bold">
                {lang === 'en' ? "OFFICIAL PRE-ESTIMATE RECEIPT" : "RECIBO PRE-ESTIMACIÓN OFICIAL"}
              </div>
              <h4 className="text-xl font-bold font-display tracking-wide uppercase mt-1">
                {resultQuote.id}
              </h4>
              <p className="text-xs text-concrete font-mono uppercase tracking-widest mt-1">
                Ref: {resultQuote.clientName} // {resultQuote.clientCompany}
              </p>
            </div>

            {/* Total Estimated Cost */}
            <div className="bg-slate-950 border border-white/5 rounded-lg p-4 text-center mb-4">
              <div className="text-[10px] font-mono text-concrete uppercase tracking-widest mb-1">
                {lang === 'en' ? "TOTAL CALCULATED VALUATION" : "VALUACIÓN TOTAL CALCULADA"}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-construction flex items-center justify-center gap-1">
                <span className="text-lg text-safety">$</span>
                {resultQuote.estimatedCostUsd.toLocaleString()}
                <span className="text-xs text-concrete ml-1">USD</span>
              </div>
              <div className="text-[9px] font-mono text-safety/60 mt-1 uppercase tracking-wider">
                {lang === 'en' ? "*Excluding local state IVA (16% MXN)*" : "*Sin incluir IVA federal mexicano de obra (16%)*"}
              </div>
            </div>

            {/* Custom SVG Budget Chart Breakdown */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono text-concrete uppercase tracking-widest font-bold block mb-1">
                {lang === 'en' ? "Structural Cost Allocation" : "Distribución de Costos de Ingeniería"}
              </span>

              {resultQuote.breakdown.map((item, index) => {
                const percentage = index === 0 ? 15 : index === 1 ? 35 : index === 2 ? 25 : index === 3 ? 15 : 10;
                return (
                  <div key={index} className="text-xs space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-white/80 truncate max-w-[240px]">
                        {lang === 'en' ? item.item_en : item.item_es}
                      </span>
                      <span className="text-construction font-bold">${item.cost.toLocaleString()}</span>
                    </div>
                    {/* Visual meter bar */}
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-construction" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[9px] font-mono text-concrete/40 uppercase tracking-widest text-center border-t border-white/5 pt-4">
              Registered Date: {resultQuote.date} // UTILITY DE MEXICO S.A. DE C.V.
            </div>
          </motion.div>
        ) : (
          <div className="border border-white/5 border-dashed rounded-xl p-8 flex-grow flex flex-col justify-center items-center text-center bg-slate-900/20">
            <Calculator className="w-12 h-12 text-slate-700 animate-pulse mb-4" />
            <h4 className="text-sm font-bold font-display uppercase tracking-widest mb-2 text-concrete">
              {lang === 'en' ? "Terminal Static Mode" : "Modo Terminal Estático"}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              {lang === 'en' ? "Please fulfill the construction form on the left. The neural logistics command module will calculate detailed bills." : "Establezca las dimensiones y el tipo de obra para persistir una estimación oficial."}
            </p>
          </div>
        )}

        {/* Saved Quotes History Panel */}
        {savedQuotes.length > 0 && (
          <div className="mt-4 bg-slate-950 rounded-lg border border-white/5 p-4 max-h-[140px] overflow-y-auto">
            <h4 className="text-[10px] font-mono text-concrete uppercase tracking-widest mb-2 flex items-center gap-1.5 font-bold">
              <FileText className="w-3.5 h-3.5 text-construction" />
              <span>{lang === 'en' ? "Previous Command Center Projections" : "Estimaciones del Centro de Control"}</span>
            </h4>
            <div className="space-y-2">
              {savedQuotes.slice(0, 3).map((q) => (
                <div 
                  key={q.id} 
                  onClick={() => setResultQuote(q)}
                  className="flex justify-between items-center bg-[#111827] px-2.5 py-1.5 rounded border border-white/5 hover:border-construction/40 cursor-pointer text-xs transition-all"
                >
                  <div className="font-mono">
                    <span className="text-construction font-bold">{q.id}</span>
                    <span className="text-concrete mx-1">|</span>
                    <span className="text-white truncate max-w-[120px] inline-block align-bottom">{q.clientCompany}</span>
                  </div>
                  <span className="text-safety font-mono font-semibold">${q.estimatedCostUsd.toLocaleString()} USD</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
