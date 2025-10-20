import z from "zod";

export const assignEmployeesToGroupSchema = z.object({
  employeeIds: z
    .array(
      z.string({
        error: "Los empleados no son validos",
      })
    )
    .nonempty(),
});

export type AssignEmployeesToGroupSchema = z.infer<
  typeof assignEmployeesToGroupSchema
>;
