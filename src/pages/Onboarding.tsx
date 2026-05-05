import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap, User as UserIcon, Clock, MapPin, Wallet, Accessibility, Cake, ArrowUpDown, WheatOff, MilkOff, Heart, Utensils, Baby, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Lifestyle = "worker" | "student" | "other";
type Constraint = string;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [lifestyle, setLifestyle] = useState<Lifestyle | null>(null);
  const [breakTime, setBreakTime] = useState("12:00");
  const [location, setLocation] = useState("");
  const [locationMode, setLocationMode] = useState<"choose" | "auto" | "manual">("choose");
  const [detecting, setDetecting] = useState(false);
  const [budget, setBudget] = useState<string>("10dt – 35dt");
  const [constraints, setConstraints] = useState<Constraint[]>([]);

  const hasSchedule = lifestyle === "worker" || lifestyle === "student";
  const steps = useMemo(
    () => (hasSchedule ? ["lifestyle", "schedule", "location", "budget", "constraints", "summary"] : ["lifestyle", "location", "budget", "constraints", "summary"]),
    [hasSchedule]
  );
  const total = steps.length;
  const current = steps[step];

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else navigate("/home");
  };
  const back = () => (step === 0 ? navigate("/") : setStep(step - 1));

  const toggleConstraint = (c: Constraint) =>
    setConstraints((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const canNext =
    (current === "lifestyle" && !!lifestyle) ||
    (current === "schedule" && !!breakTime) ||
    (current === "location" && locationMode !== "choose" && !detecting && location.length > 2) ||
    current === "budget" ||
    current === "constraints" ||
    current === "summary";

  const budgetLabel = budget;

  return (
    <div className="phone-frame flex flex-col px-6 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={back} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{step + 1}/{total}</span>
      </div>

      <div className="flex-1 mt-10 animate-fade-in" key={current}>
        {current === "lifestyle" && (
          <>
            <Title eyebrow="About you" title="What's your lifestyle?" sub="We'll tailor Spoty to your rhythm." />
            <div className="mt-8 space-y-3">
              <ChoiceTile icon={Briefcase} label="Worker" emoji="👔" active={lifestyle === "worker"} onClick={() => setLifestyle("worker")} />
              <ChoiceTile icon={GraduationCap} label="Student" emoji="🎓" active={lifestyle === "student"} onClick={() => setLifestyle("student")} />
              <ChoiceTile icon={UserIcon} label="Other" emoji="👤" active={lifestyle === "other"} onClick={() => setLifestyle("other")} />
            </div>
          </>
        )}

        {current === "schedule" && (
          <>
            <Title eyebrow="Your schedule" title="What time is your break?" sub="Spoty will suggest options you can actually reach." />
            <div className="mt-8 soft-card p-6 bg-highlight/30 text-center">
              <Clock size={28} className="mx-auto text-secondary" />
              <div className="mt-3 font-display text-5xl font-semibold tracking-tight">{breakTime}</div>
              <input
                type="time"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
                className="mt-4 w-full bg-background/70 rounded-2xl h-12 px-4 text-center text-base border-0 focus:outline-none"
              />
              <p className="mt-3 text-sm text-muted-foreground">Most users pick between 12:00 – 14:00</p>
            </div>
          </>
        )}

        {current === "location" && (
          <>
            <Title
              eyebrow="Location"
              title={
                lifestyle === "worker" ? "Where do you work?"
                : lifestyle === "student" ? "Where do you study?"
                : "Where should we look?"
              }
              sub="Spoty needs this to suggest spots you can actually reach."
            />

            {locationMode === "choose" && (
              <div className="mt-8 space-y-3 animate-fade-in">
                <button
                  onClick={() => {
                    setLocationMode("auto");
                    setDetecting(true);
                    if (!navigator.geolocation) {
                      setTimeout(() => { setLocation("Les Berges du Lac, Tunis"); setDetecting(false); }, 900);
                      return;
                    }
                    navigator.geolocation.getCurrentPosition(
                      () => { setLocation("Current location · Les Berges du Lac"); setDetecting(false); },
                      () => { setLocation("Les Berges du Lac, Tunis"); setDetecting(false); },
                      { timeout: 4000 }
                    );
                  }}
                  className="w-full soft-card bg-primary text-primary-foreground p-5 flex items-center gap-4 shadow-glow press text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                    <MapPin size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-lg font-bold">Use my current location</p>
                    <p className="text-xs opacity-85">Fast & accurate · permission required</p>
                  </div>
                </button>

                <button
                  onClick={() => setLocationMode("manual")}
                  className="w-full soft-card bg-card p-5 flex items-center gap-4 press text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-highlight/50 flex items-center justify-center text-2xl">✍️</div>
                  <div className="flex-1">
                    <p className="font-display text-lg font-bold text-secondary">Enter manually</p>
                    <p className="text-xs text-secondary/60">
                      {lifestyle === "worker" ? "Workplace or office address" : lifestyle === "student" ? "University or campus" : "Preferred area"}
                    </p>
                  </div>
                </button>

                <p className="text-[11px] text-center text-secondary/50 mt-2">We never share your location with anyone.</p>
              </div>
            )}

            {locationMode === "auto" && (
              <div className="mt-8 soft-card bg-info p-6 text-center animate-fade-in">
                {detecting ? (
                  <>
                    <div className="relative w-16 h-16 mx-auto">
                      <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
                      <span className="relative w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <MapPin size={26} />
                      </span>
                    </div>
                    <p className="mt-5 font-display text-lg font-bold text-secondary">Detecting your location…</p>
                    <p className="text-xs text-secondary/60 mt-1">This takes a few seconds</p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-accent mx-auto flex items-center justify-center">
                      <Check size={26} className="text-secondary" />
                    </div>
                    <p className="mt-4 font-display text-lg font-bold text-secondary">Location detected</p>
                    <p className="text-sm text-secondary/80 mt-1">{location}</p>
                    <button onClick={() => setLocationMode("choose")} className="mt-3 text-xs font-bold text-primary press">Change</button>
                  </>
                )}
              </div>
            )}

            {locationMode === "manual" && (
              <div className="mt-8 animate-fade-in">
                <div className="flex items-center gap-3 bg-card rounded-2xl px-4 h-14 shadow-soft">
                  <MapPin size={18} className="text-primary" />
                  <Input
                    autoFocus
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={
                      lifestyle === "worker" ? "e.g. Orange HQ, Lac 2"
                      : lifestyle === "student" ? "e.g. ENIT, Belvédère"
                      : "Neighborhood or address"
                    }
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-base"
                  />
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {["Les Berges du Lac", "La Marsa", "Sidi Bou Said", "Centre Urbain Nord", "Manar", "Belvédère"].map((s) => (
                    <button key={s} onClick={() => setLocation(s + ", Tunis")} className="chip press">
                      {s}
                    </button>
                  ))}
                </div>
                <button onClick={() => setLocationMode("choose")} className="mt-3 text-xs font-bold text-primary press">← Use current location instead</button>
              </div>
            )}
          </>
        )}

        {current === "budget" && (
          <>
            <Title eyebrow="Budget" title="What fits your wallet?" sub="Pick the price range you're comfortable with." />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {BUDGETS.map((b) => {
                const active = budget === b.range;
                return (
                  <button
                    key={b.range}
                    onClick={() => setBudget(b.range)}
                    className={cn(
                      "soft-card p-5 text-left press transition-all relative",
                      active ? "bg-primary text-primary-foreground shadow-glow" : "bg-card"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-3 text-lg", active ? "bg-primary-foreground/20" : "bg-highlight/50")}>
                      {b.emoji}
                    </div>
                    <div className="font-display text-lg font-bold leading-tight">{b.range}</div>
                    <div className={cn("text-xs mt-1", active ? "opacity-90" : "text-muted-foreground")}>{b.label}</div>
                    {active && (
                      <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-foreground/25 flex items-center justify-center">
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {current === "constraints" && (
          <>
            <Title eyebrow="Constraints" title="Anything we should know?" sub="Spoty filters silently for you." />
            <div className="mt-6 flex flex-wrap gap-2">
              {CONSTRAINTS.map(({ id, label, icon: Icon }) => {
                const active = constraints.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleConstraint(id)}
                    className={cn("chip press", active && "chip-active")}
                  >
                    <Icon size={14} /> {label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {current === "summary" && (
          <>
            <Title eyebrow="All set" title="Here's your Spoty" sub="You can change anything later from Profile." />
            <div className="mt-6 space-y-3">
              <Row label="Lifestyle" value={lifestyle ? capital(lifestyle) : "—"} tone="yellow" />
              {hasSchedule && <Row label="Break time" value={breakTime} tone="green" />}
              <Row label="Location" value={location} tone="beige" />
              <Row label="Budget" value={budgetLabel} tone="orange" />
              <Row label="Constraints" value={constraints.length ? constraints.join(" · ") : "None"} tone="green" />
            </div>
          </>
        )}
      </div>

      <Button
        onClick={next}
        disabled={!canNext}
        size="lg"
        className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow"
      >
        {current === "summary" ? (
          <>Start using Spoty <Sparkles size={18} className="ml-2" /></>
        ) : (
          <>Continue <ArrowRight size={18} className="ml-1" /></>
        )}
      </Button>

      {step === 0 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary font-semibold">Log in</Link>
        </p>
      )}
    </div>
  );
};

const Title = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) => (
  <div>
    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{eyebrow}</span>
    <h1 className="font-display text-[34px] leading-[1.1] font-semibold mt-2">{title}</h1>
    <p className="mt-2 text-muted-foreground">{sub}</p>
  </div>
);

const ChoiceTile = ({ icon: Icon, label, emoji, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full soft-card p-5 flex items-center gap-4 press transition-all",
      active ? "bg-primary text-primary-foreground shadow-glow" : "bg-card"
    )}
  >
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl", active ? "bg-primary-foreground/20" : "bg-highlight/50")}>
      {emoji}
    </div>
    <span className="font-display text-xl font-semibold">{label}</span>
    <Icon size={18} className="ml-auto opacity-60" />
  </button>
);

const Row = ({ label, value, tone }: { label: string; value: string; tone: "green" | "yellow" | "beige" | "orange" }) => {
  const toneMap = { green: "bg-accent/30", yellow: "bg-highlight/40", beige: "bg-muted", orange: "bg-primary/15" };
  return (
    <div className={cn("rounded-2xl p-4 flex items-center justify-between", toneMap[tone])}>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="font-semibold text-secondary text-right max-w-[55%] truncate">{value}</span>
    </div>
  );
};

const CONSTRAINTS = [
  { id: "wheelchair", label: "Wheelchair ♿", icon: Accessibility },
  { id: "elderly", label: "Elderly 👴", icon: Cake },
  { id: "elevator", label: "Elevator needed", icon: ArrowUpDown },
  { id: "gluten-free", label: "Gluten-free", icon: WheatOff },
  { id: "lactose-free", label: "Lactose-free", icon: MilkOff },
  { id: "diabetes", label: "Diabetes-friendly", icon: Heart },
  { id: "halal", label: "Halal", icon: Utensils },
  { id: "kids", label: "With kids 👶", icon: Baby },
];

const BUDGETS = [
  { range: "3dt – 10dt", label: "Quick & cheap", emoji: "🥙" },
  { range: "10dt – 35dt", label: "Everyday", emoji: "🍽️" },
  { range: "35dt – 65dt", label: "Treat yourself", emoji: "🍷" },
  { range: "65dt+", label: "Fine dining", emoji: "✨" },
];

const capital = (s: string) => s[0].toUpperCase() + s.slice(1);

export default Onboarding;
