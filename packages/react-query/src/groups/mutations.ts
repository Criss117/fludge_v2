import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import type { GroupsActions } from "@fludge/api-utils/actions/groups.actions";
import type { CreateGroupDto } from "@fludge/entities/schemas/groups/create-group.dto";

interface CreateGroup {
  businessSlug: string;
  data: CreateGroupDto;
}

export class GroupMutationsOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  createOptions() {
    const mutation = mutationOptions({
      mutationFn: async ({ businessSlug, data }: CreateGroup) => {
        const res = await this.groupsActions.create(businessSlug, data);

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });

    return mutation;
  }
}
