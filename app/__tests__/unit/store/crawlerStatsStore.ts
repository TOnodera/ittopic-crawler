import { test, describe, expect } from '@jest/globals';
import { SITE } from '@/config.js';
import { PrismaClient } from '@prisma/client';
import { resetAndSeedDatabase } from '../../settings/utility.js';
import { CrawlerStats, CrawlerStatsStore } from '@/store/CrawlerStatsStore.js';
import { batchHistorySeeder } from 'prisma/seeders/batchHistorySeeder.js';

const client = new PrismaClient();
const store = new CrawlerStatsStore(client);
const fixtures = [
  {
    requestsFinished: 1,
    requestsFailed: 2,
    retryHistogram: [1, 2, 3, 4],
    requestAvgFailedDurationMillis: 3,
    requestAvgFinishedDurationMillis: 4,
    requestsFinishedPerMinute: 5,
    requestsFailedPerMinute: 6,
    requestTotalDurationMillis: 7,
    requestsTotal: 8,
    crawlerRuntimeMillis: 9,
    siteId: SITE.CLASSMETHOD,
    batchHistoryId: 1,
  },
  {
    requestsFinished: undefined,
    requestsFailed: undefined,
    retryHistogram: [],
    requestAvgFailedDurationMillis: undefined,
    requestAvgFinishedDurationMillis: undefined,
    requestsFinishedPerMinute: undefined,
    requestsFailedPerMinute: undefined,
    requestTotalDurationMillis: undefined,
    requestsTotal: undefined,
    crawlerRuntimeMillis: undefined,
    siteId: SITE.CLASSMETHOD,
    batchHistoryId: 2,
  },
] as CrawlerStats[];

describe('crawlerStatsStoreのテスト', () => {
  beforeAll(async () => {
    await resetAndSeedDatabase(client);
    return await batchHistorySeeder(client);
  });
  test('データの登録ができること', async () => {
    for (const idx in fixtures) {
      await store.createCrawlerStats(fixtures[idx]);
      const result = await store.getCrawlerStats(Number(idx + 1));
      expect(result?.requestsFailedPerMinute).toBe(fixtures[idx].requestsFailedPerMinute);
    }
  });
});
