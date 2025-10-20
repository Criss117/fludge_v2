import z from "zod";
import { allPermissions } from "../../permissions.entity";

export const updateGroupSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  permissions: z.array(z.enum(allPermissions)).optional(),
});

export type UpdateGroupSchema = z.infer<typeof updateGroupSchema>;
