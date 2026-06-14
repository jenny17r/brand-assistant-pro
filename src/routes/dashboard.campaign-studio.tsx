import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/dashboard/campaign-studio")({
  component: () => (
    <Placeholder
      title="Campaign Studio"
      description="Plan, launch and measure campaigns. Coming soon."
    />
  ),
});
