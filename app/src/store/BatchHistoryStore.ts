import { localNow } from '@/utils/time.js';
import { PrismaClient } from '@prisma/client';


export class BatchHistoryStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  async createBatchHistory(data?: BatchHistory): Promise<number> {
    const result = await this.client.batchHistory.create({ data });
    return result.id;
  }
  async updateBatchHistory(id: number, data?: BatchHistory): Promise<number> {
    const now = localNow().toJSDate();
    const result = await this.client.batchHistory.update({
      where: { id },
      data: { ...data, endAt: now, updatedAt: now },
    });
    return result.id;
  }
  async getBatchHistory(id: number) {
    return await this.client.batchHistory.findUnique({ where: { id } });
  }
}
