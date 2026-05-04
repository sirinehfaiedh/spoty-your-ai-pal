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
  const [location, setLocation] = useState("Les Berges du Lac, Tunis");
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
    (current === "location" && location.length > 2) ||
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
            <Title eyebrow="Location" title="Where should we search around?" sub="Your work or home address — we keep it private." />
            <div className="mt-8">
              <div className="flex items-center gap-3 bg-card rounded-2xl px-4 h-14 shadow-soft">
                <MapPin size={18} className="text-primary" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-base"
                />
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {["Les Berges du Lac", "La Marsa", "Sidi Bou Said", "Centre Urbain Nord"].map((s) => (
                  <button key={s} onClick={() => setLocation(s + ", Tunis")} className="chip press">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {current === "budget" && (
          <>
            <Title eyebrow="Budget" title="What fits your wallet?" sub="Slide to set your comfort range." />
            <div className="mt-10 soft-card p-6 bg-accent/30">
              <div className="flex items-center justify-center gap-2">
                <Wallet size={22} className="text-secondary" />
                <span className="font-display text-3xl font-semibold">{budgetLabel}</span>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={0}
                max={2}
                step={1}
                className="mt-8"
              />
              <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground">
                <span>Cheap</span><span>Medium</span><span>Luxury</span>
              </div>
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

const capital = (s: string) => s[0].toUpperCase() + s.slice(1);

export default Onboarding;
