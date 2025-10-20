import { createContext, use, useId } from "react";
import { Button } from "@/core/shared/components/ui/button";
import { useMutateGroups } from "../../application/hooks/use.mutate-groups";
import type { GroupDetail } from "@fludge/entities/group.entity";
import { useForm } from "react-hook-form";
import {
  updateGroupSchema,
  type UpdateGroupSchema,
} from "@fludge/entities/schemas/groups/update-group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/core/shared/components/form/form-input";
import { FormTextArea } from "@/core/shared/components/form/form-text-area";

interface Context {
  form: ReturnType<typeof useForm<UpdateGroupSchema>>;
  formId: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface RootProps {
  children: React.ReactNode;
  group: GroupDetail;
  businessSlug: string;
  options?: {
    onSuccess?: () => void;
  };
}

interface NameProps {
  className?: string;
}

interface DescriptionProps {
  className?: string;
}

const UpdateGroupFormContext = createContext<Context | null>(null);

function useUpdateGroup() {
  const context = use(UpdateGroupFormContext);

  if (context === null) {
    throw new Error(
      "useUpdateGroupFormContext must be used within a UpdateGroupFormProvider"
    );
  }

  return context;
}

function Root({ children, group, businessSlug, options }: RootProps) {
  const { update } = useMutateGroups();
  const form = useForm<UpdateGroupSchema>({
    defaultValues: {
      description: group.description ?? undefined,
      name: group.name,
      permissions: group.permissions,
    },
    resolver: zodResolver(updateGroupSchema),
  });
  const formId = `update-group-form-${useId()}`;

  const onSubmit = form.handleSubmit(async (data) => {
    update.mutate(
      {
        groupSlug: group.slug,
        businessSlug,
        data,
      },
      {
        onSuccess: options?.onSuccess,
      }
    );
  });

  return (
    <UpdateGroupFormContext.Provider
      value={{
        form,
        formId,
        onSubmit,
      }}
    >
      {form.formState.errors.root && (
        <div className="bg-red-200 py-2 border-l-4 border-red-700">
          <p className="text-red-800 font-semibold ml-2">
            {form.formState.errors.root.message}
          </p>
        </div>
      )}
      <form onSubmit={onSubmit} id={formId}>
        {children}
      </form>
    </UpdateGroupFormContext.Provider>
  );
}

function Content({ children }: React.PropsWithChildren) {
  const { formId, onSubmit } = useUpdateGroup();

  return (
    <form onSubmit={onSubmit} id={formId}>
      {children}
    </form>
  );
}

function Name({ className }: NameProps) {
  const { form } = useUpdateGroup();

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
  const { form } = useUpdateGroup();
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
  const { formId } = useUpdateGroup();

  return (
    <Button type="submit" form={formId}>
      Guardar Cambios
    </Button>
  );
}

export const UpdateGroupForm = {
  Root,
  useUpdateGroup,
  Name,
  Description,
  Submit,
  Content,
};
