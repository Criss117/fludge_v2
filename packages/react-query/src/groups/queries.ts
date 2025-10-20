import { GroupsActions } from "@fludge/api-utils/actions/groups.actions";
import { queryOptions } from "@tanstack/react-query";

export class GroupsQueriesOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  findOne(businessSlug: string, groupSlug: string) {
    return queryOptions({
      queryKey: ["businesses", businessSlug, "groups", groupSlug],
      queryFn: async () => {
        const res = await this.groupsActions.findOne(businessSlug, groupSlug);

        return res;
      },
    });
  }
}
