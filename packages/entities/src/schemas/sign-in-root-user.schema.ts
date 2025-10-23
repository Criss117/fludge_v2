import { z } from "zod";

export const signInRootUserSchema = z.object({
  email: z.email({
    error: "El email es obligatorio",
  }),
  password: z
    .string({
      error: "La contraseña es obligatoria",
    })
    .min(1, {
      error: "La contraseña es obligatoria",
    })
    .max(255, {
      error: "La contraseña debe tener menos de 255 caracteres",
    }),
});

export const signInEmployeeSchema = z.object({
  username: z
    .string({
      error: "El nombre de usuario es obligatorio",
    })
    .max(100, {
      error: "El nombre de usuario debe tener menos de 100 caracteres",
    }),
  password: z
    .string({
      error: "La contraseña es obligatoria",
    })
    .min(1, {
      error: "La contraseña es obligatoria",
    })
    .max(255, {
      error: "La contraseña debe tener menos de 255 caracteres",
    }),
});

export type SignInRootUserSchema = z.infer<typeof signInRootUserSchema>;
export type SignInEmployeeSchema = z.infer<typeof signInEmployeeSchema>;
