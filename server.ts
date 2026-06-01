import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Enable JSON body parsing
app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully from server-side.");
  } catch (error) {
    console.error("Failed to initialize Gemini API:", error);
  }
} else {
  console.warn("GEMINI_API_KEY not set or contains default value. Chatbot will run in simulation mode.");
}

// Low-overhead persistent JSON data store
const DB_FILE = path.join(process.cwd(), "db_store.json");

interface DataStore {
  quotes: any[];
  submissions: any[];
}

function loadData(): DataStore {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading db_store.json:", e);
  }
  return { quotes: [], submissions: [] };
}

function saveData(data: DataStore) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing to db_store.json:", e);
  }
}

// Initial Project Data
const INITIAL_PROJECTS = [
  {
    id: "qro-bypass",
    name_en: "Querétaro-San Luis Potosí Bypass (Avenida Gaza)",
    name_es: "Librramiento Querétaro-San Luis Potosí (Avenida Gaza)",
    location_en: "Santa Rosa Jáuregui, Qro., Mexico",
    location_es: "Santa Rosa Jáuregui, Qro., México",
    status_en: "Ongoing",
    status_es: "En Proceso",
    progress: 78,
    category: "civil",
    budget: "$18.4M USD",
    area: "22.5 km Highway",
    client: "SCT (Secretaría de Infraestructura, Comunicaciones y Transportes)",
    timeline: "May 2024 - Dec 2026",
    description_en: "Major expansion and utility integration along the Gaza bypass. Featuring high-grade structural asphalt paving, subterranean drainage pipeline installation, and concrete safety barriers engineered to sustain high-density freight traffic.",
    description_es: "Importante expansión e integración de servicios públicos a lo largo del libramiento de Gaza. Cuenta con pavimentación asfáltica estructural de alta calidad, instalación de tuberías de drenaje subterráneas y barreras de seguridad de concreto diseñadas para soportar tráfico pesado.",
    beforeUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
    progressUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    afterUrl: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1000&q=80",
    milestones: [
      { title_en: "Site Survey & Geotechnical Analysis", title_es: "Estudio Topográfico y Geotécnico", date: "June 2024", status: "completed" },
      { title_en: "Right-of-Way Cleared & Grade Soil Prep", title_es: "Liberación de Vía y Preparación de Suelo", date: "Dec 2024", status: "completed" },
      { title_en: "Hydro-infrastructure Drainage Installation", title_es: "Instalación de Drenaje e Infraestructura Hidráulica", date: "Aug 2025", status: "completed" },
      { title_en: "Structural Base Course & Heavy Asphalt", title_es: "Capa Base Estructural y Carpeta Asfáltica", date: "Feb 2026", status: "active" },
      { title_en: "Signage, Barriers & Post-Inaugural Inspection", title_es: "Señalética, Barreras e Inspección Final", date: "Nov 2026", status: "pending" }
    ]
  },
  {
    id: "santa-rosa-warehouse",
    name_en: "Santa Rosa Industrial Warehouse Complex",
    name_es: "Complejo de Naves Industriales Santa Rosa",
    location_en: "Santa Rosa Jáuregui Regional Hub, Qro.",
    location_es: "Polo Regional Santa Rosa Jáuregui, Querétaro",
    status_en: "Completed",
    status_es: "Completado",
    progress: 100,
    category: "industrial",
    budget: "$12.5M USD",
    area: "45,000 m² Facility Area",
    client: "ProLogis Mexico Industrial Trust",
    timeline: "Sep 2023 - Jan 2026",
    description_en: "Design-build steel wireframe warehouse equipped with laser-leveled post-tensioned floor slabs, insulated thermo-panels, utility fire suppression systems, and comprehensive high-voltage grid connections.",
    description_es: "Bodega industrial prediseñada con estructura de acero equipada con losas de concreto postensadas niveladas por láser, paneles térmicos aislados, sistemas contra incendios y conexiones de red de alta tensión.",
    beforeUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
    progressUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
    afterUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    milestones: [
      { title_en: "Architectural Planning & Permits", title_es: "Planeación Arquitectónica y Permisos", date: "Oct 2023", status: "completed" },
      { title_en: "Foundation & Post-Tensioned Concrete Slab", title_es: "Cimentación y Losa de Concreto Postensado", date: "April 2024", status: "completed" },
      { title_en: "Portal Frame Structural Steel Erection", title_es: "Montaje de Estructura Metálica de Marcos", date: "Nov 2024", status: "completed" },
      { title_en: "Thermo-Cladding & Utility Systems Integration", title_es: "Instalación de Termo-paneles e Ingenierías", date: "Sept 2025", status: "completed" },
      { title_en: "Final Walkthrough & CFE Certification", title_es: "Inspección Final y Certificación de CFE", date: "Jan 2026", status: "completed" }
    ]
  },
  {
    id: "qro-water-network",
    name_en: "Querétaro North Aquatic Utility Network",
    name_es: "Red de Utilidades Acuáticas Querétaro Norte",
    location_en: "Juriquilla - Santa Rosa, Qro.",
    location_es: "Juriquilla - Santa Rosa, Qro.",
    status_en: "Ongoing",
    status_es: "En Proceso",
    progress: 42,
    category: "utility",
    budget: "$8.9M USD",
    area: "12.8 km Hydrant & Utility Mains",
    client: "CEA (Comisión Estatal de Aguas Querétaro)",
    timeline: "Jan 2025 - Apr 2027",
    description_en: "Civil excavation and installation of heavy-wall high-density polyethylene (HDPE) potable water mains, pressure-reducing vaults, and modern municipal drainage sewer branches with real-time pressure diagnostics.",
    description_es: "Excavación civil e instalación de tuberías principales de agua potable de polietileno de alta densidad (HDPE), bóvedas de regulación de presión y ramales de alcantarillado con sensores de presión.",
    beforeUrl: "https://images.unsplash.com/photo-1508459855340-fb63ac591728?auto=format&fit=crop&w=1000&q=80",
    progressUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80",
    afterUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80",
    milestones: [
      { title_en: "Hydrological Modeling & Pre-feasibility Study", title_es: "Modelado Hidrológico y Estudio de Viabilidad", date: "Feb 2025", status: "completed" },
      { title_en: "Trench Excavation & Utility Corridors Clearance", title_es: "Excavación de Zanjas y Despeje de Pasillos de Servicio", date: "July 2025", status: "completed" },
      { title_en: "HDPE Pipe Fusion, Laying & Bedding", title_es: "Fusión de Tuberías HDPE, Colocación y Plantilla", date: "Jan 2026", status: "active" },
      { title_en: "Substation Vault Assembly & Valves Fitting", title_es: "Montaje de Bóvedas de Bombeo y Válvulas", date: "Oct 2026", status: "pending" },
      { title_en: "Hydrotest Commissioning & Municipal Integration", title_es: "Pruebas Hidrostáticas e Integración Municipal", date: "March 2027", status: "pending" }
    ]
  },
  {
    id: "saucito-utility",
    name_en: "El Saucito High-Voltage Grid Substation",
    name_es: "Subestación de Alta Tensión El Saucito",
    location_en: "El Saucito Industrial District, Qro.",
    location_es: "Distrito Industrial El Saucito, Qro.",
    status_en: "Completed",
    status_es: "Completado",
    progress: 100,
    category: "utility",
    budget: "$6.2M USD",
    area: "15,000 m² High Voltage Plant",
    client: "CFE (Comisión Federal de Electricidad)",
    timeline: "Mar 2023 - Sep 2025",
    description_en: "Construction of concrete firewall separator bays, deep structural equipment support foundations, steel gantry towers assembly, and perimeter defense cybernetic surveillance infrastructure.",
    description_es: "Construcción de bahías separadoras cortafuegos de concreto, cimentaciones profundas para equipo pesado, montaje de pórticos de acero e infraestructura de vigilancia digital perimetral.",
    beforeUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80",
    progressUrl: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=1000&q=80",
    afterUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
    milestones: [
      { title_en: "Civil Grading & Ground Substation Grid", title_es: "Nivelación Civil y Red de Tierra Subterránea", date: "May 2023", status: "completed" },
      { title_en: "Civil Concrete Foundations & Explosion Walls", title_es: "Cimentaciones de Concreto y Muros Contra Explosiones", date: "Nov 2023", status: "completed" },
      { title_en: "Steel Structural Portals & Gantry Hoisting", title_es: "Pórticos de Acero Estructural e Izaje de Pórticos", date: "Aug 2024", status: "completed" },
      { title_en: "Circuit Breakers & Transformer Calibration", title_es: "Instalación de Interruptores y Transformadores", date: "May 2025", status: "completed" },
      { title_en: "CFE Live Connection & Secure System Handover", title_es: "Interconexión CFE y Entrega Operativa de Red", date: "Aug 2025", status: "completed" }
    ]
  }
];

