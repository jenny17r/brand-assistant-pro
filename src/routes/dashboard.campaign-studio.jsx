import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, Loader2, Target, Users, Lightbulb, Calendar,
  Megaphone, TrendingUp, Award, CheckCircle2, Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/campaign-studio")({
  head: () => ({
    meta: [
      { title: "Campaign Studio — Brand Assistant" },
      {
        name: "description",
        content: "Create high-performing marketing campaigns for your business.",
      },
    ],
  }),
  component: CampaignStudioPage,
});

const PERSONAS = ["TechMart", "Coffee Corner", "Urban Wear"];
const CAMPAIGN_TYPES = ["Weekly", "Monthly", "Festival", "Seasonal"];
const DURATIONS = ["7 Days", "15 Days", "30 Days"];
const PLATFORMS = ["Instagram", "Facebook", "WhatsApp", "LinkedIn"];
const FESTIVALS = ["Diwali", "Pongal", "Christmas", "None"];

const STRATEGIES = [
  { title: "Awareness", body: "Teaser reels, festive branding refresh and creator collaborations to drive top-of-funnel reach." },
  { title: "Engagement", body: "Interactive stories, polls and UGC contests that invite the community into the campaign." },
  { title: "Conversion", body: "Limited-time bundle offers and retargeting ads aimed at warm audiences." },
  { title: "Retention", body: "Post-purchase WhatsApp flows and loyalty rewards to bring shoppers back." },
];

const OFFERS = [
  { title: "10% Discount", body: "Sitewide on orders above ₹1,999." },
  { title: "Buy 1 Get 1", body: "On select accessories range." },
  { title: "Bundle Offers", body: "Smart Home starter pack." },
  { title: "Festival Packages", body: "Curated Diwali gift kits." },
];

const CALENDAR = [
  { day: "Day 1", title: "Launch Post", body: "Hero reveal across all platforms." },
  { day: "Day 3", title: "Customer Story", body: "Spotlight a loyal customer's setup." },
  { day: "Day 5", title: "Offer Reminder", body: "Story countdown + WhatsApp blast." },
  { day: "Day 7", title: "Final Call", body: "Last-day urgency post + paid boost." },
];

const POSTS = [
  { title: "Festive Launch Teaser", caption: "The countdown begins — Diwali drops in 3 days. ✨", platform: "Instagram" },
  { title: "Bundle Spotlight", caption: "Smart Home, smarter savings. Save 25% on the starter kit.", platform: "Facebook" },
  { title: "VIP Early Access", caption: "Subscribers get the first peek tonight at 8 PM.", platform: "WhatsApp" },
  { title: "Workplace Edition", caption: "Upgrade your team's productivity stack this season.", platform: "LinkedIn" },
];

const RECOMMENDATIONS = [
  "Use short-form video content for 2–3× higher engagement during launch week.",
  "Run paid promotion during peak festival evenings (7–10 PM) for best ROAS.",
  "Promote bundle offers prominently to lift average order value by 18–24%.",
  "Reserve 15% of budget for retargeting users who viewed but didn't purchase.",
];

