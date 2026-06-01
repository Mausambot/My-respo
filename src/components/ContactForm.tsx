import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MapPin, Phone, Mail, Clock, Compass, CheckCircle2, ShieldCheck, Landmark } from "lucide-react";
import { Language } from "../types";

interface ContactFormProps {
  lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
  // Fields state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("civil");
  const [budgetRange, setBudgetRange] = useState("$1M - $5M USD");
  const [timeline, setTimeline] = useState("Immediate");
  const [description, setDescription] = useState("");

  // Submissions status
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState("");

  const lat = "20.6978";
  const lng = "-100.4439";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) {
      setFeedback(lang === 'en' ? "Please fill all mandatory (*) parameters." : "Por favor rellene los parámetros obligatorios (*).");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          projectType,
          budgetRange,
          timeline,
          description
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setFeedback(data.message);
        // Clear forms
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setTimeline("Immediate");
        setDescription("");
      } else {
        const err = await response.json();
        setFeedback(err.error || "Uplink failure.");
      }
    } catch (err) {
      console.error(err);
      setFeedback(lang === 'en' ? "Server timeout. Please verify internet connection." : "Error de comunicación con el servidor de obras.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-section" className="py-20 px-6 sm:px-8 bg-gradient-to-b from-[#070b13] to-[#0c1220] border-t border-white/5 relative select-none">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto text-white">
        
        {/* Headings */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 text-[10px] font-mono tracking-widest text-[#F97316] font-bold uppercase mb-2">
            <Compass className="w-4 h-4 text-construction animate-spin-slow" />
            <span>{lang === 'en' ? "TENDER DECK ACCESS" : "LICITACIONES Y CONCURSOS"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
            {lang === 'en' ? "DISPATCH CONSULTATION" : "PROPUESTAS DE PROYECTO"}
          </h2>
          <p className="text-xs text-concrete mt-3 leading-relaxed">
            {lang === 'en' 
              ? "Submit construction parameters to our regional Bajío surveyors base. The digital command dispatcher coordinates prompt geotechnical responses."
              : "Establezca contacto directo con nuestra base de obras para licitaciones federales de la CFE, SCT o CEA en Querétaro."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Coordinates telemetry and simulated satellite map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Contact details list */}
            <div className="bg-[#111827] border border-white/5 p-6 rounded-xl space-y-5">
              <h4 className="text-xs font-mono text-concrete uppercase tracking-widest font-bold mb-2">
                {lang === 'en' ? "Command Base Headquarters" : "Oficina Central de Obras"}
              </h4>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#f8fafc]">{lang === 'en' ? "Physical Base Address" : "Dirección de Obras"}</h5>
                    <p className="text-concrete leading-normal mt-0.5">Acceso de Gaza 131, Sin Nombre, Juregui, 76220 Santa Rosa Jáuregui, Qro., Mexico</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#f8fafc]">{lang === 'en' ? "Phone Uplink" : "Conmutador Central"}</h5>
                      <p className="text-concrete mt-0.5">+52 442 291 0962</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#f8fafc]">{lang === 'en' ? "Tender Submissions" : "Correo de Concursos"}</h5>
                      <p className="text-concrete mt-0.5">contacto@utilitydemexico.mx</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated premium concrete telemetry map */}
            <div className="bg-[#111827] border border-white/5 p-4 rounded-xl flex-grow h-[260px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
              
              {/* Telemetry frame details */}
              <div className="flex justify-between font-mono text-[9px] text-[#F97316] relative z-10">
                <span>MX_SATELLITE_UPLINK</span>
                <span>ALT_20.6978 / LNG_-100.4439</span>
              </div>

              {/* Graphic simulated compass blueprint layout */}
              <div className="flex-1 flex flex-col justify-center items-center relative py-6">
                <div className="relative w-28 h-28 border border-dashed border-concrete/30 rounded-full flex items-center justify-center">
                  <div className="absolute inset-2 border border-white/5 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 bg-construction rounded-full flex items-center justify-center animate-ping" />
                  </div>
                  {/* Scope lines crosshairs */}
                  <div className="absolute h-full w-0.5 bg-white/5" />
                  <div className="absolute w-full h-0.5 bg-white/5" />
                  
                  {/* Coords overlay text */}
                  <span className="absolute -bottom-8 font-mono text-[10px] text-white tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                    SANTA ROSA JÁUREGUI HQ
                  </span>
                </div>
              </div>

              {/* Verified badges */}
              <div className="flex justify-between items-center text-[10px] font-mono text-concrete/40 relative z-10 uppercase border-t border-white/5 pt-2">
                <span>GEOTECH COMPLIANT GRID</span>
                <span className="text-safety">4.1 RATING INDEX</span>
              </div>
            </div>

          </div>

          {/* Right panel: Modern comprehensive proposal form */}
          <div className="lg:col-span-7 bg-[#111827]/80 backdrop-blur rounded-xl border border-white/5 p-6 sm:p-8 relative">
            <div className="absolute inset-0 blueprint-grid-fine opacity-10 pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <h4 className="text-xs font-mono text-concrete uppercase tracking-widest font-bold">
                {lang === 'en' ? "Proposal Submission Deck" : "Llenado de Licitación / Proyecto"}
              </h4>
              <span className="text-[10px] font-mono text-construction">SEC_CONN: TR_901</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm relative z-10 text-white">
              
              {feedback && (
                <div className={`p-3 rounded text-xs border ${
                  success 
                    ? "bg-green-950/40 border-green-500/45 text-green-300" 
                    : "bg-red-950/40 border-red-500/40 text-red-300"
                }`}>
                  {feedback}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                    {lang === 'en' ? "Contact Name *" : "Nombre del Contacto *"}
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ing. Alejandro Ruiz"
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                    {lang === 'en' ? "Company / Corporate Entity" : "Empresa o Entidad"}
                  </label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="E.g. Logistics Center Mexico"
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                    {lang === 'en' ? "Electronic Mail *" : "Correo Electrónico *"}
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="aruiz@logisticscenter.mx"
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                    {lang === 'en' ? "Phone Contact" : "Número de Teléfono"}
                  </label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+52 (442) 201-1250"
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                    {lang === 'en' ? "Specialty Category" : "Especialidad Requerida"}
                  </label>
                  <select 
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white"
                  >
                    <option value="civil">{lang === 'en' ? "Heavy Civil (Roads/Bypasses)" : "Obra Civil Pesada (Autopistas)"}</option>
                    <option value="utility">{lang === 'en' ? "Utility Network (CFE/CEA)" : "Instalaciones de CFE / Hidrobiológicas"}</option>
                    <option value="industrial">{lang === 'en' ? "Industrial Facilities" : "Nave Industrial o Bodegas Complejas"}</option>
                    <option value="engineering">{lang === 'en' ? "Engineering Consulting" : "Firma Pericial y Trámites de Geotecnia"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                    {lang === 'en' ? "Project Construction Code" : "Código de Plazo de Inicio"}
                  </label>
                  <select 
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white"
                  >
                    <option value="Immediate">{lang === 'en' ? "Immediate (< 3 months)" : "Inmediato (< 3 meses)"}</option>
                    <option value="Planned">{lang === 'en' ? "Planned (3 - 6 months)" : "Planificado (3 - 6 meses)"}</option>
                    <option value="Tender">{lang === 'en' ? "Public / Private Tender" : "Concurso Público de Licitación"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-concrete uppercase tracking-widest mb-1.5 font-semibold">
                  {lang === 'en' ? "Scope description & structural mandates *" : "Descripción del alcance civil y mandatos *"}
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder={lang === 'en' ? "Please outline excavation sizes, reinforced concrete metrics, CFE network points..." : "Detalle metros cuadrados requeridos, tuberías de PEAD, subestaciones eléctricas..."}
                  className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-construction text-white placeholder-slate-600 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-construction to-safety hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold py-2.5 rounded text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl font-display"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? (lang === 'en' ? "TRANSMITTING DATA..." : "TRANSMITIENDO DATOS...") : (lang === 'en' ? "TRANSMIT PROPOSAL FILES" : "TRANSMITIR ACCESO DE LICITACIÓN")}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
