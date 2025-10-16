export const resources = [
  "users",
  "tickets",
  "products",
  "clients",
  "businesses",
  "groups",
  "categories",
  "providers",
  "brands",
] as const;
export const actions = ["create", "read", "update", "delete"] as const;

export type Resource = (typeof resources)[number];
export type Action = (typeof actions)[number];

export type Permission = `${Resource}:${Action}`;

export const allPermissions: Permission[] = [
  "users:create",
  "users:read",
  "users:update",
  "users:delete",

  "tickets:create",
  "tickets:read",
  "tickets:update",
  "tickets:delete",

  "products:create",
  "products:read",
  "products:update",
  "products:delete",

  "clients:create",
  "clients:read",
  "clients:update",
  "clients:delete",

  "businesses:create",
  "businesses:update",

  "groups:create",
  "groups:read",
  "groups:update",
  "groups:delete",

  "categories:create",
  "categories:read",
  "categories:update",
  "categories:delete",

  "providers:create",
  "providers:read",
  "providers:update",
  "providers:delete",

  "brands:create",
  "brands:read",
  "brands:update",
  "brands:delete",
];

const resourcesEs = new Map<Resource, string>([
  ["users", "Usuarios"],
  ["tickets", "Tickets"],
  ["products", "Productos"],
  ["clients", "Clientes"],
  ["businesses", "Negocios"],
  ["groups", "Grupos"],
  ["categories", "Categorías"],
  ["providers", "Proveedores"],
  ["brands", "Marcas"],
]);

const actionsEs = new Map<Action, string>([
  ["create", "Crear"],
  ["read", "Leer"],
  ["update", "Actualizar"],
  ["delete", "Eliminar"],
]);

export function translatePermission(permission: Permission) {
  const [resource, action] = permission.split(":") as [Resource, Action];

  return {
    translate: `${actionsEs.get(action)} ${resourcesEs.get(resource)}`,
    resourceEs: resourcesEs.get(resource),
    actionEs: actionsEs.get(action),
    action,
    resource,
  };
}
