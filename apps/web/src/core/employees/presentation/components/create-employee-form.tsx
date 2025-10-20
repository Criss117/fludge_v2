import { createContext, use, useEffect, useId } from "react";
import { Button } from "@/core/shared/components/ui/button";
import { useMutateEmployees } from "@/core/employees/application/hooks/use.mutate-employees";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import {
  createEmployeeSchema,
  type CreateEmployeeSchema,
} from "@fludge/entities/schemas/employees/create-employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { GroupSummary } from "@fludge/entities/group.entity";
import { FormInput } from "@/core/shared/components/form/form-input";
import { GroupsTable } from "@/core/groups/presentation/components/groups-table";

interface Context {
  form: ReturnType<typeof useForm<CreateEmployeeSchema>>;
  formId: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface RootProps {
  children: React.ReactNode;
  businessSlug: string;
}

interface SelectGroupsProps {
  groups: GroupSummary[];
  businessSlug: string;
}

interface ContentProps {
  children: React.ReactNode;
}

const CreateEmployeeFormContext = createContext<Context | null>(null);

function useCreateEmployee() {
  const context = use(CreateEmployeeFormContext);

  if (!context) {
    throw new Error(
      "useCreateEmployee must be used within a CreateEmployeeFormProvider"
    );
  }

  return context;
}

function Root({ children, businessSlug }: RootProps) {
  const form = useForm<CreateEmployeeSchema>({
    defaultValues: {
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      groupIds: [],
    },
    resolver: zodResolver(createEmployeeSchema),
  });
  const router = useRouter();
  const formId = `create-employee-form-${useId()}`;
  const { create } = useMutateEmployees();

  const onSubmit = form.handleSubmit((data) => {
    create.mutate(
      {
        businessSlug,
        data,
      },
      {
        onSuccess: () => {
          router.navigate({
            to: "/businesses/$businessslug/employees",
            params: {
              businessslug: businessSlug,
            },
          });
        },
        onError: (err) => {
          form.setError("root", {
            message: err.message,
          });
        },
      }
    );
  });

  return (
    <CreateEmployeeFormContext.Provider
      value={{
        form,
        formId,
        onSubmit,
      }}
    >
      {children}
    </CreateEmployeeFormContext.Provider>
  );
}

function Submit() {
  const { formId } = useCreateEmployee();

  return (
    <Button type="submit" form={formId}>
      Crear Empleado
    </Button>
  );
}

function Content({ children }: ContentProps) {
  const { formId, onSubmit } = useCreateEmployee();

  return (
    <form id={formId} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function Password() {
  const { form } = useCreateEmployee();

  return (
    <FormInput
      label="Contraseña"
      name="password"
      type="password"
      className="flex-1"
      placeholder="**********"
      control={form.control}
      required
    />
  );
}

function Username() {
  const { form } = useCreateEmployee();

  return (
    <FormInput
      control={form.control}
      name="username"
      label="Nombre de usuario"
      placeholder="Nombre de usuario"
      type="text"
      required
    />
  );
}

function FirstName() {
  const { form } = useCreateEmployee();

  return (
    <FormInput
      control={form.control}
      name="firstName"
      label="Nombre"
      placeholder="Nombre"
      required
    />
  );
}

function LastName() {
  const { form } = useCreateEmployee();

  return (
    <FormInput
      control={form.control}
      name="lastName"
      label="Apellido"
      placeholder="Apellido"
      required
    />
  );
}

function SelectGroups({ groups, businessSlug }: SelectGroupsProps) {
  return (
    <GroupsTable.Root data={groups} businessSlug={businessSlug}>
      <SelectGroupsTable />
    </GroupsTable.Root>
  );
}

function SelectGroupsTable() {
  const { table } = GroupsTable.useGroupsTable();
  const { form } = useCreateEmployee();

  const selectedRows = table.getSelectedRowModel().rows;

  useEffect(() => {
    form.setValue(
      "groupIds",
      selectedRows.flatMap((row) => row.original.id)
    );
  }, [selectedRows.length]);

  return (
    <GroupsTable.Content>
      <GroupsTable.Header />
      <GroupsTable.Body />
    </GroupsTable.Content>
  );
}

export const CreateEmployeeForm = {
  useCreateEmployee,
  Root,
  Submit,
  Password,
  Username,
  FirstName,
  LastName,
  Content,
  SelectGroups,
};
