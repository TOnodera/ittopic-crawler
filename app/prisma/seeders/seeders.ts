import { PrismaClient } from '@prisma/client';
import { siteSeeder } from './siteSeeder.js';
import { logger } from '@/utils/logger.js';

const client = new PrismaClient();

export const runSeed = async (client: PrismaClient) => {
  return await Promise.all([siteSeeder(client)]);
};

runSeed(client)
  .then(() => {
    logger.info('シーディングが完了しました');
  })
  .catch((e) => {
    logger.error(`シーディング中にエラーが発生しました: ${e}`);
  })
  .finally(async () => {
    await client.$disconnect();
  });
