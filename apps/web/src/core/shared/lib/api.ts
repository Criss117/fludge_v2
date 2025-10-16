import { AuthActions } from "@fludge/api-utils/actions/auth.actions";
import { BusinessActions } from "@fludge/api-utils/actions/businesses.actions";
import { API } from "@fludge/api-utils/api";
import { BusinessesQueriesOptions } from "@fludge/react-query/businesses/queries";
import { GroupsActions } from "@fludge/api-utils/actions/groups.actions";
import { GroupMutationsOptions } from "@fludge/react-query/groups/mutations";

export const api = new API("http://localhost:8080/api");

export const authActions = new AuthActions(api);
export const businessesActions = new BusinessActions(api);

// businesses
export const businessesQueryOptions = new BusinessesQueriesOptions(
  businessesActions
);

// groups
export const groupsActions = new GroupsActions(api);

export const groupsMutationsOptions = new GroupMutationsOptions(groupsActions);
