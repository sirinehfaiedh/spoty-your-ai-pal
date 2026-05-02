import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Share2, Bell, CheckCircle2, Briefcase, Coffee } from "lucide-react";
import { useApp } from "@/state/AppState";
import { restaurants, findRestaurant } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Meeting = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { meetings } = useApp();
  const meeting = meetings.find((m) => m.id === id) ?? meetings[0];

  // contextual picks: professional → calm, casual → lively
  const picks = meeting.type === "professional"
    ? restaurants.filter((r) => ["Quiet", "Work-friendly", "Elegant"].includes(r.ambiance)).slice(0, 3)
    : restaurants.filter((r) => ["Lively", "Cozy", "Romantic"].includes(r.ambiance)).slice(0, 3);

  const [reservedId, setReservedId] = useState<string | null>(null);

  const reserve = (rid: string) => {
    setReservedId(rid);
    const r = findRestaurant(rid);
    toast({
      title: "Reserved ✓",
      description: `Table at ${r.name} for "${meeting.title}". Reminder set 15 min before.`,
    });
  };

  return (
    <div className="phone-frame flex flex-col pb-8">
      <header className="px-5 pt-6 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-primary">
            <Calendar size={11} /> Pre-meeting
          </div>
          <h1 className="font-display text-xl font-bold text-secondary leading-tight">In {meeting.startsInMin} min</h1>
        </div>
      </header>

      {/* Meeting card */}
      <div className="mx-5 rounded-[1.75rem] bg-info p-5 shadow-soft">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-secondary/70">
          {meeting.type === "professional" ? <Briefcase size={12} /> : <Coffee size={12} />}
          {meeting.type}
        </div>
        <h2 className="font-display text-2xl font-bold text-secondary mt-1 leading-tight">{meeting.title}</h2>
        <p className="text-sm text-secondary/80 mt-1">with {meeting.with}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-secondary/80">
          <span className="inline-flex items-center gap-1"><Clock size={12} /> Starts in {meeting.startsInMin} min</span>
          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {meeting.location}</span>
        </div>
      </div>

      {/* AI suggestion banner */}
      <div className="mx-5 mt-4 rounded-2xl bg-accent/40 p-4 flex gap-3">
        <span className="text-xl">✨</span>
        <div>
          <p className="font-semibold text-secondary text-sm leading-tight">
            {meeting.type === "professional"
              ? "Picked 3 calm spots midway between you and " + meeting.with.split(" ")[0]
              : "Picked 3 lively spots you'll both enjoy"}
          </p>
          <p className="text-xs text-secondary/70 mt-1">Based on traffic, ambiance & both your tastes.</p>
        </div>
      </div>

      {/* Picks */}
      <section className="px-5 mt-5 space-y-4">
        {picks.map((r) => (
          <div key={r.id} className="space-y-2">
            <RestaurantCard r={r} compact />
            <div className="flex gap-2">
              <button
                onClick={() => reserve(r.id)}
                disabled={reservedId === r.id}
                className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-glow press inline-flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {reservedId === r.id ? (<><CheckCircle2 size={16} /> Reserved · 15 min reminder set</>) : (<>Reserve in 1 tap</>)}
              </button>
              <button className="w-12 h-12 rounded-full bg-card text-secondary flex items-center justify-center shadow-soft press" aria-label="Share location">
                <Share2 size={16} />
              </button>
              <button className="w-12 h-12 rounded-full bg-card text-secondary flex items-center justify-center shadow-soft press" aria-label="Remind">
                <Bell size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Meeting;
