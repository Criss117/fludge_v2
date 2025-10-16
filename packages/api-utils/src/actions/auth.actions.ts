import type { CreateRootUserSchema } from "@fludge/entities/schemas/create-root-user.schema";
import type { SignInRootUserSchema } from "@fludge/entities/schemas/sign-in-root-user.schema";
import type { Permission } from "@fludge/entities/permissions.entity";
import type { UserDetail } from "@fludge/entities/user.entity";
import { API } from "../api";
import { API_ENDPOINTS } from "../api-endpoints";
import { safeAction } from "../safe-action";
import { CommonResponse } from "../common-response";

export class AuthActions {
  constructor(private readonly api: API) {}

  public async signUp(
    data: CreateRootUserSchema
  ): Promise<CommonResponse<null>> {
    const res = await safeAction(
      () =>
        this.api.post<null, CreateRootUserSchema>(
          API_ENDPOINTS.AUTH.SIGN_UP,
          data
        ),
      "Error al crear usuario"
    );

    return res;
  }

  public async signIn(data: SignInRootUserSchema): Promise<
    CommonResponse<{
      jwt: string;
      user: UserDetail;
    }>
  > {
    const res = await safeAction(() =>
      this.api.post<
        {
          jwt: string;
          user: UserDetail;
        },
        SignInRootUserSchema
      >(API_ENDPOINTS.AUTH.SIGN_IN_ROOT, data)
    );

    return res;
  }

  public async getProfile(token?: string): Promise<CommonResponse<UserDetail>> {
    if (token) {
      await this.api.applyAuthInterceptor(token);
    }

    const res = await safeAction(
      () => this.api.get<UserDetail>(API_ENDPOINTS.AUTH.GET_PROFILE),
      "Error al obtener perfil"
    );

    return res;
  }
}
