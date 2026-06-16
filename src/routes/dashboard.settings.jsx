import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/dashboard/settings")({
    component: () => (<Placeholder title="Settings" description="Manage your workspace and team. Coming soon."/>),
});
