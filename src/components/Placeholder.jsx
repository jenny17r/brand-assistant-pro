import { Construction } from "lucide-react";
export function Placeholder({ title, description }) {
    return (<div className="p-6 lg:p-10">
      <div className="rounded-2xl border border-border bg-card shadow-sm p-16 text-center max-w-2xl mx-auto">
        <div className="h-12 w-12 mx-auto rounded-full bg-muted grid place-items-center mb-4">
          <Construction className="h-5 w-5 text-muted-foreground"/>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
    </div>);
}
