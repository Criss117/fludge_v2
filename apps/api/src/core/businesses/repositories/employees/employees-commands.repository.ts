import { and, eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { DBSERVICE, type TX, type LibSQLDatabase } from '@/core/db/db.module';
import { employees, type InsertEmployee } from '@fludge/db';

type Options = {
  tx: TX;
};

@Injectable()
export class EmployeesCommandsRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async save(data: InsertEmployee, options?: Options) {
    const db = options?.tx ?? this.db;

    return db
      .insert(employees)
      .values(data)
      .onConflictDoUpdate({
        target: [employees.businessId, employees.userId],
        set: {
          groupIds: data.groupIds,
          updatedAt: new Date(),
        },
      });
  }

  public async saveAndReturn(data: InsertEmployee, options?: Options) {
    const db = options?.tx ?? this.db;

    const [employeeCreated] = await db
      .insert(employees)
      .values(data)
      .onConflictDoUpdate({
        target: [employees.businessId, employees.userId],
        set: {
          groupIds: data.groupIds,
          updatedAt: new Date(),
        },
      })
      .returning();

    return employeeCreated;
  }

  public async delete(
    businessId: string,
    employeeId: string,
    options?: Options,
  ) {
    const db = options?.tx ?? this.db;

    await db
      .update(employees)
      .set({
        isActive: false,
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(employees.businessId, businessId),
          eq(employees.userId, employeeId),
          eq(employees.isActive, true),
        ),
      );
  }
}
