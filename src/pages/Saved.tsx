import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { TabBar } from "@/components/TabBar";
import { Heart } from "lucide-react";

const Saved = () => {
  const saved = [restaurants[0], restaurants[3], restaurants[1]];
  return (
    <div className="phone-frame flex flex-col pb-2">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Saved</h1>
          <p className="text-muted-foreground text-sm mt-1">Your personal shortlist.</p>
        </div>
        <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center">
          <Heart size={18} className="text-primary fill-primary" />
        </div>
      </header>

      <section className="mt-2 px-6 space-y-4">
        {saved.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </section>

      <div className="mt-8" />
      <TabBar />
    </div>
  );
};

export default Saved;
