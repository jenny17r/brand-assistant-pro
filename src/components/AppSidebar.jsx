import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Sparkles, Palette, PenSquare, Megaphone, BarChart3, Settings, LogOut, } from "lucide-react";
import { cn } from "@/lib/utils";
const items = [
    { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { title: "Brand Persona", to: "/dashboard/brand-persona", icon: Palette },
    { title: "Content Studio", to: "/dashboard/content-studio", icon: PenSquare },
    { title: "Campaign Studio", to: "/dashboard/campaign-studio", icon: Megaphone },
    { title: "Business Analytics", to: "/dashboard/analytics", icon: BarChart3 },
    { title: "Settings", to: "/dashboard/settings", icon: Settings },
];
export function AppSidebar() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    return (<aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center">
          <Sparkles className="h-4 w-4"/>
        </div>
        <span className="font-semibold tracking-tight">Brand Assistant</span>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {items.map((item) => {
            const active = pathname === item.to;
            return (<Link key={item.to} to={item.to} className={cn("flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors", active
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}>
              <item.icon className="h-4 w-4"/>
              {item.title}
            </Link>);
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-md">
          <div className="h-8 w-8 rounded-full bg-muted grid place-items-center text-xs font-semibold">
            JC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Jane Cooper</p>
            <p className="text-xs text-muted-foreground truncate">jane@acme.co</p>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-foreground" aria-label="Sign out">
            <LogOut className="h-4 w-4"/>
          </Link>
        </div>
      </div>
    </aside>);
}
