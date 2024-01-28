import { PrismaClient } from '@prisma/client';
import { SITES } from '@/config.js';
import { logger } from '@/utils/logger.js';

export const siteSeeder = async (client: PrismaClient) => {
  await client.site.deleteMany();
  for (const key in SITES) {
    const data = SITES[key];
    await client.site.create({ data: { id: data.id, name: data.name } });
  }
  logger.info('Siteマスタのシーディングが完了しました');
};
