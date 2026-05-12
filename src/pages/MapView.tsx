import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Users, MapPin, Search, Locate, Star, EyeOff, UserPlus, Share2, Hand, X, Eye } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { cn } from "@/lib/utils";
import { useApp } from "@/state/AppState";
import { InviteSheet } from "@/components/InviteSheet";
import { ShareSheet } from "@/components/ShareSheet";
import { toast } from "@/hooks/use-toast";

type Mode = "discover" | "friends";

const pins = restaurants.slice(0, 5).map((r, i) => ({
  ...r,
  x: [22, 52, 36, 70, 80][i],
  y: [55, 30, 70, 50, 22][i],
}));

const MapView = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { friends, locationSharing, setLocationSharing } = useApp();
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "discover");
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [actionFor, setActionFor] = useState<string | null>(null); // friend id for action sheet
  const [inviteFor, setInviteFor] = useState<string | null>(null);
  const [shareFor, setShareFor] = useState<string | null>(null);

  // Privacy: only friends with sharingLocation = true appear on map
  const visibleFriends = friends.filter((f) => f.sharingLocation);

  const pin = pins.find((p) => p.id === selectedPin);
  const friend = visibleFriends.find((f) => f.id === selectedFriend);
  const actionFriend = friends.find((f) => f.id === actionFor);

  return (
    <>
    <div className="phone-frame flex flex-col pb-0 bg-background">
      <div className="relative h-[100vh] overflow-hidden">
        {/* Stylized map */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--highlight)/0.55),transparent_60%),radial-gradient(circle_at_70%_70%,hsl(var(--primary)/0.35),transparent_60%),radial-gradient(circle_at_85%_15%,hsl(var(--info)/0.6),transparent_55%)] bg-accent/20" />
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-20">
          {Array.from({ length: 240 }).map((_, i) => (<div key={i} className="border border-background/30" />))}
        </div>
        <div className="absolute left-0 right-0 top-[45%] h-[3px] bg-background/60 rotate-[-8deg]" />
        <div className="absolute left-0 right-0 top-[68%] h-[2px] bg-background/50 rotate-[6deg]" />
        <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-background/50" />
        <div className="absolute right-0 top-0 w-[35%] h-[40%] bg-info/60 rounded-bl-[60%]" />

        {/* User location — only when sharing */}
        {locationSharing ? (
          <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring w-6 h-6" />
            <span className="relative block w-6 h-6 rounded-full bg-primary ring-4 ring-background shadow-glow" />
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/95 px-3 py-1.5 rounded-full shadow-card inline-flex items-center gap-1.5">
            <EyeOff size={12} className="text-secondary/70" />
            <span className="text-[10px] font-bold text-secondary/70">You're invisible</span>
          </div>
        )}

        {/* Restaurant pins */}
        {mode === "discover" && pins.map((p) => (
          <button key={p.id} onClick={() => { setSelectedPin(p.id); setSelectedFriend(null); }}
            className="absolute -translate-x-1/2 -translate-y-full press"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <div className={cn(
              "relative px-3 py-1.5 rounded-full text-[11px] font-bold shadow-card flex items-center gap-1",
              selectedPin === p.id ? "bg-primary text-primary-foreground scale-110" : "bg-background text-secondary"
            )}>
              <Star size={10} className="fill-primary text-primary" /> {p.rating}
              <span className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45",
                selectedPin === p.id ? "bg-primary" : "bg-background"
              )} />
            </div>
          </button>
        ))}

        {/* Friends — only visible if they share */}
        {mode === "friends" && visibleFriends.map((f) => (
          <button key={f.id} onClick={() => { setSelectedFriend(f.id); setSelectedPin(null); }}
            className="absolute -translate-x-1/2 -translate-y-1/2 press"
            style={{ left: `${f.x}%`, top: `${f.y}%` }}>
            <div className={cn(
              "relative w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center ring-4 ring-background shadow-card",
              selectedFriend === f.id && "scale-110 shadow-glow"
            )}>
              {f.initial}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent ring-2 ring-background" />
            </div>
          </button>
        ))}

        {/* Top header */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center gap-3 z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-background/95 flex items-center justify-center shadow-card press">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 h-11 rounded-full bg-background/95 shadow-card px-4 flex items-center gap-2">
            <Search size={15} className="text-secondary/60" />
            <span className="text-xs text-secondary/60">Search a place or friend…</span>
          </div>
          <button
            onClick={() => { setLocationSharing(!locationSharing); toast({ title: locationSharing ? "Location sharing OFF" : "Location sharing ON", description: locationSharing ? "Friends can't see your position" : "Friends can now see you" }); }}
            className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-card press", locationSharing ? "bg-primary text-primary-foreground" : "bg-background")}
            aria-label="Toggle location sharing"
          >
            {locationSharing ? <Locate size={16} /> : <EyeOff size={16} className="text-secondary" />}
          </button>
        </div>

        {/* Privacy banner */}
        {!locationSharing && (
          <div className="absolute top-20 left-5 right-5 z-10 bg-background/95 rounded-2xl shadow-card p-3 flex items-center gap-2 animate-fade-in">
            <EyeOff size={14} className="text-secondary" />
            <p className="text-[11px] text-secondary flex-1">You're invisible to friends. You can still see the map.</p>
            <button onClick={() => setLocationSharing(true)} className="text-[11px] font-bold text-primary press">Turn on</button>
          </div>
        )}

        {/* Mode switch */}
        <div className={cn("absolute left-1/2 -translate-x-1/2 bg-background/95 rounded-full p-1 shadow-card flex z-10", locationSharing ? "top-20" : "top-36")}>
          <button onClick={() => { setMode("discover"); setSelectedFriend(null); }}
            className={cn(
              "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all",
              mode === "discover" ? "bg-primary text-primary-foreground shadow-glow" : "text-secondary/70"
            )}>
            <MapPin size={13} /> Discover
          </button>
          <button onClick={() => { setMode("friends"); setSelectedPin(null); }}
            className={cn(
              "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all",
              mode === "friends" ? "bg-primary text-primary-foreground shadow-glow" : "text-secondary/70"
            )}>
            <Users size={13} /> Friends
          </button>
        </div>

        {/* Bottom panel */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {mode === "discover" && pin && (
            <div className="bg-background rounded-[1.75rem] shadow-card p-3 animate-slide-up">
              <Link to={`/restaurant/${pin.id}`} className="flex items-center gap-3 press">
                <img src={pin.image} alt={pin.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-bold text-secondary truncate">{pin.name}</h3>
                  <p className="text-[11px] text-secondary/60 truncate">{pin.cuisine} · {pin.address}</p>
                  <p className="text-[11px] text-primary font-bold mt-0.5">{pin.affinity}% match · {pin.drive} drive</p>
                </div>
              </Link>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setInviteFor(pin.id)} className="flex-1 h-9 rounded-full bg-primary text-primary-foreground text-[11px] font-bold press inline-flex items-center justify-center gap-1"><UserPlus size={12} /> Invite</button>
                <button onClick={() => setShareFor(pin.id)} className="flex-1 h-9 rounded-full bg-card text-secondary text-[11px] font-bold press inline-flex items-center justify-center gap-1"><Share2 size={12} /> Share</button>
              </div>
            </div>
          )}
          {mode === "friends" && friend && (
            <div className="bg-background rounded-[1.75rem] shadow-card p-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">{friend.initial}</div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-secondary">{friend.name}</h3>
                  <p className="text-[11px] text-secondary/60">{friend.status} · {friend.location}</p>
                </div>
                <button onClick={() => setActionFor(friend.id)} className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-2 rounded-full press">Actions</button>
              </div>
            </div>
          )}
          {mode === "discover" && !pin && (
            <div className="bg-background/95 rounded-[1.75rem] shadow-card p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-accent/40 flex items-center justify-center"><MapPin size={16} className="text-primary" /></div>
              <div className="flex-1">
                <p className="font-bold text-secondary text-sm">{pins.length} places nearby</p>
                <p className="text-[11px] text-secondary/60">Tap a pin — invite or share without sharing your location</p>
              </div>
            </div>
          )}
          {mode === "friends" && !friend && (
            <div className="bg-background/95 rounded-[1.75rem] shadow-card p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-info flex items-center justify-center"><Eye size={16} className="text-primary" /></div>
              <div className="flex-1">
                <p className="font-bold text-secondary text-sm">{visibleFriends.length} of {friends.length} friends sharing</p>
                <p className="text-[11px] text-secondary/60">Only friends with sharing ON appear on the map</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Friend action sheet */}
    {actionFriend && (
      <div className="fixed inset-0 z-[60] flex items-end justify-center animate-fade-in" onClick={() => setActionFor(null)}>
        <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" />
        <div className="relative w-full max-w-[430px] bg-background rounded-t-[2rem] p-6 pb-8 animate-slide-up shadow-card" onClick={(e) => e.stopPropagation()}>
          <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">{actionFriend.initial}</div>
              <div>
                <p className="font-display text-lg font-bold text-secondary">{actionFriend.name}</p>
                <p className="text-[11px] text-secondary/60">{actionFriend.status} · {actionFriend.location}</p>
              </div>
            </div>
            <button onClick={() => setActionFor(null)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center press"><X size={16} /></button>
          </div>
          <div className="space-y-2">
            <button onClick={() => { const top = pins[0]; setActionFor(null); setInviteFor(top.id); }} className="w-full p-4 rounded-2xl bg-card flex items-center gap-3 press">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><UserPlus size={16} /></div>
              <div className="text-left flex-1">
                <p className="font-bold text-secondary text-sm">Invite to a spot</p>
                <p className="text-[11px] text-secondary/60">Send an invitation with date & time</p>
              </div>
            </button>
            <button onClick={() => { const top = pins[0]; setActionFor(null); setShareFor(top.id); }} className="w-full p-4 rounded-2xl bg-card flex items-center gap-3 press">
              <div className="w-10 h-10 rounded-xl bg-info flex items-center justify-center"><Share2 size={16} className="text-secondary" /></div>
              <div className="text-left flex-1">
                <p className="font-bold text-secondary text-sm">Share a restaurant</p>
                <p className="text-[11px] text-secondary/60">Send a place card to {actionFriend.name}</p>
              </div>
            </button>
            <button onClick={() => { setActionFor(null); toast({ title: "Request sent", description: `Asked ${actionFriend.name} to join you` }); }} className="w-full p-4 rounded-2xl bg-card flex items-center gap-3 press">
              <div className="w-10 h-10 rounded-xl bg-highlight flex items-center justify-center"><Hand size={16} className="text-secondary" /></div>
              <div className="text-left flex-1">
                <p className="font-bold text-secondary text-sm">Ask to join</p>
                <p className="text-[11px] text-secondary/60">Let them know you're nearby</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )}

    {inviteFor && <InviteSheet restaurantId={inviteFor} onClose={() => setInviteFor(null)} />}
    {shareFor && <ShareSheet restaurantId={shareFor} onClose={() => setShareFor(null)} />}
    </>
  );
};

export default MapView;
