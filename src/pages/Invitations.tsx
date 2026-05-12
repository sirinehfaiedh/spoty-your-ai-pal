import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Clock, Sparkles, Star } from "lucide-react";
import { useApp } from "@/state/AppState";
import { findRestaurant } from "@/data/restaurants";
import { toast } from "@/hooks/use-toast";

const Invitations = () => {
  const navigate = useNavigate();
  const { invitations, respondInvitation, friends } = useApp();
  const incoming = invitations.filter((i) => i.direction === "incoming");
  const outgoing = invitations.filter((i) => i.direction === "outgoing");

  const respond = (id: string, status: "accepted" | "declined" | "maybe", name: string) => {
    respondInvitation(id, status);
    const labels = { accepted: "Accepted ✓", declined: "Declined", maybe: "Maybe later" };
    toast({ title: labels[status], description: `${name}'s invitation` });
  };

  return (
    <div className="phone-frame flex flex-col pb-8">
      <header className="px-6 pt-7 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center press"><ArrowLeft size={18} /></button>
        <div>
          <h1 className="font-display text-2xl font-bold text-secondary">Invitations</h1>
          <p className="text-xs text-secondary/60">{incoming.filter(i => i.status === "pending").length} waiting · {outgoing.length} sent</p>
        </div>
      </header>

      <section className="px-6">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary/60 mb-3">Incoming</h2>
        <div className="space-y-3">
          {incoming.length === 0 && <p className="text-sm text-secondary/60">No invitations yet.</p>}
          {incoming.map((iv) => {
            const r = findRestaurant(iv.restaurantId);
            return (
              <div key={iv.id} className="rounded-[1.75rem] bg-card shadow-soft overflow-hidden">
                <Link to={`/restaurant/${r.id}`} className="block">
                  <div className="relative h-32">
                    <img src={r.dishImage} alt={r.dishName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1"><Sparkles size={10} /> {r.affinity}%</span>
                    <span className="absolute top-2 right-2 bg-card text-secondary text-[10px] font-bold px-2 py-1 rounded-full inline-flex items-center gap-1"><Star size={10} className="fill-primary text-primary" /> {r.rating}</span>
                    <div className="absolute bottom-2 left-3 right-3 text-primary-foreground">
                      <p className="font-display text-lg font-bold leading-tight">{r.name}</p>
                      <p className="text-[11px] opacity-90">{r.ambiance} · {r.budget}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">{iv.fromName[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-secondary text-sm">{iv.fromName} invited you</p>
                      <p className="text-[11px] text-secondary/60 inline-flex items-center gap-1"><Clock size={10} /> {iv.when}</p>
                    </div>
                  </div>
                  {iv.message && <p className="mt-2 text-sm text-secondary/80 italic">"{iv.message}"</p>}
                  {iv.status === "pending" ? (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <button onClick={() => respond(iv.id, "accepted", iv.fromName)} className="h-10 rounded-full bg-primary text-primary-foreground text-xs font-bold press inline-flex items-center justify-center gap-1"><Check size={12} /> Accept</button>
                      <button onClick={() => respond(iv.id, "maybe", iv.fromName)} className="h-10 rounded-full bg-highlight/60 text-secondary text-xs font-bold press inline-flex items-center justify-center gap-1"><Clock size={12} /> Maybe</button>
                      <button onClick={() => respond(iv.id, "declined", iv.fromName)} className="h-10 rounded-full bg-card text-secondary text-xs font-bold press inline-flex items-center justify-center gap-1"><X size={12} /> Decline</button>
                    </div>
                  ) : (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-primary px-3 py-1.5 bg-primary/10 rounded-full">
                      {iv.status === "accepted" && "✓ Accepted"}
                      {iv.status === "declined" && "✕ Declined"}
                      {iv.status === "maybe" && "⏳ Maybe later"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 mt-6">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary/60 mb-3">Sent by you</h2>
        <div className="space-y-2">
          {outgoing.length === 0 && <p className="text-sm text-secondary/60">No outgoing invitations.</p>}
          {outgoing.map((iv) => {
            const r = findRestaurant(iv.restaurantId);
            const names = iv.toFriendIds.map((id) => friends.find((f) => f.id === id)?.name).filter(Boolean).join(", ");
            return (
              <Link to={`/restaurant/${r.id}`} key={iv.id} className="flex items-center gap-3 p-3 rounded-2xl bg-card press">
                <img src={r.dishImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-secondary text-sm truncate">{r.name}</p>
                  <p className="text-[11px] text-secondary/60 truncate">{iv.when} · {names}</p>
                </div>
                <span className="text-[10px] font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-full">Pending</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Invitations;
