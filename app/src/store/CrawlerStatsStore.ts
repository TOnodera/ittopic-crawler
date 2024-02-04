import { AxiosInstance } from 'axios';
import { CrawlerStats } from 'shared';

export class CrawlerStatsStore {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async createCrawlerStats(data: CrawlerStats) {
    await this.client.post('/crawler-stats-writer', data);
  }
}
