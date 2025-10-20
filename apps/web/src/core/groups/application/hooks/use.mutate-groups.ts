import {
  businessesQueryOptions,
  groupsMutationsOptions,
  groupsQueriesOptions,
} from "@/core/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutateGroups() {
  const queryClient = useQueryClient();

  const create = useMutation({
    ...groupsMutationsOptions.create(),
    onMutate: () => {
      toast.loading("Creando grupo", {
        id: "toast-loading-create-business",
        position: "top-center",
      });
    },
    onError: () => {
      toast.dismiss("toast-loading-create-business");
      toast.error("Error al crear grupo", {
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("toast-loading-create-business");
      toast.success("Grupo creado exitosamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );
    },
  });

  const assignEmployees = useMutation({
    ...groupsMutationsOptions.assignEmployees(),
    onMutate: () => {
      toast.loading("Asignando empleados a grupo", {
        id: "toast-loading-assign-employees-to-group",
        position: "top-center",
      });
    },
    onError: () => {
      toast.dismiss("toast-loading-assign-employees-to-group");
      toast.error("Error al asignar empleados a grupo", {
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("toast-loading-assign-employees-to-group");
      toast.success("Empleados asignados exitosamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(
          variables.businessSlug,
          variables.groupSlug
        )
      );
    },
  });

  const update = useMutation({
    ...groupsMutationsOptions.update(),
    onMutate: () => {
      toast.loading("Actualizando grupo", {
        id: "toast-loading-update-group",
        position: "top-center",
      });
    },
    onError: (err) => {
      toast.dismiss("toast-loading-update-group");
      toast.error(err.message, {
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("toast-loading-update-group");
      toast.success("Grupo actualizado exitosamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(
          variables.businessSlug,
          variables.groupSlug
        )
      );
    },
  });

  const removeEmployees = useMutation({
    ...groupsMutationsOptions.removeEmployees(),
    onMutate: () => {
      toast.loading("Eliminando empleados de grupo", {
        id: "toast-loading-remove-employees-to-group",
        position: "top-center",
      });
    },
    onError: (err) => {
      toast.dismiss("toast-loading-remove-employees-to-group");
      toast.error(err.message, {
        position: "top-center",
      });
    },
    onSuccess: (_, variables) => {
      toast.dismiss("toast-loading-remove-employees-to-group");
      toast.success("Empleados eliminados exitosamente", {
        position: "top-center",
      });

      queryClient.invalidateQueries(
        businessesQueryOptions.findOneBusiness(variables.businessSlug)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(
          variables.businessSlug,
          variables.groupSlug
        )
      );
    },
  });

  return {
    create,
    update,
    assignEmployees,
    removeEmployees,
  };
}
