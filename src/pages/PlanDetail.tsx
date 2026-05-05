import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Send, Trophy, MessageCircle, Plus, Share2 } from "lucide-react";
import { useApp } from "@/state/AppState";
import { findRestaurant, restaurants } from "@/data/restaurants";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const seedMessages = [
  { who: "Yasmine", text: "Something with a terrace? 🌅", time: "2h" },
  { who: "Mehdi", text: "Budget under 60dt please", time: "1h" },
  { who: "Lina", text: "I voted The Cliff 😍", time: "12m" },
];

const PlanDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { plans, votePlan } = useApp();
  const plan = plans.find((p) => p.id === id);
  const [voted, setVoted] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(seedMessages);
  const [adding, setAdding] = useState(false);

  if (!plan) {
    return (
      <div className="phone-frame p-6">
        <p>Plan not found.</p>
        <Link to="/plans" className="text-primary font-bold">Back to plans</Link>
      </div>
    );
  }

  const sorted = [...plan.candidates].sort((a, b) => b.votes - a.votes);
  const total = sorted.reduce((s, v) => s + v.votes, 0);
  const winner = sorted[0];

  const cast = (rid: string) => {
    if (voted) return;
    votePlan(plan.id, rid);
    setVoted(rid);
    toast({ title: "Vote cast ✓", description: `${plan.name} — group sees it instantly` });
  };

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { who: "You", text: draft.trim(), time: "now" }]);
    setDraft("");
  };

  const suggestions = restaurants.filter((r) => !plan.candidates.find((c) => c.restaurantId === r.id)).slice(0, 4);
  const addSuggestion = (rid: string) => {
    votePlan(plan.id, rid);
    setAdding(false);
    toast({ title: "Added", description: `${findRestaurant(rid).name} suggested to group` });
  };

  return (
    <div className="phone-frame flex flex-col pb-8">
      <header className="px-5 pt-6 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-primary">
            <Users size={11} /> {plan.participants.length} people · {plan.endsIn}
          </div>
          <h1 className="font-display text-xl font-bold text-secondary leading-tight truncate">{plan.emoji} {plan.name}</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <Share2 size={16} />
        </button>
      </header>

      {/* Participants */}
      <div className="mx-5 rounded-2xl bg-info p-3 flex items-center gap-3">
        <div className="flex -space-x-2">
          {plan.participants.map((n) => (
            <div key={n} className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-info">
              {n[0]}
            </div>
          ))}
        </div>
        <div className="flex-1 text-xs text-secondary/80">
          <p className="font-semibold text-secondary">{plan.participants.join(" · ")}</p>
        </div>
      </div>

      {/* Winning banner */}
      {winner && (
        <div className="mx-5 mt-3 rounded-2xl bg-accent/50 p-4 flex items-center gap-3">
          <Trophy size={20} className="text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/70">Leading</p>
            <p className="font-display text-base font-bold text-secondary truncate">{findRestaurant(winner.restaurantId).name}</p>
          </div>
          <span className="text-2xl font-bold text-primary">{winner.votes}</span>
        </div>
      )}

      {/* Options */}
      <section className="px-5 mt-4 space-y-3">
        <h2 className="font-display text-sm font-bold text-secondary/70 uppercase tracking-wider">Options</h2>
        {sorted.map((v) => {
          const r = findRestaurant(v.restaurantId);
          const pct = total ? Math.round((v.votes / total) * 100) : 0;
          const isVoted = voted === v.restaurantId;
          return (
            <div key={v.restaurantId} className="soft-card bg-card p-3">
              <Link to={`/restaurant/${r.id}`} className="flex items-center gap-3">
                <img src={r.image} alt={r.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-bold text-secondary truncate">{r.name}</h3>
                  <p className="text-[11px] text-secondary/60 truncate">{r.ambiance} · {r.budget}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-bold text-primary">{v.votes}</span>
                  <p className="text-[10px] text-secondary/60">{pct}%</p>
                </div>
              </Link>
              <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <button
                onClick={() => cast(v.restaurantId)}
                disabled={!!voted || plan.status === "decided"}
                className={cn(
                  "mt-3 w-full h-11 rounded-full font-bold text-sm press",
                  isVoted ? "bg-accent text-secondary" : voted || plan.status === "decided" ? "bg-muted text-secondary/40" : "bg-primary text-primary-foreground shadow-glow"
                )}
              >
                {plan.status === "decided" ? "Plan locked" : isVoted ? "Your vote ✓" : voted ? "Voted elsewhere" : "Vote for this"}
              </button>
            </div>
          );
        })}

        {adding ? (
          <div className="soft-card bg-info p-3 space-y-2">
            <p className="text-xs font-bold text-secondary">Suggest a place</p>
            {suggestions.map((r) => (
              <button key={r.id} onClick={() => addSuggestion(r.id)} className="w-full flex items-center gap-3 p-2 rounded-2xl bg-background press">
                <img src={r.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1 text-left min-w-0">
                  <p className="font-bold text-secondary text-sm truncate">{r.name}</p>
                  <p className="text-[10px] text-secondary/60 truncate">{r.cuisine} · {r.budget}</p>
                </div>
                <Plus size={16} className="text-primary" />
              </button>
            ))}
            <button onClick={() => setAdding(false)} className="w-full h-10 rounded-full bg-card text-secondary text-sm font-bold press">Cancel</button>
          </div>
        ) : (
          plan.status !== "decided" && (
            <button onClick={() => setAdding(true)} className="w-full h-12 rounded-full border-2 border-dashed border-primary/40 text-primary font-bold text-sm inline-flex items-center justify-center gap-2 press">
              <Plus size={16} /> Suggest a place
            </button>
          )
        )}
      </section>

      {/* Discussion */}
      <section className="px-5 mt-6">
        <h2 className="font-display text-sm font-bold text-secondary/70 uppercase tracking-wider mb-3 inline-flex items-center gap-1.5">
          <MessageCircle size={13} /> Discussion
        </h2>
        <div className="space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={cn("max-w-[80%] rounded-2xl p-3", m.who === "You" ? "bg-primary text-primary-foreground ml-auto" : "bg-card")}>
              <p className="text-[10px] font-bold opacity-70">{m.who} · {m.time}</p>
              <p className={cn("text-sm", m.who === "You" ? "text-primary-foreground" : "text-secondary")}>{m.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 bg-card rounded-full pl-4 pr-1 h-12 shadow-soft">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message the group…"
            className="flex-1 bg-transparent text-sm focus:outline-none text-secondary placeholder:text-secondary/40"
          />
          <button onClick={send} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center press">
            <Send size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanDetail;
