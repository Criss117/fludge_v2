import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/shared/components/ui/tabs";
import { EmployeePermissionsTable } from "../components/employee-data-tables/permissions";
import { EmployeeGroupsTable } from "../components/employee-data-tables/groups";
import type { EmployeeDetail } from "@fludge/entities/employee.entity";

interface Props {
  employee: EmployeeDetail;
  businessSlug: string;
}

export function EmployeeDataTableSection({ employee, businessSlug }: Props) {
  const permissionsList = Array.from(
    new Set(employee.groups.flatMap((g) => g.permissions))
  );

  return (
    <section className="mx-2">
      <Tabs defaultValue="groups">
        <TabsList className="min-w-1/4 max-w-1/2">
          <TabsTrigger value="groups" className="flex-1">
            Grupos ({employee.groups.length})
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex-1">
            Permisos ({permissionsList.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="groups">
          <EmployeeGroupsTable
            employeeId={employee.id}
            groups={employee.groups}
            businessSlug={businessSlug}
          />
        </TabsContent>
        <TabsContent value="permissions">
          <EmployeePermissionsTable permissions={permissionsList} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
