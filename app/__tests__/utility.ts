import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { runSeed } from 'prisma/seeders/seeders.js';

export const seedDatabase = async (client: PrismaClient) => {
  if (process.env.NODE_ENV == 'production') {
    throw new Error('本番環境ではこの操作は行えません');
  }

  try {
    await runSeed(client);
  } catch (error) {
    console.error({ error });
  }
};

export const resetDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV == 'production') {
    throw new Error('本番環境ではデータベースの削除は行えません');
  }
  await exec(`npx prisma migrate reset --force`);
};

export const resetAndSeedDatabase = async (client: PrismaClient) => {
  await resetDatabase();
  await seedDatabase(client);
};
