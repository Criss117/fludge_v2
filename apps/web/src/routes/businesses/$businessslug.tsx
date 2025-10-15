import { BusinessSidebar } from "@/core/shared/components/business-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/core/shared/components/ui/sidebar";
import { businessesQueryOptions } from "@/core/shared/lib/api";
import { useAuth } from "@fludge/react-auth/auth.provider";
import { usePermissions } from "@fludge/react-auth/permissions.provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/$businessslug")({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    if (!context.queryClient) throw new Error("No query client");

    const businessResponse = await context.queryClient.ensureQueryData(
      businessesQueryOptions.findOneBusiness(params.businessslug)
    );

    if (businessResponse.error || !businessResponse.data) {
      throw redirect({
        to: "/",
      });
    }

    return { business: businessResponse.data };
  },
  pendingComponent: () => <div>Loading businesses...</div>,
});

function RouteComponent() {
  const { businessslug } = Route.useParams();
  const { initState } = usePermissions();
  const { user } = useAuth();
  const {
    data: { data: business },
  } = useSuspenseQuery(businessesQueryOptions.findOneBusiness(businessslug));

  if (!business || !user) return null;

  initState(user, business);

  return (
    <SidebarProvider>
      <BusinessSidebar currentBusiness={business} />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
