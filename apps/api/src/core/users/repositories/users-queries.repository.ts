import { and, eq, inArray, or, type SQL } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { businesses, employees, groups, users } from '@fludge/db';
import { DBSERVICE, type LibSQLDatabase } from 'src/core/db/db.module';
import type { UserDetail, UserSummary } from '@fludge/entities/user.entity';
import type { FindManyUsersByDto } from './dtos/find-many-users-by.dto';

type Options = {
  ensureActive?: boolean;
  returnPassword?: boolean;
};

@Injectable()
export class UsersQueriesRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async findManyBy(
    meta: FindManyUsersByDto,
    options?: Options,
  ): Promise<UserSummary[]> {
    const filters: SQL[] = [];
    const optionsFilters: SQL[] = [];

    if (meta.email) {
      filters.push(eq(users.email, meta.email));
    }

    if (meta.username) {
      filters.push(eq(users.username, meta.username));
    }

    if (meta.id) {
      filters.push(eq(users.id, meta.id));
    }

    if (options?.ensureActive) {
      optionsFilters.push(eq(users.isActive, true));
    }

    const response = await this.db
      .select()
      .from(users)
      .where(and(or(...filters), ...optionsFilters));

    if (!options?.returnPassword) return response;

    return response.map((user) => ({
      ...user,
      password: undefined,
    }));
  }

  public async findOne(
    userId: string,
    options?: Options,
  ): Promise<UserDetail | null> {
    const optionsFilters: SQL[] = [];

    if (options?.ensureActive) {
      optionsFilters.push(eq(users.isActive, true));
    }

    const [user] = await this.db
      .select()
      .from(users)
      .where(and(eq(users.id, userId), ...optionsFilters));

    if (!user) {
      return null;
    }

    if (user.isRoot) {
      const businessesOptions: SQL[] = [];

      if (options?.ensureActive) {
        businessesOptions.push(eq(businesses.isActive, true));
      }

      const userBusinesses = await this.db
        .select()
        .from(businesses)
        .where(and(eq(businesses.rootUserId, user.id), ...businessesOptions));

      return {
        ...user,
        password: options?.returnPassword ? user.password : undefined,
        isRootIn: userBusinesses,
      };
    }

    const employeeInPromise = this.db
      .select({
        ...getTableColumns(businesses),
      })
      .from(employees)
      .innerJoin(businesses, eq(businesses.id, employees.businessId))
      .where(eq(businesses.rootUserId, user.id));

    const employeeGroupsPromise = this.db
      .select({
        ...getTableColumns(groups),
      })
      .from(employees)
      .innerJoin(groups, inArray(groups.id, employees.groupIds))
      .where(eq(businesses.rootUserId, user.id));

    const [[employeeIn], employeeGroups] = await Promise.all([
      employeeInPromise,
      employeeGroupsPromise,
    ]);

    if (!employeeIn) {
      return null;
    }

    return {
      ...user,
      isEmployeeIn: {
        ...employeeIn,
        groups: employeeGroups,
      },
    };
  }

  public async findOneBy(
    meta: FindManyUsersByDto,
    options?: Options,
  ): Promise<UserSummary | null> {
    const filters: SQL[] = [];
    const optionsFilters: SQL[] = [];

    if (meta.email) {
      filters.push(eq(users.email, meta.email));
    }

    if (meta.username) {
      filters.push(eq(users.username, meta.username));
    }

    if (meta.id) {
      filters.push(eq(users.id, meta.id));
    }

    if (options?.ensureActive) {
      optionsFilters.push(eq(users.isActive, true));
    }

    const [user] = await this.db
      .select()
      .from(users)
      .where(and(...filters, ...optionsFilters));

    if (!user) return null;

    return {
      ...user,
      password: options?.returnPassword ? user.password : undefined,
    };
  }
}
