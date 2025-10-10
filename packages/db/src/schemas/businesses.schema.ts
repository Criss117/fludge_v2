import { text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { index } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { users } from "./users.schema";
import { auditMetadata } from "./audit-metadata.schema";

export const businesses = sqliteTable(
  "businesses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => v4()),
    nit: text("nit", {
      length: 20,
    })
      .notNull()
      .unique(),
    name: text("name", {
      length: 100,
    })
      .notNull()
      .unique(),
    slug: text("slug", {
      length: 100,
    })
      .notNull()
      .unique(),
    address: text("address", {
      length: 255,
    }).notNull(),
    city: text("city", {
      length: 255,
    }).notNull(),
    state: text("state", {
      length: 255,
    }),
    rootUserId: text("root_user_id")
      .references(() => users.id)
      .notNull(),
    ...auditMetadata,
  },
  (t) => [
    index("idx_businesses_nit").on(t.nit),
    index("idx_businesses_name").on(t.name),
  ]
);

export type InsertBusiness = typeof businesses.$inferInsert;
export type SelectBusiness = typeof businesses.$inferSelect;
