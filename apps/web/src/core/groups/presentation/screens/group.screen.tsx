import { GroupHeaderSection } from "../sections/group-header.section";
import {
  PageHeader,
  PageHeaderGroup,
  PageHeaderGroups,
  PageHeaderHome,
} from "@/core/shared/components/page-header-bread-crumb";
import { UserHasNoPermissionAlert } from "@/core/shared/components/unauthorized-alerts";
import type { GroupDetail } from "@fludge/entities/group.entity";
import { GroupDataTablesSection } from "../sections/group-data-tables.section";

interface Props {
  group: GroupDetail;
}

export function GroupScreen({ group }: Props) {
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

export function WithOutPermissions({ group }: Props) {
  return (
    <section className="mx-2 space-y-5">
      <PageHeader>
        <PageHeaderHome businessSlug={group.business.slug} />
        <PageHeaderGroups businessSlug={group.business.slug} />
      </PageHeader>
      <UserHasNoPermissionAlert />
    </section>
  );
}
