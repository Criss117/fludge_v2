import { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/shared/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/shared/components/ui/dialog";
import { PermissionsTable as PermissionsDataTable } from "../permissions-table";
import { Button } from "@/core/shared/components/ui/button";
import { ScrollArea } from "@/core/shared/components/ui/scroll-area";
import { Checkbox } from "@/core/shared/components/ui/checkbox";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import type { GroupDetail } from "@fludge/entities/group.entity";
import { useMutateGroups } from "@/core/groups/application/hooks/use.mutate-groups";
import { useSuspenseQuery } from "@tanstack/react-query";
import { businessesQueryOptions } from "@/core/shared/lib/api";
import {
  translatePermission,
  type Permission,
} from "@fludge/entities/permissions.entity";
import { usePermissions } from "@fludge/react-auth/permissions.provider";

interface Props {
  group: GroupDetail;
  businessSlug: string;
}

function PermissionsList({ businessSlug, group }: Props) {
  const [open, setOpen] = useState(false);
  const { update } = useMutateGroups();
  const {
    data: { data: permissions },
  } = useSuspenseQuery(businessesQueryOptions.findAllPermissions());
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  if (!permissions) return null;

  const selectPermission = (permission: Permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permission)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const permissionsToShow = permissions.filter(
    (permission) => !group.permissions.some((p) => p === permission)
  );

  const handleClick = () => {
    update.mutate(
      {
        groupSlug: group.slug,
        businessSlug,
        data: {
          name: group.name,
          description: group.description ?? undefined,
          permissions: Array.from(
            new Set([...group.permissions, ...selectedPermissions])
          ),
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedPermissions([]);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full border-2">
          <PlusCircleIcon />
          Agregar Permisos
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[700px]">
        <DialogHeader>
          <DialogTitle>Lista de permisos</DialogTitle>
          <DialogDescription>
            Selecciona los permisos que deseas agregar
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <ul className="space-y-2">
            {permissionsToShow.map((permission) => (
              <li
                className="border p-4 flex justify-between items-center cursor-pointer hover:bg-muted-foreground/5 transition-colors"
                onClick={() => selectPermission(permission)}
                key={permission}
              >
                <Checkbox
                  onClick={() => selectPermission(permission)}
                  checked={selectedPermissions.includes(permission)}
                />
                <span>{translatePermission(permission).translate}</span>
              </li>
            ))}
            {permissions.length > 0 && !permissionsToShow.length && (
              <p className="text-muted-foreground text-sm">
                El grupo ya tiene todos los permisos
              </p>
            )}
          </ul>
        </ScrollArea>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="destructive">Cancelar</Button>
          </DialogClose>
          <Button
            disabled={selectedPermissions.length === 0 || update.isPending}
            onClick={handleClick}
          >
            Agregar ({selectedPermissions.length}) permisos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PermissionsTableHeader({ group, businessSlug }: Props) {
  const { userHasPermissions } = usePermissions();
  const { update } = useMutateGroups();
  const { table } = PermissionsDataTable.usePermissionsTable();

  const canUpdateGroups = userHasPermissions("groups:update");
  const canDeleteGroups = userHasPermissions("groups:delete");

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const handleDelete = () => {
    if (selectedRows.length === 0) return;

    update.mutate({
      businessSlug,
      groupSlug: group.slug,
      data: {
        name: group.name,
        description: group.description ?? undefined,
        permissions: group.permissions.filter(
          (permission) => !selectedRows.includes(permission)
        ),
      },
    });
  };

  return (
    <CardHeader className="flex justify-between">
      <div>
        <CardTitle>Permisos</CardTitle>
        <CardDescription>{group.permissions.length} permisons</CardDescription>
      </div>

      <div className="space-x-2">
        {canDeleteGroups && (
          <Button
            variant="destructive"
            disabled={selectedRows.length === 0}
            className="rounded-full"
            onClick={handleDelete}
          >
            <Trash2Icon />
            Eliminar ({selectedRows.length}) permisos
          </Button>
        )}
        {canUpdateGroups && (
          <Suspense
            fallback={
              <Button
                variant="outline"
                className="rounded-full border-2"
                disabled
              >
                <PlusCircleIcon />
                Agregar Permisos
              </Button>
            }
          >
            <PermissionsList group={group} businessSlug={businessSlug} />
          </Suspense>
        )}
      </div>
    </CardHeader>
  );
}

export function PermissionsTable({ group, businessSlug }: Props) {
  return (
    <Card>
      <PermissionsDataTable.Root data={group.permissions}>
        <PermissionsTableHeader group={group} businessSlug={businessSlug} />
        <CardContent>
          <PermissionsDataTable.Content>
            <PermissionsDataTable.Header />
            <PermissionsDataTable.Body />
          </PermissionsDataTable.Content>
        </CardContent>
      </PermissionsDataTable.Root>
    </Card>
  );
}
