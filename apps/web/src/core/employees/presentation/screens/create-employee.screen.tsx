import { CreateEmployeeForm } from "../components/create-employee-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/shared/components/ui/card";
import {
  PageHeader,
  PageHeaderCreateEmployee,
  PageHeaderEmployees,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import type { GroupSummary } from "@fludge/entities/group.entity";
import { useSuspenseQuery } from "@tanstack/react-query";
import { businessesQueryOptions } from "@/core/shared/lib/api";

interface Props {
  businessSlug: string;
}

interface GroupsFormProps {
  businessSlug: string;
  groups: GroupSummary[];
}

function GroupsForm({ businessSlug, groups }: GroupsFormProps) {
  const { form } = CreateEmployeeForm.useCreateEmployee();

  const groupsSelected = form.watch("groupIds");
  const groupsErrors = form.formState.errors.groupIds;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Listado de Grupos (
          {groupsSelected.length > 0 && `${groupsSelected.length}/`}
          {groups.length}){" "}
          <span className="text-muted-foreground text-sm">Opcional</span>
        </CardTitle>
        <CardDescription>
          Los empleados obtendrán los permisos de los grupos que seleccione.
        </CardDescription>
        {groupsErrors && (
          <CardDescription className="text-destructive">
            {groupsErrors.message}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <CreateEmployeeForm.SelectGroups
          businessSlug={businessSlug}
          groups={groups}
        />
      </CardContent>
    </Card>
  );
}

export function CreateEmployeeScreen({ businessSlug }: Props) {
  const {
    data: { data: business },
  } = useSuspenseQuery(businessesQueryOptions.findOneBusiness(businessSlug));

  if (!business) return null;

  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderEmployees businessSlug={businessSlug} />
        <PageHeaderCreateEmployee isPage />
      </PageHeader>
      <header className="mx-4">
        <h2 className="text-2xl font-semibold">Crear un Empleado</h2>
        <p className="text-muted-foreground text-sm">
          Especifica los datos del nuevo empleado.
        </p>
      </header>
      <CreateEmployeeForm.Root businessSlug={businessSlug}>
        <div className="mx-4 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Información del Empleado</CardTitle>
              <CardDescription>
                Especifica los datos del nuevo empleado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateEmployeeForm.Content>
                <fieldset className="grid grid-cols-2 gap-4">
                  <CreateEmployeeForm.FirstName />
                  <CreateEmployeeForm.LastName />
                  <CreateEmployeeForm.Username />
                  <CreateEmployeeForm.Password />
                </fieldset>
              </CreateEmployeeForm.Content>
            </CardContent>
          </Card>
          <GroupsForm businessSlug={businessSlug} groups={business.groups} />
        </div>
        <footer className="mt-5 mx-4 flex justify-end">
          <CreateEmployeeForm.Submit />
        </footer>
      </CreateEmployeeForm.Root>
    </section>
  );
}

export function WithOutPermissions({ businessSlug }: Props) {
  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderEmployees businessSlug={businessSlug} />
        <PageHeaderCreateEmployee isPage />
      </PageHeader>
      <UserHasNoPermissionAlert />
    </section>
  );
}
