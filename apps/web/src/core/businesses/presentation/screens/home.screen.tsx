import { useSuspenseQuery } from "@tanstack/react-query";
import {
  PageHeader,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { businessesQueryOptions } from "@/core/shared/lib/api";
import { HomeHeaderSection } from "../sections/home-header.section";
import { ChartAreaInteractive } from "@/core/shared/components/chart-area-interactive";
import { HomeDataTablesSection } from "../sections/home-data-tables.section";

interface Props {
  businessSlug: string;
}

export function HomeScreen({ businessSlug }: Props) {
  const {
    data: { data: business },
  } = useSuspenseQuery(businessesQueryOptions.findOneBusiness(businessSlug));

  if (!business) return null;

  return (
    <section className="mx-2">
      <PageHeader>
        <PageHeaderHome isPage />
      </PageHeader>
      <div className="mx-2 mt-2 space-y-6">
        <HomeHeaderSection business={business} />
        <ChartAreaInteractive />
        <HomeDataTablesSection business={business} />
      </div>
    </section>
  );
}
