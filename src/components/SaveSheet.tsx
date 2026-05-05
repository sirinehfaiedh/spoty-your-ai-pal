import { useState } from "react";
import { X, Plus, Check, Users } from "lucide-react";
import { useApp } from "@/state/AppState";
import { toast } from "@/hooks/use-toast";

export const SaveSheet = ({ restaurantId, onClose }: { restaurantId: string; onClose: () => void }) => {
  const { lists, addList, addToList } = useApp();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("✨");

  const inLists = lists.filter((l) => l.items.includes(restaurantId)).map((l) => l.id);

  const pick = (id: string) => {
    addToList(id, restaurantId);
    toast({ title: "Saved ✓", description: `Added to ${lists.find((l) => l.id === id)?.name}` });
    onClose();
  };

  const create = () => {
    if (!name.trim()) return;
    const id = addList(name.trim(), emoji);
    addToList(id, restaurantId);
    toast({ title: "List created ✓", description: `${emoji} ${name} · 1 place` });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[430px] bg-background rounded-t-[2rem] p-6 pb-8 animate-slide-up shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-secondary">Save to a list</h3>
            <p className="text-xs text-secondary/60">Organize your favorite spots</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-card flex items-center justify-center press">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 max-h-[320px] overflow-y-auto no-scrollbar">
          {lists.map((l) => {
            const active = inLists.includes(l.id);
            return (
              <button
                key={l.id}
                onClick={() => pick(l.id)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-card press"
              >
                <div className="w-11 h-11 rounded-2xl bg-highlight/40 flex items-center justify-center text-xl">{l.emoji}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-secondary text-sm">{l.name}</p>
                  <p className="text-[11px] text-secondary/60 inline-flex items-center gap-1">
                    {l.items.length} places {l.shared && <><Users size={10} /> shared</>}
                  </p>
                </div>
                {active ? (
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-full border-2 border-primary/30" />
                )}
              </button>
            );
          })}
        </div>

        {creating ? (
          <div className="mt-4 p-4 rounded-2xl bg-info">
            <div className="flex gap-2">
              {["✨", "🌹", "☕", "💼", "🎉", "❤️", "🍽️", "🌅"].map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${emoji === e ? "bg-primary" : "bg-background"}`}
                >
                  {e}
                </button>
              ))}
            </div>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="List name…"
              className="mt-3 w-full h-12 rounded-2xl bg-background px-4 text-secondary font-semibold focus:outline-none placeholder:text-secondary/40"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={() => setCreating(false)} className="flex-1 h-11 rounded-full bg-card text-secondary text-sm font-bold press">Cancel</button>
              <button onClick={create} className="flex-1 h-11 rounded-full bg-primary text-primary-foreground text-sm font-bold press shadow-glow">Create & save</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setCreating(true)}
            className="mt-4 w-full h-12 rounded-full border-2 border-dashed border-primary/40 text-primary font-bold text-sm inline-flex items-center justify-center gap-2 press"
          >
            <Plus size={16} /> Create new list
          </button>
        )}
      </div>
    </div>
  );
};
