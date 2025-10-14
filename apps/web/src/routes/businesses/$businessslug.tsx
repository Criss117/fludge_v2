import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/$businessslug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello</div>;
}
