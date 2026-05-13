import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="phone-frame flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-16">
        <div className="animate-scale-in mb-10">
          <h1 className="font-display text-[88px] leading-none font-bold text-secondary tracking-tight">
            Spoty<span className="text-primary">.</span>
          </h1>
          <div className="mt-3 mx-auto h-1 w-12 rounded-full bg-primary" />
        </div>

        <h2 className="font-display text-[28px] leading-[1.1] font-bold text-secondary tracking-tight animate-fade-in max-w-[340px]">
          Find the perfect place, <span className="italic">instantly.</span>
        </h2>
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
