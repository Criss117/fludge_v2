import { z } from "zod";

export const createRootUserSchema = z.object({
  email: z.email({
    error: "El correo electrónico no es válido",
  }),
  password: z.string(),
  username: z
    .string({
      error: "El nombre de usuario no puede estar vacío",
    })
    .min(5, {
      error: "El nombre de usuario debe tener como mínimo 5 caracteres",
    })
    .max(100, {
      error: "El nombre de usuario debe tener como máximo 100 caracteres",
    }),
  firstName: z
    .string({
      error: "El nombre del usuario no puede estar vacío",
    })
    .min(5, {
      error: "El nombre del usuario debe tener como mínimo 5 caracteres",
    })
    .max(100, {
      error: "El nombre del usuario debe tener como máximo 100 caracteres",
    }),
  lastName: z
    .string({
      error: "El apellido del usuario no puede estar vacío",
    })
    .min(5, {
      error: "El apellido del usuario debe tener como mínimo 5 caracteres",
    })
    .max(100, {
      error: "El apellido del usuario debe tener como máximo 100 caracteres",
    }),
});

export type CreateRootUserSchema = z.infer<typeof createRootUserSchema>;
