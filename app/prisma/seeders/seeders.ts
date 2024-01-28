import { PrismaClient } from '@prisma/client';
import { siteSeeder } from './siteSeeder.js';
import { logger } from '@/utils.js';

const client = new PrismaClient();

const run = async (client: PrismaClient) => {
  await Promise.all([siteSeeder(client)]);
};

run(client)
  .then(() => {
    logger.info('シーディングが完了しました');
  })
  .catch((e) => {
    logger.error(`シーディング中にエラーが発生しました: ${e}`);
  })
  .finally(async () => {
    await client.$disconnect();
  });
