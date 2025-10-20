import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/shared/components/ui/tabs";
import type { GroupDetail } from "@fludge/entities/group.entity";
import { EmployeesTable } from "../components/groups-data-tables/employee";
import { PermissionsTable } from "../components/groups-data-tables/permissions";

interface Props {
  group: GroupDetail;
  businessSlug: string;
}

export function GroupDataTablesSection({ group, businessSlug }: Props) {
  return (
    <section className="mx-2">
      <Tabs defaultValue="employees">
        <TabsList className="min-w-1/4 max-w-1/2">
          <TabsTrigger value="employees" className="flex-1">
            Empleados ({group.employees.length})
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex-1">
            Permisos ({group.permissions.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <EmployeesTable group={group} businessSlug={businessSlug} />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionsTable group={group} businessSlug={businessSlug} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
