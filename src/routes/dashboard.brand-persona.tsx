import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/dashboard/brand-persona")({
  component: () => (
    <Placeholder
      title="Brand Persona"
      description="Refine your tone, palette and brand voice. Coming soon."
    />
  ),
});
