import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, Copy, Check, RotateCcw, Save, FileDown, Loader2,
  Instagram, Facebook, Linkedin, MessageCircle, History,
  TrendingUp, Heart, Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/content-studio")({
  head: () => ({
    meta: [
      { title: "Content Studio — Brand Assistant" },
      {
        name: "description",
        content:
          "Create engaging social media content tailored to your brand identity.",
      },
    ],
  }),
  component: ContentStudioPage,
});

const PERSONAS = ["TechMart", "Coffee Corner", "Urban Wear"];
const PLATFORMS = [
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "LinkedIn", icon: Linkedin },
  { name: "WhatsApp", icon: MessageCircle },
];
const CONTENT_TYPES = [
  "Promotional Post",
  "Product Launch",
  "Festival Greeting",
  "Educational Post",
  "Customer Engagement",
];
const TONES = ["Professional", "Friendly", "Premium", "Fun"];
const VARIATIONS = [1, 3, 5];

const SAMPLE_CONTENT = [
  {
    title: "Diwali Sparkle Sale",
    caption:
      "This Diwali, light up your home with the latest tech ✨ Enjoy flat 20% off on premium electronics — only at TechMart. Limited stock, unlimited joy.",
    hashtags: ["#DiwaliSale", "#TechMart", "#FestiveDeals", "#ShopSmart", "#NewArrivals"],
  },
  {
    title: "Smart Home Bundle Reveal",
    caption:
      "Upgrade your living, the smart way. Our new Smart Home Bundle pairs voice control, ambient lighting, and security — all in one box. Crafted for modern homes.",
    hashtags: ["#SmartHome", "#TechMart", "#Innovation", "#HomeUpgrade"],
  },
  {
    title: "Customer Spotlight: Riya's Setup",
    caption:
      "Meet Riya — designer, gamer, and a TechMart regular. Her dream workstation came together with our ProDesk series. Tag us in your setup for a chance to be featured!",
    hashtags: ["#CustomerStory", "#TechMart", "#WorkFromHome", "#SetupGoals"],
  },
];

const HISTORY = [
  { title: "Festive Launch Teaser", platform: "Instagram", date: "Today, 10:42 AM" },
  { title: "New Arrival — AirBuds X", platform: "Facebook", date: "Yesterday" },
  { title: "Office Setup Guide", platform: "LinkedIn", date: "2 days ago" },
  { title: "Weekend Offer Blast", platform: "WhatsApp", date: "4 days ago" },
];

function ContentStudioPage() {
  const [persona, setPersona] = useState("TechMart");
  const [platform, setPlatform] = useState("Instagram");
  const [type, setType] = useState("Promotional Post");
  const [tone, setTone] = useState("Professional");
  const [count, setCount] = useState("3");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(SAMPLE_CONTENT);
  const [copied, setCopied] = useState(-1);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const n = parseInt(count, 10);
      const base = [...SAMPLE_CONTENT, ...SAMPLE_CONTENT];
      setItems(base.slice(0, n));
      setLoading(false);
    }, 900);
  };

  const copy = (i) => {
    const it = items[i];
    navigator.clipboard?.writeText(`${it.title}\n\n${it.caption}\n\n${it.hashtags.join(" ")}`);
    setCopied(i);
    setTimeout(() => setCopied(-1), 1500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Content Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create engaging social media content tailored to your brand identity.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4" />
              <h2 className="font-semibold">Content Configuration</h2>
            </div>

            <div className="space-y-4">
              <Field label="Brand Persona">
                <Select value={persona} onValueChange={setPersona}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PERSONAS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Platform">
                <div className="grid grid-cols-2 gap-2">
                  {PLATFORMS.map((p) => {
                    const Icon = p.icon;
                    const active = platform === p.name;
                    return (
                      <button
                        key={p.name}
                        onClick={() => setPlatform(p.name)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors",
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Content Type">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Tone">
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Number of Variations">
                <div className="grid grid-cols-3 gap-2">
                  {VARIATIONS.map((v) => {
                    const active = count === String(v);
                    return (
                      <button
                        key={v}
                        onClick={() => setCount(String(v))}
                        className={cn(
                          "px-3 py-2 rounded-md border text-sm transition-colors",
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Button onClick={generate} disabled={loading} className="w-full h-11 mt-2">
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles className="h-4 w-4" /> Generate Content</>
                )}
              </Button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-4 w-4" />
              <h2 className="font-semibold">Content History</h2>
            </div>
            <ul className="space-y-2">
              {HISTORY.map((h) => (
                <li key={h.title} className="flex items-center justify-between gap-3 p-2.5 rounded-md hover:bg-muted/60">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{h.title}</p>
                    <p className="text-xs text-muted-foreground">{h.date}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">{h.platform}</Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Generated Content</h2>
                <p className="text-xs text-muted-foreground">
                  {items.length} variation{items.length === 1 ? "" : "s"} • {platform} • {tone}
                </p>
              </div>
              <Badge variant="secondary">{persona}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((it, i) => (
                <ContentCard
                  key={i}
                  item={it}
                  platform={platform}
                  copied={copied === i}
                  onCopy={() => copy(i)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold mb-4">Content Performance Preview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard icon={TrendingUp} label="Estimated Reach" value="24,800" delta="+12.4%" />
              <MetricCard icon={Heart} label="Estimated Engagement" value="6.2%" delta="+0.8%" />
              <MetricCard icon={Share2} label="Estimated Shares" value="432" delta="+18%" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ContentCard({ item, platform, copied, onCopy }) {
  const charCount = item.caption.length;
  return (
    <article className="rounded-lg border border-border bg-background p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium leading-snug">{item.title}</h3>
        <Badge variant="outline" className="shrink-0">{platform}</Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.caption}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.hashtags.map((h) => (
          <span key={h} className="text-xs text-foreground/70 bg-muted rounded px-1.5 py-0.5">{h}</span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">{charCount} chars</span>
        <div className="flex items-center gap-1">
          <IconBtn onClick={onCopy} label="Copy">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </IconBtn>
          <IconBtn label="Regenerate"><RotateCcw className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn label="Save"><Save className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn label="Export"><FileDown className="h-3.5 w-3.5" /></IconBtn>
        </div>
      </div>
    </article>
  );
}

function IconBtn({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="h-7 w-7 grid place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      {children}
    </button>
  );
}

function MetricCard({ icon: Icon, label, value, delta }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        <span className="text-xs text-emerald-600 font-medium">{delta}</span>
      </div>
    </div>
  );
}
