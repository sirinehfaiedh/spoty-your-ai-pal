import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Share2, Users, Vote } from "lucide-react";
import { useApp } from "@/state/AppState";
import { TabBar } from "@/components/TabBar";
import { useState } from "react";

const Lists = () => {
  const navigate = useNavigate();
  const { lists, addList } = useApp();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-secondary leading-tight">My lists</h1>
          <p className="text-secondary/70 text-sm mt-0.5">Save, organize, share with friends.</p>
        </div>
      </header>

      <div className="px-6 mt-2 grid grid-cols-2 gap-3">
        {lists.map((l) => (
          <div key={l.id} className="soft-card bg-card p-4 press">
            <div className="text-3xl">{l.emoji}</div>
            <h3 className="font-display text-lg font-bold text-secondary mt-2 leading-tight">{l.name}</h3>
            <div className="mt-2 flex items-center justify-between text-[11px] text-secondary/60 font-semibold">
              <span>{l.count} places</span>
              {l.shared && <span className="inline-flex items-center gap-1 text-primary"><Users size={11} /> Shared</span>}
            </div>
          </div>
        ))}

        {creating ? (
          <div className="soft-card bg-info p-4 col-span-2 animate-fade-in">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="List name…"
              className="w-full bg-transparent text-secondary font-semibold focus:outline-none placeholder:text-secondary/50"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={() => setCreating(false)} className="flex-1 h-10 rounded-full bg-card text-secondary text-sm font-bold press">Cancel</button>
              <button
                onClick={() => { if (name.trim()) { addList(name, "✨"); setName(""); setCreating(false); } }}
                className="flex-1 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold press shadow-glow"
              >Create</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setCreating(true)}
            className="rounded-[1.75rem] border-2 border-dashed border-primary/40 p-4 flex flex-col items-center justify-center gap-2 text-primary press min-h-[120px]"
          >
            <Plus size={24} />
            <span className="font-bold text-sm">New list</span>
          </button>
        )}
      </div>

      {/* Group decision CTA */}
      <Link to="/group-vote" className="mx-6 mt-6 rounded-[1.75rem] bg-primary text-primary-foreground p-5 flex items-center gap-4 shadow-glow press">
        <div className="w-12 h-12 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
          <Vote size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold leading-tight">Friday dinner — vote in progress</h3>
          <p className="text-xs opacity-80">3 friends · 6 votes · ends in 2h</p>
        </div>
        <Share2 size={18} />
      </Link>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

export default Lists;
