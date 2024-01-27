import { PrismaClient } from '@prisma/client';
import * as config from '../../src/config.js';
import { logger } from '../../src/utils.js';

const prisma = new PrismaClient();

const seeder = async () => {
  await prisma.site.deleteMany();
  for (const data of config.SITES) {
    logger.debug(data);
    await prisma.site.create({ data });
  }
};

seeder()
  .then(() => {
    logger.info('siteマスタのシーディングが完了しました');
  })
  .catch(() => {
    logger.error('siteマスタのシーディングに失敗しました');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
