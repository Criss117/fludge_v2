import type { AuditMetadata } from "./audit-metadata";
import { BusinessSummary } from "./business.entity";
import { GroupSummary } from "./group.entity";

export interface UserSummary extends AuditMetadata {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  username: string;
  isRoot: boolean;
  isAccountValidated: boolean;
}

export interface UserDetail extends UserSummary {
  password?: string | null;
  isRootIn?: BusinessSummary[] | null;
  isEmployeeIn?: (BusinessSummary & { groups: GroupSummary[] }) | null;
}
