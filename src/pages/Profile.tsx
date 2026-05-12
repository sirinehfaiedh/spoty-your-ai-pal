import { Link } from "react-router-dom";
import { Briefcase, Clock, MapPin, Wallet, Accessibility, Pencil, LogOut, Sparkles, Trophy, Flame, Lock, Calendar, MessageSquare, Users, Eye, EyeOff, Bell } from "lucide-react";
import { TabBar } from "@/components/TabBar";
import { useApp } from "@/state/AppState";

const Profile = () => {
  const { level, streakDays, badges, memory, meetings, locationSharing, setLocationSharing, invitations } = useApp();
  const xpPct = Math.round((level.xp / level.nextXp) * 100);
  const pendingInvites = invitations.filter((i) => i.direction === "incoming" && i.status === "pending").length;

  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-4">
        <h1 className="font-display text-3xl font-bold text-secondary">Profile</h1>
      </header>

      {/* Identity + Level */}
      <div className="mx-6 soft-card p-5 bg-gradient-to-br from-info to-accent/40">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-display text-2xl font-bold shadow-glow">
            S
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-secondary">Sirine Ben Ali</h2>
            <p className="text-xs text-secondary/60">sirine@spoty.app</p>
            <div className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-primary">
              <Trophy size={12} /> {level.name} · Tier {level.tier}
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center press shadow-glow">
            <Pencil size={16} />
          </button>
        </div>

        {/* XP bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-bold text-secondary/70 uppercase tracking-wider mb-1.5">
            <span>{level.xp} XP</span>
            <span>{level.nextXp - level.xp} to Local Expert</span>
          </div>
          <div className="h-2 bg-card/60 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="mx-6 mt-3 rounded-2xl bg-highlight/50 p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-background flex items-center justify-center text-2xl">🔥</div>
        <div className="flex-1">
          <p className="font-display text-lg font-bold text-secondary leading-tight">{streakDays}-day streak</p>
          <p className="text-xs text-secondary/70">Visit 1 new place this week to unlock <b>Local Ambassador</b></p>
        </div>
      </div>

      {/* Badges */}
      <section className="px-6 mt-5">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary/60 mb-3">Badges</h3>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div key={b.id} className={`rounded-2xl p-3 text-center ${b.earned ? "bg-card shadow-soft" : "bg-muted opacity-60"}`}>
              <div className="text-3xl">{b.earned ? b.emoji : <Lock size={20} className="mx-auto text-secondary/40" />}</div>
              <p className="text-[10px] font-bold text-secondary mt-1.5 leading-tight">{b.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="px-6 mt-6 grid grid-cols-2 gap-2">
        <Link to={`/meeting/${meetings[0].id}`} className="soft-card bg-info p-4 press">
          <Calendar size={18} className="text-secondary" />
          <p className="font-bold text-sm text-secondary mt-2">Calendar</p>
          <p className="text-[10px] text-secondary/70">{meetings.length} upcoming</p>
        </Link>
        <Link to="/lists" className="soft-card bg-accent/40 p-4 press">
          <Users size={18} className="text-secondary" />
          <p className="font-bold text-sm text-secondary mt-2">My lists</p>
          <p className="text-[10px] text-secondary/70">3 lists · 2 shared</p>
        </Link>
        <Link to="/chat" className="soft-card bg-highlight/50 p-4 press">
          <MessageSquare size={18} className="text-secondary" />
          <p className="font-bold text-sm text-secondary mt-2">AI history</p>
          <p className="text-[10px] text-secondary/70">Last: {memory.recentMoods[0] ?? "—"}</p>
        </Link>
        <Link to="/group-vote" className="soft-card bg-card p-4 press">
          <Flame size={18} className="text-primary" />
          <p className="font-bold text-sm text-secondary mt-2">Group vote</p>
          <p className="text-[10px] text-secondary/70">1 active</p>
        </Link>
      </section>

      {/* Privacy & sharing */}
      <div className="px-6 mt-6">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary/60 mb-3">Privacy</h3>
        <div className="rounded-2xl bg-card p-4 flex items-center gap-3 shadow-soft">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${locationSharing ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            {locationSharing ? <Eye size={18} /> : <EyeOff size={18} className="text-secondary/60" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-secondary text-sm">Allow friends to see my location</p>
            <p className="text-[11px] text-secondary/60">{locationSharing ? "You appear on the map for friends" : "You're invisible — you can still see them"}</p>
          </div>
          <button
            onClick={() => setLocationSharing(!locationSharing)}
            className={`relative w-12 h-7 rounded-full transition-colors press ${locationSharing ? "bg-primary" : "bg-muted"}`}
            aria-label="Toggle location sharing"
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-background shadow-soft transition-transform ${locationSharing ? "translate-x-5" : ""}`} />
          </button>
        </div>
        <Link to="/invitations" className="mt-2 rounded-2xl bg-info p-4 flex items-center gap-3 press">
          <div className="w-11 h-11 rounded-xl bg-background flex items-center justify-center"><Bell size={18} className="text-primary" /></div>
          <div className="flex-1">
            <p className="font-bold text-secondary text-sm">Invitations</p>
            <p className="text-[11px] text-secondary/60">{pendingInvites} pending · accept, decline or maybe</p>
          </div>
          {pendingInvites > 0 && <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{pendingInvites}</span>}
        </Link>
      </div>

      {/* Preferences */}
      <div className="px-6 mt-6">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary/60 mb-3">Your preferences</h3>
        <div className="space-y-2">
          <Row icon={Briefcase} label="Lifestyle" value="Worker" tone="yellow" />
          <Row icon={Clock} label="Break time" value="12:00" tone="green" />
          <Row icon={MapPin} label="Location" value="Les Berges du Lac" tone="beige" />
          <Row icon={Wallet} label="Budget" value="10dt – 35dt" tone="orange" />
          <Row icon={Accessibility} label="Dietary" value={memory.dietary.length ? memory.dietary.join(" · ") : "None"} tone="green" />
          <Row icon={Sparkles} label="AI mood memory" value={memory.recentMoods.slice(0, 3).join(" · ") || "—"} tone="yellow" />
        </div>
      </div>

      <div className="px-6 mt-6">
        <Link to="/" className="flex items-center gap-3 text-secondary/60 text-sm font-bold py-4 border-t border-border press">
          <LogOut size={16} /> Log out
        </Link>
      </div>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

const toneMap = { green: "bg-accent/40", yellow: "bg-highlight/50", beige: "bg-muted", orange: "bg-primary/15" } as const;

const Row = ({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: keyof typeof toneMap }) => (
  <div className={`rounded-2xl p-3.5 flex items-center gap-3 ${toneMap[tone]}`}>
    <div className="w-9 h-9 rounded-xl bg-background/70 flex items-center justify-center">
      <Icon size={15} className="text-secondary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60">{label}</p>
      <p className="font-bold text-secondary text-sm truncate">{value}</p>
    </div>
    <Pencil size={13} className="text-secondary/40" />
  </div>
);

export default Profile;