function CampaignStudioPage() {
  const [persona, setPersona] = useState("TechMart");
  const [type, setType] = useState("Festival");
  const [duration, setDuration] = useState("7 Days");
  const [platform, setPlatform] = useState("Instagram");
  const [festival, setFestival] = useState("Diwali");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(true);

  const generate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Campaign Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create high-performing marketing campaigns for your business.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* LEFT */}
        <section className="rounded-xl border border-border bg-card p-5 h-fit lg:sticky lg:top-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="h-4 w-4" />
            <h2 className="font-semibold">Campaign Setup</h2>
          </div>

          <div className="space-y-4">
            <Field label="Brand Persona">
              <Picker value={persona} onChange={setPersona} options={PERSONAS} />
            </Field>
            <Field label="Campaign Type">
              <Picker value={type} onChange={setType} options={CAMPAIGN_TYPES} />
            </Field>
            <Field label="Campaign Duration">
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((d) => (
                  <Chip key={d} active={duration === d} onClick={() => setDuration(d)}>{d}</Chip>
                ))}
              </div>
            </Field>
            <Field label="Platform">
              <Picker value={platform} onChange={setPlatform} options={PLATFORMS} />
            </Field>
            <Field label="Festival">
              <Picker value={festival} onChange={setFestival} options={FESTIVALS} />
            </Field>

            <Button onClick={generate} disabled={loading} className="w-full h-11 mt-2">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Building campaign…</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate Campaign</>
              )}
            </Button>
          </div>
        </section>

        {/* RIGHT */}
        <div className="space-y-6">
          {loading || !generated ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3" />
              Crafting your campaign plan…
            </div>
          ) : (
            <>
              {/* Section 1 — Name */}
              <section className="rounded-xl border border-border bg-gradient-to-br from-foreground to-foreground/85 text-background p-6">
                <Badge className="bg-background/15 text-background border-0 hover:bg-background/15">
                  {type} Campaign
                </Badge>
                <h2 className="text-2xl font-semibold tracking-tight mt-3">
                  {persona} • {festival !== "None" ? `${festival} Festive Edition` : "Signature Season Push"}
                </h2>
                <p className="text-sm text-background/70 mt-1">
                  {duration} • {platform} • Auto-optimised for {persona}'s tone
                </p>
              </section>

              {/* Section 2 + 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PanelCard icon={Target} title="Campaign Objective">
                  Increase sales and customer engagement during the festive season by combining storytelling, curated offers and targeted retargeting.
                </PanelCard>
                <PanelCard icon={Users} title="Target Audience">
                  Urban professionals and students aged 22–38 across Tier 1 & Tier 2 cities, with prior interest in electronics, lifestyle and gifting.
                </PanelCard>
              </div>

              {/* Section 4 — Strategy */}
              <Section title="Campaign Strategy" icon={Lightbulb}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STRATEGIES.map((s) => (
                    <div key={s.title} className="rounded-lg border border-border bg-background p-4">
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.body}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Section 5 — Offers */}
              <Section title="Offer Suggestions" icon={Gift}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {OFFERS.map((o) => (
                    <div key={o.title} className="rounded-lg border border-border bg-background p-4">
                      <p className="font-semibold">{o.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{o.body}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Section 6 — Calendar */}
              <Section title="Content Plan" icon={Calendar}>
                <ol className="relative border-l border-border ml-2 space-y-4">
                  {CALENDAR.map((c) => (
                    <li key={c.day} className="pl-5 relative">
                      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-foreground" />
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{c.day}</Badge>
                        <p className="font-medium">{c.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{c.body}</p>
                    </li>
                  ))}
                </ol>
              </Section>

              {/* Section 7 — Posts */}
              <Section title="Suggested Social Posts" icon={Megaphone}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {POSTS.map((p) => (
                    <div key={p.title} className="rounded-lg border border-border bg-background p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium">{p.title}</p>
                        <Badge variant="outline">{p.platform}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Section 8 — KPIs */}
              <Section title="Success Metrics" icon={TrendingUp}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <Kpi label="Expected Reach" value="148K" delta="+22%" />
                  <Kpi label="Expected Engagement" value="6.8%" delta="+1.2%" />
                  <Kpi label="Expected Leads" value="3,420" delta="+18%" />
                  <Kpi label="Expected Conversion" value="2.4%" delta="+0.6%" />
                </div>
              </Section>

              {/* Section 9 — Recommendations */}
              <Section title="Campaign Recommendations" icon={Award}>
                <ul className="space-y-2">
                  {RECOMMENDATIONS.map((r) => (
                    <li key={r} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                      <span className="text-sm">{r}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}
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

function Picker({ value, onChange, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-2 rounded-md border text-sm transition-colors " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:bg-muted")
      }
    >
      {children}
    </button>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function PanelCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </section>
  );
}

function Kpi({ label, value, delta }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        <span className="text-xs text-emerald-600 font-medium">{delta}</span>
      </div>
    </div>
  );
}
