import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  GroupsScreen,
  WithOutPermissions,
} from "@/core/groups/presentation/screens/groups.screen";
import { usePermissions } from "@fludge/react-auth/permissions.provider";

export const Route = createFileRoute("/businesses/$businessslug/groups/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const user = context.user;

    if (!user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
});

function RouteComponent() {
  const { businessslug } = Route.useParams();
  const { userHasPermissions } = usePermissions();

  const userCanReadGroups = userHasPermissions("businesses:read");

  if (!userCanReadGroups) {
    return <WithOutPermissions businessSlug={businessslug} />;
  }

  return <GroupsScreen businessSlug={businessslug} />;
}
