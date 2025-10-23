import { z } from "zod";
import { allPermissions } from "../../permissions.entity";

export const createGroupDto = z.object({
  name: z
    .string({
      error: "El nombre del grupo es obligatorio",
    })
    .min(1, {
      error: "El nombre del grupo es obligatorio",
    })
    .max(100, {
      error: "El nombre del grupo debe tener un máximo de 100 caracteres",
    }),

  description: z
    .string({
      error: "La descripción del grupo debe ser una cadena de texto",
    })
    .max(255, {
      error: "La descripción del grupo debe tener un máximo de 255 caracteres",
    })
    .optional(),

  permissions: z
    .array(
      z.enum(allPermissions, {
        error: "Cada permiso debe ser un valor válido",
      })
    )
    .min(1, {
      error: "El grupo debe tener al menos un permiso",
    }),
});

export type CreateGroupDto = z.infer<typeof createGroupDto>;
