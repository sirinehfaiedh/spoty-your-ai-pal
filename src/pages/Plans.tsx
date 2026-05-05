import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Users, Trophy, Calendar } from "lucide-react";
import { useApp } from "@/state/AppState";
import { TabBar } from "@/components/TabBar";
import { findRestaurant } from "@/data/restaurants";
import { cn } from "@/lib/utils";

const statusStyle = {
  voting: "bg-primary/15 text-primary",
  decided: "bg-accent/60 text-secondary",
  planning: "bg-highlight/60 text-secondary",
};

const Plans = () => {
  const navigate = useNavigate();
  const { plans } = useApp();

  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-7 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold tracking-wider uppercase text-primary inline-flex items-center gap-1"><Users size={11} /> Community</p>
          <h1 className="font-display text-3xl font-bold text-secondary leading-tight">Plans</h1>
          <p className="text-secondary/70 text-xs mt-0.5">Decide together · faster</p>
        </div>
      </header>

      <Link to="/plans/new" className="mx-6 mt-2 rounded-[1.75rem] bg-primary text-primary-foreground p-5 flex items-center gap-3 shadow-glow press">
        <div className="w-12 h-12 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
          <Plus size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold leading-tight">Create new plan</h3>
          <p className="text-xs opacity-80">Date · Friends · Work · Family</p>
        </div>
      </Link>

      <section className="px-6 mt-6 space-y-3">
        {plans.map((p) => {
          const total = p.candidates.reduce((s, c) => s + c.votes, 0);
          const winner = [...p.candidates].sort((a, b) => b.votes - a.votes)[0];
          const winnerR = winner ? findRestaurant(winner.restaurantId) : null;
          const decidedR = p.decidedRestaurantId ? findRestaurant(p.decidedRestaurantId) : null;

          return (
            <Link key={p.id} to={`/plans/${p.id}`} className="block soft-card bg-card p-4 press animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-highlight/50 flex items-center justify-center text-2xl">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-secondary truncate">{p.name}</h3>
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full", statusStyle[p.status])}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex -space-x-1.5">
                      {p.participants.slice(0, 4).map((n) => (
                        <div key={n} className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center border-2 border-card">
                          {n[0]}
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-secondary/60 ml-1">{p.participants.length} people · {p.endsIn}</span>
                  </div>
                </div>
              </div>

              {decidedR ? (
                <div className="mt-3 rounded-2xl bg-accent/40 p-3 flex items-center gap-3">
                  <Trophy size={16} className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60">Decided</p>
                    <p className="font-bold text-secondary text-sm truncate">{decidedR.name}</p>
                  </div>
                </div>
              ) : winnerR ? (
                <div className="mt-3 rounded-2xl bg-info p-3 flex items-center gap-3">
                  <img src={winnerR.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60">Leading · {total} votes</p>
                    <p className="font-bold text-secondary text-sm truncate">{winnerR.name}</p>
                  </div>
                  <span className="text-primary font-display font-bold text-lg">{winner.votes}</span>
                </div>
              ) : (
                <p className="mt-3 text-[11px] text-secondary/60">No suggestions yet — tap to add one.</p>
              )}

              <p className="mt-3 text-[11px] text-secondary/60 inline-flex items-center gap-1">
                <Calendar size={10} /> {p.lastActivity}
              </p>
            </Link>
          );
        })}
      </section>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

export default Plans;
