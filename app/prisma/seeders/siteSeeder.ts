import { PrismaClient } from '@prisma/client';
import * as config from '@/config.js';
import { logger } from '@/utils.js';

export const siteSeeder = async (client: PrismaClient) => {
  await client.site.deleteMany();
  for (const key in config.SITES) {
    const data = config.SITES[key];
    await client.site.create({ data: { id: data.id, name: data.name } });
  }
  logger.info('Siteマスタのシーディングが完了しました');
};
