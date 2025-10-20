import {
  CreateEmployeeScreen,
  WithOutPermissions,
} from "@/core/employees/presentation/screens/create-employee.screen";
import { usePermissions } from "@fludge/react-auth/permissions.provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/businesses/$businessslug/employees/create"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { businessslug } = Route.useParams();
  const { userHasPermissions } = usePermissions();

  const canCreateEmployee = userHasPermissions("users:create");
  if (!canCreateEmployee) {
    return <WithOutPermissions businessSlug={businessslug} />;
  }

  return <CreateEmployeeScreen businessSlug={businessslug} />;
}
