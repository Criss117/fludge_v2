import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z
    .string({
      error: "El nombre de la empresa es obligatorio",
    })
    .min(3, {
      error: "El nombre de la empresa debe tener un mínimo de 3 caracteres",
    })
    .max(100, {
      error: "El nombre de la empresa debe tener un máximo de 100 caracteres",
    }),
  nit: z
    .string({
      error: "El NIT es obligatorio",
    })
    .min(3, { error: "El NIT debe tener un mínimo de 3 caracteres" })
    .max(20, { error: "El NIT debe tener un máximo de 20 caracteres" }),
  address: z
    .string({
      error: "La dirección es obligatoria",
    })
    .min(3, { error: "La dirección debe tener un mínimo de 3 caracteres" })
    .max(255, {
      error: "La dirección debe tener un máximo de 255 caracteres",
    }),
  city: z
    .string({
      error: "La ciudad es obligatoria",
    })
    .min(3, { error: "La ciudad debe tener un mínimo de 3 caracteres" })
    .max(255, { error: "La ciudad debe tener un máximo de 255 caracteres" }),
  state: z
    .string({
      error: "El estado es obligatorio",
    })
    .min(3, { error: "El estado debe tener un mínimo de 3 caracteres" })
    .max(255, { error: "El estado debe tener un máximo de 255 caracteres" })
    .nullable()
    .optional(),
});

export type CreateBusinessSchema = z.infer<typeof createBusinessSchema>;
