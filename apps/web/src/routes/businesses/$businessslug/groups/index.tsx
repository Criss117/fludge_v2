import { usePermissions } from "@fludge/react-auth/permissions.provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/$businessslug/groups/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userHasPermissions } = usePermissions();

  const userCanReadGroups = userHasPermissions("businesses:read");

  if (!userCanReadGroups) {
    return <div>No tienes permisos para ver los grupos</div>;
  }

  return <div>grupos</div>;
}
