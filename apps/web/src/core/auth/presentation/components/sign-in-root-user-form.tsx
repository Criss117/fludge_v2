import { createContext, use, useId } from "react";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInRootUserSchema,
  type SignInRootUserSchema,
} from "@fludge/entities/schemas/sign-in-root-user.schema";
import { useAuth } from "@fludge/react-auth/auth.provider";
import { FormInput } from "@/core/shared/components/form/form-input";
import { Button } from "@/core/shared/components/ui/button";
import { api } from "@/core/shared/lib/api";

interface RootProps {
  children: React.ReactNode;
}

interface Context {
  form: ReturnType<typeof useForm<SignInRootUserSchema>>;
  formId: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const SignInRootUserContext = createContext<Context | null>(null);

function useSignInRootUserContext() {
  const context = use(SignInRootUserContext);

  if (context === null)
    throw new Error(
      "useSignInRootUserContext must be used within a SignInRootUserProvider"
    );

  return context;
}

function Root({ children }: RootProps) {
  const router = useRouter();
  const { signInRootUser } = useAuth();
  const form = useForm<SignInRootUserSchema>({
    resolver: zodResolver(signInRootUserSchema),
    defaultValues: {
      email: "cristian@fludge.dev",
      password: "holiwiss",
    },
  });
  const formId = `sign-in-root-user-form-${useId()}`;

  const onSubmit = form.handleSubmit((data: SignInRootUserSchema) => {
    signInRootUser(data, {
      onSuccess: (jwt, user) => {
        api.applyAuthInterceptor(jwt);

        router.options.context.user = user;

        if (user.isEmployeeIn) {
          router.navigate({
            to: "/businesses/$businessslug",
            params: {
              businessslug: user.isEmployeeIn.slug,
            },
          });

          return;
        }

        if (user.isRootIn) {
          if (user.isRootIn.length === 0) {
            router.navigate({
              to: "/businesses/register",
            });

            return;
          }

          if (user.isRootIn.length === 1) {
            router.navigate({
              to: "/businesses/$businessslug",
              params: {
                businessslug: user.isRootIn[0].slug,
              },
            });

            return;
          }

          router.navigate({
            to: "/businesses/select-business",
          });

          return;
        }
      },
    });
  });

  return (
    <SignInRootUserContext.Provider
      value={{
        form,
        formId,
        onSubmit,
      }}
    >
      {children}
    </SignInRootUserContext.Provider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { formId, onSubmit } = useSignInRootUserContext();

  return (
    <form id={formId} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function Email() {
  const { form } = useSignInRootUserContext();

  return (
    <FormInput
      control={form.control}
      name="email"
      label="Correo electrónico"
      placeholder="Correo electrónico"
      type="email"
      required
      autoComplete="email"
    />
  );
}

function Password() {
  const { form } = useSignInRootUserContext();

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

function Submit() {
  return (
    <Button type="submit" className="w-full">
      Iniciar sesión
    </Button>
  );
}

export const SignInRootUserForm = {
  useSignInRootUserContext,
  Root,
  Content,
  Email,
  Password,
  Submit,
};
