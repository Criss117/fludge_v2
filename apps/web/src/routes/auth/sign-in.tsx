import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInRootUserScreen } from "@/core/auth/presentation/screens/sign-in-root-user.screen";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) return;

    if (!context.user.isRoot && context.user.isEmployeeIn) {
      throw redirect({
        to: "/businesses/$businessslug",
        params: {
          businessslug: context.user.isEmployeeIn.slug,
        },
      });
    }

    if (context.user.isRoot) {
      if (!context.user.isRootIn || context.user.isRootIn.length === 0) {
        throw redirect({
          to: "/businesses/register",
        });
      }

      if (context.user.isRootIn.length === 1) {
        throw redirect({
          to: "/businesses/$businessslug",
          params: {
            businessslug: context.user.isRootIn[0].slug,
          },
        });
      }

      if (context.user.isRootIn.length > 1) {
        throw redirect({
          to: "/businesses/select-business",
        });
      }
    }
  },
});

function RouteComponent() {
  return <SignInRootUserScreen />;
}
