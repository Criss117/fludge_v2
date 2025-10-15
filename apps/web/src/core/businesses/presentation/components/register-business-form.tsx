import { createContext, use, useId } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "@fludge/react-auth/auth.provider";
import { businessesActions } from "@/core/shared/lib/api";
import { useForm } from "react-hook-form";
import {
  createBusinessSchema,
  type CreateBusinessSchema,
} from "@fludge/entities/schemas/businesses/create-business.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/core/shared/components/form/form-input";
import { Button } from "@/core/shared/components/ui/button";

interface Context {
  form: ReturnType<typeof useForm<CreateBusinessSchema>>;
  formId: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface RootProps {
  children: React.ReactNode;
}

const RegisterBusinessContext = createContext<Context | null>(null);

function useRegisterBusiness() {
  const context = use(RegisterBusinessContext);
  if (!context) {
    throw new Error(
      "useRegisterBusiness must be used within a RegisterBusinessProvider"
    );
  }
  return context;
}

function Root({ children }: RootProps) {
  const router = useRouter();
  const { getProfile } = useAuth();
  const formId = `register-business-form-${useId()}`;
  const form = useForm<CreateBusinessSchema>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      name: "",
      nit: "",
      address: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    //TODO: Move this to a mutation from tanstack query
    const res = await businessesActions.register(data);

    if (res.error) {
      form.setError("root", {
        message: res.message,
      });

      return;
    }
    if (!res.data) {
      form.setError("root", {
        message: "Error al registrar un negocio",
      });
      return;
    }

    const user = await getProfile();

    if (!user) return;

    router.options.context.user = user;

    router.navigate({
      to: "/businesses/$businessslug",
      params: {
        businessslug: res.data.slug,
      },
    });
  });

  return (
    <RegisterBusinessContext.Provider value={{ form, formId, onSubmit }}>
      {form.formState.errors.root && (
        <div className="text-red-500 text-sm">
          {form.formState.errors.root.message}
        </div>
      )}
      {children}
    </RegisterBusinessContext.Provider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { formId, onSubmit } = useRegisterBusiness();

  return (
    <form id={formId} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function Name() {
  const { form } = useRegisterBusiness();

  return (
    <FormInput
      control={form.control}
      name="name"
      label="Nombre del negocio"
      placeholder="Nombre del negocio"
    />
  );
}

function NIT() {
  const { form } = useRegisterBusiness();

  return (
    <FormInput
      control={form.control}
      name="nit"
      label="NIT"
      placeholder="NIT"
    />
  );
}

function Address() {
  const { form } = useRegisterBusiness();

  return (
    <FormInput
      control={form.control}
      name="address"
      label="Dirección"
      placeholder="Dirección"
    />
  );
}

function City() {
  const { form } = useRegisterBusiness();

  return (
    <FormInput
      control={form.control}
      name="city"
      label="Ciudad"
      placeholder="Ciudad"
    />
  );
}

function State() {
  const { form } = useRegisterBusiness();

  return (
    <FormInput
      control={form.control}
      name="state"
      label="Pais"
      placeholder="Pais"
    />
  );
}

function Submit() {
  return (
    <Button type="submit" className="w-full">
      Registrar
    </Button>
  );
}

export const RegisterBusinessForm = {
  useRegisterBusiness,
  Root,
  Name,
  NIT,
  Address,
  City,
  State,
  Submit,
  Content,
};
