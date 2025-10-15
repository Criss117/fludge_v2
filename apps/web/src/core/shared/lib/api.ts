import { AuthActions } from "@fludge/api-utils/actions/auth.actions";
import { BusinessActions } from "@fludge/api-utils/actions/businesses.actions";
import { API } from "@fludge/api-utils/api";
import { BusinessesQueriesOptions } from "@fludge/react-query/businesses/queries";

export const api = new API("http://localhost:8080/api");

export const authActions = new AuthActions(api);
export const businessesActions = new BusinessActions(api);

export const businessesQueryOptions = new BusinessesQueriesOptions(
  businessesActions
);
