import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import { useApp, type PlanType } from "@/state/AppState";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const TYPES: { id: PlanType; emoji: string; label: string; sub: string }[] = [
  { id: "date", emoji: "❤️", label: "Date", sub: "Romantic spot for two" },
  { id: "friends", emoji: "🎉", label: "Friends", sub: "Group hangout" },
  { id: "work", emoji: "💼", label: "Work", sub: "Team or client lunch" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Family", sub: "Kid-friendly" },
];

const PEOPLE = ["Yasmine", "Mehdi", "Lina", "Sofia", "Aymen", "Salma", "Rim", "Ali"];

const NewPlan = () => {
  const navigate = useNavigate();
  const { createPlan } = useApp();
  const [type, setType] = useState<PlanType>("friends");
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<string[]>(["You"]);
  const [context, setContext] = useState("");

  const toggle = (n: string) =>
    setParticipants((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const submit = () => {
    const finalName = name.trim() || `${TYPES.find((t) => t.id === type)?.label} plan`;
    const id = createPlan({
      name: finalName,
      emoji: TYPES.find((t) => t.id === type)!.emoji,
      type,
      participants,
    });
    toast({ title: "Plan created ✓", description: `${finalName} · ${participants.length} people` });
    navigate(`/plans/${id}`);
  };

  return (
    <div className="phone-frame flex flex-col pb-8 px-6 pt-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-[10px] font-bold tracking-wider uppercase text-primary">New plan</p>
          <h1 className="font-display text-2xl font-bold text-secondary leading-tight">Let's organize</h1>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary/60 mb-3">Type</p>
        <div className="grid grid-cols-2 gap-3">
          {TYPES.map((t) => {
            const active = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={cn(
                  "soft-card p-4 text-left press relative transition-all",
                  active ? "bg-primary text-primary-foreground shadow-glow" : "bg-card"
                )}
              >
                <div className="text-2xl">{t.emoji}</div>
                <p className="font-display text-base font-bold mt-1">{t.label}</p>
                <p className={cn("text-[11px] mt-0.5", active ? "opacity-90" : "text-secondary/60")}>{t.sub}</p>
                {active && (
                  <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-foreground/25 flex items-center justify-center">
                    <Check size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary/60 mb-3">Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Friday Dinner"
          className="w-full h-12 rounded-2xl bg-card px-4 text-secondary font-semibold focus:outline-none placeholder:text-secondary/40 shadow-soft"
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary/60 mb-3">Participants ({participants.length})</p>
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-active">You</span>
          {PEOPLE.map((p) => {
            const active = participants.includes(p);
            return (
              <button key={p} onClick={() => toggle(p)} className={cn("chip press", active && "chip-active")}>
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary/60 mb-3">Context (optional)</p>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Quiet place, terrace, under 60dt…"
          rows={3}
          className="w-full rounded-2xl bg-card p-4 text-sm text-secondary focus:outline-none placeholder:text-secondary/40 shadow-soft resize-none"
        />
      </div>

      <button
        onClick={submit}
        className="mt-8 w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold inline-flex items-center justify-center gap-2 shadow-glow press"
      >
        Create plan <Sparkles size={16} />
      </button>
    </div>
  );
};

export default NewPlan;
