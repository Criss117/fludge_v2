import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  businessesQueryOptions,
  employeesMutationsOptions,
} from "@/core/shared/lib/api";

export function useMutateEmployees() {
  const queryClient = useQueryClient();

  const create = useMutation({
    ...employeesMutationsOptions.create(),
    onMutate: () => {
      toast.loading("Creando empleado", {
        id: "create-employee-toast",
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("create-employee-toast");
      toast.success("Empleado creado correctamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );

      // TODO: Fix this
      // const groupsToInvalidate = variables.data.groupIds.map((groupId) =>
      //   groupsQueriesOptions.findOne(variables.businessSlug, groupId)
      // );

      // queryClient.invalidateQueries(...groupsToInvalidate);
    },
    onError: (error) => {
      toast.dismiss("create-employee-toast");
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const assignGroups = useMutation({
    ...employeesMutationsOptions.assignGroups(),
    onMutate: () => {
      toast.loading("Asignando grupos a empleado", {
        id: "assign-groups-to-employee-toast",
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("assign-groups-to-employee-toast");
      toast.success("Grupos asignados correctamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );

      // TODO: Fix this
      // const groupsToInvalidate = variables.groupIds.map((groupId) => {
      //   return findOneGroupQueryOptions(variables.businessId, groupId);
      // });

      // queryClient.invalidateQueries(...groupsToInvalidate);
    },
    onError: (error) => {
      toast.dismiss("assign-groups-to-employee-toast");
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const removeGroups = useMutation({
    ...employeesMutationsOptions.removeGroups(),
    onMutate: () => {
      toast.loading("Eliminando grupos de empleado", {
        id: "remove-groups-from-employee-toast",
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("remove-groups-from-employee-toast");
      toast.success("Grupos eliminados correctamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );

      // TODO: Fix this
      // const groupsToInvalidate = variables.groupIds.map((groupId) => {
      //   return findOneGroupQueryOptions(variables.businessId, groupId);
      // });

      // queryClient.invalidateQueries(...groupsToInvalidate);
    },
    onError: (error) => {
      toast.dismiss("remove-groups-from-employee-toast");
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  return {
    create,
    assignGroups,
    removeGroups,
  };
}
