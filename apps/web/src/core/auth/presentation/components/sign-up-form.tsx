import { useForm } from "react-hook-form";
import { createContext, use, useId } from "react";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { authActions } from "@/core/shared/lib/api";
import {
  createRootUserSchema,
  type CreateRootUserSchema,
} from "@fludge/entities/schemas/create-root-user.schema";
import { FormInput } from "@/core/shared/components/form/form-input";
import { Button } from "@/core/shared/components/ui/button";

interface Context {
  form: ReturnType<typeof useForm<CreateRootUserSchema>>;
  formId: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface RootProps {
  children: React.ReactNode;
}

const SignUpContext = createContext<Context | null>(null);

function useSignUp() {
  const context = use(SignUpContext);

  if (context === null) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }

  return context;
}

function Root({ children }: RootProps) {
  const form = useForm<CreateRootUserSchema>({
    resolver: zodResolver(createRootUserSchema),
    defaultValues: {
      email: "cristian@fludge.dev",
      password: "holiwiss",
      firstName: "Cristian",
      lastName: "Vivieros",
      username: "cristian",
    },
  });
  const router = useRouter();
  const formId = `sign-up-form-${useId()}`;

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await authActions.signUp(data);

    if (res.error) {
      form.setError("root", {
        message: res.message,
      });

      return;
    }

    router.navigate({
      to: "/auth/sign-in",
    });
  });

  return (
    <SignUpContext.Provider
      value={{
        form,
        formId,
        onSubmit,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

function RootError() {
  const { form } = useSignUp();

  if (!form.formState.errors.root) return null;

  return (
    <div className="bg-red-200 py-2 border-l-4 border-red-700">
      <p className="text-red-800 font-semibold ml-2">
        {form.formState.errors.root.message}
      </p>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { formId, onSubmit } = useSignUp();

  return (
    <form id={formId} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function Email() {
  const { form } = useSignUp();

  return (
    <FormInput
      control={form.control}
      name="email"
      label="Correo electrónico"
      placeholder="Correo electrónico"
      type="email"
      required
    />
  );
}

function Password() {
  const { form } = useSignUp();

  return (
    <FormInput
      control={form.control}
      name="password"
      label="Contraseña"
      placeholder="Contraseña"
      type="password"
      required
    />
  );
}

function FirstName() {
  const { form } = useSignUp();

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
  const { form } = useSignUp();

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

function UserName() {
  const { form } = useSignUp();

  return (
    <FormInput
      control={form.control}
      name="username"
      label="Nombre de usuario"
      placeholder="Nombre de usuario"
      required
    />
  );
}

function Submit() {
  return (
    <Button type="submit" className="w-full">
      Crear cuenta
    </Button>
  );
}

export const SignUpForm = {
  Root,
  useSignUp,
  Email,
  Password,
  FirstName,
  LastName,
  Submit,
  UserName,
  Content,
  RootError,
};
