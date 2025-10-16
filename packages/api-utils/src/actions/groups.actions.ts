import { API } from "../api";
import { API_ENDPOINTS } from "../api-endpoints";
import { safeAction } from "../safe-action";
import type { CreateGroupDto } from "@fludge/entities/schemas/groups/create-group.dto";
import type { CommonResponse } from "../common-response";

export class GroupsActions {
  constructor(private readonly api: API) {}

  public async create(
    businessSlug: string,
    data: CreateGroupDto
  ): Promise<CommonResponse<null>> {
    const res = await safeAction(
      () =>
        this.api.post<null, CreateGroupDto>(
          API_ENDPOINTS.BUSINESSES.GROUPS.CREATE(businessSlug),
          data
        ),
      "Error al crear un grupo"
    );

    return res;
  }
}
