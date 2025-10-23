import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupHeaderSection } from "../sections/group-header.section";
import {
  PageHeader,
  PageHeaderGroup,
  PageHeaderGroups,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import { GroupDataTablesSection } from "../sections/group-data-tables.section";
import { groupsQueriesOptions } from "@/core/shared/lib/api";

interface Props {
  businessSlug: string;
  groupSlug: string;
}

export function GroupScreen({ businessSlug, groupSlug }: Props) {
  const {
    data: { data: group },
  } = useSuspenseQuery(groupsQueriesOptions.findOne(businessSlug, groupSlug));

  if (!group) return null;

  return (
    <section className="mx-2 space-y-5">
      <PageHeader>
        <PageHeaderHome businessSlug={group.business.slug} />
        <PageHeaderGroups businessSlug={group.business.slug} />
        <PageHeaderGroup
          businessSlug={group.business.slug}
          groupSlug={group.slug}
          groupName={group.name}
          isPage
        />
      </PageHeader>
      <div className="space-y-8">
        <GroupHeaderSection group={group} businessSlug={group.business.slug} />
        <GroupDataTablesSection
          group={group}
          businessSlug={group.business.slug}
        />
      </div>
    </section>
  );
}

export function WithOutPermissions({ businessSlug }: Props) {
  return (
    <section className="mx-2 space-y-5">
      <PageHeader>
        <PageHeaderHome businessSlug={businessSlug} />
        <PageHeaderGroups businessSlug={businessSlug} />
      </PageHeader>
      <UserHasNoPermissionAlert />
    </section>
  );
}
