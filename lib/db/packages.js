import { eq } from 'drizzle-orm';
import { getDb } from './client';
import { packages as packagesTable } from './schema';

export async function listPackages() {
  const db = getDb();
  const rows = await db.select().from(packagesTable);
  return rows.map((row) => row.data);
}

export async function replacePackages(nextPackages) {
  const db = getDb();

  await db.transaction(async (tx) => {
    const existing = await tx.select({ id: packagesTable.id }).from(packagesTable);
    const nextIds = new Set(nextPackages.map((pkg) => pkg.id));

    for (const row of existing) {
      if (!nextIds.has(row.id)) {
        await tx.delete(packagesTable).where(eq(packagesTable.id, row.id));
      }
    }

    for (const pkg of nextPackages) {
      await tx
        .insert(packagesTable)
        .values({
          id: pkg.id,
          category: pkg.category || 'outbound',
          title: pkg.title || pkg.id,
          data: pkg,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: packagesTable.id,
          set: {
            category: pkg.category || 'outbound',
            title: pkg.title || pkg.id,
            data: pkg,
            updatedAt: new Date(),
          },
        });
    }
  });
}
