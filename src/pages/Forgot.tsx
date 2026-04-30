import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Forgot = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="phone-frame flex flex-col px-6 pt-6 pb-8">
      <Link to="/login" className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
        <ArrowLeft size={18} />
      </Link>

      <div className="mt-10">
        <h1 className="font-display text-4xl font-semibold leading-tight">Forgot password?</h1>
        <p className="text-muted-foreground mt-2">We'll send a reset link to your email.</p>
      </div>

      {!sent ? (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <div className="flex items-center gap-3 bg-card rounded-2xl px-4 h-14 shadow-soft">
            <Mail size={18} className="text-muted-foreground" />
            <Input placeholder="Email" type="email" defaultValue="sirine@spoty.app" className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-base" />
          </div>
          <Button type="submit" size="lg" className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow">
            Send reset link
          </Button>
        </form>
      ) : (
        <div className="mt-10 soft-card p-6 bg-accent/30 text-center animate-scale-in">
          <CheckCircle2 size={40} className="mx-auto text-secondary" />
          <h3 className="mt-3 font-display text-2xl font-semibold">Check your inbox</h3>
          <p className="text-muted-foreground text-sm mt-1">We sent instructions to reset your password.</p>
          <Link to="/login" className="mt-5 inline-block text-primary font-semibold">Back to log in</Link>
        </div>
      )}
    </div>
  );
};

export default Forgot;
