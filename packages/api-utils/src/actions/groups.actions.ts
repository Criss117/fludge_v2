import { API } from "../api";
import { API_ENDPOINTS } from "../api-endpoints";
import { safeAction } from "../safe-action";
import type { CommonResponse } from "../common-response";
import type { CreateGroupDto } from "@fludge/entities/schemas/groups/create-group.dto";
import type { GroupDetail } from "@fludge/entities/group.entity";
import type { UpdateGroupSchema } from "@fludge/entities/schemas/groups/update-group.schema";
import type { AssignEmployeesToGroupSchema } from "@fludge/entities/schemas/groups/assign-employees-to-group.schema";

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

  public async findOne(
    businessSlug: string,
    groupSlug: string
  ): Promise<CommonResponse<GroupDetail | null>> {
    const res = await safeAction(
      () =>
        this.api.get<GroupDetail>(
          API_ENDPOINTS.BUSINESSES.GROUPS.FIND_ONE(businessSlug, groupSlug)
        ),
      "Error al obtener los grupos"
    );

    return res;
  }

  public async update(
    businessSlug: string,
    groupSlug: string,
    data: UpdateGroupSchema
  ): Promise<CommonResponse<null>> {
    const res = await safeAction(
      () =>
        this.api.patch<null, UpdateGroupSchema>(
          API_ENDPOINTS.BUSINESSES.GROUPS.UPDATE(businessSlug, groupSlug),
          data
        ),
      "Algo salió mal en la actualización del grupo"
    );

    return res;
  }

  public async assignEmployees(
    businessSlug: string,
    groupSlug: string,
    data: AssignEmployeesToGroupSchema
  ): Promise<CommonResponse<null>> {
    const res = await safeAction(
      () =>
        this.api.post<null, AssignEmployeesToGroupSchema>(
          API_ENDPOINTS.BUSINESSES.GROUPS.ASSIGN_EMPLOYEES(
            businessSlug,
            groupSlug
          ),
          data
        ),
      "Algo salió mal en la asignación de empleados a grupo"
    );

    return res;
  }

  public async removeEmployees(
    businessSlug: string,
    groupSlug: string,
    data: AssignEmployeesToGroupSchema
  ): Promise<CommonResponse<null>> {
    const res = await safeAction(
      () =>
        this.api.delete<null, AssignEmployeesToGroupSchema>(
          API_ENDPOINTS.BUSINESSES.GROUPS.REMOVE_EMPLOYEES(
            businessSlug,
            groupSlug
          ),
          data
        ),
      "Algo salió mal en la eliminación de empleados de grupo"
    );

    return res;
  }
}
