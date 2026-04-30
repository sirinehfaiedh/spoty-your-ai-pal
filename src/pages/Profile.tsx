import { Link } from "react-router-dom";
import { Briefcase, Clock, MapPin, Wallet, Accessibility, Pencil, LogOut, Sparkles } from "lucide-react";
import { TabBar } from "@/components/TabBar";

const Profile = () => {
  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-4">
        <h1 className="font-display text-3xl font-semibold">Profile</h1>
      </header>

      {/* Identity */}
      <div className="mx-6 soft-card p-5 bg-gradient-calm flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-highlight flex items-center justify-center font-display text-2xl font-bold text-secondary">
          S
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold">Sirine Ben Ali</h2>
          <p className="text-xs text-muted-foreground">sirine@spoty.app</p>
          <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <Sparkles size={12} /> Spoty premium
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center press shadow-glow">
          <Pencil size={16} />
        </button>
      </div>

      {/* Preferences */}
      <div className="px-6 mt-6">
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">Your preferences</h3>
        <div className="space-y-3">
          <Row icon={Briefcase} label="Lifestyle" value="Worker" tone="yellow" />
          <Row icon={Clock} label="Break time" value="12:00" tone="green" />
          <Row icon={MapPin} label="Location" value="Les Berges du Lac, Tunis" tone="beige" />
          <Row icon={Wallet} label="Budget" value="Medium" tone="orange" />
          <Row icon={Accessibility} label="Constraints" value="Halal · Gluten-free" tone="green" />
        </div>
      </div>

      <div className="px-6 mt-6">
        <Link to="/" className="flex items-center gap-3 text-muted-foreground text-sm font-semibold py-4 border-t border-border press">
          <LogOut size={16} /> Log out
        </Link>
      </div>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

const toneMap = { green: "bg-accent/30", yellow: "bg-highlight/40", beige: "bg-muted", orange: "bg-primary/15" } as const;

const Row = ({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: keyof typeof toneMap }) => (
  <div className={`rounded-2xl p-4 flex items-center gap-4 ${toneMap[tone]}`}>
    <div className="w-10 h-10 rounded-xl bg-background/60 flex items-center justify-center">
      <Icon size={16} className="text-secondary" />
    </div>
    <div className="flex-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold text-secondary">{value}</p>
    </div>
    <Pencil size={14} className="text-muted-foreground" />
  </div>
);

export default Profile;
