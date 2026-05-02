import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Users, Send } from "lucide-react";
import { useApp } from "@/state/AppState";
import { findRestaurant } from "@/data/restaurants";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const friends = ["Yasmine", "Mehdi", "Lina", "You"];

const GroupVote = () => {
  const navigate = useNavigate();
  const { groupVote, vote } = useApp();
  const sorted = [...groupVote].sort((a, b) => b.votes - a.votes);
  const total = sorted.reduce((s, v) => s + v.votes, 0);
  const winner = sorted[0];
  const [voted, setVoted] = useState<string | null>(null);

  const cast = (id: string) => {
    if (voted) return;
    vote(id, "You");
    setVoted(id);
    toast({ title: "Vote cast ✓", description: "Group will see your pick instantly." });
  };

  return (
    <div className="phone-frame flex flex-col pb-8">
      <header className="px-5 pt-6 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-primary">
            <Users size={11} /> Group decision
          </div>
          <h1 className="font-display text-xl font-bold text-secondary leading-tight">Friday dinner</h1>
        </div>
      </header>

      <div className="mx-5 rounded-2xl bg-info p-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          {friends.map((f) => (
            <div key={f} className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-info">
              {f[0]}
            </div>
          ))}
        </div>
        <div className="flex-1 text-xs text-secondary/80">
          <p className="font-semibold text-secondary">{friends.length} friends voting · {total} votes total</p>
          <p>Ends in 2h · majority wins</p>
        </div>
      </div>

      {/* Winning banner */}
      <div className="mx-5 mt-4 rounded-2xl bg-accent/40 p-4 flex items-center gap-3 animate-fade-in">
        <Trophy size={22} className="text-primary" />
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/70">Currently leading</p>
          <p className="font-display text-lg font-bold text-secondary leading-tight">{findRestaurant(winner.restaurantId).name}</p>
        </div>
        <span className="text-2xl font-bold text-primary">{winner.votes}</span>
      </div>

      {/* Options */}
      <section className="px-5 mt-5 space-y-3">
        {sorted.map((v) => {
          const r = findRestaurant(v.restaurantId);
          const pct = total ? Math.round((v.votes / total) * 100) : 0;
          const isVoted = voted === v.restaurantId;
          return (
            <div key={v.restaurantId} className="soft-card bg-card p-4">
              <div className="flex items-center gap-3">
                <img src={r.image} alt={r.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-bold text-secondary truncate">{r.name}</h3>
                  <p className="text-[11px] text-secondary/60 truncate">{r.ambiance} · {r.budget}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-bold text-primary">{v.votes}</span>
                  <p className="text-[10px] text-secondary/60">{pct}%</p>
                </div>
              </div>
              {/* progress */}
              <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <button
                onClick={() => cast(v.restaurantId)}
                disabled={!!voted}
                className={`mt-3 w-full h-11 rounded-full font-bold text-sm press ${
                  isVoted ? "bg-accent text-secondary" : voted ? "bg-muted text-secondary/40" : "bg-primary text-primary-foreground shadow-glow"
                }`}
              >
                {isVoted ? "Your vote ✓" : voted ? "Voted elsewhere" : "Vote for this"}
              </button>
            </div>
          );
        })}
      </section>

      <div className="px-5 mt-6">
        <button className="w-full h-12 rounded-full bg-card text-secondary font-bold text-sm shadow-soft inline-flex items-center justify-center gap-2 press">
          <Send size={14} /> Share with more friends
        </button>
      </div>
    </div>
  );
};

export default GroupVote;
