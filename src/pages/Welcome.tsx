import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="phone-frame flex flex-col bg-gradient-hero">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="relative mb-8 animate-scale-in">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative w-28 h-28 rounded-[2rem] bg-gradient-warm flex items-center justify-center shadow-glow">
            <Sparkles className="text-primary-foreground" size={44} strokeWidth={2.2} />
          </div>
        </div>

        <h1 className="font-display text-5xl font-bold text-secondary tracking-tight animate-fade-in">
          Spoty
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-[280px] animate-fade-in">
          Find the perfect place <span className="text-primary font-semibold">instantly</span>
        </p>

        <div className="mt-10 w-full space-y-3 animate-slide-up">
          <Link to="/onboarding" className="block">
            <Button size="lg" className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-glow">
              Get started
            </Button>
          </Link>
          <Link to="/login" className="block">
            <Button size="lg" variant="ghost" className="w-full h-14 rounded-full text-secondary font-semibold hover:bg-secondary/10">
              Log in
            </Button>
          </Link>
        </div>
      </div>

      <p className="pb-8 text-center text-xs text-muted-foreground">
        No filters. No fatigue. Just your place.
      </p>
    </div>
  );
};

export default Welcome;
