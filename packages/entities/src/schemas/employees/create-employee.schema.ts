import z from "zod";

export const createEmployeeSchema = z.object({
  password: z.string().max(255, {
    error: "La contraseña no puede tener más de 255 caracteres",
  }),
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
  groupIds: z.array(z.uuid({ error: "Cada elemento debe ser un UUID válido" })),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
