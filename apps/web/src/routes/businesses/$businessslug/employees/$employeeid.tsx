import {
  EmployeeScreen,
  WithOutPermissions,
} from "@/core/employees/presentation/screens/employee.screen";
import { employeesQueryOptions } from "@/core/shared/lib/api";
import { usePermissions } from "@fludge/react-auth/permissions.provider";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/businesses/$businessslug/employees/$employeeid"
)({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = context.user;

    if (!user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
  loader: async ({ context, params }) => {
    const res = await context.queryClient?.ensureQueryData(
      employeesQueryOptions.findOne(params.businessslug, params.employeeid)
    );

    if (!res || !res.data) {
      throw redirect({
        to: "/businesses/$businessslug/employees",
        params: {
          businessslug: params.businessslug,
        },
      });
    }
  },
});

function RouteComponent() {
  const { employeeid, businessslug } = Route.useParams();
  const { userHasPermissions } = usePermissions();

  const userCanReadEmployees = userHasPermissions("users:read");

  if (!userCanReadEmployees) {
    return (
      <WithOutPermissions businessSlug={businessslug} employeeId={employeeid} />
    );
  }

  return <EmployeeScreen businessSlug={businessslug} employeeId={employeeid} />;
}
