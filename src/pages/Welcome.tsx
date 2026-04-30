import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="phone-frame flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-16">
        {/* OK-hand mark inspired by Cherrypick */}
        <div className="relative mb-10 animate-scale-in">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" aria-hidden>
            {/* hand */}
            <path
              d="M55 70 C55 50, 80 40, 95 55 L120 80 C130 90, 135 105, 130 120 L125 140 C120 155, 105 165, 90 162 L70 158 C55 155, 45 145, 42 130 L38 105 C36 90, 42 78, 55 70 Z"
              fill="hsl(var(--card))"
              stroke="hsl(var(--secondary))"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* ring finger curl */}
            <path d="M95 55 C110 48, 125 52, 130 65" stroke="hsl(var(--secondary))" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* OK circle = lime ball */}
            <circle cx="70" cy="100" r="22" fill="hsl(var(--accent))" stroke="hsl(var(--secondary))" strokeWidth="5" />
            {/* smile on ball */}
            <path d="M62 100 Q70 108 78 100" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <h1 className="font-display text-[44px] leading-[1.05] font-bold text-secondary tracking-tight animate-fade-in max-w-[340px]">
          Find the perfect place, <span className="italic">instantly.</span>
        </h1>
        <p className="mt-4 text-base text-secondary/75 max-w-[320px] animate-fade-in">
          Your AI restaurant assistant. No filters, no fatigue — just your place.
        </p>
      </div>

      <div className="px-6 pb-10 space-y-3 animate-slide-up">
        <Link to="/onboarding" className="block">
          <Button className="pill-btn w-full bg-card hover:bg-card/90 text-primary text-lg shadow-soft">
            Get started
          </Button>
        </Link>
        <Link to="/login" className="block">
          <Button className="pill-btn w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-glow">
            Log in
          </Button>
        </Link>
        <p className="pt-3 text-center text-xs text-secondary/70">
          By continuing you agree to Spoty's{" "}
          <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
