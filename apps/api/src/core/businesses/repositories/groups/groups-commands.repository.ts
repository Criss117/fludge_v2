import { and, eq, inArray } from 'drizzle-orm';
import { DBSERVICE, TX, type LibSQLDatabase } from '@/core/db/db.module';
import { Inject, Injectable } from '@nestjs/common';
import { groups, type InsertGroup } from '@fludge/db';

type Options = {
  tx?: TX;
};

@Injectable()
export class GroupsCommandsRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async save(data: InsertGroup, options?: Options) {
    const db = options?.tx ?? this.db;

    await db
      .insert(groups)
      .values(data)
      .onConflictDoUpdate({
        target: groups.id,
        set: { ...data, updatedAt: new Date() },
      });
  }

  public async saveMany(data: InsertGroup[], options?: Options) {
    const db = options?.tx ?? this.db;

    await db
      .insert(groups)
      .values(data)
      .onConflictDoUpdate({
        target: groups.id,
        set: { ...groups, updatedAt: new Date() },
      });
  }

  public async saveAndReturn(data: InsertGroup, options?: Options) {
    const db = options?.tx ?? this.db;

    const [savedGroup] = await db
      .insert(groups)
      .values(data)
      .onConflictDoUpdate({
        target: groups.id,
        set: { ...data, updatedAt: new Date() },
      })
      .returning();

    return savedGroup;
  }

  public async saveManyAndReturn(data: InsertGroup[], options?: Options) {
    const db = options?.tx ?? this.db;

    const [savedGroups] = await db
      .insert(groups)
      .values(data)
      .onConflictDoUpdate({
        target: groups.id,
        set: { ...groups, updatedAt: new Date() },
      })
      .returning();

    return savedGroups;
  }

  public async delete(businessId: string, groupId: string, options?: Options) {
    const db = options?.tx ?? this.db;

    await db
      .update(groups)
      .set({ isActive: false, updatedAt: new Date() })
      .where(
        and(
          eq(groups.id, groupId),
          eq(groups.businessId, businessId),
          eq(groups.isActive, true),
        ),
      );
  }

  public async deleteMany(
    businessId: string,
    groupIds: string[],
    options?: Options,
  ) {
    const db = options?.tx ?? this.db;

    await db
      .update(groups)
      .set({ isActive: false, updatedAt: new Date() })
      .where(
        and(
          inArray(groups.id, groupIds),
          eq(groups.businessId, businessId),
          eq(groups.isActive, true),
        ),
      );
  }
}
