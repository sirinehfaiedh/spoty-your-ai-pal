import { Link } from "react-router-dom";
import { Footprints, Clock, Headphones, Car, Wallet, Star } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";
import { cn } from "@/lib/utils";

const toneMap: Record<Restaurant["tone"], string> = {
  green: "bg-accent/30",
  yellow: "bg-highlight/40",
  beige: "bg-muted",
  orange: "bg-primary/15",
};

export const RestaurantCard = ({ r, featured = false }: { r: Restaurant; featured?: boolean }) => {
  return (
    <Link
      to={`/restaurant/${r.id}`}
      className={cn(
        "block soft-card overflow-hidden press animate-fade-in",
        toneMap[r.tone]
      )}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={r.image}
          alt={`${r.name} — ${r.cuisine}`}
          loading="lazy"
          width={768}
          height={512}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {r.tag}
        </span>
        <span className="absolute top-3 right-3 bg-background/90 text-foreground text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
          <Star size={12} className="fill-primary text-primary" /> {r.rating}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight">{r.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{r.cuisine} · {r.address}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
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
  <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-background/70 py-1.5 px-1">
    <Icon size={14} className="text-secondary" />
    <span className={cn("text-[10px] font-semibold text-foreground/80 text-center leading-tight", compact && "text-[9px]")}>{label}</span>
  </div>
);
