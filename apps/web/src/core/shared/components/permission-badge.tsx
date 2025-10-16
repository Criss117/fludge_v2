import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import {
  translatePermission,
  type Action,
  type Permission,
} from "@fludge/entities/permissions.entity";

interface Props {
  permission: Permission;
}

const badgeVariants: Record<Action, string> = {
  delete:
    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
  create: "",
  read: "border-transparent bg-cyan-400 [a&]:hover:bg-cyan-400/90",
  update:
    "border-transparent bg-green-500 text-black [a&]:hover:bg-green-500/90",
};

export function PermissionBadge({ permission }: Props) {
  const { translate, action } = translatePermission(permission);

  return (
    <Badge className={cn("rounded-full", badgeVariants[action])}>
      {translate}
    </Badge>
  );
}
