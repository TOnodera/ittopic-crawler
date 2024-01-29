import { PrismaClient } from '@prisma/client';
import { siteSeeder } from './siteSeeder.js';

export const runSeed = (client: PrismaClient) => {
  return Promise.all([siteSeeder(client)]);
};
