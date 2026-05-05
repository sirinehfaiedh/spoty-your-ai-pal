import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Users, MapPin, Search, Locate, Star } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { cn } from "@/lib/utils";

type Mode = "discover" | "friends";

const friends = [
  { id: "yas", name: "Yasmine", initial: "Y", x: 28, y: 38, location: "Lac 2", sharing: true, status: "Working" },
  { id: "meh", name: "Mehdi", initial: "M", x: 62, y: 24, location: "Centre Urbain", sharing: true, status: "At lunch" },
  { id: "lin", name: "Lina", initial: "L", x: 48, y: 70, location: "La Marsa", sharing: true, status: "Coffee" },
  { id: "sof", name: "Sofia", initial: "S", x: 78, y: 58, location: "Sidi Bou Said", sharing: true, status: "Walking" },
];

const pins = restaurants.slice(0, 5).map((r, i) => ({
  ...r,
  x: [22, 52, 36, 70, 80][i],
  y: [55, 30, 70, 50, 22][i],
}));

const MapView = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "discover");
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const pin = pins.find((p) => p.id === selectedPin);
  const friend = friends.find((f) => f.id === selectedFriend);

  return (
    <div className="phone-frame flex flex-col pb-0 bg-background">
      {/* Map area */}
      <div className="relative h-[100vh] overflow-hidden">
        {/* Stylized map */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--highlight)/0.55),transparent_60%),radial-gradient(circle_at_70%_70%,hsl(var(--primary)/0.35),transparent_60%),radial-gradient(circle_at_85%_15%,hsl(var(--info)/0.6),transparent_55%)] bg-accent/20" />
        {/* Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-20">
          {Array.from({ length: 240 }).map((_, i) => (
            <div key={i} className="border border-background/30" />
          ))}
        </div>
        {/* Roads */}
        <div className="absolute left-0 right-0 top-[45%] h-[3px] bg-background/60 rotate-[-8deg]" />
        <div className="absolute left-0 right-0 top-[68%] h-[2px] bg-background/50 rotate-[6deg]" />
        <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-background/50" />
        {/* Water */}
        <div className="absolute right-0 top-0 w-[35%] h-[40%] bg-info/60 rounded-bl-[60%]" />

        {/* User location */}
        <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring w-6 h-6" />
          <span className="relative block w-6 h-6 rounded-full bg-primary ring-4 ring-background shadow-glow" />
        </div>

        {/* Pins */}
        {mode === "discover" &&
          pins.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedPin(p.id); setSelectedFriend(null); }}
              className="absolute -translate-x-1/2 -translate-y-full press"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
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

        {/* Friends */}
        {mode === "friends" &&
          friends.map((f) => (
            <button
              key={f.id}
              onClick={() => { setSelectedFriend(f.id); setSelectedPin(null); }}
              className="absolute -translate-x-1/2 -translate-y-1/2 press"
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
            >
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
          <button className="w-10 h-10 rounded-full bg-background/95 flex items-center justify-center shadow-card press">
            <Locate size={16} className="text-primary" />
          </button>
        </div>

        {/* Mode switch */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-background/95 rounded-full p-1 shadow-card flex z-10">
          <button
            onClick={() => { setMode("discover"); setSelectedFriend(null); }}
            className={cn(
              "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all",
              mode === "discover" ? "bg-primary text-primary-foreground shadow-glow" : "text-secondary/70"
            )}
          >
            <MapPin size={13} /> Discover
          </button>
          <button
            onClick={() => { setMode("friends"); setSelectedPin(null); }}
            className={cn(
              "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all",
              mode === "friends" ? "bg-primary text-primary-foreground shadow-glow" : "text-secondary/70"
            )}
          >
            <Users size={13} /> Friends
          </button>
        </div>

        {/* Bottom panel */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {mode === "discover" && pin && (
            <Link to={`/restaurant/${pin.id}`} className="block bg-background rounded-[1.75rem] shadow-card p-3 flex items-center gap-3 animate-slide-up press">
              <img src={pin.image} alt={pin.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-bold text-secondary truncate">{pin.name}</h3>
                <p className="text-[11px] text-secondary/60 truncate">{pin.cuisine} · {pin.address}</p>
                <p className="text-[11px] text-primary font-bold mt-0.5">{pin.affinity}% match · {pin.drive} drive</p>
              </div>
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full">Open</span>
            </Link>
          )}
          {mode === "friends" && friend && (
            <div className="bg-background rounded-[1.75rem] shadow-card p-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">{friend.initial}</div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-secondary">{friend.name}</h3>
                  <p className="text-[11px] text-secondary/60">{friend.status} · {friend.location}</p>
                </div>
                <button className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-2 rounded-full press">Invite</button>
              </div>
            </div>
          )}
          {mode === "discover" && !pin && (
            <div className="bg-background/95 rounded-[1.75rem] shadow-card p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-accent/40 flex items-center justify-center"><MapPin size={16} className="text-primary" /></div>
              <div className="flex-1">
                <p className="font-bold text-secondary text-sm">{pins.length} places nearby</p>
                <p className="text-[11px] text-secondary/60">Tap a pin to see details</p>
              </div>
            </div>
          )}
          {mode === "friends" && !friend && (
            <div className="bg-background/95 rounded-[1.75rem] shadow-card p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-info flex items-center justify-center"><Users size={16} className="text-primary" /></div>
              <div className="flex-1">
                <p className="font-bold text-secondary text-sm">{friends.length} friends sharing location</p>
                <p className="text-[11px] text-secondary/60">Tap an avatar to see status</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
