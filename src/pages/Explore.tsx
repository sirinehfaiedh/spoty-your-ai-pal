import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Maximize2 } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { cn } from "@/lib/utils";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { cn } from "@/lib/utils";

const categories = ["Cheap eats", "Romantic", "Work-friendly", "Family", "Authentic", "Quick"];

const Explore = () => {
  const [active, setActive] = useState("Cheap eats");
  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-4">
        <h1 className="font-display text-3xl font-semibold">Explore</h1>
        <p className="text-muted-foreground text-sm mt-1">Curated for your taste and location.</p>

        <div className="mt-5 flex items-center gap-3 bg-card rounded-2xl px-4 h-12 shadow-soft">
          <Search size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Try: "quiet place under 30dt"</span>
        </div>
      </header>

      {/* Map preview */}
      <div className="mx-6 rounded-[1.75rem] overflow-hidden bg-accent/30 h-32 relative shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--highlight)/0.5),transparent_60%),radial-gradient(circle_at_70%_70%,hsl(var(--primary)/0.3),transparent_60%)]" />
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="border border-background/30" />
          ))}
        </div>
        <div className="absolute top-6 left-10 w-4 h-4 rounded-full bg-primary shadow-glow ring-4 ring-background/70" />
        <div className="absolute top-16 left-24 w-3 h-3 rounded-full bg-secondary ring-4 ring-background/70" />
        <div className="absolute bottom-6 right-10 w-3 h-3 rounded-full bg-secondary ring-4 ring-background/70" />
        <div className="absolute bottom-3 left-3 bg-background/90 rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
          <MapPin size={12} className="text-primary" /> La Marsa · 5 nearby
        </div>
      </div>

      {/* Categories */}
      <div className="mt-5 px-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn("chip press whitespace-nowrap", active === c && "chip-active")}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <section className="mt-5 px-6 space-y-4">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </section>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

export default Explore;
