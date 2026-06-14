import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Brand Assistant" },
      { name: "description", content: "Sign in to your Brand Assistant account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-muted/40 border-r border-border overflow-hidden">
        <div className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">Brand Assistant</span>
        </div>

        <div className="relative">
          <div className="absolute -top-24 -left-12 h-72 w-72 rounded-full bg-foreground/[0.04] blur-3xl" />
          <div className="absolute top-12 left-32 h-56 w-56 rounded-full bg-foreground/[0.05] blur-2xl" />
          <div className="relative space-y-6">
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border border-border bg-card shadow-sm"
                  style={{ opacity: 0.5 + (i % 3) * 0.15 }}
                />
              ))}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground max-w-md">
              The AI co-pilot for small businesses.
            </h1>
            <p className="text-muted-foreground max-w-md">
              Build your brand, plan campaigns, and analyze performance — all in one calm,
              focused workspace.
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">© 2026 Brand Assistant Inc.</p>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your Brand Assistant account.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@company.com" required className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" required className="pl-9" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked />
              <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <Button asChild type="button" variant="outline" className="w-full">
              <Link to="/signup">Create account</Link>
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
