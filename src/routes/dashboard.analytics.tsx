import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Crown,
  Info,
  Lightbulb,
  Percent,
  PiggyBank,
  Receipt,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CsvUpload } from "@/components/CsvUpload";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({
    meta: [
      { title: "Business Analytics — Brand Assistant" },
      {
        name: "description",
        content:
          "Analyze sales performance, profit metrics, alerts and recommendations.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

type Product = {
  name: string;
  revenue: number;
  profit: number;
  contribution: number;
  status: "Top" | "Healthy" | "Low";
};

const PRODUCTS: Product[] = [
  { name: "Laptop", revenue: 500000, profit: 100000, contribution: 68, status: "Top" },
  { name: "Monitor", revenue: 180000, profit: 30000, contribution: 25, status: "Healthy" },
  { name: "Keyboard", revenue: 30000, profit: 12000, contribution: 4, status: "Low" },
  { name: "Mouse", revenue: 25000, profit: 12500, contribution: 3, status: "Low" },
];

type SortKey = "name" | "revenue" | "profit" | "contribution";

function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Business Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze sales performance, profit metrics, alerts and recommendations.
          </p>
        </div>
        <div className="text-xs text-muted-foreground rounded-md border border-border bg-card px-3 py-1.5">
          Period: Last 30 days
        </div>
      </header>

      {/* Section 1 — Upload */}
      <section className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold">Upload Sales Data</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload CSV or Excel files to analyze business performance.
          </p>
        </div>
        <CsvUpload />
      </section>

      {/* Section 2 — KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Total Revenue" value={fmt(735000)} icon={Wallet} delta="+12%" up />
        <Kpi label="Total Cost" value={fmt(580500)} icon={Receipt} delta="+5%" />
        <Kpi label="Total Profit" value={fmt(154500)} icon={PiggyBank} delta="+18%" up />
        <Kpi label="Profit Margin" value="21.02%" icon={Percent} status="Healthy" />
      </section>

      {/* Section 3 — Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue by product" subtitle="Gross revenue per SKU">
          <BarsChart
            data={PRODUCTS.map((p) => ({ name: p.name, value: p.revenue }))}
          />
        </ChartCard>
        <ChartCard title="Profit by product" subtitle="Net profit per SKU">
          <BarsChart
            data={PRODUCTS.map((p) => ({ name: p.name, value: p.profit }))}
          />
        </ChartCard>
      </section>

      {/* Section 4 — Top products */}
      <ProductsTable />

      {/* Section 5 + 6 — Alerts & Recommendations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Business alerts</h2>
            <Badge variant="secondary" className="text-[10px]">3 active</Badge>
          </div>
          <AlertCard
            severity="warning"
            title="High revenue concentration"
            body="Laptop contributes 68% of total revenue."
          />
          <AlertCard
            severity="info"
            title="Low contribution"
            body="Keyboard contributes only 4% of revenue."
          />
          <AlertCard
            severity="info"
            title="Low contribution"
            body="Mouse contributes only 3% of revenue."
          />
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">AI recommendations</h2>
            <Badge variant="secondary" className="text-[10px] gap-1">
              <Sparkles className="h-3 w-3" /> AI
            </Badge>
          </div>
          <RecommendationCard body="Reduce dependency on Laptop sales by promoting Monitor and accessories." />
          <RecommendationCard body="Bundle Keyboard and Mouse with Laptop purchases." />
          <RecommendationCard body="Maintain current pricing strategy because profit margin exceeds 20%." />
        </div>
      </section>

      {/* Section 7 — Sales insights */}
      <section>
        <div className="mb-3">
          <h2 className="text-sm font-semibold">Sales insights</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key takeaways across your product catalog.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InsightCard
            icon={Crown}
            label="Most profitable product"
            value="Laptop"
            sub="₹100,000 net profit"
            tone="emerald"
          />
          <InsightCard
            icon={TrendingDown}
            label="Least profitable product"
            value="Keyboard"
            sub="₹12,000 net profit"
            tone="amber"
          />
          <InsightCard
            icon={Percent}
            label="Revenue concentration"
            value="68%"
            sub="Top SKU share of revenue"
            tone="sky"
          />
          <InsightCard
            icon={CheckCircle2}
            label="Business health"
            value="Healthy"
            sub="Margin above 20%"
            tone="emerald"
          />
        </div>
      </section>

      {/* Section 8 — Forecast */}
      <section className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Future forecast</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Forecasted using historical sales trends.
            </p>
          </div>
          <Badge variant="secondary" className="text-[10px] gap-1">
            <Sparkles className="h-3 w-3" /> Predicted
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ForecastCard
            label="Next month revenue forecast"
            value={fmt(780000)}
            sub="Projected gross revenue"
            icon={Wallet}
          />
          <ForecastCard
            label="Expected growth"
            value="+6%"
            sub="vs. current period"
            icon={ArrowUpRight}
            highlight
          />
          <ForecastCard
            label="Top predicted product"
            value="Laptop"
            sub="Forecast leader by revenue"
            icon={Crown}
          />
        </div>

        <p className="text-[11px] text-muted-foreground border-t border-border pt-3">
          Note: This is forecasted using historical sales trends and is provided for
          planning purposes only.
        </p>
      </section>
    </div>
  );
}

/* -------------------- Reusable components -------------------- */

function Kpi({
  label,
  value,
  icon: Icon,
  delta,
  up,
  status,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  delta?: string;
  up?: boolean;
  status?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight mt-3 tabular-nums">{value}</p>
      {delta ? (
        <div
          className={cn(
            "flex items-center gap-1 text-xs mt-1.5",
            up ? "text-emerald-600" : "text-muted-foreground",
          )}
        >
          {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          <span>{delta} vs last period</span>
        </div>
      ) : status ? (
        <div className="flex items-center gap-1 text-xs mt-1.5 text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{status}</span>
        </div>
      ) : null}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}

function BarsChart({ data }: { data: { name: string; value: number }[] }) {
  const colors = ["#0F172A", "#334155", "#64748B", "#94A3B8"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#64748B" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748B" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => "₹" + (v / 1000).toFixed(0) + "k"}
        />
        <Tooltip
          cursor={{ fill: "rgba(15,23,42,0.04)" }}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #E5E7EB",
            fontSize: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
          formatter={(v) => fmt(Number(v))}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function ProductsTable() {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "revenue",
    dir: "desc",
  });

  const rows = useMemo(() => {
    const sorted = [...PRODUCTS].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return sorted;
  }, [sort]);

  const toggle = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" },
    );

  const SortHeader = ({
    label,
    k,
    align = "left",
  }: {
    label: string;
    k: SortKey;
    align?: "left" | "right";
  }) => (
    <TableHead className={align === "right" ? "text-right" : ""}>
      <button
        type="button"
        onClick={() => toggle(k)}
        className={cn(
          "inline-flex items-center gap-1 hover:text-foreground transition-colors",
          align === "right" && "ml-auto",
        )}
      >
        {label}
        {sort.key === k ? (
          sort.dir === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : null}
      </button>
    </TableHead>
  );

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="p-5 border-b border-border">
        <h2 className="text-sm font-semibold">Top products</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Ranked by revenue contribution. Click a column to sort.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <SortHeader label="Product" k="name" />
            <SortHeader label="Revenue" k="revenue" align="right" />
            <SortHeader label="Profit" k="profit" align="right" />
            <SortHeader label="Contribution %" k="contribution" align="right" />
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.name} className="hover:bg-muted/40 transition-colors">
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="text-right tabular-nums">{fmt(p.revenue)}</TableCell>
              <TableCell className="text-right tabular-nums">{fmt(p.profit)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${p.contribution}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-sm w-10">{p.contribution}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <StatusBadge status={p.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const map: Record<Product["status"], string> = {
    Top: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Healthy: "bg-sky-50 text-sky-700 border-sky-200",
    Low: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function AlertCard({
  severity,
  title,
  body,
}: {
  severity: "warning" | "info";
  title: string;
  body: string;
}) {
  const tone =
    severity === "warning"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-sky-50 text-sky-700 border-sky-200";
  const Icon = severity === "warning" ? AlertTriangle : Info;
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
      <div className={cn("h-8 w-8 rounded-md grid place-items-center border", tone)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{title}</p>
          <span
            className={cn(
              "text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 border",
              tone,
            )}
          >
            {severity}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{body}</p>
      </div>
    </div>
  );
}

function RecommendationCard({ body }: { body: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
      <div className="h-8 w-8 rounded-md grid place-items-center bg-emerald-50 text-emerald-700 border border-emerald-200">
        <Lightbulb className="h-4 w-4" />
      </div>
      <p className="text-sm text-foreground/90 flex-1">{body}</p>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  tone: "emerald" | "amber" | "sky";
}) {
  const toneMap = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    sky: "bg-sky-50 text-sky-700 border-sky-200",
  } as const;
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-5">
      <div className={cn("h-9 w-9 rounded-lg grid place-items-center border", toneMap[tone])}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs text-muted-foreground mt-3">{label}</p>
      <p className="text-lg font-semibold tracking-tight mt-1">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

function ForecastCard({
  label,
  value,
  sub,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 shadow-sm",
        highlight
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-border bg-card",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div
          className={cn(
            "h-8 w-8 rounded-lg grid place-items-center border",
            highlight
              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : "bg-muted text-foreground border-border",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight mt-3 tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}