// 1. Projects Endpoint
app.get("/api/projects", (req, res) => {
  res.json(INITIAL_PROJECTS);
});

// 2. Contact Handler
app.post("/api/contact", (req, res) => {
  const { name, company, email, phone, projectType, budgetRange, timeline, description } = req.body;
  if (!name || !email || !description) {
    return res.status(400).json({ error: "Name, email and scope description are required." });
  }

  const db = loadData();
  const newSubmission = {
    id: `sub_${Date.now()}`,
    name,
    company: company || "N/A",
    email,
    phone: phone || "N/A",
    projectType: projectType || "Civil Construction",
    budgetRange: budgetRange || "Under $1M USD",
    timeline: timeline || "Immediate",
    description,
    date: new Date().toISOString(),
    status: "unread"
  };

  db.submissions.unshift(newSubmission);
  saveData(db);

  res.json({
    success: true,
    message: "Proposal logs officially ingested by Utility De Mexico. Command center dispatch scheduled.",
    submission: newSubmission
  });
});

// 3. Persistent Instant Quote Calculator Helper
app.post("/api/quotes", (req, res) => {
  const { clientName, clientCompany, projectType, sizeSqm, budgetRange, locationState, timelineMonths } = req.body;

  if (!clientName || !projectType || !sizeSqm) {
    return res.status(400).json({ error: "Missing calculation requirements. Client, project type, and physical size metrics are required." });
  }

  // Industrial pricing algorithm
  let baseCostPerSqm = 650; // default standard utility base (USD)
  if (projectType.toLowerCase().includes("civil")) baseCostPerSqm = 850;
  if (projectType.toLowerCase().includes("industrial")) baseCostPerSqm = 1100;
  if (projectType.toLowerCase().includes("consulting")) baseCostPerSqm = 250;
  if (projectType.toLowerCase().includes("electrical") || projectType.toLowerCase().includes("utility")) baseCostPerSqm = 950;

  let multiplier = 1.0;
  // Local Mexican state cost modifier
  const state = (locationState || "").toLowerCase();
  if (state.includes("querétaro") || state.includes("qro")) multiplier = 1.05; // hub logistics
  if (state.includes("nuevo león") || state.includes("nl")) multiplier = 1.15; // border premium
  if (state.includes("ciudad de méxico") || state.includes("cdmx")) multiplier = 1.20; // dense logistics

  const rawCost = sizeSqm * baseCostPerSqm * multiplier;
  const estimatedCostUsd = Math.round(rawCost);

  // Structural division elements
  const breakdown = [
    {
      item_en: "Excavation, Soil Stabilization & Earthmoving",
      item_es: "Movimiento de Tierras, Excavación y Estabilización",
      cost: Math.round(estimatedCostUsd * 0.15)
    },
    {
      item_en: "Reinforced Concrete Foundations & Structural Framework",
      item_es: "Cimentación de Concreto Armado y Súperestructura",
      cost: Math.round(estimatedCostUsd * 0.35)
    },
    {
      item_en: "High-grade Industrial Utilities & Hydro-networks",
      item_es: "Instalación de Servicios Industriales y Redes de Altísima Tensión",
      cost: Math.round(estimatedCostUsd * 0.25)
    },
    {
      item_en: "Project Management, Inspection & Geotechnical Sign-off",
      item_es: "Dirección de Obra, Topografía, Auditorías y Firma de Perito",
      cost: Math.round(estimatedCostUsd * 0.15)
    },
    {
      item_en: "Mexican Federal Logistics & Contingency Reserve (10%)",
      item_es: "Logística Federal de Materiales y Margen de Contingencia (10%)",
      cost: Math.round(estimatedCostUsd * 0.10)
    }
  ];

  const db = loadData();
  const newQuote = {
    id: `QT-${Math.floor(100000 + Math.random() * 900000)}`,
    clientName,
    clientCompany: clientCompany || "Private Client",
    projectType,
    sizeSqm,
    budgetRange,
    locationState: locationState || "Querétaro",
    estimatedCostUsd,
    breakdown,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  db.quotes.unshift(newQuote);
  saveData(db);

  res.json({
    success: true,
    quote: newQuote
  });
});

app.get("/api/quotes", (req, res) => {
  const db = loadData();
  res.json(db.quotes);
});

// 4. AIS-GenAI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid message logs." });
  }

  const lastUserMessage = messages[messages.length - 1]?.text || "";

  // Dynamic engineering context injection
  const systemInstruction = 
    `You are "MAYA", the high-end industrial artificial intelligence assistant for Utility de México S.A. de C.V., ` +
    `representing a world-class construction and smart infrastructure engineering command center. ` +
    `Your personality is authoritative, mathematically precise, modern-industrial, extremely knowledgeable in engineering (roads, utilities, high-voltage networks, factories), and highly professional. ` +
    `Speak with technical clarity. Avoid fluff. Address queries about Utility De Mexico S.A. De C.V. seamlessly. ` +
    `Key details about our company: ` +
    `- Locations & Contact: Acceso de Gaza 131, Santa Rosa Jáuregui, Querétaro, Mexico. Phone: +52 442 291 0962. ` +
    `- Specialties: Civil Construction (highways, bypasses, complex concrete works), Utility Infrastructure (subterranean sewer pipelines, HDPE water networks, high-voltage substation plants), Industrial Engineering (laser-leveled warehouse structures, heavy machinery support foundations). ` +
    `- Active Projects: Querétaro-San Luis Potosí Bypass (Avenida Gaza, 78% done, $18.4M USD), Juriquilla North Water Network (42% done), Saucito Substation (100% completed, live CFE connection). ` +
    `Answer queries fluently in Spanish or English depending on how the user asks you or the context. Keep your response reasonably concise (2-4 paragraphs max). ` +
    `Format lists nicely with clear bullet points. If they ask about prices, advise them to use our live Quote Calculator component inside this command center portal.`;

  if (ai) {
    try {
      console.log(`Sending prompt to Gemini SDK... Prompt: "${lastUserMessage.substring(0, 100)}..."`);
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: lastUserMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I apologize, our telemetry link encountered an isolated signal attenuation. Please resubmit your command.";
      
      return res.json({ text: responseText });
    } catch (error) {
      console.error("Gemini API server call error:", error);
      // Fallback response if API key fails/throttles
      return res.json({ 
        text: `[SYSTEM: Telemetry Mode Backup] Maya Assistant is online. We received your packet: "${lastUserMessage}". However, the live telemetry uplink is currently operating with high latency. Please note that Utility De Mexico is fully active at our regional base in Juregui, Santa Rosa Jáuregui, Querétaro. Our civil division specializes in Avenida Gaza highway work and industrial logistics vaults. Let us know how we can dispatch our surveyors.` 
      });
    }
  } else {
    // Elegant simulated response matching Maya's distinct corporate personality
    const responses = [
      "We have received your telemetry signal. Utility De Mexico has specialized in high-performance highway paving and high-voltage substation integration since our founding, centered in Santa Rosa Jáuregui, Querétaro. Please input your structural parameters in our real-time Quote Calculator.",
      "Greetings. Maya system is operating on local fail-safe protocols. Regarding infrastructure, our Avenida Gaza-Bypass project stands at 78% completion, employing laser-guided grading and advanced HDPE main fusion. Our project engineers remain ready for dispatch.",
      "Uplink successful. Utility De Mexico S.A. De C.V. manages complex civil, electrical, and aquatic infrastructure across Mexico under stringent safety parameters, rating at 4.1/5. To receive customized logistics projections, please proceed through our Contact Portal."
    ];
    const picked = responses[Math.floor(Math.random() * responses.length)];
    return res.json({ text: `[SIMULATION PROTOCOL] Hello, I am MAYA. ${picked}` });
  }
});

// Setup Vite Dev server or production static serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Express mounted Vite middleware (Development Mode).");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serviced precompiled static build files (Production Mode).");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Command Center Server live at http://localhost:${PORT}`);
  });
}

bootstrap();
