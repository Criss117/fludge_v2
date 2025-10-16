import { createContext, use, useEffect, useId } from "react";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGroupDto,
  type CreateGroupDto,
} from "@fludge/entities/schemas/groups/create-group.dto";
import { FormInput } from "@/core/shared/components/form/form-input";
import { Button } from "@/core/shared/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { businessesQueryOptions } from "@/core/shared/lib/api";
import { FormTextArea } from "@/core/shared/components/form/form-text-area";
import { PermissionsTable } from "./permissions-table";
import { useMutateGroups } from "../../application/hooks/use.mutate-groups";

interface Context {
  form: ReturnType<typeof useForm<CreateGroupDto>>;
  formId: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface RootProps {
  children: React.ReactNode;
  businessSlug: string;
}

interface NameProps {
  className?: string;
}

interface DescriptionProps {
  className?: string;
}

const CreateGroupContext = createContext<Context | null>(null);

function useCreateGroup() {
  const context = use(CreateGroupContext);

  if (!context) {
    throw new Error(
      "useCreateGroupForm must be used within a CreateGroupFormProvider"
    );
  }

  return context;
}

function Root({ children, businessSlug }: RootProps) {
  const router = useRouter();
  const form = useForm<CreateGroupDto>({
    resolver: zodResolver(createGroupDto),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });
  const formId = `create-group-form-${useId()}`;
  const { create } = useMutateGroups();

  const onSubmit = form.handleSubmit((data) => {
    console.log({ data });
    create.mutate(
      {
        businessSlug,
        data,
      },
      {
        onSuccess: () => {
          router.navigate({
            to: "/businesses/$businessslug/groups",
            params: { businessslug: businessSlug },
          });
        },
      }
    );
  });

  return (
    <CreateGroupContext.Provider
      value={{
        form,
        formId,
        onSubmit,
      }}
    >
      {children}
    </CreateGroupContext.Provider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { formId, onSubmit } = useCreateGroup();

  return (
    <form id={formId} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function Name({ className }: NameProps) {
  const { form } = useCreateGroup();

  return (
    <FormInput
      control={form.control}
      name="name"
      label="Nombre del grupo"
      placeholder="Nombre del grupo"
      className={className}
    />
  );
}

function Description({ className }: DescriptionProps) {
  const { form } = useCreateGroup();
  return (
    <FormTextArea
      control={form.control}
      name="description"
      label="Descripción del grupo"
      placeholder="Descripción del grupo"
      textAreaClassName={className}
    />
  );
}

function Submit() {
  const { formId } = useCreateGroup();

  return (
    <Button type="submit" form={formId}>
      Crear nuevo grupo
    </Button>
  );
}

function SelectPermissions() {
  const {
    data: { data: permissions },
  } = useSuspenseQuery(businessesQueryOptions.findAllPermissions());

  if (!permissions) return null;

  return (
    <PermissionsTable.Root data={permissions}>
      <SelectPermissionsTable />
    </PermissionsTable.Root>
  );
}

function SelectPermissionsTable() {
  const { table } = PermissionsTable.usePermissionsTable();
  const { form } = useCreateGroup();

  const selectedRows = table.getSelectedRowModel().rows;

  useEffect(() => {
    form.setValue(
      "permissions",
      selectedRows.flatMap((row) => row.original)
    );
  }, [selectedRows.length]);

  return (
    <PermissionsTable.Content>
      <PermissionsTable.Header />
      <PermissionsTable.Body />
    </PermissionsTable.Content>
  );
}

export const CreateGroupForm = {
  useCreateGroup,
  Root,
  Name,
  Submit,
  SelectPermissions,
  Description,
  Content,
};
