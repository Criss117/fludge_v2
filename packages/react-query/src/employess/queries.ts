import { EmployeesActions } from "@fludge/api-utils/actions/employees.actions";
import { queryOptions } from "@tanstack/react-query";

export class EmployeesQueriesOptions {
  constructor(private readonly employeesActions: EmployeesActions) {}

  findOne(businessSlug: string, employeeId: string) {
    return queryOptions({
      queryKey: ["businesses", businessSlug, "employees", employeeId],
      queryFn: async () => {
        const res = await this.employeesActions.findOne(
          businessSlug,
          employeeId
        );

        return res;
      },
    });
  }
}
