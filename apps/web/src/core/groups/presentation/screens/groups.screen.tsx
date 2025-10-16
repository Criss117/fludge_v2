import {
  PageHeader,
  PageHeaderGroups,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import { businessesQueryOptions } from "@/core/shared/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupsTable } from "../components/groups-table";
import { GroupsHeaderSection } from "../sections/groups-header.section";

interface Props {
  businessSlug: string;
}
export function WithOutPermissions({ businessSlug }: Props) {
  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderGroups isPage />
      </PageHeader>
      <UserHasNoPermissionAlert />
    </section>
  );
}

export function GroupsScreen({ businessSlug }: Props) {
  const {
    data: { data: business },
  } = useSuspenseQuery(businessesQueryOptions.findOneBusiness(businessSlug));

  if (!business) return <WithOutPermissions businessSlug={businessSlug} />;

  return (
    <section className="mx-2 space-y-4">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderGroups isPage />
      </PageHeader>
      <GroupsTable.Root data={business.groups} businessSlug={businessSlug}>
        <div className="mx-4">
          <GroupsHeaderSection
            totalGroups={business.groups.length || 0}
            businessSlug={businessSlug}
          />
        </div>
        <div className="mx-4">
          <GroupsTable.Content>
            <GroupsTable.Header />
            <GroupsTable.Body />
          </GroupsTable.Content>
        </div>
      </GroupsTable.Root>
    </section>
  );
}
