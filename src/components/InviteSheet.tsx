import { useState } from "react";
import { X, Check, Send, Search, Sparkles, Star } from "lucide-react";
import { useApp } from "@/state/AppState";
import { findRestaurant } from "@/data/restaurants";
import { toast } from "@/hooks/use-toast";

export const InviteSheet = ({ restaurantId, onClose }: { restaurantId: string; onClose: () => void }) => {
  const { friends, sendInvitation } = useApp();
  const r = findRestaurant(restaurantId);
  const [picked, setPicked] = useState<string[]>([]);
  const [when, setWhen] = useState("Tonight · 19:30");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const filtered = friends.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const send = () => {
    if (picked.length === 0) return;
    sendInvitation({ restaurantId, fromName: "You", toFriendIds: picked, message, when });
    toast({ title: "Invitation sent ✓", description: `${picked.length} friend${picked.length > 1 ? "s" : ""} invited to ${r.name}` });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-[430px] bg-background rounded-t-[2rem] p-6 pb-8 animate-slide-up shadow-card max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-secondary">Invite friends</h3>
            <p className="text-xs text-secondary/60">{r.name} · {r.address}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-card flex items-center justify-center press"><X size={16} /></button>
        </div>

        {/* Mini preview */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-info mb-3">
          <img src={r.dishImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-secondary text-sm truncate">{r.dishName}</p>
            <p className="text-[11px] text-secondary/70 inline-flex items-center gap-1.5"><Sparkles size={10} className="text-primary" /> {r.affinity}% match · <Star size={10} className="fill-primary text-primary" /> {r.rating}</p>
          </div>
        </div>

        {/* When */}
        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
          {["Tonight · 19:30", "Tomorrow · 13:00", "Friday · 20:00", "This weekend"].map((t) => (
            <button key={t} onClick={() => setWhen(t)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold press ${when === t ? "bg-primary text-primary-foreground shadow-glow" : "bg-card text-secondary"}`}>{t}</button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-card rounded-2xl px-3 h-11 mb-3">
          <Search size={14} className="text-secondary/60" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search friends…" className="flex-1 bg-transparent text-sm focus:outline-none" />
        </div>

        {/* Friends list */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
          {filtered.map((f) => {
            const active = picked.includes(f.id);
            return (
              <button key={f.id} onClick={() => toggle(f.id)} className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-card press">
                <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">{f.initial}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-secondary text-sm">{f.name}</p>
                  <p className="text-[11px] text-secondary/60">{f.status} · {f.location}</p>
                </div>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "border-2 border-primary/30"}`}>
                  {active && <Check size={14} />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Message */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a quick note (optional)…"
          className="mt-3 w-full h-11 rounded-2xl bg-card px-4 text-sm focus:outline-none placeholder:text-secondary/40"
        />

        <button onClick={send} disabled={picked.length === 0} className="mt-3 w-full h-13 py-3.5 rounded-full bg-primary text-primary-foreground font-bold inline-flex items-center justify-center gap-2 shadow-glow press disabled:opacity-40">
          <Send size={16} /> Send invitation{picked.length > 1 ? "s" : ""} {picked.length > 0 && `· ${picked.length}`}
        </button>
      </div>
    </div>
  );
};
