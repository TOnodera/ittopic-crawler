import { logger } from '@/utils/logger.js';
import { runSeed } from './seeders.js';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
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
