import { API } from "../api";
import { API_ENDPOINTS } from "../api-endpoints";
import type { CreateBusinessSchema } from "@fludge/entities/schemas/businesses/create-business.schema";
import type {
  BusinessDetail,
  BusinessSummary,
} from "@fludge/entities/business.entity";
import { safeAction } from "@fludge/api-utils/safe-action";
import type { CommonResponse } from "../common-response";

export class BusinessActions {
  constructor(private readonly api: API) {}

  public async register(
    data: CreateBusinessSchema
  ): Promise<CommonResponse<BusinessSummary>> {
    const res = await safeAction(
      () =>
        this.api.post<BusinessSummary, CreateBusinessSchema>(
          API_ENDPOINTS.BUSINESSES.CREATE,
          data
        ),
      "Error al registrar una empresa"
    );

    return res;
  }

  public async findOneBusiness(
    businessSlug: string
  ): Promise<CommonResponse<BusinessDetail>> {
    const res = await safeAction(
      () =>
        this.api.get<BusinessDetail>(
          API_ENDPOINTS.BUSINESSES.FIND_ONE(businessSlug)
        ),
      "Error al buscar una empresa"
    );

    return res;
  }
}
