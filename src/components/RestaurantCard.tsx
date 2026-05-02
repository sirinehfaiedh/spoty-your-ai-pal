import { Link } from "react-router-dom";
import { Footprints, Clock, Headphones, Car, Wallet, Star, Accessibility, Sparkles, Timer } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";
import { useApp } from "@/state/AppState";
import { cn } from "@/lib/utils";

const toneMap: Record<Restaurant["tone"], string> = {
  green: "bg-accent",
  yellow: "bg-highlight",
  beige: "bg-muted",
  orange: "bg-info",
};

export const RestaurantCard = ({ r, compact = false }: { r: Restaurant; compact?: boolean }) => {
  const { mode } = useApp();
  const userHasCar = true; // demo: would come from profile prefs

  return (
    <Link to={`/restaurant/${r.id}`} className="block press animate-fade-in">
      {/* Image */}
      <div className={cn("relative w-full overflow-hidden rounded-[1.75rem] shadow-card", compact ? "h-44" : "h-56")}>
        <img
          src={r.image}
          alt={`${r.name} — ${r.cuisine}`}
          loading="lazy"
          width={768}
          height={512}
          className="h-full w-full object-cover"
        />
        <span className={cn("absolute top-3 left-3 text-secondary text-xs font-bold px-3 py-1.5 rounded-full", toneMap[r.tone])}>
          {r.tag}
        </span>
        <span className="absolute top-3 right-3 bg-card text-secondary text-xs font-bold px-2.5 py-1.5 rounded-full inline-flex items-center gap-1 shadow-soft">
          <Star size={12} className="fill-primary text-primary" /> {r.rating}
        </span>

        {/* Affinity score badge — bottom-right */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1.5 rounded-full inline-flex items-center gap-1 shadow-glow">
          <Sparkles size={11} /> {r.affinity}% match
        </div>

        {/* Crowd dot */}
        <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur text-secondary text-[10px] font-bold px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-soft">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            r.crowd === "Empty" && "bg-accent",
            r.crowd === "Calm" && "bg-accent",
            r.crowd === "Lively" && "bg-highlight",
            r.crowd === "Packed" && "bg-primary",
          )} />
          {r.crowd}
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-secondary leading-tight truncate">{r.name}</h3>
            <p className="text-xs text-secondary/70 mt-0.5 truncate">{r.cuisine} · {r.address} · {r.weatherFit}</p>
          </div>
        </div>

        {/* Data pills row 1 */}
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          <DataPill icon={userHasCar ? Timer : Footprints} label={userHasCar ? r.drive : r.walk} sub={userHasCar ? "Drive" : "Walk"} />
          <DataPill icon={Clock} label={r.wait} sub="Wait" />
          <DataPill icon={Headphones} label={r.ambiance} sub="Vibe" />
          <DataPill icon={Wallet} label={r.budget.split(" ")[0]} sub="From" />
        </div>

        {/* Data pills row 2 — services */}
        {!compact && (
          <div className="mt-1.5 flex gap-1.5 flex-wrap">
            <ServiceChip icon={Car} label="Parking" active={r.parking} />
            <ServiceChip icon={Accessibility} label="Accessible" active={r.wheelchair} />
            {mode === "quick" && (
              <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                ⚡ One-tap reserve
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

const DataPill = ({ icon: Icon, label, sub }: { icon: any; label: string; sub: string }) => (
  <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-card py-2 px-1 shadow-soft">
    <Icon size={14} className="text-primary" strokeWidth={2.4} />
    <span className="font-bold text-secondary text-[10px] text-center leading-tight truncate max-w-full px-1">{label}</span>
    <span className="text-[8px] text-secondary/60 uppercase tracking-wider">{sub}</span>
  </div>
);

const ServiceChip = ({ icon: Icon, label, active }: { icon: any; label: string; active: boolean }) => (
  <span className={cn(
    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold",
    active ? "bg-accent/40 text-secondary" : "bg-muted text-secondary/40 line-through"
  )}>
    <Icon size={11} /> {label}
  </span>
);
