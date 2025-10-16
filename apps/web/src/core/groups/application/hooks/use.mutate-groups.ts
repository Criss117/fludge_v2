import {
  businessesQueryOptions,
  groupsMutationsOptions,
} from "@/core/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutateGroups() {
  const queryClient = useQueryClient();

  const create = useMutation({
    ...groupsMutationsOptions.createOptions(),
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

  return { create };
}
