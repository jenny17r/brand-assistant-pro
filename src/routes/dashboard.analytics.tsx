import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/dashboard/analytics")({
  component: () => (
    <Placeholder
      title="Analytics"
      description="Deep-dive reports and cohorts. Coming soon."
    />
  ),
});
