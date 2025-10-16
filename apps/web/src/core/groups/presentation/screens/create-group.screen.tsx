import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/shared/components/ui/card";
import {
  PageHeader,
  PageHeaderCreateGroup,
  PageHeaderGroups,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { businessesQueryOptions } from "@/core/shared/lib/api";
import { CreateGroupForm } from "../components/create-group-form";

interface Props {
  businessSlug: string;
}

export function WithOutPermissions({ businessSlug }: Props) {
  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderGroups businessSlug={businessSlug} />
        <PageHeaderCreateGroup isPage />
      </PageHeader>
      <UserHasNoPermissionAlert />
    </section>
  );
}

function Form() {
  const { form } = CreateGroupForm.useCreateGroup();
  const {
    data: { data: permissions },
  } = useSuspenseQuery(businessesQueryOptions.findAllPermissions());

  const permissionsSelected = form.watch("permissions");
  const premissionsErrors = form.formState.errors.permissions;

  return (
    <div className="mx-4 space-y-5">
      <Card>
        <CardContent>
          <fieldset className="flex gap-x-4">
            <div className="flex-1">
              <CreateGroupForm.Name />
            </div>
            <div className="flex-1">
              <CreateGroupForm.Description className="resize-none" />
            </div>
          </fieldset>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Elije los permisos del grupo (
            {permissionsSelected.length > 0 && `${permissionsSelected.length}/`}
            {permissions?.length})
          </CardTitle>
          <CardDescription>
            Todos los usuarios de este grupo tendrán los permisos que se han
            seleccionado.
          </CardDescription>
          {premissionsErrors && (
            <CardDescription className="text-destructive">
              {premissionsErrors.message}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <CreateGroupForm.SelectPermissions />
        </CardContent>
      </Card>
    </div>
  );
}

export function CreateGroupScreen({ businessSlug }: Props) {
  return (
    <section className="mx-2 space-y-5 pb-5">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderGroups businessSlug={businessSlug} />
        <PageHeaderCreateGroup isPage />
      </PageHeader>
      <header className="mx-4">
        <h2 className="text-2xl font-semibold">Crear Grupo</h2>
        <p className="text-muted-foreground text-sm">
          Los grupos permiten organizar los permisos de los empleados.
        </p>
      </header>
      <CreateGroupForm.Root businessSlug={businessSlug}>
        <CreateGroupForm.Content>
          <Form />
          <footer className="mt-5 mx-4 flex justify-end">
            <CreateGroupForm.Submit />
          </footer>
        </CreateGroupForm.Content>
      </CreateGroupForm.Root>
    </section>
  );
}
