import { and, desc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { DBSERVICE, type LibSQLDatabase } from '@/core/db/db.module';
import { GroupDetail, GroupSummary } from '@fludge/entities/group.entity';
import { businesses, employees, groups, users } from '@fludge/db';
import { FindOneGroupDto } from '../dtos/groups/find-one-group.dto';
import { FindManyGroupsByDto } from '../dtos/groups/find-many-groups-by.dto';

type Options = {
  ensureActive: boolean;
};

@Injectable()
export class GroupsQueriesRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async findOne(
    meta: FindOneGroupDto,
    options?: Options,
  ): Promise<GroupDetail | null> {
    const optionsFilters: SQL[] = [];
    const filters: SQL[] = [];

    if (options?.ensureActive) {
      optionsFilters.push(eq(groups.isActive, true));
    }

    if (meta.groupId) {
      filters.push(eq(groups.id, meta.groupId));
    }

    if (meta.slug) {
      filters.push(eq(groups.slug, meta.slug));
    }

    const [group] = await this.db
      .select({
        ...getTableColumns(groups),
        business: getTableColumns(businesses),
      })
      .from(groups)
      .innerJoin(businesses, eq(groups.businessId, businesses.id))
      .where(
        and(
          eq(groups.businessId, meta.businessId),
          ...filters,
          ...optionsFilters,
        ),
      );

    if (!group) return null;

    const employessList = await this.db
      .select({
        ...getTableColumns(users),
      })
      .from(employees)
      .innerJoin(users, eq(users.id, employees.userId))
      .where(
        and(
          sql`EXISTS (
              SELECT 1 FROM JSON_EACH(${employees.groupIds}) 
              WHERE JSON_EACH.value = ${group.id}
            )`,
          eq(employees.businessId, group.businessId),
        ),
      );

    return {
      ...group,
      employees: employessList.map((user) => ({
        ...user,
        password: undefined,
      })),
    };
  }

  public async findManyBy(
    meta: FindManyGroupsByDto,
    options?: Options,
  ): Promise<GroupSummary[]> {
    const filters: SQL[] = [];
    const optionsFilters: SQL[] = [];

    if (options?.ensureActive) {
      optionsFilters.push(eq(groups.isActive, true));
    }

    if (meta.ids) {
      filters.push(inArray(groups.id, meta.ids));
    }

    if (meta.name) {
      filters.push(eq(groups.name, meta.name));
    }

    if (meta.slugs) {
      filters.push(inArray(groups.slug, meta.slugs));
    }

    return this.db
      .select()
      .from(groups)
      .where(
        and(
          ...filters,
          ...optionsFilters,
          eq(groups.businessId, meta.businessId),
        ),
      )
      .orderBy(desc(groups.createdAt));
  }
}
