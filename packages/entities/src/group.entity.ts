import type { AuditMetadata } from "./audit-metadata";
import type { BusinessSummary } from "./business.entity";
import type { Permission } from "./permissions.entity";
import type { UserSummary } from "./user.entity";

export interface GroupSummary extends AuditMetadata {
  id: string;
  name: string;
  slug: string;
  businessId: string;
  description: string | null;
  permissions: Permission[];
}

export interface GroupDetail extends GroupSummary {
  employees: UserSummary[];
  business: BusinessSummary;
}
