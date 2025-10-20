import { EmployeesActions } from "@fludge/api-utils/actions/employees.actions";
import { CreateEmployeeSchema } from "@fludge/entities/schemas/employees/create-employee.schema";
import { mutationOptions } from "@tanstack/react-query";

type CreateEmployee = {
  businessSlug: string;
  data: CreateEmployeeSchema;
};

type UpdateEmployee = {
  businessSlug: string;
  employeeId: string;
  data: Partial<CreateEmployeeSchema>;
};

type AssignGroups = {
  businessSlug: string;
  employeeId: string;
  data: { groupIds: string[] };
};

export class EmployeesMutationsOptions {
  constructor(private readonly employeesActions: EmployeesActions) {}

  create() {
    return mutationOptions({
      mutationFn: async ({ businessSlug, data }: CreateEmployee) => {
        const res = await this.employeesActions.create(businessSlug, data);

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  update() {
    return mutationOptions({
      mutationFn: async ({
        businessSlug,
        data,
        employeeId,
      }: UpdateEmployee) => {
        const res = await this.employeesActions.update(
          businessSlug,
          employeeId,
          data
        );

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  assignGroups() {
    return mutationOptions({
      mutationFn: async ({ businessSlug, data, employeeId }: AssignGroups) => {
        const res = await this.employeesActions.assingGroups(
          businessSlug,
          employeeId,
          data
        );

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  removeGroups() {
    return mutationOptions({
      mutationFn: async ({ businessSlug, data, employeeId }: AssignGroups) => {
        const res = await this.employeesActions.removeGroups(
          businessSlug,
          employeeId,
          data
        );

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }
}
