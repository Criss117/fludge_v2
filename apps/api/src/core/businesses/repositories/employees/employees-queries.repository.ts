import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, inArray, type SQL } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';
import { employees, groups, users } from '@fludge/db';
import { DBSERVICE, type LibSQLDatabase } from '@/core/db/db.module';
import type {
  EmployeeDetail,
  EmployeeSummary,
} from '@fludge/entities/employee.entity';
import { FindManyEmployeeByDto } from '../dtos/employees/find-many-employees-by.dto';
import { FindOneEmployeeDto } from '../dtos/employees/find-one-employee.dto';

type Options = {
  ensureActive?: boolean;
};

@Injectable()
export class EmployeesQueriesRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async findOne(
    meta: FindOneEmployeeDto,
    options?: Options,
  ): Promise<EmployeeDetail | null> {
    const optionsFilters: SQL[] = [];
    const userOptionsFilters: SQL[] = [];

    if (options?.ensureActive) {
      optionsFilters.push(eq(employees.isActive, true));
      userOptionsFilters.push(eq(users.isActive, true));
    }

    const [user] = await this.db
      .select({
        ...getTableColumns(users),
        groupIds: employees.groupIds,
      })
      .from(users)
      .leftJoin(
        employees,
        and(
          eq(employees.userId, meta.userId),
          eq(employees.businessId, meta.businessId),
        ),
      )
      .where(and(eq(users.id, meta.userId), ...optionsFilters));

    if (!user) return null;

    if (!user.groupIds) {
      return {
        ...user,
        employeeIn: meta.businessId,
        groups: [],
      };
    }

    const groupsSummary = await this.db
      .select()
      .from(groups)
      .where(inArray(groups.id, user.groupIds));

    return {
      ...user,
      employeeIn: meta.businessId,
      groups: groupsSummary,
    };
  }

  public async findManyBy(
    meta: FindManyEmployeeByDto,
    options?: Options,
  ): Promise<EmployeeSummary[]> {
    const optionsFilters: SQL[] = [];

    if (options?.ensureActive) {
      optionsFilters.push(eq(employees.isActive, true));
    }

    if (meta.userId) {
      optionsFilters.push(inArray(employees.userId, meta.userId));
    }

    return this.db
      .select()
      .from(employees)
      .where(and(eq(employees.businessId, meta.businessId), ...optionsFilters))
      .orderBy(desc(employees.createdAt));
  }
}
