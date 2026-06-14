import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  Info,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  PiggyBank,
  Percent,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CsvUpload } from "@/components/CsvUpload";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Business Analytics — Brand Assistant" },
      { name: "description", content: "Revenue, profit, alerts and recommendations for your business." },
    ],
  }),
  component: DashboardPage,
});

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const revenueData = [
  { name: "Laptop", value: 500000 },
  { name: "Monitor", value: 180000 },
  { name: "Keyboard", value: 30000 },
  { name: "Mouse", value: 25000 },
];
const profitData = [
  { name: "Laptop", value: 100000 },
  { name: "Monitor", value: 30000 },
  { name: "Keyboard", value: 12000 },
  { name: "Mouse", value: 12500 },
];

const products = [
  { name: "Laptop", revenue: 500000, profit: 100000, contribution: 68 },
  { name: "Monitor", revenue: 180000, profit: 30000, contribution: 25 },
  { name: "Keyboard", revenue: 30000, profit: 12000, contribution: 4 },
  { name: "Mouse", revenue: 25000, profit: 12500, contribution: 3 },
];

function DashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Business Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze revenue, profit, business alerts and recommendations.
          </p>
        </div>
        <div className="text-xs text-muted-foreground rounded-md border border-border bg-card px-3 py-1.5">
          Period: Last 30 days
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Total Revenue" value={fmt(735000)} icon={Wallet} delta="+12.4%" up />
        <Kpi label="Total Cost" value={fmt(580500)} icon={Receipt} delta="+8.1%" />
        <Kpi label="Total Profit" value={fmt(154500)} icon={PiggyBank} delta="+18.6%" up />
        <Kpi label="Profit Margin" value="21.02%" icon={Percent} delta="+1.8 pts" up />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue by product" subtitle="In ₹ across catalog">
          <RevenueChart data={revenueData} />
        </ChartCard>
        <ChartCard title="Profit by product" subtitle="Net profit per SKU">
          <RevenueChart data={profitData} />
        </ChartCard>
      </section>

      {/* Table */}
      <section className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-semibold">Top products</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ranked by revenue contribution.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.name}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Alerts & Recommendations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-semibold">Business alerts</h2>
          <Alert
            tone="warning"
            icon={AlertTriangle}
            title="High revenue concentration"
            body="Laptop contributes 68% of total revenue."
          />
          <Alert
            tone="info"
            icon={Info}
            title="Low contribution"
            body="Keyboard contributes only 4% of revenue."
          />
          <Alert
            tone="info"
            icon={Info}
            title="Low contribution"
            body="Mouse contributes only 3% of revenue."
          />
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-semibold">Recommendations</h2>
          <Recommendation body="Reduce dependency on Laptop sales by diversifying high-margin SKUs." />
          <Recommendation body="Bundle Keyboard and Mouse with Laptop purchases to lift attach rate." />
          <Recommendation body="Maintain current pricing strategy — profit margin exceeds 20%." />
        </div>
      </section>

      {/* Upload */}
      <section className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-3">
        <div>
          <h2 className="text-sm font-semibold">Import sales data</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload a CSV or Excel file to refresh your dashboard.
          </p>
        </div>
        <CsvUpload />
      </section>
    </div>
  );
}

function Kpi({
  label,
  value,
  icon: Icon,
  delta,
  up,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  delta: string;
  up?: boolean;
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
      <div
        className={
          "flex items-center gap-1 text-xs mt-1.5 " +
          (up ? "text-emerald-600" : "text-muted-foreground")
        }
      >
        {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        <span>{delta} vs last period</span>
      </div>
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

function RevenueChart({ data }: { data: { name: string; value: number }[] }) {
  const colors = ["#0F172A", "#334155", "#64748B", "#94A3B8"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
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

function Alert({
  tone,
  icon: Icon,
  title,
  body,
}: {
  tone: "warning" | "info";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  const toneClasses =
    tone === "warning"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-sky-50 text-sky-700 border-sky-200";
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
      <div className={"h-8 w-8 rounded-md grid place-items-center border " + toneClasses}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{body}</p>
      </div>
    </div>
  );
}

function Recommendation({ body }: { body: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
      <div className="h-8 w-8 rounded-md grid place-items-center bg-emerald-50 text-emerald-700 border border-emerald-200">
        <Lightbulb className="h-4 w-4" />
      </div>
      <p className="text-sm text-foreground/90 flex-1">{body}</p>
    </div>
  );
}
