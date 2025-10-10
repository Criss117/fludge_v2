import { Inject, Injectable } from '@nestjs/common';
import { DBSERVICE, TX, type LibSQLDatabase } from '@/core/db/db.module';
import { businesses, type InsertBusiness } from '@fludge/db';

type Options = {
  tx?: TX;
};

@Injectable()
export class BusinessesCommandsRepository {
  constructor(@Inject(DBSERVICE) private readonly db: LibSQLDatabase) {}

  public async saveAndReturn(data: InsertBusiness, options?: Options) {
    const db = options?.tx ?? this.db;

    const [savedBusiness] = await db
      .insert(businesses)
      .values(data)
      .onConflictDoUpdate({
        target: businesses.id,
        set: { ...data, updatedAt: new Date() },
      })
      .returning();

    return savedBusiness;
  }

  public async save(data: InsertBusiness, options?: Options) {
    const db = options?.tx ?? this.db;

    await db
      .insert(businesses)
      .values(data)
      .onConflictDoUpdate({
        target: businesses.id,
        set: { ...data, updatedAt: new Date() },
      });
  }
}
