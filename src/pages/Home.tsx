import { Link } from "react-router-dom";
import { Mic, Search, Bookmark, UserRound } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";

const Home = () => {
  const picks = restaurants.slice(0, 3);
  return (
    <div className="phone-frame flex flex-col pb-2">
      {/* Header */}
      <header className="px-6 pt-8 pb-3">
        <h1 className="font-display text-[40px] leading-[1.05] font-bold text-secondary">Plan it</h1>
        <p className="text-secondary/75 mt-1 text-base">Let's get those tastebuds tingling</p>
        <div className="mt-5 h-px bg-border" />
      </header>

      {/* Quick actions */}
      <div className="px-6 flex gap-3 overflow-x-auto no-scrollbar">
        <QuickChip icon={Search} label="Search" />
        <QuickChip icon={Bookmark} label="Saved" />
        <QuickChip icon={UserRound} label="For you" />
      </div>

      {/* Lime banner */}
      <div className="mx-6 mt-5 rounded-[1.75rem] bg-accent p-5 animate-slide-up">
        <h3 className="font-display text-xl font-bold text-secondary">Good afternoon, Sirine</h3>
        <p className="text-secondary/80 text-sm mt-1">
          You usually eat at 12:00 — here are 3 fast options nearby.
        </p>
      </div>

      {/* Info blue card */}
      <Link to="/voice" className="mx-6 mt-3 rounded-[1.75rem] bg-info p-5 flex items-center gap-3 press animate-slide-up">
        <span className="text-secondary">✨</span>
        <div className="flex-1">
          <h4 className="font-display text-lg font-bold text-secondary leading-tight">Ask Spoty anything</h4>
          <p className="text-secondary/80 text-sm">Tap the mic and describe your mood</p>
        </div>
      </Link>

      {/* Picks */}
      <section className="mt-7 px-6">
        <h2 className="font-display text-2xl font-bold text-secondary mb-4">Top picks for you</h2>
        <div className="space-y-4">
          {picks.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* Voice CTA */}
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

const QuickChip = ({ icon: Icon, label }: any) => (
  <button className="chip press whitespace-nowrap">
    <Icon size={16} strokeWidth={2.5} /> {label}
  </button>
);

export default Home;
