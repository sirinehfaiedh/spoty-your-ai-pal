import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Mic, Send, Sparkles, Languages } from "lucide-react";
import { restaurants, type Restaurant } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useApp } from "@/state/AppState";
import { cn } from "@/lib/utils";

type Msg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; text: string; extracted?: Record<string, string>; picks?: Restaurant[] };

const SUGGESTIONS = [
  "Find a quiet café to work for 2 hours",
  "Njim nheb resto calme budget 20dt",
  "Un endroit romantique pour ce soir",
  "I'm stressed, need somewhere calm",
];

const Chat = () => {
  const navigate = useNavigate();
  const { pushMood } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "ai",
      text: "Hey Sirine 👋 I'm Spoty. Tell me what you feel like — in any language. I'll pick the perfect spot.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [lang, setLang] = useState<"EN" | "FR" | "AR">("EN");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: "user", text };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setThinking(true);

    // simulated NLU
    setTimeout(() => {
      const lower = text.toLowerCase();
      const extracted: Record<string, string> = {};
      let mood = "neutral";

      if (/quiet|calm|calme|هادي|stressed|focus|work|travail|2h|hour|two hour/.test(lower)) {
        extracted.ambiance = "Quiet";
        extracted.purpose = "Work · 2h";
        mood = "calm";
      }
      if (/romantic|romantique|date|sunset|رومن/.test(lower)) {
        extracted.ambiance = "Romantic";
        extracted.purpose = "Date night";
        mood = "romantic";
      }
      if (/family|famille|kids|عيلة/.test(lower)) {
        extracted.ambiance = "Lively";
        extracted.purpose = "Family";
        mood = "social";
      }
      const budgetMatch = text.match(/(\d{1,3})\s?(dt|tnd|€|\$)/i);
      if (budgetMatch) extracted.budget = `≤ ${budgetMatch[1]}dt`;
      if (/cheap|pas cher|رخيص/.test(lower)) extracted.budget = "Cheap";
      if (/espresso|coffee|café|قهوة/.test(lower)) extracted.cuisine = "Café";

      pushMood(mood);

      // pick by mood
      let picks = restaurants.filter((r) => r.moodTags.includes(mood)).slice(0, 3);
      if (picks.length < 2) picks = restaurants.slice(0, 3);

      const aiText = picksMessage(extracted, mood);
      setMessages((p) => [
        ...p,
        { id: `a${Date.now()}`, role: "ai", text: aiText, extracted, picks },
      ]);
      setThinking(false);
    }, 1100);
  };

  return (
    <div className="phone-frame flex flex-col h-screen bg-background">
      <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-primary">
            <Sparkles size={11} /> Spoty AI
          </div>
          <h1 className="font-display text-xl font-bold text-secondary leading-tight">Ask anything</h1>
        </div>
        <button
          onClick={() => setLang(lang === "EN" ? "FR" : lang === "FR" ? "AR" : "EN")}
          className="inline-flex items-center gap-1 px-3 h-9 rounded-full bg-info text-secondary text-xs font-bold press"
        >
          <Languages size={12} /> {lang}
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex animate-fade-in", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-3xl px-4 py-3",
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card text-secondary rounded-bl-md shadow-soft"
            )}>
              <p className="text-sm leading-relaxed whitespace-pre-line">{m.text}</p>
              {m.role === "ai" && m.extracted && Object.keys(m.extracted).length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {Object.entries(m.extracted).map(([k, v]) => (
                    <span key={k} className="text-[10px] font-bold px-2 py-1 rounded-full bg-accent/40 text-secondary">
                      {k}: {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {messages[messages.length - 1]?.role === "ai" && (messages[messages.length - 1] as any).picks && (
          <div className="space-y-3 pt-1">
            {(messages[messages.length - 1] as any).picks.map((r: Restaurant) => (
              <RestaurantCard key={r.id} r={r} compact />
            ))}
          </div>
        )}

        {thinking && (
          <div className="flex justify-start">
            <div className="bg-card shadow-soft rounded-3xl rounded-bl-md px-4 py-3 inline-flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-5 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} className="shrink-0 chip press text-xs">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="px-4 pb-5 pt-2 border-t border-border bg-background">
        <div className="flex items-center gap-2 bg-card rounded-full pl-5 pr-2 py-2 shadow-soft">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder={
              lang === "FR" ? "Décris ton envie…" :
              lang === "AR" ? "قلي شنوة تحب…" :
              "Tell me what you feel like…"
            }
            className="flex-1 bg-transparent text-sm focus:outline-none text-secondary placeholder:text-secondary/40"
          />
          <Link to="/voice" className="w-10 h-10 rounded-full bg-info text-secondary flex items-center justify-center press">
            <Mic size={16} />
          </Link>
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center press shadow-glow disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const picksMessage = (e: Record<string, string>, mood: string) => {
  const parts: string[] = [];
  if (e.ambiance) parts.push(e.ambiance.toLowerCase());
  if (e.budget) parts.push(`within ${e.budget}`);
  if (e.purpose) parts.push(`for ${e.purpose.toLowerCase()}`);
  const summary = parts.length ? `Got it — ${parts.join(", ")}.` : "Got it.";
  const moodLine =
    mood === "calm" ? " I noticed you want something restful — picked spots with low crowd."
    : mood === "romantic" ? " Romantic vibes — these are perfect for tonight."
    : mood === "social" ? " Lively places where the energy is right."
    : " Here are 3 strong matches based on your taste.";
  return summary + moodLine;
};

export default Chat;
