import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Palette,
  PenSquare,
  Megaphone,
  BarChart3,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Target,
  CalendarDays,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Brand Assistant" },
      { name: "description", content: "Manage your brand, campaigns and business analytics from one place." },
    ],
  }),
  component: DashboardHub,
});

const BUSINESS_NAME = "Acme Electronics";

const quickActions = [
  {
    title: "Brand Persona",
    description: "View and manage your business profile.",
    cta: "Open Brand Persona",
    to: "/dashboard/brand-persona",
    icon: Palette,
  },
  {
    title: "Content Studio",
    description: "Generate social media posts.",
    cta: "Generate Content",
    to: "/dashboard/content-studio",
    icon: PenSquare,
  },
  {
    title: "Campaign Studio",
    description: "Create festival campaigns using AI.",
    cta: "Generate Campaign",
    to: "/dashboard/campaign-studio",
    icon: Megaphone,
  },
  {
    title: "Business Analytics",
    description: "Upload sales data and analyze performance.",
    cta: "Open Analytics",
    to: "/dashboard/analytics",
    icon: BarChart3,
  },
] as const;

const activity = [
  { icon: Palette, title: "Brand Persona generated", time: "2 hours ago" },
  { icon: Megaphone, title: "Diwali campaign generated", time: "Yesterday, 4:12 PM" },
  { icon: Upload, title: "Sales report uploaded — sales_oct.csv", time: "2 days ago" },
  { icon: FileText, title: "Content generated — 5 Instagram posts", time: "4 days ago" },
];

const insights = [
  {
    icon: TrendingUp,
    title: "Revenue concentration",
    body: "Revenue depends heavily on Laptop sales (68% of total).",
    tone: "warning" as const,
  },
  {
    icon: Target,
    title: "Healthy profit margin",
    body: "Profit margin remains above 20% across the catalog.",
    tone: "success" as const,
  },
  {
    icon: Lightbulb,
    title: "Growth opportunity",
    body: "Monitor category shows strong growth potential this quarter.",
    tone: "info" as const,
  },
];

// Days until a fixed mock date relative to "today"
function daysUntil(month: number, day: number) {
  const today = new Date();
  let year = today.getFullYear();
  const target = new Date(year, month - 1, day);
  if (target < today) target.setFullYear(year + 1);
  const ms = target.getTime() - today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

const festivals = [
  { name: "Diwali", month: 11, day: 1, readiness: "ready" as const },
  { name: "Pongal", month: 1, day: 14, readiness: "draft" as const },
  { name: "Christmas", month: 12, day: 25, readiness: "not-started" as const },
];

function DashboardHub() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            Welcome back, {BUSINESS_NAME}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Manage your brand, campaigns and business analytics from one place.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-md border border-border bg-card px-3 py-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {today}
        </div>
      </header>

      {/* Quick Actions */}
      <section className="space-y-4">
        <SectionHeading title="Quick actions" subtitle="Jump straight into your most-used tools." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => (
            <div
              key={a.title}
              className="group rounded-xl border border-border bg-card shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="h-10 w-10 rounded-lg bg-muted grid place-items-center mb-4">
                <a.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">{a.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 flex-1">{a.description}</p>
              <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                <Link to={a.to}>{a.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Two-column: Activity + Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-5">
          <SectionHeading title="Recent activity" subtitle="What's happened lately." compact />
          <ol className="mt-4 relative border-l border-border ml-2 space-y-5">
            {activity.map((a, i) => (
              <li key={i} className="pl-5">
                <span className="absolute -left-[7px] h-3.5 w-3.5 rounded-full bg-background border-2 border-foreground" />
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-md bg-muted grid place-items-center shrink-0">
                    <a.icon className="h-3.5 w-3.5 text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {a.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Business Insights */}
        <div className="lg:col-span-3 space-y-4">
          <SectionHeading
            title="Business insights"
            subtitle="AI-generated observations from your latest data."
            compact
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((ins) => (
              <InsightCard key={ins.title} {...ins} />
            ))}
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-5 grid place-items-center text-center">
              <div>
                <Sparkles className="h-5 w-5 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-2">
                  More insights unlock as you upload more sales data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section className="space-y-4">
        <SectionHeading
          title="Upcoming festivals"
          subtitle="Plan AI-generated campaigns ahead of key dates."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {festivals.map((f) => (
            <FestivalCard key={f.name} {...f} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
  compact,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div>
      <h2 className={compact ? "text-sm font-semibold" : "text-lg font-semibold tracking-tight"}>
        {title}
      </h2>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  body,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  tone: "warning" | "success" | "info";
}) {
  const toneMap = {
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
  } as const;
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-5">
      <div className={"h-9 w-9 rounded-md grid place-items-center border " + toneMap[tone]}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-semibold mt-3">{title}</p>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{body}</p>
    </div>
  );
}

function FestivalCard({
  name,
  month,
  day,
  readiness,
}: {
  name: string;
  month: number;
  day: number;
  readiness: "ready" | "draft" | "not-started";
}) {
  const days = daysUntil(month, day);
  const readinessMap = {
    ready: {
      label: "Campaign ready",
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
    },
    draft: {
      label: "Draft in progress",
      classes: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Clock,
    },
    "not-started": {
      label: "Not started",
      classes: "bg-muted text-muted-foreground border-border",
      icon: Clock,
    },
  } as const;
  const r = readinessMap[readiness];

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {days === 0 ? "Today" : `In ${days} day${days === 1 ? "" : "s"}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold tabular-nums leading-none">{days}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">days left</p>
        </div>
      </div>

      <div
        className={
          "mt-4 inline-flex items-center gap-1.5 self-start text-xs px-2 py-1 rounded-md border " +
          r.classes
        }
      >
        <r.icon className="h-3.5 w-3.5" />
        {r.label}
      </div>

      <Button asChild size="sm" className="mt-4 w-full">
        <Link to="/dashboard/campaign-studio">Generate Campaign</Link>
      </Button>
    </div>
  );
}
