import { SITE } from '@/config.js';
import { AxiosInstance } from 'axios';

export interface CrawlerStats {
  requestsFinished: number | null;
  requestsFailed: number | null;
  retryHistogram: number[];
  requestAvgFailedDurationMillis: number | null;
  requestAvgFinishedDurationMillis: number | null;
  requestsFinishedPerMinute: number | null;
  requestsFailedPerMinute: number | null;
  requestTotalDurationMillis: number | null;
  requestsTotal: number | null;
  crawlerRuntimeMillis: number | null;
  siteId: SITE;
  batchHistoryId: number;
}

export class CrawlerStatsStore {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async createCrawlerStats(data: CrawlerStats) {
    await this.client.post('/crawler-stats-writer', data);
  }
}
