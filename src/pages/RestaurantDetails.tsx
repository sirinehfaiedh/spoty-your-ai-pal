import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Share2, Star, Car, Baby, ArrowUpDown, Clock, Headphones, Wallet, MapPin, CheckCircle2, UserPlus, Navigation, Sparkles } from "lucide-react";
import { findRestaurant, timeForTransport } from "@/data/restaurants";
import { useApp } from "@/state/AppState";
import { SaveSheet } from "@/components/SaveSheet";
import { ShareSheet } from "@/components/ShareSheet";
import { InviteSheet } from "@/components/InviteSheet";
import { Button } from "@/components/ui/button";

const reviews = [
  { name: "Amira", rating: 5, text: "Quiet, fast service, perfect for lunch breaks." },
  { name: "Youssef", rating: 4, text: "Loved the grilled fish — would go again." },
];

const RestaurantDetails = () => {
  const { id = "" } = useParams();
  const r = findRestaurant(id);
  const { lists, saved, toggleSaved, memory } = useApp();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const lastTap = useRef(0);
  const inAnyList = saved.includes(r.id) || lists.some((l) => l.items.includes(r.id));
  const tt = timeForTransport(r, memory.transport);

  const triggerSave = () => {
    if (!inAnyList) toggleSaved(r.id);
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
    setSheetOpen(true);
  };

  const onHeroTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      triggerSave();
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;
  };

  const openMaps = () => {
    const q = encodeURIComponent(`${r.name} ${r.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  return (
    <>
    <div className="phone-frame flex flex-col pb-32 bg-background">
      {/* Hero */}
      <div onClick={onHeroTap} className="relative h-72 w-full overflow-hidden rounded-b-[2.5rem] select-none">
        <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
        <Link to="/home" className="absolute top-6 left-5 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center press">
          <ArrowLeft size={18} />
        </Link>
        <div className="absolute top-6 right-5 flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); setShareOpen(true); }} className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center press"><Share2 size={16} /></button>
          <button
            onClick={(e) => { e.stopPropagation(); triggerSave(); }}
            className={`w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center press shadow-glow transition-transform ${pulse ? "scale-125" : ""}`}
            aria-label={inAnyList ? "Saved" : "Save"}
          >
            <Bookmark size={16} className={inAnyList ? "fill-current" : ""} />
          </button>
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-primary-foreground">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{r.tag}</span>
          <h1 className="font-display text-4xl font-semibold mt-2 leading-tight">{r.name}</h1>
          <div className="flex items-center gap-3 mt-1 text-sm">
            <span className="inline-flex items-center gap-1"><Star size={14} className="fill-highlight text-highlight" /> {r.rating}</span>
            <span className="opacity-80">·</span>
            <span className="opacity-90">{r.cuisine}</span>
            <span className="opacity-80">·</span>
            <span className="inline-flex items-center gap-1 opacity-90"><MapPin size={12} /> {r.address}</span>
          </div>
          <p className="text-xs opacity-90 mt-1 inline-flex items-center gap-1"><Navigation size={11} /> {tt.label} away</p>
        </div>
      </div>

      {/* Availability — moved to TOP */}
      <div className="px-6 mt-5">
        <div className="rounded-[1.25rem] bg-accent/40 p-3 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-secondary" />
          <span className="text-sm font-bold text-secondary flex-1">Reservation available today</span>
          <span className="text-[11px] font-bold text-primary">live</span>
        </div>
      </div>

      {/* Data grid */}
      <section className="px-6 mt-5 grid grid-cols-5 gap-2">
        {[
          { icon: Navigation, label: tt.label.split(" ")[0] + " min", sub: tt.verb },
          { icon: Clock, label: r.wait, sub: "Wait" },
          { icon: Headphones, label: r.ambiance, sub: "Vibe" },
          { icon: Car, label: r.parking ? "Yes" : "No", sub: "Parking" },
          { icon: Wallet, label: r.budget, sub: "Budget", compact: true },
        ].map((p, i) => (
          <div key={i} className="soft-card bg-card py-3 px-1 flex flex-col items-center text-center">
            <p.icon size={16} className="text-primary" />
            <span className={`font-semibold mt-1 ${p.compact ? "text-[10px]" : "text-xs"}`}>{p.label}</span>
            <span className="text-[10px] text-muted-foreground">{p.sub}</span>
          </div>
        ))}
      </section>

      {/* Today's menu */}
      {r.dailyMenu && r.dailyMenu.length > 0 && (
        <section className="px-6 mt-8">
          <h2 className="font-display text-2xl font-semibold mb-3">Today's menu</h2>
          <div className="space-y-2">
            {r.dailyMenu.map((m) => (
              <div key={m.name} className="soft-card bg-card p-4 flex items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold">{m.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                  {m.tags.length > 0 && (
                    <div className="flex gap-1 mt-1.5">
                      {m.tags.map((t) => (
                        <span key={t} className="text-[9px] font-bold uppercase bg-accent/40 text-secondary px-1.5 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="font-display font-semibold text-primary">{m.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full menu — same screen */}
      <section className="px-6 mt-8">
        <h2 className="font-display text-2xl font-semibold mb-3">Full menu</h2>
        <div className="space-y-2">
          {[...(r.dailyMenu || []), { name: "Brik à l'œuf", desc: "Crispy filo, egg, tuna, capers", price: "9 dt", tags: [] }, { name: "Baklava Maison", desc: "Pistachio, orange blossom syrup", price: "12 dt", tags: ["vegetarian"] }].map((m) => (
            <div key={m.name} className="soft-card bg-card p-4 flex items-start gap-3">
              <div className="flex-1">
                <h4 className="font-semibold">{m.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
              </div>
              <span className="font-display font-semibold text-primary">{m.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility */}
      <section className="px-6 mt-8">
        <h2 className="font-display text-2xl font-semibold mb-3">Accessibility & services</h2>
        <div className="grid grid-cols-2 gap-3">
          <Service icon={Car} label="Parking" active={r.parking} tone="green" />
          <Service icon={Baby} label="Kids area" active tone="yellow" />
          <Service icon={ArrowUpDown} label="Elevator" active tone="beige" />
          <Service icon={Headphones} label="Quiet room" active={r.ambiance === "Quiet"} tone="orange" />
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 mt-8 mb-4">
        <h2 className="font-display text-2xl font-semibold mb-3">Reviews</h2>
        <div className="space-y-3">
          {reviews.map((rv) => (
            <div key={rv.name} className="soft-card bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{rv.name}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold">
                  {Array.from({ length: rv.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-highlight text-highlight" />
                  ))}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{rv.text}</p>
            </div>
          ))}
        </div>
      </section>

      <button onClick={() => setInviteOpen(true)} className="mx-6 h-12 rounded-full bg-card text-secondary font-bold text-sm inline-flex items-center justify-center gap-2 press">
        <UserPlus size={16} className="text-primary" /> Invite friends to this spot
      </button>
    </div>

    {/* Sticky bottom CTA */}
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur border-t border-muted/50 p-4 z-30 flex gap-2">
      <Link to={`/reserve/${r.id}`} className="flex-1">
        <Button size="lg" className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow">
          <Sparkles size={16} className="mr-1" /> Reserve a table
        </Button>
      </Link>
      <button onClick={openMaps} aria-label="Navigate" className="w-14 h-14 rounded-full bg-card press inline-flex items-center justify-center shadow-soft">
        <Navigation size={18} className="text-primary" />
      </button>
    </div>

    {sheetOpen && <SaveSheet restaurantId={r.id} onClose={() => setSheetOpen(false)} />}
    {shareOpen && <ShareSheet restaurantId={r.id} onClose={() => setShareOpen(false)} />}
    {inviteOpen && <InviteSheet restaurantId={r.id} onClose={() => setInviteOpen(false)} />}
    </>
  );
};

const toneMap = { green: "bg-accent/30", yellow: "bg-highlight/40", beige: "bg-muted", orange: "bg-primary/15" } as const;
const Service = ({ icon: Icon, label, active, tone }: any) => (
  <div className={`rounded-2xl p-4 flex items-center gap-3 ${toneMap[tone]}`}>
    <Icon size={18} className="text-secondary" />
    <div>
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-xs text-muted-foreground">{active ? "Available" : "Not available"}</p>
    </div>
  </div>
);

export default RestaurantDetails;
