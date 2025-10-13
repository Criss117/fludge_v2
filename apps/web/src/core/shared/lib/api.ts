import { AuthActions } from "@fludge/api-utils/actions/auth.actions";
import { API } from "@fludge/api-utils/api";

export const api = new API("http://localhost:8080/api");

export const authActions = new AuthActions(api);
