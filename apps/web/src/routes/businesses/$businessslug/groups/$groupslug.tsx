import { createFileRoute, redirect } from "@tanstack/react-router";
import { GroupScreen } from "@/core/groups/presentation/screens/group.screen";
import { groupsQueriesOptions } from "@/core/shared/lib/api";

export const Route = createFileRoute(
  "/businesses/$businessslug/groups/$groupslug"
)({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    if (!context.queryClient) throw new Error("No query client");

    const group = await context.queryClient.ensureQueryData(
      groupsQueriesOptions.findOne(params.businessslug, params.groupslug)
    );

    if (group.error || !group.data) {
      throw redirect({
        to: "/businesses/$businessslug/groups",
        params: {
          businessslug: params.businessslug,
        },
      });
    }

    return { group: group.data };
  },
  pendingComponent: () => <div>Loading groups...</div>,
});

function RouteComponent() {
  const { group } = Route.useLoaderData();

  return <GroupScreen group={group} />;
}
