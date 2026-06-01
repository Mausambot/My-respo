import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Cpu, HardHat, RefreshCw, Sparkles } from "lucide-react";
import { Language, ChatMessage } from "../types";

interface ChatbotProps {
  lang: Language;
}

export default function Chatbot({ lang }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt anchors
  const promptanchors = lang === 'en' ? [
    { title: "Gaza Bypass Project", prompt: "Explain the current status and engineering details of the Avenida Gaza / SCT Bypass project." },
    { title: "Warehouse Construction", prompt: "What are your structural standards for industrial warehouse construction and slabs?" },
    { title: "Contact Santa Rosa Office", prompt: "How do I contact your Santa Rosa Jáuregui office, and what is the exact address?" }
  ] : [
    { title: "Obra de Avenida Gaza", prompt: "Explica el estado actual y los detalles de ingeniería del proyecto del Libramiento Avenida Gaza." },
    { title: "Naves Industriales", prompt: "¿Cuáles son sus estándares estructurales para la edificación de naves industriales y losas?" },
    { title: "Dirección de Oficina", prompt: "¿Cómo contacto a su oficina en Santa Rosa Jáuregui y cuál es su dirección exacta?" }
  ];

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Welcome message initialization
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "model",
          text: lang === 'en' 
            ? "Greetings. I am MAYA, your AI Construction Assistant at Utility De Mexico. I manage regional telemetry logs for our civil, utility, and substation projects. How may I assist your engineering inquiry today?"
            : "Saludos. Soy MAYA, su Asistente de IA de Construcción de Utility De México. Manejo los registros de telemetría de nuestras obras civiles, eléctricas e hidráulicas. ¿En qué puedo asistirle hoy?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [lang]);

  const handleSendMessage = async (rawText: string) => {
    if (!rawText.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: rawText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, {
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        throw new Error("API Failure");
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, {
        role: "model",
        text: lang === 'en'
          ? "[SIGNAL ATTENUATED]: Internal server transmission error. Please ensure your GEMINI_API_KEY is configured."
          : "[SEÑAL ATENUADA]: Error interno de transmisión del servidor. Por favor verifique el GEMINI_API_KEY.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-display">
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Orb Button activator */
          <motion.button
            key="chat-activator"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            id="maya-chat-activator-btn"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-construction to-safety text-slate-950 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 relative group"
          >
            {/* Status Beacon Pulse */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse z-10" />
            <MessageSquare className="w-6 h-6 text-slate-950 group-hover:rotate-6 transition-transform" />
          </motion.button>
        ) : (
          /* Chat Window body */
          <motion.div
            key="chat-window-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] sm:w-[380px] h-[500px] bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden text-white"
          >
            {/* Header telemetry area */}
            <div className="bg-[#111827] border-b border-white/5 p-4 flex justify-between items-center relative blueprint-grid-fine">
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-8 h-8 rounded bg-construction/10 border border-construction/30 flex items-center justify-center text-construction">
                  <Cpu className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#f8fafc] flex items-center gap-1.5">
                    <span>MAYA COMMAND AI</span>
                    <Sparkles className="w-3.5 h-3.5 text-safety animate-pulse" />
                  </h4>
                  <p className="text-[10px] font-mono text-green-500 uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                    <span>{lang === 'en' ? "TELEMETRY SECURE" : "ENLACE SEGURO"}</span>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white hover:bg-slate-800 p-1 rounded-md transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat message streams */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0d1321]/50 blueprint-grid opacity-90">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-construction text-slate-950 font-medium' 
                      : 'bg-slate-900 border border-white/5 text-slate-150'
                  }`}>
                    {/* Render paragraph breaks nicely */}
                    {m.text.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>{para}</p>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase px-1">
                    {m.role === 'user' ? `${lang === 'en' ? 'CLIENT' : 'CLIENTE'} • ${m.timestamp}` : `MAYA • ${m.timestamp}`}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 self-start bg-slate-900 border border-white/5 text-slate-300 p-3 rounded-lg text-xs font-mono">
                  <RefreshCw className="w-3.5 h-3.5 text-construction animate-spin" />
                  <span>{lang === 'en' ? "Querying regional databases..." : "Consultando base de teletría..."}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts anchoring inside input dock */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-white/5 bg-[#111827]/40 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
                {promptanchors.map((anchor, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(anchor.prompt)}
                    className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-white/5 text-concrete hover:text-white px-2.5 py-1.5 rounded-full font-sans transition-all cursor-pointer"
                  >
                    {anchor.title}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input panel */}
            <div className="p-3 bg-slate-950 border-t border-white/5 flex gap-2 relative">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(inputVal); }}
                placeholder={lang === 'en' ? "Query project metadata..." : "Consultar base de obra..."}
                className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-construction text-white placeholder-slate-500"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={!inputVal.trim() || loading}
                className="w-8 h-8 rounded-lg bg-construction text-slate-950 flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
