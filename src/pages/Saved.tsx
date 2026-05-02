import { Link } from "react-router-dom";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { Heart, FolderHeart, Users, ArrowRight } from "lucide-react";
import { useApp } from "@/state/AppState";

const Saved = () => {
  const { saved, lists } = useApp();
  const items = restaurants.filter((r) => saved.includes(r.id));

  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-secondary">Saved</h1>
          <p className="text-secondary/70 text-sm mt-1">Your shortlist & curated lists.</p>
        </div>
        <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center">
          <Heart size={18} className="text-primary fill-primary" />
        </div>
      </header>

      {/* Lists strip */}
      <Link to="/lists" className="mx-6 rounded-[1.75rem] bg-info p-4 flex items-center gap-3 press">
        <div className="w-11 h-11 rounded-2xl bg-background flex items-center justify-center">
          <FolderHeart size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-display text-base font-bold text-secondary">My lists</p>
          <p className="text-xs text-secondary/70">{lists.length} lists · {lists.filter(l => l.shared).length} shared</p>
        </div>
        <ArrowRight size={16} className="text-secondary/60" />
      </Link>

      <Link to="/group-vote" className="mx-6 mt-3 rounded-[1.75rem] bg-accent/50 p-4 flex items-center gap-3 press">
        <div className="w-11 h-11 rounded-2xl bg-background flex items-center justify-center">
          <Users size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-display text-base font-bold text-secondary">Friday dinner vote</p>
          <p className="text-xs text-secondary/70">3 friends · 6 votes · ends in 2h</p>
        </div>
        <ArrowRight size={16} className="text-secondary/60" />
      </Link>

      <h2 className="px-6 mt-6 mb-3 font-display text-xl font-bold text-secondary">Your favorites</h2>
      <section className="px-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-secondary/60">No favorites yet — tap the heart on any place.</p>
        ) : items.map((r) => <RestaurantCard key={r.id} r={r} />)}
      </section>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

export default Saved;
