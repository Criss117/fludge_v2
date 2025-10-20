import { createFileRoute } from "@tanstack/react-router";
import {
  EmployeesScreen,
  WithOutPermissions,
} from "@/core/employees/presentation/screens/employees.screen";
import { usePermissions } from "@fludge/react-auth/permissions.provider";

export const Route = createFileRoute("/businesses/$businessslug/employees/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { businessslug } = Route.useParams();
  const { userHasPermissions } = usePermissions();

  const canReadEmployees = userHasPermissions("users:read");

  if (!canReadEmployees) {
    return <WithOutPermissions businessSlug={businessslug} />;
  }

  return <EmployeesScreen businessSlug={businessslug} />;
}
