import { Link } from "react-router-dom";
import { Mic, MessageSquare, Calendar, Zap, MapPin, TrendingUp, Bookmark, Search, Coffee, Sparkles, Leaf } from "lucide-react";
import { restaurants, currentMealCategory, mealCopy } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { ModeSwitch } from "@/components/ModeSwitch";
import { useApp } from "@/state/AppState";


const Home = () => {
  const { mode, memory, meetings, streakDays } = useApp();
  const upcoming = meetings[0];

  // Contextual: filter by current meal category, then dietary, then affinity
  const meal = currentMealCategory();
  const ctx = mealCopy[meal];
  const dietActive = memory.dietary.length > 0;
  const matchesDiet = (r: typeof restaurants[number]) =>
    !dietActive || memory.dietary.some((d) => r.diet.includes(d));

  const contextual = restaurants
    .filter((r) => r.mealCategory === meal && matchesDiet(r))
    .sort((a, b) => b.affinity - a.affinity);
  const fallback = restaurants.filter(matchesDiet).sort((a, b) => b.affinity - a.affinity);
  const ranked = (contextual.length ? contextual : fallback);
  const topPick = ranked[0];
  const picks = (ranked.length >= 3 ? ranked : fallback).slice(0, 3);
  const explorePicks = restaurants.slice(0, 4);


  return (
    <div className="phone-frame flex flex-col pb-2">
      {/* Header */}
      <header className="px-6 pt-7 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-secondary/60 font-semibold tracking-wider uppercase">Good afternoon</p>
            <h1 className="font-display text-[34px] leading-[1.05] font-bold text-secondary">Hey Sirine 👋</h1>
          </div>
          <ModeSwitch />
        </div>

        {/* Streak chip */}
        <div className="mt-3 inline-flex items-center gap-1.5 bg-highlight/50 rounded-full px-3 py-1.5">
          <span className="text-xs">🔥</span>
          <span className="text-xs font-bold text-secondary">{streakDays}-day streak · 1 new spot to unlock badge</span>
        </div>
      </header>

      {/* Pre-meeting alert (always shown if meeting < 60min) */}
      {upcoming && upcoming.startsInMin < 60 && (
        <Link to={`/meeting/${upcoming.id}`} className="mx-6 mt-2 rounded-[1.75rem] bg-primary text-primary-foreground p-4 flex items-center gap-3 shadow-glow press animate-slide-up">
          <div className="w-11 h-11 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
            <Calendar size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">In {upcoming.startsInMin} min · {upcoming.with}</p>
            <p className="font-display text-lg font-bold leading-tight truncate">{upcoming.title}</p>
          </div>
          <span className="text-xs font-bold bg-primary-foreground/20 px-2.5 py-1 rounded-full">3 spots ready</span>
        </Link>
      )}

      {mode === "quick" ? (
        <QuickMode topPick={topPick} picks={picks} memory={memory} ctx={ctx} dietActive={dietActive} />
      ) : (
        <ExploreMode picks={explorePicks} />
      )}

      {/* Voice CTA — always */}
      <Link
        to="/voice"
        className="fixed bottom-28 right-6 sm:right-[calc(50%-215px+1.5rem)] z-20"
        aria-label="Speak to Spoty"
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
          <span className="relative w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow press">
            <Mic size={26} strokeWidth={2.4} />
          </span>
        </div>
      </Link>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

const QuickMode = ({ topPick, picks, memory, ctx, dietActive }: any) => (
  <>
    {/* Ask Spoty — top entry point */}
    <Link to="/chat" className="mx-6 mt-2 rounded-2xl bg-info text-secondary p-4 flex items-center gap-3 press shadow-soft animate-fade-in">
      <div className="w-11 h-11 rounded-2xl bg-secondary/10 flex items-center justify-center">
        <MessageSquare size={20} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">Ask Spoty anything</p>
        <p className="text-xs opacity-70">"Find me a quiet café for 2 hours…"</p>
      </div>
      <Sparkles size={16} />
    </Link>

    {/* Contextual eyebrow */}
    <div className="mx-6 mt-3 flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 bg-card text-secondary text-[11px] font-bold px-3 py-1.5 rounded-full shadow-soft">
        <span>{ctx.emoji}</span> {ctx.eyebrow}
      </span>
      {dietActive && (
        <span className="inline-flex items-center gap-1 bg-accent/50 text-secondary text-[11px] font-bold px-3 py-1.5 rounded-full">
          <Leaf size={11} className="text-primary" /> {memory.dietary.join(" · ")}
        </span>
      )}
    </div>

    {/* Hero AI suggestion — Plate first */}
    <Link to={`/restaurant/${topPick.id}`} className="mx-6 mt-3 rounded-[2rem] overflow-hidden shadow-glow press animate-slide-up block ring-2 ring-primary">
      <div className="relative h-56">
        <img src={topPick.dishImage} alt={topPick.dishName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/25 to-transparent" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full shadow-glow">
          <Sparkles size={11} strokeWidth={3} /> {topPick.contextLabel}
        </div>
        <div className="absolute top-3 right-3 bg-card text-secondary text-[11px] font-bold px-2.5 py-1.5 rounded-full inline-flex items-center gap-1">
          <Zap size={11} className="text-primary" /> {topPick.affinity}% match
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-primary-foreground">
          <h2 className="font-display text-2xl font-bold leading-tight">🍽️ {topPick.dishName}</h2>
          <p className="text-xs opacity-90 mt-0.5">at {topPick.name} · {topPick.ambiance} · {topPick.budget}</p>
        </div>
      </div>
      <div className="p-3 bg-card flex gap-2">
        <Link
          to={`/reserve/${topPick.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 h-12 rounded-full bg-primary text-primary-foreground text-sm font-bold press shadow-glow inline-flex items-center justify-center gap-1.5"
        ><Sparkles size={14} /> Reserve this dish</Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            const q = encodeURIComponent(`${topPick.name} ${topPick.address}`);
            window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
          }}
          aria-label="Navigate"
          className="w-12 h-12 rounded-full bg-info text-secondary press inline-flex items-center justify-center"
        ><MapPin size={16} className="text-primary" /></button>
      </div>
    </Link>

    {/* Other top matches */}
    <section className="mt-7 px-6">
      <div className="flex items-end justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-secondary">More for {ctx.eyebrow.toLowerCase()}</h2>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary inline-flex items-center gap-1"><TrendingUp size={11} /> Live affinity</span>
      </div>
      <div className="space-y-4">
        {picks.slice(1).map((r: any) => <RestaurantCard key={r.id} r={r} compact />)}
      </div>
    </section>
  </>
);

const ExploreMode = ({ picks }: any) => (
  <>
    {/* Quick chips */}
    <div className="px-6 mt-3 flex gap-2 overflow-x-auto no-scrollbar">
      <Link to="/explore" className="chip press whitespace-nowrap"><Search size={14} /> Search</Link>
      <Link to="/lists" className="chip press whitespace-nowrap"><Bookmark size={14} /> My lists</Link>
      <Link to="/group-vote" className="chip press whitespace-nowrap">👥 Group vote</Link>
      <Link to="/chat" className="chip press whitespace-nowrap"><Sparkles size={14} /> Ask AI</Link>
    </div>

    {/* Discovery banner */}
    <div className="mx-6 mt-4 rounded-[1.75rem] bg-accent p-5 animate-slide-up">
      <span className="text-xs font-bold uppercase tracking-wider text-secondary/70">Discovery</span>
      <h3 className="font-display text-xl font-bold text-secondary mt-1">3 new spots in La Marsa</h3>
      <p className="text-secondary/80 text-sm mt-1">Trending this week with friends in your circle.</p>
    </div>

    {/* Categories grid */}
    <section className="mt-6 px-6">
      <h2 className="font-display text-2xl font-bold text-secondary mb-4">Curated for you</h2>
      <div className="space-y-4">
        {picks.map((r: any) => <RestaurantCard key={r.id} r={r} />)}
      </div>
    </section>
  </>
);

export default Home;
