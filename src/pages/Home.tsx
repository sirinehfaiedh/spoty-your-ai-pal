import { Link } from "react-router-dom";
import { Mic, Sparkles, Bell } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";

const Home = () => {
  const picks = restaurants.slice(0, 3);
  return (
    <div className="phone-frame flex flex-col pb-2">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good afternoon,</p>
          <h1 className="font-display text-3xl font-semibold leading-tight">Sirine 👋</h1>
        </div>
        <Link to="/profile" className="w-11 h-11 rounded-full bg-highlight flex items-center justify-center press shadow-soft relative">
          <Bell size={18} className="text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </Link>
      </header>

      {/* AI insight */}
      <section className="mx-6 soft-card p-5 bg-gradient-warm text-primary-foreground animate-slide-up">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase opacity-90">
          <Sparkles size={14} /> Spoty AI
        </div>
        <p className="mt-2 font-display text-xl leading-snug">
          You usually eat at <b>12:00</b> — here are fast options nearby.
        </p>
      </section>

      {/* Suggestions */}
      <section className="mt-7 px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-semibold">Today's picks</h2>
          <Link to="/explore" className="text-sm font-semibold text-primary">See all</Link>
        </div>
        <div className="space-y-4">
          {picks.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* Voice CTA floating */}
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

export default Home;
