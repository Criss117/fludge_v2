import { mutationOptions } from "@tanstack/react-query";
import type { GroupsActions } from "@fludge/api-utils/actions/groups.actions";
import type { CreateGroupDto } from "@fludge/entities/schemas/groups/create-group.dto";
import type { UpdateGroupSchema } from "@fludge/entities/schemas/groups/update-group.schema";
import type { AssignEmployeesToGroupSchema } from "@fludge/entities/schemas/groups/assign-employees-to-group.schema";

interface CreateGroup {
  businessSlug: string;
  data: CreateGroupDto;
}

interface UpdateGroup {
  businessSlug: string;
  groupSlug: string;
  data: UpdateGroupSchema;
}

interface AssignEmployeesToGroup {
  businessSlug: string;
  groupSlug: string;
  data: AssignEmployeesToGroupSchema;
}

export class GroupMutationsOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  create() {
    return mutationOptions({
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
  }

  update() {
    return mutationOptions({
      mutationFn: async ({ businessSlug, data, groupSlug }: UpdateGroup) => {
        const res = await this.groupsActions.update(
          businessSlug,
          groupSlug,
          data
        );

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  assignEmployees() {
    return mutationOptions({
      mutationFn: async ({
        businessSlug,
        groupSlug,
        data,
      }: AssignEmployeesToGroup) => {
        const res = await this.groupsActions.assignEmployees(
          businessSlug,
          groupSlug,
          data
        );

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  removeEmployees() {
    return mutationOptions({
      mutationFn: async ({
        businessSlug,
        groupSlug,
        data,
      }: AssignEmployeesToGroup) => {
        const res = await this.groupsActions.removeEmployees(
          businessSlug,
          groupSlug,
          data
        );

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }
}
