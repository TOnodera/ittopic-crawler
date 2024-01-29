import { SITE } from '@/config.js';
import { PrismaClient } from '@prisma/client';

export interface CrawlerStats {
  requestsFinished?: number;
  requestsFailed?: number;
  retryHistogram?: string;
  requestAvgFailedDurationMillis?: number;
  requestAvgFinishedDurationMillis?: number;
  requestsFinishedPerMinute?: number;
  requestsFailedPerMinute?: number;
  requestTotalDurationMillis?: number;
  requestsTotal?: number;
  crawlerRuntimeMillis?: number;
  siteId: SITE;
}

export class CrawlerStatsStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  async createCrawlerStats(data: CrawlerStats) {
    await this.client.crawlerStats.create({ data });
  }
}
