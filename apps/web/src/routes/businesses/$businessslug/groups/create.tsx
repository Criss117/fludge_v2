import { createFileRoute } from "@tanstack/react-router";
import {
  CreateGroupScreen,
  WithOutPermissions,
} from "@/core/groups/presentation/screens/create-group.screen";
import { usePermissions } from "@fludge/react-auth/permissions.provider";

export const Route = createFileRoute("/businesses/$businessslug/groups/create")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { businessslug } = Route.useParams();
  const { userHasPermissions } = usePermissions();

  if (!businessslug) return null;

  const userCanCreateGroups = userHasPermissions(
    "groups:create",
    "groups:read"
  );

  if (!userCanCreateGroups) {
    return <WithOutPermissions businessSlug={businessslug} />;
  }

  return <CreateGroupScreen businessSlug={businessslug} />;
}
