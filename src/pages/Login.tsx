import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="phone-frame flex flex-col px-6 pt-6 pb-8">
      <Link to="/" className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-soft press">
        <ArrowLeft size={18} />
      </Link>

      <div className="mt-10">
        <h1 className="font-display text-4xl font-semibold leading-tight">Welcome back</h1>
        <p className="text-muted-foreground mt-2">Log in to continue to Spoty</p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}
      >
        <Field icon={Mail} placeholder="Email" type="email" defaultValue="sirine@spoty.app" />
        <Field icon={Lock} placeholder="Password" type="password" defaultValue="••••••••" />

        <Link to="/forgot" className="block text-right text-sm text-primary font-semibold">
          Forgot password?
        </Link>

        <Button type="submit" size="lg" className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow mt-2">
          Log in
        </Button>
      </form>

      <p className="mt-auto text-center text-sm text-muted-foreground">
        New to Spoty?{" "}
        <Link to="/onboarding" className="text-primary font-semibold">Get started</Link>
      </p>
    </div>
  );
};

const Field = ({ icon: Icon, ...props }: any) => (
  <div className="flex items-center gap-3 bg-card rounded-2xl px-4 h-14 shadow-soft">
    <Icon size={18} className="text-muted-foreground" />
    <Input {...props} className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-base" />
  </div>
);

export default Login;
