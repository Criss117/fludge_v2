import type { AuditMetadata } from "./audit-metadata";
import type { BrandSummary } from "./brand.entity";
import type { CategorySummary } from "./category.entity";
import type { ProvidersSummary } from "./provider.schema";

export interface ProductSummary extends AuditMetadata {
  id: string;
  name: string;
  barcode: string;
  description: string | null;
  categoryId: string | null;
  brandId: string | null;
  businessId: string;
  purchasePrice: number;
  salePrice: number;
  wholesalePrice: number;
  offerPrice: number;
  stock: number;
  minStock: number;
  allowsNegativeInventory: boolean;
  weight: number | null;
  imageUrl: string | null;
}
export interface ProductDetail extends ProductSummary {
  category: CategorySummary | null;
  brand: BrandSummary | null;
  providers: ProvidersSummary[];
}
