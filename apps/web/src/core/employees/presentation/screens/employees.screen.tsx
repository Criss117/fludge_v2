import { useSuspenseQuery } from "@tanstack/react-query";
import { EmployeesSummaryTable } from "../components/employees-summary-table";
import { EmployeesHeaderSection } from "../sections/employees-header.section";
import {
  PageHeader,
  PageHeaderEmployees,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import { businessesQueryOptions } from "@/core/shared/lib/api";

interface Props {
  businessSlug: string;
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

export function EmployeesScreen({ businessSlug }: Props) {
  const {
    data: { data: business },
  } = useSuspenseQuery(businessesQueryOptions.findOneBusiness(businessSlug));

  if (!business) return null;

  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderEmployees businessSlug={businessSlug} isPage />
      </PageHeader>
      <EmployeesSummaryTable.Root
        data={business.employees}
        variant="detail"
        businessSlug={businessSlug}
      >
        <EmployeesSummaryTable.Content>
          <div className="mx-4">
            <EmployeesHeaderSection
              totalEmployees={business.employees.length}
              businessSlug={businessSlug}
            />
          </div>
          <div className="mx-4">
            <EmployeesSummaryTable.Content>
              <EmployeesSummaryTable.Header />
              <EmployeesSummaryTable.Body />
            </EmployeesSummaryTable.Content>
          </div>
        </EmployeesSummaryTable.Content>
      </EmployeesSummaryTable.Root>
    </section>
  );
}
