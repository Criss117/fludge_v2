import { SelectBusinessScreen } from "@/core/businesses/presentation/screens/select-business.screen";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/select-business")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }

    if (context.user.isRoot && context.user.isRootIn) {
      if (context.user.isRootIn?.length === 0) {
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
    }

    if (context.user.isEmployeeIn) {
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
  return <SelectBusinessScreen />;
}
