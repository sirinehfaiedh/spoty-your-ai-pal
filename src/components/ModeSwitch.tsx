import { Zap, Sparkles } from "lucide-react";
import { useApp } from "@/state/AppState";
import { cn } from "@/lib/utils";

export const ModeSwitch = () => {
  const { mode, setMode } = useApp();
  return (
    <div className="inline-flex items-center bg-card rounded-full p-1 shadow-soft">
      <button
        onClick={() => setMode("quick")}
        className={cn(
          "px-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all press",
          mode === "quick" ? "bg-primary text-primary-foreground shadow-glow" : "text-secondary/60"
        )}
      >
        <Zap size={12} strokeWidth={3} /> Quick
      </button>
      <button
        onClick={() => setMode("explore")}
        className={cn(
          "px-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all press",
          mode === "explore" ? "bg-primary text-primary-foreground shadow-glow" : "text-secondary/60"
        )}
      >
        <Sparkles size={12} strokeWidth={3} /> Explore
      </button>
    </div>
  );
};
