import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Plan", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/saved", label: "Saved", icon: Heart },
  { to: "/profile", label: "You", icon: User },
];

export const TabBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 mt-auto bg-background/95 backdrop-blur-md border-t border-border">
      <div className="px-4 py-2 flex items-center justify-between">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl transition-all press",
                active ? "text-primary" : "text-secondary/50"
              )}
              aria-label={label}
            >
              <div className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all", active && "bg-primary/10")}>
                <Icon size={20} strokeWidth={2.4} />
              </div>
              <span className="text-[10px] font-bold tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
