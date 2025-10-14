import { SignInRootUserScreen } from "@/core/auth/presentation/screens/sign-in-root-user.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInRootUserScreen />;
}
