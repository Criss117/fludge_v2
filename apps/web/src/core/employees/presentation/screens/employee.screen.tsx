import { EmployeeSectionHeader } from "../sections/employee-header.section";
import { EmployeeDataTableSection } from "../sections/employee-data-table.section";
import {
  PageHeader,
  PageHeaderEmployee,
  PageHeaderEmployees,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { employeesQueryOptions } from "@/core/shared/lib/api";

interface Props {
  businessSlug: string;
  employeeId: string;
}

export function WithOutPermissions({ businessSlug }: Props) {
  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderEmployees businessSlug={businessSlug} isPage />
      </PageHeader>
      <UserHasNoPermissionAlert />
    </section>
  );
}

export function EmployeeScreen({ businessSlug, employeeId }: Props) {
  const {
    data: { data: employee },
  } = useSuspenseQuery(employeesQueryOptions.findOne(businessSlug, employeeId));

  if (!employee) return null;

  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderEmployees businessSlug={businessSlug} />
        <PageHeaderEmployee
          employeeId={employeeId}
          employeeName={`${employee.firstName} ${employee.lastName}`}
          businessSlug={businessSlug}
          isPage
        />
      </PageHeader>
      <div className="space-y-8">
        <EmployeeSectionHeader employee={employee} />
        <EmployeeDataTableSection
          employee={employee}
          businessSlug={businessSlug}
        />
      </div>
    </section>
  );
}
