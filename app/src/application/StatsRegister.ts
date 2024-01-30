import { CrawlerStatsRegister } from '@/domain/CrawlerStatsRegister.js';
import { CrawlerStats, CrawlerStatsStore } from '@/store/CrawlerStatsStore.js';

export class StatsRegister {
  private store: CrawlerStatsStore;
  constructor(store: CrawlerStatsStore) {
    this.store = store;
  }

  regist = async (stats: CrawlerStats) => {
    const statsRegister = new CrawlerStatsRegister(this.store);
    await statsRegister.regist(stats);
  };
}
