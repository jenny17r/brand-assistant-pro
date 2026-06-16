import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export const Route = createFileRoute("/onboarding")({
    head: () => ({
        meta: [
            { title: "Set up your business — Brand Assistant" },
            { name: "description", content: "Tell us about your business to generate a brand persona." },
        ],
    }),
    component: OnboardingPage,
});
function OnboardingPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState("form");
    const [businessName, setBusinessName] = useState("");
    const handleGenerate = (e) => {
        e.preventDefault();
        setStep("loading");
        setTimeout(() => setStep("result"), 1800);
    };
    return (<div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center">
            <Sparkles className="h-4 w-4"/>
          </div>
          <span className="font-semibold tracking-tight">Brand Assistant</span>
        </div>

        {step === "form" && (<div className="rounded-2xl border border-border bg-card shadow-sm p-8 sm:p-10 space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Tell us about your business
              </h1>
              <p className="text-muted-foreground">
                We'll generate a personalized business profile.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bn">Business name</Label>
                  <Input id="bn" placeholder="Acme Coffee Co." required value={businessName} onChange={(e) => setBusinessName(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loc">Location</Label>
                  <Input id="loc" placeholder="Mumbai, India" required/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aud">Target audience</Label>
                <Input id="aud" placeholder="Young professionals, 22–35" required/>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business type</Label>
                  <Select defaultValue="Coffee Shop">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Bakery", "Restaurant", "Electronics", "Clothing", "Coffee Shop", "Other"].map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Brand tone</Label>
                  <Select defaultValue="Friendly">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Professional", "Friendly", "Premium", "Fun"].map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary platform</Label>
                <Select defaultValue="Instagram">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Instagram", "Facebook", "WhatsApp"].map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Generate brand persona
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </form>
          </div>)}

        {step === "loading" && (<div className="rounded-2xl border border-border bg-card shadow-sm p-16 text-center space-y-4">
            <Loader2 className="h-10 w-10 mx-auto animate-spin text-foreground"/>
            <h2 className="text-lg font-semibold">Crafting your brand persona…</h2>
            <p className="text-sm text-muted-foreground">
              Analyzing audience, tone and market positioning.
            </p>
          </div>)}

        {step === "result" && (<div className="rounded-2xl border border-border bg-card shadow-sm p-8 sm:p-10 space-y-8">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground/5 grid place-items-center">
                <CheckCircle2 className="h-5 w-5 text-foreground"/>
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Here's your brand persona
                </h2>
                <p className="text-sm text-muted-foreground">
                  A starting point — refine anytime from Brand Persona.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Section title="Brand description">
                {businessName || "Your business"} is a warm, locally-rooted destination crafted
                for everyday rituals — blending quality, care and an unmistakable point of view.
              </Section>

              <Section title="Tagline">
                <span className="text-base font-medium text-foreground">
                  "Small moments. Big flavor."
                </span>
              </Section>

              <div>
                <p className="text-sm font-medium mb-3">Color palette</p>
                <div className="flex gap-3">
                  {[
                { c: "#0F172A", n: "Ink" },
                { c: "#C2956B", n: "Clay" },
                { c: "#E8E4DD", n: "Linen" },
                { c: "#F5F3EE", n: "Cream" },
            ].map((p) => (<div key={p.c} className="flex-1 space-y-1.5">
                      <div className="h-16 rounded-lg border border-border" style={{ background: p.c }}/>
                      <div className="text-xs">
                        <p className="font-medium">{p.n}</p>
                        <p className="text-muted-foreground">{p.c}</p>
                      </div>
                    </div>))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Brand personality</p>
                <div className="flex flex-wrap gap-2">
                  {["Warm", "Considered", "Approachable", "Crafted", "Confident"].map((t) => (<span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-border">
                      {t}
                    </span>))}
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={() => navigate({ to: "/dashboard" })}>
              Continue to dashboard
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </div>)}
      </div>
    </div>);
}
function Section({ title, children }) {
    return (<div>
      <p className="text-sm font-medium mb-1.5">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>);
}
