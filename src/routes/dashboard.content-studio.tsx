import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/dashboard/content-studio")({
  component: () => (
    <Placeholder
      title="Content Studio"
      description="Draft posts, captions and creatives with AI. Coming soon."
    />
  ),
});
