import { Copy, X, MessageCircle, Send, Instagram, MessageSquare, Share2, Sparkles, Star } from "lucide-react";
import { findRestaurant } from "@/data/restaurants";
import { toast } from "@/hooks/use-toast";

const PROJECT_URL = typeof window !== "undefined" ? window.location.origin : "https://spoty.app";

export const ShareSheet = ({ restaurantId, onClose }: { restaurantId: string; onClose: () => void }) => {
  const r = findRestaurant(restaurantId);
  const link = `${PROJECT_URL}/restaurant/${r.id}`;
  const text = `Check out ${r.name} on Spoty — ${r.affinity}% match · ${r.ambiance} · ${r.budget}`;
  const fullMsg = `${text}\n${link}`;

  const tryNative = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: r.name, text, url: link });
        onClose();
        return true;
      } catch { /* user cancelled */ }
    }
    return false;
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); toast({ title: "Link copied", description: link }); } catch {}
    onClose();
  };

  const open = (url: string) => { window.open(url, "_blank", "noopener,noreferrer"); onClose(); };

  const channels = [
    { id: "spoty",     label: "Send in Spoty", icon: Sparkles,      onClick: () => { toast({ title: "Sent in Spoty", description: `Shared ${r.name} with your friends` }); onClose(); } },
    { id: "whatsapp",  label: "WhatsApp",      icon: MessageCircle, onClick: () => open(`https://wa.me/?text=${encodeURIComponent(fullMsg)}`) },
    { id: "messenger", label: "Messenger",     icon: Send,          onClick: () => open(`fb-messenger://share?link=${encodeURIComponent(link)}`) },
    { id: "instagram", label: "Instagram",     icon: Instagram,     onClick: () => open(`https://www.instagram.com/`) },
    { id: "sms",       label: "SMS",           icon: MessageSquare, onClick: () => open(`sms:?body=${encodeURIComponent(fullMsg)}`) },
    { id: "more",      label: "More…",         icon: Share2,        onClick: async () => { if (!(await tryNative())) copy(); } },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-[430px] bg-background rounded-t-[2rem] p-6 pb-8 animate-slide-up shadow-card" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-secondary">Share</h3>
            <p className="text-xs text-secondary/60">Send this spot to your people</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-card flex items-center justify-center press"><X size={16} /></button>
        </div>

        {/* Preview card */}
        <div className="rounded-[1.5rem] overflow-hidden bg-card shadow-soft mb-5">
          <div className="relative h-32">
            <img src={r.dishImage} alt={r.dishName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1"><Sparkles size={10} /> {r.affinity}% match</span>
            <span className="absolute top-2 right-2 bg-card text-secondary text-[10px] font-bold px-2 py-1 rounded-full inline-flex items-center gap-1"><Star size={10} className="fill-primary text-primary" /> {r.rating}</span>
            <div className="absolute bottom-2 left-3 right-3 text-primary-foreground">
              <p className="font-display text-base font-bold leading-tight">{r.name}</p>
              <p className="text-[11px] opacity-90">{r.ambiance} · {r.budget}</p>
            </div>
          </div>
          <button onClick={() => { window.location.href = `/restaurant/${r.id}`; onClose(); }} className="w-full h-10 bg-primary text-primary-foreground text-xs font-bold press">Open in Spoty</button>
        </div>

        {/* Channels grid */}
        <div className="grid grid-cols-3 gap-3">
          {channels.map((c) => (
            <button key={c.id} onClick={c.onClick} className="flex flex-col items-center gap-1.5 press">
              <div className="w-14 h-14 rounded-2xl bg-info flex items-center justify-center"><c.icon size={20} className="text-secondary" /></div>
              <span className="text-[11px] font-bold text-secondary text-center leading-tight">{c.label}</span>
            </button>
          ))}
        </div>

        {/* Copy link row */}
        <button onClick={copy} className="mt-5 w-full flex items-center gap-3 p-3 rounded-2xl bg-card press">
          <div className="w-10 h-10 rounded-xl bg-highlight/40 flex items-center justify-center"><Copy size={16} className="text-secondary" /></div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60">Copy link</p>
            <p className="text-xs text-secondary truncate">{link}</p>
          </div>
        </button>
      </div>
    </div>
  );
};
