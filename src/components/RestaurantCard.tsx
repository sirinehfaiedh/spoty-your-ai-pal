import { Link } from "react-router-dom";
import { Footprints, Clock, Headphones, Car, Wallet, Star } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";
import { cn } from "@/lib/utils";

const toneMap: Record<Restaurant["tone"], string> = {
  green: "bg-accent",
  yellow: "bg-highlight",
  beige: "bg-muted",
  orange: "bg-info",
};

export const RestaurantCard = ({ r }: { r: Restaurant }) => {
  return (
    <Link
      to={`/restaurant/${r.id}`}
      className="block press animate-fade-in"
    >
      {/* Image with rounded corners, Cherrypick-style */}
      <div className="relative h-56 w-full overflow-hidden rounded-[1.75rem] shadow-card">
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

        {/* Little logo badge bottom-left (like Cherrypick "By Cherrypick") */}
        <div className="absolute -bottom-3 left-4 w-10 h-10 rounded-full bg-info flex items-center justify-center border-4 border-background">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="9" cy="13" r="4" fill="hsl(var(--accent))" stroke="hsl(var(--secondary))" strokeWidth="2" />
            <path d="M7 13 Q9 15 11 13" stroke="hsl(var(--secondary))" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-secondary leading-tight truncate">{r.name}</h3>
            <p className="text-xs text-secondary/70 mt-0.5">{r.cuisine} · {r.address}</p>
          </div>
        </div>

        {/* Data pills — always visible */}
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          <DataPill icon={Footprints} label={r.walk} />
          <DataPill icon={Clock} label={r.wait} />
          <DataPill icon={Headphones} label={r.ambiance} />
          <DataPill icon={Car} label={r.parking ? "Yes" : "No"} />
          <DataPill icon={Wallet} label={r.budget.replace(" ", "")} compact />
        </div>
      </div>
    </Link>
  );
};

const DataPill = ({ icon: Icon, label, compact }: { icon: any; label: string; compact?: boolean }) => (
  <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-card py-2 px-1 shadow-soft">
    <Icon size={14} className="text-primary" strokeWidth={2.4} />
    <span className={cn("font-bold text-secondary text-center leading-tight", compact ? "text-[9px]" : "text-[10px]")}>{label}</span>
  </div>
);
