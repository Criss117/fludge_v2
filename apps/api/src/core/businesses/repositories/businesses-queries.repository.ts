import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, or, type SQL, count } from 'drizzle-orm';
import { FindManyBusinessByDto } from './dtos/find-many-business-by.dto';
import { DBSERVICE, type LibSQLDatabase } from '@/core/db/db.module';
import { businesses, employees, groups, products, users } from '@fludge/db';
import {
  BusinessDetail,
  BusinessSummary,
} from '@fludge/entities/business.entity';
import { getTableColumns } from 'drizzle-orm';

type Options = {
  ensureActive?: boolean;
};

@Injectable()
export class BusinessesQueriesRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async findManyBy(
    meta: FindManyBusinessByDto,
    options?: Options,
  ): Promise<BusinessSummary[]> {
    const { id, name, nit } = meta;

    if (!id && !name && !nit) {
      throw new Error('Invalid query');
    }

    const filters: SQL[] = [];
    const optionsFilters: SQL[] = [];

    if (id) {
      filters.push(eq(businesses.id, id));
    }

    if (name) {
      filters.push(eq(businesses.name, name));
    }

    if (nit) {
      filters.push(eq(businesses.nit, nit));
    }

    if (options?.ensureActive) {
      optionsFilters.push(eq(businesses.isActive, true));
    }

    return this.db
      .select()
      .from(businesses)
      .where(and(or(...filters), ...optionsFilters))
      .orderBy(desc(businesses.createdAt));
  }

  public async findOne(
    id: string,
    options?: Options,
  ): Promise<BusinessDetail | null> {
    const optionsFilters: SQL[] = [];
    const groupsOptionsFilters: SQL[] = [];
    const employeesOptionsFilters: SQL[] = [];
    const productsOptionsFilters: SQL[] = [];

    if (options?.ensureActive) {
      optionsFilters.push(eq(businesses.isActive, true));
      groupsOptionsFilters.push(eq(groups.isActive, true));
      employeesOptionsFilters.push(eq(employees.isActive, true));
      productsOptionsFilters.push(eq(products.isActive, true));
    }

    const [business] = await this.db
      .select({
        ...getTableColumns(businesses),
        rootUser: getTableColumns(users),
      })
      .from(businesses)
      .innerJoin(users, eq(businesses.rootUserId, users.id))
      .where(and(eq(businesses.id, id), ...optionsFilters));

    if (!business) {
      return null;
    }

    const findGroupsPromise = this.db
      .select()
      .from(groups)
      .where(and(eq(groups.businessId, id), ...groupsOptionsFilters));

    const findEmployeesPromise = this.db
      .select({ ...getTableColumns(users) })
      .from(employees)
      .innerJoin(users, eq(employees.userId, users.id))
      .where(and(eq(employees.businessId, id), ...employeesOptionsFilters))
      .groupBy(users.id);

    const countProductsPromise = this.db
      .select({ total: count(products.id) })
      .from(products)
      .where(and(eq(products.businessId, id), ...productsOptionsFilters));

    const [groupsRes, employeesRes, [totalProducts]] = await Promise.all([
      findGroupsPromise,
      findEmployeesPromise,
      countProductsPromise,
    ]);

    return {
      ...business,
      employees: employeesRes,
      groups: groupsRes,
      totalProducts: totalProducts?.total ?? 0,
    };
  }
}
