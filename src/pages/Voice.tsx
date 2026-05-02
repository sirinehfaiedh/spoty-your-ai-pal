import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { X, Mic, Sparkles } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";

const Voice = () => {
  const [phase, setPhase] = useState<"listening" | "thinking" | "result">("listening");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("thinking"), 2200);
    const t2 = setTimeout(() => setPhase("result"), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const pick = restaurants[0];

  return (
    <div className="phone-frame flex flex-col bg-gradient-hero">
      <header className="px-6 pt-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
          <Sparkles size={14} /> Spoty AI
        </div>
        <Link to="/home" className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <X size={18} />
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {phase === "listening" && (
          <>
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
              <div className="relative w-36 h-36 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow">
                <Mic size={56} strokeWidth={2.2} />
              </div>
            </div>
            <p className="mt-8 text-sm tracking-wider uppercase font-semibold text-muted-foreground">Listening…</p>
            <p className="mt-3 font-display text-2xl max-w-[300px]">
              "Find me a <span className="text-primary">quiet</span> place, not too pricey, no wait."
            </p>
          </>
        )}

        {phase === "thinking" && (
          <>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <p className="mt-6 font-display text-2xl">Spoty is thinking…</p>
          </>
        )}

        {phase === "result" && (
          <div className="w-full animate-slide-up">
            <div className="soft-card bg-accent/30 p-5 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-secondary">
                <Sparkles size={14} /> AI response
              </div>
              <p className="mt-2 font-display text-xl leading-snug">
                Found a <b>quiet</b> place within your budget, with <b>no waiting</b>.
              </p>
            </div>
            <div className="mt-5">
              <RestaurantCard r={pick} />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-10 text-center">
        <p className="text-xs text-muted-foreground">Tap anywhere to speak again</p>
        <Link to="/chat" className="inline-block mt-3 text-xs font-bold text-primary underline">
          Prefer to type? Open AI chat →
        </Link>
      </div>
    </div>
  );
};

export default Voice;
