import { useState } from "react";
import { Language } from "./types";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import Services from "./components/Services";
import ProjectDashboard from "./components/ProjectDashboard";
import ProcessVisualization from "./components/ProcessVisualization";
import QuoteCalculator from "./components/QuoteCalculator";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [lang, setLang] = useState<Language>('es'); // Default to Spanish as requested for Querétaro base
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* Cinematic Hero entry */}
      <Hero lang={lang} />
      
      {/* Animated Live Stats counter */}
      <Stats lang={lang} />

      {/* About Section: Interactive history timeline + mission blueprint diagrams */}
      <Timeline lang={lang} />

      {/* Services Portfolio: Civil, utilities, industrial, pericial consulting cards */}
      <Services lang={lang} />

      {/* Active Projects Dashboard Command Node: status beacons, milestones, comparisons */}
      <ProjectDashboard lang={lang} />

      {/* Executive 9-stage workflow checklist pathway sequence */}
      <ProcessVisualization lang={lang} />

      {/* Live Persistent Quotation Estimator terminal */}
      <div className="py-20 px-6 sm:px-8 bg-slate-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <QuoteCalculator lang={lang} />
        </div>
      </div>

      {/* Drone & staff Photogrammetry Filterable Gallery */}
      <Gallery lang={lang} />

      {/* Verified corporate testimonials quotes slider */}
      <Testimonials lang={lang} />

      {/* Immersive Contact inquiries and Google coordinates telemetry grid alignment */}
      <ContactForm lang={lang} />

      {/* Deep-learning MAYA AI Construction Assistant chatbot overlay */}
      <Chatbot lang={lang} />
    </Layout>
  );
}
