import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/core/shared/components/ui/checkbox";
import {
  getPermissionDescription,
  translatePermission,
  type Permission,
} from "@fludge/entities/permissions.entity";

const columnHelper = createColumnHelper<Permission>();

export const columns = [
  columnHelper.display({
    id: "name",
    header: "Nombre",
    cell: ({ row }) => translatePermission(row.original).translate,
  }),
  columnHelper.display({
    id: "description",
    header: "Descripción",
    cell: ({ row }) => getPermissionDescription(row.original).description,
  }),
  columnHelper.display({
    id: "resource",
    header: "Recurso Afectado",
    cell: ({ row }) => translatePermission(row.original).resourceEs,
  }),
  columnHelper.display({
    id: "key",
    header: "Clave",
    cell: ({ row }) => row.original,
  }),
];

export const columnsWithSelect = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  }),
  columnHelper.display({
    id: "name",
    header: "Nombre",
    cell: ({ row }) => translatePermission(row.original).translate,
  }),
  columnHelper.display({
    id: "description",
    header: "Descripción",
    cell: ({ row }) => getPermissionDescription(row.original).description,
  }),
  columnHelper.display({
    id: "resource",
    header: "Recurso Afectado",
    cell: ({ row }) => translatePermission(row.original).resourceEs,
  }),
  columnHelper.display({
    id: "key",
    header: "Clave",
    cell: ({ row }) => row.original,
  }),
];
