import { test, describe, expect } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { resetAndSeedDatabase } from '../../settings/utility.js';
import { BatchHistory, BatchHistoryStore } from '@/store/BatchHistoryStore.js';
import { localNow } from '@/utils/time.js';

const client = new PrismaClient();
const store = new BatchHistoryStore(client);
const fixtures = [
  {
    startAt: localNow().toJSDate(),
    endAt: localNow().plus({ minutes: 10 }).toJSDate(),
    createdAt: localNow().toJSDate(),
    updatedAt: localNow().plus({ minutes: 11 }).toJSDate(),
  },
  {
    startAt: localNow().toJSDate(),
    endAt: localNow().plus({ minutes: 5 }).toJSDate(),
    createdAt: localNow().toJSDate(),
    updatedAt: localNow().plus({ minutes: 7 }).toJSDate(),
  },
  {
    startAt: undefined,
    endAt: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
] as unknown as BatchHistory[];

describe('BatchHistoryStoreのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });
  test('データの登録ができること', async () => {
    for (const idx in fixtures) {
      await store.createBatchHistory(fixtures[idx]);
      const result = await store.getBatchHistory(Number(idx) + 1);
      if (fixtures[idx].startAt) {
        expect(result?.startAt.toDateString()).toBe(fixtures[idx].startAt?.toDateString());
      }
    }
  });
});
