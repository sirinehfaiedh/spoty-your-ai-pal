import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Users, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/state/AppState";
import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { toast } from "@/hooks/use-toast";

const ListDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { lists, removeFromList } = useApp();
  const list = lists.find((l) => l.id === id);

  if (!list) {
    return (
      <div className="phone-frame p-6">
        <p>List not found.</p>
        <Link to="/lists" className="text-primary font-bold">Back to lists</Link>
      </div>
    );
  }

  const items = list.items
    .map((rid) => restaurants.find((r) => r.id === rid))
    .filter(Boolean) as typeof restaurants;

  return (
    <div className="phone-frame flex flex-col pb-8">
      <header className="px-6 pt-6 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold tracking-wider uppercase text-primary inline-flex items-center gap-1.5">
            {list.shared && <><Users size={11} /> Shared list</>}
            {!list.shared && "Private list"}
          </p>
          <h1 className="font-display text-2xl font-bold text-secondary leading-tight">
            {list.emoji} {list.name}
          </h1>
          <p className="text-xs text-secondary/60">{items.length} places</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
          <Share2 size={16} />
        </button>
      </header>

      {/* Quick stats */}
      <div className="mx-6 rounded-2xl bg-info p-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="font-display text-lg font-bold text-secondary">{items.length}</p>
          <p className="text-[10px] text-secondary/60 uppercase tracking-wider">Saved</p>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-secondary">{items.length ? Math.round(items.reduce((s, r) => s + r.affinity, 0) / items.length) : 0}%</p>
          <p className="text-[10px] text-secondary/60 uppercase tracking-wider">Avg match</p>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-secondary">{items.length ? items.reduce((s, r) => s + r.rating, 0).toFixed(1) : "0"}</p>
          <p className="text-[10px] text-secondary/60 uppercase tracking-wider">Stars total</p>
        </div>
      </div>

      <section className="px-6 mt-5 space-y-4">
        {items.length === 0 ? (
          <Link to="/explore" className="block soft-card bg-card p-8 text-center press">
            <Plus size={28} className="mx-auto text-primary" />
            <p className="mt-3 font-bold text-secondary">No places yet</p>
            <p className="text-xs text-secondary/60 mt-1">Browse Explore and tap ❤️ to add to this list.</p>
          </Link>
        ) : (
          items.map((r) => (
            <div key={r.id} className="relative">
              <RestaurantCard r={r} compact />
              <button
                onClick={() => {
                  removeFromList(list.id, r.id);
                  toast({ title: "Removed", description: `${r.name} removed from ${list.name}` });
                }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/95 flex items-center justify-center shadow-soft press z-10"
                aria-label="Remove"
              >
                <Trash2 size={14} className="text-primary" />
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ListDetail;
