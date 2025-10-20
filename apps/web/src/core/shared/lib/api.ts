import { AuthActions } from "@fludge/api-utils/actions/auth.actions";
import { BusinessActions } from "@fludge/api-utils/actions/businesses.actions";
import { API } from "@fludge/api-utils/api";
import { BusinessesQueriesOptions } from "@fludge/react-query/businesses/queries";
import { GroupsActions } from "@fludge/api-utils/actions/groups.actions";
import { GroupMutationsOptions } from "@fludge/react-query/groups/mutations";
import { GroupsQueriesOptions } from "@fludge/react-query/groups/queries";
import { EmployeesActions } from "@fludge/api-utils/actions/employees.actions";
import { EmployeesMutationsOptions } from "@fludge/react-query/employess/mutations";
import { EmployeesQueriesOptions } from "@fludge/react-query/employess/queries";

export const api = new API("http://localhost:8080/api");

export const authActions = new AuthActions(api);

// businesses
export const businessesActions = new BusinessActions(api);

export const businessesQueryOptions = new BusinessesQueriesOptions(
  businessesActions
);

// groups
export const groupsActions = new GroupsActions(api);

export const groupsQueriesOptions = new GroupsQueriesOptions(groupsActions);
export const groupsMutationsOptions = new GroupMutationsOptions(groupsActions);

// employees
export const employeesActions = new EmployeesActions(api);

export const employeesQueryOptions = new EmployeesQueriesOptions(
  employeesActions
);
export const employeesMutationsOptions = new EmployeesMutationsOptions(
  employeesActions
);
