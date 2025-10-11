import type { AuditMetadata } from "./audit-metadata";

export interface BrandSummary extends AuditMetadata {
  id: string;
  name: string;
  description: string | null;
}

// export interface BrandDetail extends BrandSummary {}
