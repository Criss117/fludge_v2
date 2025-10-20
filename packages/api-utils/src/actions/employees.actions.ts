import { API } from "../api";
import { API_ENDPOINTS } from "../api-endpoints";
import { safeAction } from "../safe-action";
import type { EmployeeDetail } from "@fludge/entities/employee.entity";
import type { CommonResponse } from "../common-response";
import type { CreateEmployeeSchema } from "@fludge/entities/schemas/employees/create-employee.schema";

export class EmployeesActions {
  constructor(private readonly api: API) {}

  public async create(
    businessSlug: string,
    data: CreateEmployeeSchema
  ): Promise<CommonResponse<null>> {
    const res = await safeAction<null>(
      () =>
        this.api.post(
          API_ENDPOINTS.BUSINESSES.EMPLOYEES.CREATE(businessSlug),
          data
        ),
      "Error al crear el empleado"
    );

    return res;
  }

  public async findOne(
    businessSlug: string,
    employeeId: string
  ): Promise<CommonResponse<EmployeeDetail | null>> {
    const res = await safeAction<EmployeeDetail | null>(
      () =>
        this.api.get(
          API_ENDPOINTS.BUSINESSES.EMPLOYEES.FIND_ONE(businessSlug, employeeId)
        ),
      "Error al obtener el empleado"
    );

    return res;
  }

  public async update(
    businessSlug: string,
    employeeId: string,
    data: Partial<CreateEmployeeSchema>
  ): Promise<CommonResponse<null>> {
    const res = await safeAction<null>(
      () =>
        this.api.patch(
          API_ENDPOINTS.BUSINESSES.EMPLOYEES.UPDATE(businessSlug, employeeId),
          data
        ),
      "Error al actualizar el empleado"
    );

    return res;
  }

  public async assingGroups(
    businessSlug: string,
    employeeId: string,
    data: { groupIds: string[] }
  ): Promise<CommonResponse<null>> {
    const res = await safeAction<null>(() =>
      this.api.patch(
        API_ENDPOINTS.BUSINESSES.EMPLOYEES.ASSIGN_GROUPS(
          businessSlug,
          employeeId
        ),
        data
      )
    );
    return res;
  }

  public async removeGroups(
    businessSlug: string,
    employeeId: string,
    data: { groupIds: string[] }
  ): Promise<CommonResponse<null>> {
    const res = await safeAction<null>(
      () =>
        this.api.patch(
          API_ENDPOINTS.BUSINESSES.EMPLOYEES.REMOVE_GROUPS(
            businessSlug,
            employeeId
          ),
          data
        ),
      "Algo salió mal al eliminar grupos del empleado"
    );

    return res;
  }
}
