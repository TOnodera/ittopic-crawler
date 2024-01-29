import { CrawlerStatsRegister } from '@/domain/CrawlerStatsRegister.js';
import { CrawlerStats, CrawlerStatsStore } from '@/store/CrawlerStatsStore.js';

export class StatsRegister {
  private batchHistoryId: number;
  private store: CrawlerStatsStore;
  constructor(store: CrawlerStatsStore, batchHistoryId: number) {
    this.store = store;
    this.batchHistoryId = batchHistoryId;
  }

  regist = async (stats: CrawlerStats) => {
    const statsRegister = new CrawlerStatsRegister(this.store, this.batchHistoryId);
    await statsRegister.regist(stats);
  };
}
