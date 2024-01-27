import { PrismaClient } from '@prisma/client';
import * as config from '@/config.js';
import { logger } from '@/utils.js';

export const siteSeeder = async (client: PrismaClient) => {
  await client.site.deleteMany();
  for (const data of config.SITES) {
    logger.debug(data);
    await client.site.create({ data });
  }
  logger.info('Siteマスタのシーディングが完了しました');
};
