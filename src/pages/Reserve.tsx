import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mic, Users, Clock, Sun, Home as HomeIcon, Check, Bell, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { findRestaurant } from "@/data/restaurants";
import { useApp } from "@/state/AppState";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TIMES = ["12:00", "12:30", "13:00", "13:30", "14:00", "19:30", "20:00", "20:30"];

const Reserve = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const r = findRestaurant(id);
  const { memory } = useApp();

  // Demo availability: derived from id hash so each restaurant is stable
  const available = useMemo(() => r.id.length % 7 !== 0, [r.id]);

  const [people, setPeople] = useState<number>(memory.defaultPeople);
  const [time, setTime] = useState<string>("13:00");
  const [seating, setSeating] = useState<"indoor" | "outdoor">(memory.prefersSeating);
  const [note, setNote] = useState<string>("");

  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  // Simulated voice agent
  const startVoice = () => {
    setListening(true);
    setVoiceText(null);
    setTimeout(() => {
      const phrase = "Table for 3 at 1pm outside";
      setVoiceText(phrase);
      // parse
      const peopleMatch = phrase.match(/(\d+)/);
      const timeMatch = phrase.match(/(\d{1,2})\s*(?:pm|am)?/i);
      const out = /outside|outdoor|terrace/i.test(phrase);
      const inside = /inside|indoor/i.test(phrase);
      if (peopleMatch) setPeople(parseInt(peopleMatch[1]));
      if (timeMatch) {
        const h = parseInt(timeMatch[1]);
        const t = /pm/i.test(phrase) && h < 12 ? h + 12 : h;
        setTime(`${String(t).padStart(2, "0")}:00`);
      }
      if (out) setSeating("outdoor");
      else if (inside) setSeating("indoor");
      setListening(false);
      toast({ title: "Spoty filled it for you ✨", description: phrase });
    }, 1600);
  };

  const submit = () => {
    setConfirmed(true);
    // Schedule a reminder toast for demo
    setTimeout(() => {
      toast({
        title: "🔔 Reminder · Reservation in 15 min",
        description: `${r.name} · ${people} ppl · ${time} · ${seating}`,
      });
    }, 4000);
  };

  if (confirmed) {
    return (
      <div className="phone-frame flex flex-col px-6 pt-8 pb-10 bg-background">
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
            <div className="relative w-28 h-28 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow">
              <CheckCircle2 size={56} strokeWidth={2.2} />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-secondary mt-8">Your table is booked ✅</h1>
          <p className="text-muted-foreground mt-2 max-w-xs">
            {r.name} · {people} {people > 1 ? "people" : "person"} · {time} · {seating === "outdoor" ? "Outdoor" : "Indoor"}
          </p>

          <div className="mt-6 w-full soft-card bg-card p-4 flex items-center gap-3 text-left">
            <Bell size={18} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-secondary">Confirmation sent</p>
              <p className="text-xs text-muted-foreground">We'll remind you 15 minutes before.</p>
            </div>
          </div>

          <div className="mt-3 w-full soft-card bg-info p-4 flex items-center gap-3 text-left">
            <Sparkles size={18} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-secondary">Spoty learned this</p>
              <p className="text-xs text-secondary/70">{seating === "indoor" ? "Indoor" : "Outdoor"} for {people} — we'll preselect next time.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold shadow-glow press"
        >Done</button>
      </div>
    );
  }

  return (
    <div className="phone-frame flex flex-col px-6 pt-6 pb-8 bg-background">
      <header className="flex items-center gap-3">
        <Link to={`/restaurant/${r.id}`} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Reservation</p>
          <h1 className="font-display text-xl font-bold text-secondary leading-tight">{r.name}</h1>
        </div>
      </header>

      {/* Availability */}
      <div className={cn(
        "mt-5 rounded-[1.5rem] p-4 flex items-center gap-3 animate-fade-in",
        available ? "bg-accent/40" : "bg-destructive/10"
      )}>
        {available ? (
          <CheckCircle2 size={22} className="text-secondary shrink-0" />
        ) : (
          <XCircle size={22} className="text-destructive shrink-0" />
        )}
        <div className="flex-1">
          <p className="font-bold text-secondary text-sm">
            {available ? "Reservation available ✅" : "Reservation not available ❌"}
          </p>
          <p className="text-xs text-secondary/70">
            {available ? "Live availability for today" : "Try another time slot or restaurant"}
          </p>
        </div>
      </div>

      {available && (
        <>
          {/* Voice agent */}
          <button
            onClick={startVoice}
            className={cn(
              "mt-5 rounded-[1.5rem] p-4 flex items-center gap-3 press text-left transition-all",
              listening ? "bg-primary text-primary-foreground shadow-glow" : "bg-card shadow-soft"
            )}
          >
            <div className="relative">
              {listening && <span className="absolute inset-0 rounded-full bg-primary-foreground/30 animate-pulse-ring" />}
              <div className={cn(
                "relative w-12 h-12 rounded-full flex items-center justify-center",
                listening ? "bg-primary-foreground/20" : "bg-primary text-primary-foreground"
              )}>
                <Mic size={20} />
              </div>
            </div>
            <div className="flex-1">
              <p className={cn("text-[10px] font-bold uppercase tracking-wider", listening ? "opacity-80" : "text-primary")}>
                AI Reservation Agent
              </p>
              <p className={cn("font-bold text-sm", listening ? "" : "text-secondary")}>
                {listening ? "Listening…" : voiceText ?? '"Table for 3 at 1pm outside"'}
              </p>
            </div>
            <Sparkles size={16} className={listening ? "" : "text-primary"} />
          </button>

          {/* People */}
          <Section icon={Users} label="Number of people">
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                <Pill key={n} active={people === n} onClick={() => setPeople(n)}>
                  {n} {memory.defaultPeople === n && people !== n ? "★" : ""}
                </Pill>
              ))}
            </div>
            {memory.defaultPeople === people && (
              <p className="text-[11px] text-primary font-semibold mt-2 inline-flex items-center gap-1">
                <Sparkles size={11} /> Your usual
              </p>
            )}
          </Section>

          {/* Time */}
          <Section icon={Clock} label="Time">
            <div className="flex gap-2 flex-wrap">
              {TIMES.map((t) => (
                <Pill key={t} active={time === t} onClick={() => setTime(t)}>{t}</Pill>
              ))}
            </div>
          </Section>

          {/* Seating */}
          <Section icon={Sun} label="Seating">
            <div className="grid grid-cols-2 gap-2">
              <SeatCard
                active={seating === "indoor"}
                onClick={() => setSeating("indoor")}
                icon={HomeIcon}
                label="Indoor"
                hint={memory.prefersSeating === "indoor" ? "Your preference" : "Quieter"}
              />
              <SeatCard
                active={seating === "outdoor"}
                onClick={() => setSeating("outdoor")}
                icon={Sun}
                label="Outdoor"
                hint={memory.prefersSeating === "outdoor" ? "Your preference" : "Terrace"}
              />
            </div>
          </Section>

          {/* Free-text message */}
          <Section icon={Sparkles} label="Message to restaurant (optional)">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Allergies, special request, occasion…"
              rows={3}
              className="w-full rounded-2xl bg-card p-3 text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </Section>

          <div className="flex-1" />

          <button
            onClick={submit}
            className="mt-6 w-full h-14 rounded-full bg-primary text-primary-foreground font-bold shadow-glow press inline-flex items-center justify-center gap-2"
          >
            <Check size={18} /> Confirm reservation
          </button>
        </>
      )}

      {!available && (
        <Link
          to="/home"
          className="mt-auto w-full h-14 rounded-full bg-card text-secondary font-bold shadow-soft press inline-flex items-center justify-center"
        >See other suggestions</Link>
      )}
    </div>
  );
};

const Section = ({ icon: Icon, label, children }: any) => (
  <div className="mt-5">
    <div className="flex items-center gap-2 mb-2.5">
      <Icon size={15} className="text-primary" />
      <span className="text-xs font-bold uppercase tracking-wider text-secondary/70">{label}</span>
    </div>
    {children}
  </div>
);

const Pill = ({ active, onClick, children }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 h-10 rounded-full text-sm font-bold press transition-all border-2",
      active
        ? "bg-primary text-primary-foreground border-primary shadow-glow"
        : "bg-card text-secondary border-transparent"
    )}
  >{children}</button>
);

const SeatCard = ({ active, onClick, icon: Icon, label, hint }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-2xl p-4 flex flex-col items-start gap-1 press transition-all border-2",
      active
        ? "bg-primary text-primary-foreground border-primary shadow-glow"
        : "bg-card text-secondary border-transparent"
    )}
  >
    <Icon size={20} />
    <span className="font-display font-bold text-base mt-1">{label}</span>
    <span className={cn("text-[11px]", active ? "opacity-90" : "text-secondary/60")}>{hint}</span>
  </button>
);

export default Reserve;
