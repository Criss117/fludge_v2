import type { AuditMetadata } from "./audit-metadata";
import type { Permission } from "./permissions.entity";
import type { UserSummary } from "./user.entity";

export interface GroupSummary extends AuditMetadata {
  id: string;
  name: string;
  businessId: string;
  description: string | null;
  permissions: Permission[];
}

export interface GroupDetail extends GroupSummary {
  employees: UserSummary[];
}
