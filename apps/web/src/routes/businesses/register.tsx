import { RegisterBusinessScreen } from "@/core/businesses/presentation/screens/register-business.screen";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/register")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }

    if (!context.user.isRoot && context.user.isEmployeeIn) {
      throw redirect({
        to: "/businesses/$businessslug",
        params: {
          businessslug: context.user.isEmployeeIn.slug,
        },
      });
    }
  },
});

function RouteComponent() {
  return <RegisterBusinessScreen />;
}
