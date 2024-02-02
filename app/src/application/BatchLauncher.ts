import { SITE } from '@/config.js';
import { Crawler } from '@/application/Crawler.js';
import { StatsRegister } from '@/application/StatsRegister.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { BatchHistoryStore } from '@/store/BatchHistoryStore.js';
import { CrawlerStatsStore } from '@/store/CrawlerStatsStore.js';
import { AxiosInstance } from 'axios';

export class BatchEntry {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  launch = async (): Promise<void> => {
    const batchHistoryStore = new BatchHistoryStore(this.client);
    const crawlerStatsStore = new CrawlerStatsStore(this.client);
    const articleStore = new ArticleStore(this.client);
    const batchHistoryId = await batchHistoryStore.createBatchHistory();
    const statsRegister = new StatsRegister(crawlerStatsStore);
    const crawler = new Crawler(articleStore, batchHistoryId);

    [
      // await crawler.run(SITE.CLASSMETHOD),
      // await crawler.run(SITE.CYBOZUSHIKI),
      // await crawler.run(SITE.FREEE),
      // await crawler.run(SITE.QIITA),
      await crawler.run(SITE.SONICGARDEN),
    ]
      // 統計情報の保存(事後処理)
      .forEach(statsRegister.regist);

    // クローリング終了時刻を保存
    await batchHistoryStore.updateBatchHistory(batchHistoryId);
  };
}
