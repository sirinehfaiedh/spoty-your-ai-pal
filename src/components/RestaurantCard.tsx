import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Headphones, Wallet, Star, Sparkles, Bookmark, Navigation } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";
import { timeForTransport } from "@/data/restaurants";
import { useApp } from "@/state/AppState";
import { cn } from "@/lib/utils";
import { SaveSheet } from "@/components/SaveSheet";

const toneMap: Record<Restaurant["tone"], string> = {
  green: "bg-accent",
  yellow: "bg-highlight",
  beige: "bg-muted",
  orange: "bg-info",
};

export const RestaurantCard = ({ r, compact = false }: { r: Restaurant; compact?: boolean }) => {
  const { mode, lists, memory, saved, toggleSaved } = useApp();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pulseSaved, setPulseSaved] = useState(false);
  const lastTap = useRef(0);

  const isSaved = saved.includes(r.id) || lists.some((l) => l.items.includes(r.id));
  const tt = timeForTransport(r, memory.transport);

  const triggerSave = () => {
    if (!isSaved) toggleSaved(r.id);
    setPulseSaved(true);
    setTimeout(() => setPulseSaved(false), 400);
    setSheetOpen(true);
  };

  const onCardClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      e.preventDefault();
      triggerSave();
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;
  };

  const openMaps = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const q = encodeURIComponent(`${r.name} ${r.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  return (
    <>
      <Link to={`/restaurant/${r.id}`} onClick={onCardClick} className="block press animate-fade-in select-none">
        <div className={cn("relative w-full overflow-hidden rounded-[1.75rem] shadow-card", compact ? "h-44" : "h-52")}>
          <img
            src={mode === "quick" ? r.dishImage : r.image}
            alt={mode === "quick" ? `${r.dishName} at ${r.name}` : `${r.name} — ${r.cuisine}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />

          <span className={cn("absolute top-3 left-3 text-secondary text-[11px] font-bold px-3 py-1.5 rounded-full", toneMap[r.tone])}>
            {r.contextLabel}
          </span>
          <span className="absolute top-3 right-3 bg-card text-secondary text-xs font-bold px-2.5 py-1.5 rounded-full inline-flex items-center gap-1 shadow-soft">
            <Star size={12} className="fill-primary text-primary" /> {r.rating}
          </span>

          {/* Bookmark save */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerSave(); }}
            className={cn(
              "absolute top-14 right-3 w-9 h-9 rounded-full bg-background/95 flex items-center justify-center shadow-soft press transition-transform",
              pulseSaved && "scale-125"
            )}
            aria-label={isSaved ? "Saved" : "Save"}
          >
            <Bookmark size={15} className={cn(isSaved ? "fill-primary text-primary" : "text-secondary")} />
          </button>

          <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1.5 rounded-full inline-flex items-center gap-1 shadow-glow">
            <Sparkles size={11} /> {r.affinity}% match
          </div>
        </div>

        <div className="pt-3 px-1">
          {/* Plate first, restaurant second */}
          <h3 className="font-display text-xl font-bold text-secondary leading-tight truncate">
            {r.dishName}
          </h3>
          <p className="text-xs text-secondary/60 mt-0.5 truncate">
            at <span className="font-semibold text-secondary/80">{r.name}</span> · {r.cuisine}
          </p>

          {/* Info row */}
          <div className="mt-2 flex items-center gap-3 text-[11px] text-secondary/70 font-semibold">
            <span className="inline-flex items-center gap-1"><Navigation size={11} className="text-primary" /> {tt.label}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock size={11} /> {r.wait}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Wallet size={11} /> {r.budget.split(" ")[0]}+</span>
          </div>

          {/* CTA row — large reserve + icon-only nav */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/reserve/${r.id}`); }}
              className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm press shadow-glow inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles size={14} /> Reserve {mode === "quick" ? "this dish" : "a table"}
            </button>
            <button
              onClick={openMaps}
              aria-label="Navigate"
              className="w-12 h-12 rounded-full bg-card text-secondary press shadow-soft inline-flex items-center justify-center"
            >
              <Navigation size={16} className="text-primary" />
            </button>
          </div>

          {!compact && (
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-secondary/60">
              <Headphones size={10} /> {r.ambiance}
              <span>·</span>
              <span>{r.weatherFit}</span>
            </div>
          )}
        </div>
      </Link>
      {sheetOpen && <SaveSheet restaurantId={r.id} onClose={() => setSheetOpen(false)} />}
    </>
  );
};
