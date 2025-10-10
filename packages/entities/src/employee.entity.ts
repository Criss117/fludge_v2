import type { AuditMetadata } from "./audit-metadata";
import type { BusinessSummary } from "./business.entity";
import type { GroupSummary } from "./group.entity";
import type { UserSummary } from "./user.entity";

export interface EmployeeSummary extends AuditMetadata {
  businessId: string;
  userId: string;
  groupIds: string[];
}

export interface EmployeeDetail extends EmployeeSummary {
  business: BusinessSummary;
  user: UserSummary;
  groups: GroupSummary[];
}
