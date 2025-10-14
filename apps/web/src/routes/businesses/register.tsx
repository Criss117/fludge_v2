import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterBusinessScreen } from "@/core/businesses/presentation/screens/register-business.screen";

export const Route = createFileRoute("/businesses/register")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
});

function RouteComponent() {
  return <RegisterBusinessScreen />;
}
