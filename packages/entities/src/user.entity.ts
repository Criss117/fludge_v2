import type { AuditMetadata } from "./audit-metadata";

export interface User extends AuditMetadata {
  id: string;
  name: string;
  email: string;
}
