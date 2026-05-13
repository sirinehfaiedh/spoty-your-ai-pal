import { Link } from "react-router-dom";
import { useState } from "react";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { Heart, FolderHeart, Users, ArrowRight, Calendar, UserPlus, Bell, Sparkles } from "lucide-react";
import { useApp } from "@/state/AppState";
import { InviteSheet } from "@/components/InviteSheet";

const Saved = () => {
  const { saved, lists, plans, invitations, friends } = useApp();
  const items = restaurants.filter((r) => saved.includes(r.id));
  const activeVoting = plans.filter((p) => p.status === "voting").length;
  const pendingInvites = invitations.filter((i) => i.direction === "incoming" && i.status === "pending").length;
  const sharingFriends = friends.filter((f) => f.sharingLocation).length;
  const [invitePick, setInvitePick] = useState<string | null>(null);
  const inviteSuggestions = items.length ? items : restaurants.slice(0, 3);

  return (
    <>
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-secondary">Saved</h1>
          <p className="text-secondary/70 text-sm mt-1">Your shortlist, lists & social plans.</p>
        </div>
        <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center">
          <Heart size={18} className="text-primary fill-primary" />
        </div>
      </header>

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

      <Link to="/plans" className="mx-6 mt-3 rounded-[1.75rem] bg-accent/50 p-4 flex items-center gap-3 press">
        <div className="w-11 h-11 rounded-2xl bg-background flex items-center justify-center">
          <Calendar size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-display text-base font-bold text-secondary">Plans hub</p>
          <p className="text-xs text-secondary/70">{plans.length} plans · {activeVoting} voting now</p>
        </div>
        <ArrowRight size={16} className="text-secondary/60" />
      </Link>

      <Link to="/invitations" className="mx-6 mt-3 rounded-[1.75rem] bg-highlight/50 p-4 flex items-center gap-3 press relative">
        <div className="w-11 h-11 rounded-2xl bg-background flex items-center justify-center">
          <Bell size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-display text-base font-bold text-secondary">Invitations</p>
          <p className="text-xs text-secondary/70">{pendingInvites} waiting · accept, decline or maybe</p>
        </div>
        {pendingInvites > 0 && (
          <span className="absolute top-3 right-12 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-glow">
            {pendingInvites}
          </span>
        )}
        <ArrowRight size={16} className="text-secondary/60" />
      </Link>

      {/* Invite friends section */}
      <section className="mt-6">
        <div className="px-6 flex items-end justify-between mb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-secondary inline-flex items-center gap-2">
              <UserPlus size={18} className="text-primary" /> Invite friends
            </h2>
            <p className="text-[11px] text-secondary/60">{sharingFriends} friends available · pick a spot to invite them</p>
          </div>
        </div>
        <div className="px-6 flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {inviteSuggestions.map((r) => (
            <button
              key={r.id}
              onClick={() => setInvitePick(r.id)}
              className="shrink-0 w-56 rounded-[1.5rem] overflow-hidden bg-card shadow-soft press text-left"
            >
              <div className="relative h-28">
                <img src={r.dishImage} alt={r.dishName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />
                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"><Sparkles size={9} /> {r.affinity}%</span>
                <div className="absolute bottom-2 left-3 right-3 text-primary-foreground">
                  <p className="font-display text-sm font-bold leading-tight truncate">{r.name}</p>
                  <p className="text-[10px] opacity-90 truncate">{r.ambiance} · {r.budget.split(" ")[0]}+</p>
                </div>
              </div>
              <div className="p-2.5 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {friends.slice(0, 3).map((f) => (
                    <div key={f.id} className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-card">{f.initial}</div>
                  ))}
                </div>
                <span className="ml-auto inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                  <UserPlus size={10} /> Invite
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Grouped by collections */}
      <h2 className="px-6 mt-7 mb-3 font-display text-xl font-bold text-secondary">Your collections</h2>
      <section className="space-y-6">
        {lists.filter((l) => l.items.length > 0).map((l) => {
          const items = restaurants.filter((r) => l.items.includes(r.id));
          return (
            <div key={l.id}>
              <div className="px-6 flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-9 h-9 rounded-2xl bg-highlight/40 flex items-center justify-center text-lg">{l.emoji}</span>
                  <div>
                    <p className="font-display text-base font-bold text-secondary leading-tight">{l.name}</p>
                    <p className="text-[10px] text-secondary/60 font-semibold">{items.length} place{items.length > 1 ? "s" : ""}{l.shared ? " · shared" : ""}</p>
                  </div>
                </div>
                <Link to={`/lists/${l.id}`} className="text-[11px] font-bold text-primary press">Open →</Link>
              </div>
              <div className="px-6 space-y-4">
                {items.map((r) => <RestaurantCard key={r.id} r={r} compact />)}
              </div>
            </div>
          );
        })}

        {/* Loose favorites (in saved but not in any list) */}
        {(() => {
          const loose = items.filter((r) => !lists.some((l) => l.items.includes(r.id)));
          if (loose.length === 0) return null;
          return (
            <div>
              <h3 className="px-6 font-display text-base font-bold text-secondary mb-3">Other favorites</h3>
              <div className="px-6 space-y-4">
                {loose.map((r) => <RestaurantCard key={r.id} r={r} compact />)}
              </div>
            </div>
          );
        })()}

        {items.length === 0 && lists.every((l) => l.items.length === 0) && (
          <p className="px-6 text-sm text-secondary/60">No favorites yet — tap the bookmark on any place.</p>
        )}
      </section>

      <div className="mt-8" />
      <TabBar />
    </div>
    {invitePick && <InviteSheet restaurantId={invitePick} onClose={() => setInvitePick(null)} />}
    </>
  );
};

export default Saved;
