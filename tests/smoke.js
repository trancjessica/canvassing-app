const { PrismaClient } = require('@prisma/client');

/**
 * Smoke test script to verify Prisma Client setup.
 * Creates a new note and retrieves all notes from the database.
 */
async function main() {
  const prisma = new PrismaClient();
  try {
    const r = await prisma.note.create({
      data: {
        name: 'CLI Test',
        notes: 'Inserted via smoke test',
        timestamp: new Date(),
      },
    });
    console.log('Created:', JSON.stringify(r));

    const all = await prisma.note.findMany({ orderBy: { timestamp: 'desc' } });
    console.log('All count:', all.length);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

// main(); // Disabled to prevent automatic execution. Uncomment to run the smoke test.
