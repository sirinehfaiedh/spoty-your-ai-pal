import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/saved", label: "Saved", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

export const TabBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 mt-auto">
      <div className="mx-4 mb-4 rounded-[2rem] bg-secondary/95 backdrop-blur-md shadow-card px-2 py-2 flex items-center justify-between">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-[1.5rem] transition-all press",
                active ? "bg-primary text-primary-foreground" : "text-secondary-foreground/70"
              )}
              aria-label={label}
            >
              <Icon size={20} strokeWidth={2.2} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
