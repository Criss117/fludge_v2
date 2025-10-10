import type { AuditMetadata } from "./audit-metadata";
import { GroupSummary } from "./group.entity";
import type { UserSummary } from "./user.entity";

export interface BusinessSummary extends AuditMetadata {
  id: string;
  name: string;
  nit: string;
  address: string;
  city: string;
  state: string | null;
  rootUserId: string;
}

export interface BusinessDetail extends BusinessSummary {
  employees: UserSummary[];
  rootUser: UserSummary;
  groups: GroupSummary[];
  totalProducts: number;
}
