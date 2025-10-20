import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({
      to: "/auth/sign-in",
    });
  },
});

function RouteComponent() {
  return null;
}
