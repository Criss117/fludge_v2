import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../integrations/router";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
