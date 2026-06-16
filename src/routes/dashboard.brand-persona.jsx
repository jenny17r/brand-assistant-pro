import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, RotateCcw, Save, FileDown, Copy, Check, Loader2, History, Megaphone, Palette, Users, MessageSquareQuote, Quote, Building2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export const Route = createFileRoute("/dashboard/brand-persona")({
    head: () => ({
        meta: [
            { title: "Brand Persona Studio — Brand Assistant" },
            {
                name: "description",
                content: "Create and manage your business identity.",
            },
        ],
    }),
    component: BrandPersonaPage,
});
const PLATFORMS = ["Instagram", "Facebook", "WhatsApp", "LinkedIn"];
const DEFAULT_PERSONA = {
    businessName: "TechMart",
    description: "TechMart is a modern electronics retailer focused on providing affordable technology solutions to students and professionals.",
    tagline: "Technology Made Simple.",
    personality: ["Professional", "Trustworthy", "Innovative", "Customer-Centric"],
    palette: [
        { name: "Primary", hex: "#0F172A", role: "Headers & primary actions" },
        { name: "Secondary", hex: "#3B82F6", role: "Links & accents" },
        { name: "Accent", hex: "#F59E0B", role: "Highlights & CTAs" },
        { name: "Surface", hex: "#F8FAFC", role: "Backgrounds" },
    ],
    audience: "Primary audience includes students, young professionals and technology enthusiasts aged 18–35.",
    voice: [
        { title: "Professional", body: "Clear, confident language without jargon." },
        { title: "Friendly", body: "Warm, conversational and approachable tone." },
        { title: "Premium", body: "Polished phrasing that signals quality and trust." },
    ],
    summary: "This brand focuses on delivering reliable technology products while maintaining a professional and approachable identity.",
};
const HISTORY = [
    { name: "TechMart", time: "2 hours ago" },
    { name: "Coffee Corner", time: "Yesterday" },
    { name: "Urban Wear", time: "3 days ago" },
];
const LOADING_STEPS = [
    "Generating Brand Description...",
    "Creating Brand Voice...",
    "Designing Brand Identity...",
];
function BrandPersonaPage() {
    const [form, setForm] = useState({
        businessName: "TechMart",
        businessType: "Electronics Retail",
        location: "Bengaluru, India",
        targetAudience: "Students and young professionals",
        brandTone: "Professional",
    });
    const [platforms, setPlatforms] = useState(["Instagram", "WhatsApp"]);
    const [persona, setPersona] = useState(DEFAULT_PERSONA);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const togglePlatform = (p) => setPlatforms((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
    const generate = () => {
        setLoading(true);
        setStep(0);
        setPersona(null);
        let i = 0;
        const t = setInterval(() => {
            i += 1;
            if (i >= LOADING_STEPS.length) {
                clearInterval(t);
                setTimeout(() => {
                    setPersona({ ...DEFAULT_PERSONA, businessName: form.businessName || "TechMart" });
                    setLoading(false);
                }, 500);
            }
            else {
                setStep(i);
            }
        }, 900);
    };
    const reset = () => {
        setForm({
            businessName: "",
            businessType: "",
            location: "",
            targetAudience: "",
            brandTone: "Professional",
        });
        setPlatforms([]);
        setPersona(null);
    };
    return (<div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Brand Persona Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage your business identity.
          </p>
        </div>
        <Badge variant="secondary" className="text-[10px] gap-1">
          <Sparkles className="h-3 w-3"/> AI-assisted
        </Badge>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT — Form */}
        <div className="lg:col-span-2 space-y-6">
          <PersonaForm form={form} setForm={setForm} platforms={platforms} togglePlatform={togglePlatform} onGenerate={generate} onReset={reset} loading={loading}/>
          <HistoryList />
        </div>

        {/* RIGHT — Output */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (<LoadingPanel step={step}/>) : persona ? (<PersonaCard persona={persona}/>) : (<EmptyPanel />)}
        </div>
      </div>
    </div>);
}
/* -------------------- Form -------------------- */
function PersonaForm({ form, setForm, platforms, togglePlatform, onGenerate, onReset, loading, }) {
    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    return (<section className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-5">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center">
          <Building2 className="h-4 w-4"/>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Business information</h2>
          <p className="text-xs text-muted-foreground">
            Tell us about your business to generate your persona.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Business name">
          <Input value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="e.g. TechMart"/>
        </Field>

        <Field label="Business type">
          <Input value={form.businessType} onChange={(e) => update("businessType", e.target.value)} placeholder="e.g. Electronics Retail"/>
        </Field>

        <Field label="Location">
          <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Bengaluru, India"/>
        </Field>

        <Field label="Target audience">
          <Textarea rows={3} value={form.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} placeholder="Describe your ideal customer"/>
        </Field>

        <Field label="Brand tone">
          <Select value={form.brandTone} onValueChange={(v) => update("brandTone", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone"/>
            </SelectTrigger>
            <SelectContent>
              {["Professional", "Friendly", "Premium", "Playful", "Bold"].map((t) => (<SelectItem key={t} value={t}>
                  {t}
                </SelectItem>))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Platforms">
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
            const active = platforms.includes(p);
            return (<button key={p} type="button" onClick={() => togglePlatform(p)} className={cn("text-xs rounded-md border px-3 py-1.5 transition-colors", active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground border-border hover:bg-muted")}>
                  {active && <Check className="inline h-3 w-3 mr-1"/>}
                  {p}
                </button>);
        })}
          </div>
        </Field>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        <Button onClick={onGenerate} disabled={loading} className="gap-2">
          {loading ? (<Loader2 className="h-4 w-4 animate-spin"/>) : (<Sparkles className="h-4 w-4"/>)}
          Generate Brand Persona
        </Button>
        <Button variant="outline" onClick={onReset} disabled={loading} className="gap-2">
          <RotateCcw className="h-4 w-4"/>
          Reset
        </Button>
      </div>
    </section>);
}
function Field({ label, children }) {
    return (<div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>);
}
/* -------------------- States -------------------- */
function LoadingPanel({ step }) {
    return (<section className="rounded-xl border border-border bg-card shadow-sm p-8 text-center space-y-5">
      <div className="h-12 w-12 mx-auto rounded-full bg-muted grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground"/>
      </div>
      <div>
        <h3 className="text-sm font-semibold">Crafting your brand persona</h3>
        <p className="text-xs text-muted-foreground mt-1">
          This usually takes a few seconds.
        </p>
      </div>
      <ul className="max-w-sm mx-auto space-y-2 text-left">
        {LOADING_STEPS.map((s, i) => (<li key={s} className={cn("flex items-center gap-2 text-sm rounded-md border border-border bg-muted/40 px-3 py-2", i < step && "opacity-70", i === step && "ring-1 ring-foreground/20")}>
            {i < step ? (<Check className="h-4 w-4 text-emerald-600"/>) : i === step ? (<Loader2 className="h-4 w-4 animate-spin"/>) : (<div className="h-4 w-4 rounded-full border border-border"/>)}
            <span>{s}</span>
          </li>))}
      </ul>
    </section>);
}
function EmptyPanel() {
    return (<section className="rounded-xl border border-dashed border-border bg-muted/20 p-10 text-center">
      <div className="h-12 w-12 mx-auto rounded-full bg-card border border-border grid place-items-center">
        <Sparkles className="h-5 w-5 text-muted-foreground"/>
      </div>
      <h3 className="text-sm font-semibold mt-4">No persona yet</h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
        Fill in your business information and click Generate Brand Persona to see your AI-crafted identity here.
      </p>
    </section>);
}
/* -------------------- Persona Card -------------------- */
function PersonaCard({ persona }) {
    return (<div className="space-y-6">
      {/* Header + actions */}
      <section className="rounded-xl border border-border bg-card shadow-sm p-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Generated persona</p>
          <h2 className="text-xl font-semibold tracking-tight">{persona.businessName}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="gap-1.5">
            <Save className="h-4 w-4"/> Save Persona
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <FileDown className="h-4 w-4"/> Export PDF
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Copy className="h-4 w-4"/> Duplicate
          </Button>
        </div>
      </section>

      {/* Section 1 — Description */}
      <SectionCard icon={MessageSquareQuote} title="Brand description">
        <p className="text-sm text-foreground/90 leading-relaxed">{persona.description}</p>
      </SectionCard>

      {/* Section 2 — Tagline */}
      <section className="rounded-xl border border-border bg-gradient-to-br from-muted/60 to-card shadow-sm p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
          <Quote className="h-3.5 w-3.5"/> Tagline
        </div>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{persona.tagline}</p>
      </section>

      {/* Section 3 — Personality */}
      <SectionCard icon={Sparkles} title="Brand personality">
        <PersonalityChips traits={persona.personality}/>
      </SectionCard>

      {/* Section 4 — Palette */}
      <SectionCard icon={Palette} title="Color palette">
        <ColorPaletteCard palette={persona.palette}/>
      </SectionCard>

      {/* Section 5 — Audience */}
      <SectionCard icon={Users} title="Target audience">
        <p className="text-sm text-foreground/90 leading-relaxed">{persona.audience}</p>
      </SectionCard>

      {/* Section 6 — Voice */}
      <SectionCard icon={Megaphone} title="Brand voice guidelines">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {persona.voice.map((v) => (<div key={v.title} className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-semibold">{v.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{v.body}</p>
            </div>))}
        </div>
      </SectionCard>

      {/* Section 7 — Summary */}
      <section className="rounded-xl border border-border bg-card shadow-sm p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
          Executive summary
        </div>
        <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{persona.summary}</p>
      </section>
    </div>);
}
function SectionCard({ icon: Icon, title, children, }) {
    return (<section className="rounded-xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-md bg-muted grid place-items-center">
          <Icon className="h-3.5 w-3.5"/>
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </section>);
}
function PersonalityChips({ traits }) {
    return (<div className="flex flex-wrap gap-2">
      {traits.map((t) => (<span key={t} className="text-xs rounded-full border border-border bg-muted/50 px-3 py-1 font-medium">
          {t}
        </span>))}
    </div>);
}
function ColorPaletteCard({ palette, }) {
    return (<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {palette.map((c) => (<div key={c.name} className="rounded-lg border border-border overflow-hidden bg-card">
          <div className="h-16" style={{ backgroundColor: c.hex }}/>
          <div className="p-3">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
              {c.hex.toUpperCase()}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">{c.role}</p>
          </div>
        </div>))}
    </div>);
}
/* -------------------- History -------------------- */
function HistoryList() {
    return (<section className="rounded-xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-md bg-muted grid place-items-center">
          <History className="h-3.5 w-3.5"/>
        </div>
        <h3 className="text-sm font-semibold">Previous personas</h3>
      </div>
      <ul className="divide-y divide-border">
        {HISTORY.map((h) => (<li key={h.name} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">{h.name}</p>
              <p className="text-xs text-muted-foreground">{h.time}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              Load
            </Button>
          </li>))}
      </ul>
    </section>);
}
