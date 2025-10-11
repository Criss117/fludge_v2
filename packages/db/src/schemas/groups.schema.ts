import { v4 } from "uuid";
import { text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { unique } from "drizzle-orm/sqlite-core";
import type { Permission } from "@fludge/entities/permissions.entity";

import { businesses } from "./businesses.schema";
import { auditMetadata } from "./audit-metadata.schema";
import { index } from "drizzle-orm/sqlite-core";

export const groups = sqliteTable(
  "groups",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => v4()),
    name: text("name", {
      length: 255,
    }).notNull(),
    slug: text("slug", {
      length: 255,
    }).notNull(),
    description: text("description", {
      length: 255,
    }),
    permissions: text("permissions", {
      mode: "json",
    })
      .notNull()
      .$type<Permission[]>(),
    businessId: text("business_id", {
      length: 255,
    })
      .references(() => businesses.id)
      .notNull(),
    ...auditMetadata,
  },
  (t) => [
    index("idx_groups_name").on(t.name),
    index("idx_groups_business_id").on(t.businessId),
    unique("unique_bussinesses_groups_name").on(t.businessId, t.name),
  ]
);

export type InsertGroup = typeof groups.$inferInsert;
export type SelectGroup = typeof groups.$inferSelect;
