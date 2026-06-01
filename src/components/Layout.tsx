import { useState, ReactNode } from "react";
import { HardHat, Globe, Phone, Mail, MapPin, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import { Language } from "../types";

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Layout({ children, lang, setLang }: LayoutProps) {
  const [mobileMenu, setMobileMenu] = useState(false);

  // Address and contact metadata
  const phone = "+52 442 291 0962";
  const address = "Acceso de Gaza 131, Sin Nombre, Juregui, 76220 Santa Rosa Jáuregui, Qro., Mexico";

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col font-sans selection:bg-[#F97316] selection:text-slate-950 relative overflow-x-hidden border border-[#374151]/40">
      
      {/* Immersive UI Subtle Overlay grid design */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* 1. Industrial Telemetry Ticker TopBar */}
      <div className="relative bg-[#0b0f19] border-b border-[#374151]/40 py-2 px-4 sm:px-8 text-[11px] font-mono text-[#6B7280] flex justify-between items-center z-30 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#F97316] font-bold shrink-0">
            <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full inline-block animate-ping" />
            <span>SYSTEM ACTIVE // QUERÉTARO HQ</span>
          </span>
          <span className="hidden md:inline text-[#374151]">|</span>
          <div className="hidden lg:flex items-center gap-4">
            <span>UPLINK CODE: SEC_CONN_TR_901</span>
            <span className="text-[#374151]">|</span>
            <span>LAT 20.811 | LNG -100.446</span>
          </div>
        </div>
        
        {/* Contact Quick links & Language Switcher */}
        <div className="flex items-center gap-4">
          <a href={`tel:${phone}`} className="hover:text-[#F97316] transition-colors flex items-center gap-1 text-[#6B7280]">
            <Phone className="w-3 h-3 text-[#F97316]" />
            <span className="hidden sm:inline">{phone}</span>
          </a>
          <span className="text-[#374151]">|</span>
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            id="language-toggle-btn"
            className="flex items-center gap-1 hover:text-[#F97316] transition-colors font-mono font-bold uppercase cursor-pointer text-[#6B7280]"
          >
            <Globe className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{lang === 'en' ? "ES" : "EN"}</span>
          </button>
        </div>
      </div>

      {/* 2. Main High-End Navigation Header compliant with Immersive UI config */}
      <header className="sticky top-0 bg-[#111827]/90 backdrop-blur-md border-b border-[#374151]/50 z-40 px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Brand signature */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 border-2 border-[#F97316] rounded flex items-center justify-center text-[#F97316] font-black tracking-tighter shadow-lg relative overflow-hidden">
            <HardHat className="w-5.5 h-5.5 text-[#F97316] animate-pulse" />
            <div className="absolute top-0 left-0 w-2 h-2 border-r border-b border-[#F97316]/50" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black font-display leading-none tracking-tight text-white">
                UTILITY DE MEXICO
              </h1>
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10b981]" title="System Nominal" />
            </div>
            <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-widest block mt-0.5 leading-none">
              ENGINEERING S.A. DE C.V.
            </span>
          </div>
        </div>

        {/* Traditional desktop navigation anchors */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#6B7280]">
          <a href="#about-section" className="hover:text-[#F97316] transition-colors">
            {lang === 'en' ? "01 / About" : "01 / Nosotros"}
          </a>
          <a href="#services-section" className="hover:text-[#F97316] transition-colors">
            {lang === 'en' ? "02 / Specialties" : "02 / Especialidades"}
          </a>
          <a href="#projects-section" className="hover:text-[#F97316] transition-colors">
            {lang === 'en' ? "03 / Active Work" : "03 / Obras Activas"}
          </a>
          <a href="#quote-calculator-section" className="hover:text-[#F97316] transition-colors">
            {lang === 'en' ? "04 / Estimator" : "04 / Cotizador"}
          </a>
          <a href="#gallery-section" className="hover:text-[#F97316] transition-colors">
            {lang === 'en' ? "05 / Archives" : "05 / Galería"}
          </a>
        </nav>

        {/* CTA Command Desk button */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact-section"
            className="hidden sm:flex bg-[#F97316] hover:bg-orange-600 text-white font-bold px-5 py-2 rounded text-xs tracking-widest uppercase transition-all shadow-lg font-display uppercase border border-orange-500/30"
          >
            {lang === 'en' ? "TENDER CONSULTATION" : "PROPUESTA DE OBRA"}
          </a>
          
          {/* Mobile hamburger menu activator */}
          <button 
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden p-2 rounded hover:bg-slate-800 text-white cursor-pointer"
          >
            <div className="w-5 h-0.5 bg-white mb-1.5" />
            <div className="w-5 h-0.5 bg-white mb-1.5" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu panel */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#0b0f19] border-b border-white/5 py-4 px-6 space-y-3 z-30 font-mono text-sm uppercase">
          <a href="#about-section" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-construction transition-colors">
            {lang === 'en' ? "About" : "Nosotros"}
          </a>
          <a href="#services-section" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-construction transition-colors">
            {lang === 'en' ? "Engineering Specialties" : "Especialidades"}
          </a>
          <a href="#projects-section" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-construction transition-colors">
            {lang === 'en' ? "Active Command Desk" : "Proyectos Activos"}
          </a>
          <a href="#quote-calculator-section" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-construction transition-colors">
            {lang === 'en' ? "Cost Estimator" : "Cotizador"}
          </a>
          <a href="#gallery-section" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-construction transition-colors">
            {lang === 'en' ? "Asset Archives" : "Galería"}
          </a>
          <a href="#contact-section" onClick={() => setMobileMenu(false)} className="block bg-construction text-slate-950 text-center font-bold py-2 rounded">
            {lang === 'en' ? "INQUIRE PROPOSAL" : "INICIAR PROPUESTA"}
          </a>
        </div>
      )}

      {/* 3. Core Content Body */}
      <main className="flex-1">
        {children}
      </main>

      {/* 4. Industrial SEO Optimized Footer */}
      <footer className="relative bg-[#0b0f19] border-t border-[#374151]/50 py-12 px-8 font-sans mt-auto z-10">
        <div className="absolute inset-0 bg-[#111827]/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {/* Brand & Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-900 border border-[#F97316]/50 rounded flex items-center justify-center text-[#F97316] font-black">
                <HardHat className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide text-white">UTILITY DE MEXICO</h4>
                <span className="text-[9px] font-mono text-[#F97316] uppercase tracking-widest leading-none">S.A. DE C.V.</span>
              </div>
            </div>
            
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {lang === 'en' 
                ? "World-class industrial construction and infrastructure contractor. Delivering high-voltage utility networks and heavy civil paving." 
                : "Contratista de obra civil e infraestructura industrial de clase mundial. Entregando redes de alta tensión y pavimentación industrial."}
            </p>

            <div className="space-y-1 text-xs text-[#6B7280]">
              <div className="flex gap-1.5 items-start">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Core Service QuickLinks */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              {lang === 'en' ? "Services Catalog" : "Catálogo de Servicios"}
            </h5>
            <ul className="space-y-1.5 text-xs text-[#6B7280] uppercase font-mono">
              <li><a href="#services-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Civil Construction" : "Obra Civil Carretera"}</a></li>
              <li><a href="#services-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "High Voltage Grid Utilities" : "Instalaciones de CFE / Redes"}</a></li>
              <li><a href="#services-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Factories & Industrial Vaults" : "Naves Industriales y Fábricas"}</a></li>
              <li><a href="#services-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Geotechnical Consulting" : "Firma Pericial e Ingeniería"}</a></li>
            </ul>
          </div>

          {/* Quick links to sections */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              {lang === 'en' ? "Project Commands" : "Navegación de Obra"}
            </h5>
            <ul className="space-y-1.5 text-xs text-[#6B7280] uppercase font-mono">
              <li><a href="#about-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Our History" : "Historia y Valores"}</a></li>
              <li><a href="#projects-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Active Bypass Work" : "Librramiento Gaza"}</a></li>
              <li><a href="#quote-calculator-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Auto Estimator Tool" : "Cotizador en Tiempo Real"}</a></li>
              <li><a href="#contact-section" className="hover:text-[#F97316] transition-colors">{lang === 'en' ? "Tender Submissions" : "Entregar Licitación"}</a></li>
            </ul>
          </div>

          {/* Credentials / Trust indicators */}
          <div className="space-y-4 text-xs">
            <h5 className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              {lang === 'en' ? "Regulatory Division" : "Registro Regulatorio"}
            </h5>
            <p className="text-[#6B7280] leading-relaxed">
              {lang === 'en'
                ? "Our Querétaro base is certified to Mexican Federal codes with SCT, CFE, and state-level CEA hydrological commissions."
                : "Nuestra central en Querétaro cuenta con registros certificados federales ante la SCT, CFE y CEA Querétaro."}
            </p>
            <div className="flex gap-2.5">
              <div className="flex items-center gap-1 text-[10px] bg-slate-900 border border-[#374151]/40 rounded px-2.5 py-1 text-green-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CFE-TRUSTED</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] bg-slate-900 border border-[#374151]/40 rounded px-2.5 py-1 text-[#F97316] font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>ISO-9001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal copyrights with telemetry rail badges inline */}
        <div className="max-w-7xl mx-auto border-t border-[#374151]/40 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-[#6B7280] uppercase tracking-widest gap-4 relative z-10">
          <span>© 2026 UTILITY DE MEXICO S.A. DE C.V. // ALL SYSTEMS NOMINAL</span>
          
          {/* Aesthetic industrial category service badges from spec */}
          <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/80">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 border border-[#374151]/40 rounded">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_6px_#10b981]" />
              CIVIL
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 border border-[#374151]/40 rounded">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_6px_#10b981]" />
              UTILITY
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 border border-[#374151]/40 rounded">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_6px_#10b981]" />
              INDUSTRIAL
            </div>
          </div>

          <span>+52 442 291 0962 // Santa Rosa Jáuregui, Qro.</span>
        </div>
      </footer>
    </div>
  );
}
