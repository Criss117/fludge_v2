import type { AuditMetadata } from "./audit-metadata";

export interface ProvidersSummary extends AuditMetadata {
  id: string;
  name: string;
  nit: string;
  email: string | null;
  phone: string;
  principalContact: string | null;
}

// export interface ProvidersDetail extends ProvidersSummary {}
