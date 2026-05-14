import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Maximize2, Sparkles, MessageSquare } from "lucide-react";
import { restaurants, filterByCategory } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { cn } from "@/lib/utils";
import { useApp } from "@/state/AppState";

const categories = ["Cheap eats", "Romantic", "Work-friendly", "Family", "Authentic", "Quick", "Friendly", "Games"];

const Explore = () => {
  const { memory } = useApp();
  const [active, setActive] = useState("Cheap eats");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    let list = filterByCategory(restaurants, active);
    if (memory.dietary.length && !memory.dietary.includes("no-preference")) {
      const matched = list.filter((r) => memory.dietary.some((d) => r.diet.includes(d)));
      if (matched.length) list = matched;
    }
    if (!list.length) list = restaurants;
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((r) =>
      [r.name, r.cuisine, r.dishName, r.tag, r.ambiance, ...(r.dailyMenu?.map((m) => m.name) ?? [])]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q))
    );
  }, [active, memory.dietary, query]);

  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-3">
        <h1 className="font-display text-3xl font-semibold">Explore</h1>
        <p className="text-muted-foreground text-sm mt-1">Curated for your taste and location.</p>

        {/* Ask Spoty — top */}
        <Link to="/chat" className="mt-4 flex items-center gap-3 bg-info text-secondary rounded-2xl px-4 h-12 shadow-soft press">
          <MessageSquare size={16} />
          <span className="text-sm font-bold flex-1">Ask Spoty anything</span>
          <Sparkles size={14} />
        </Link>

        <div className="mt-3 flex items-center gap-3 bg-card rounded-2xl px-4 h-11 shadow-soft focus-within:ring-2 focus-within:ring-primary/40">
          <Search size={16} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try: "quiet place under 30dt"'
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground text-secondary"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-xs font-bold text-muted-foreground press">Clear</button>
          )}
        </div>
      </header>

      {/* Map preview */}
      <Link to="/map" className="mx-6 rounded-[1.75rem] overflow-hidden bg-accent/30 h-32 relative shadow-soft press block">
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
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full px-3 py-1.5 text-[10px] font-bold flex items-center gap-1.5 shadow-glow">
          <Maximize2 size={11} /> Open map
        </div>
      </Link>

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

      {/* Filter result count */}
      <p className="px-6 mt-3 text-[11px] font-bold uppercase tracking-wider text-secondary/60">
        {filtered.length} spot{filtered.length > 1 ? "s" : ""} · {active}
      </p>

      {/* List of spots with daily menu carousel */}
      <section key={active} className="mt-3 px-6 space-y-6 animate-fade-in">
        {filtered.map((r) => (
          <div key={r.id} className="space-y-3">
            <RestaurantCard r={r} />
            {r.dailyMenu && r.dailyMenu.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/60">Today's menu</p>
                  <Link to={`/restaurant/${r.id}`} className="text-[11px] font-bold text-primary press">See all →</Link>
                </div>
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">
                  {r.dailyMenu.map((m) => (
                    <div key={m.name} className="shrink-0 w-44 rounded-2xl bg-card p-3 shadow-soft">
                      <p className="font-bold text-secondary text-sm leading-tight">{m.name}</p>
                      <p className="text-[10px] text-secondary/60 mt-0.5 line-clamp-2">{m.desc}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">{m.price}</span>
                        <div className="flex gap-1">
                          {m.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[9px] font-bold uppercase bg-accent/40 text-secondary px-1.5 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

export default Explore;
