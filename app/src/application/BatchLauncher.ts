import { SITE } from '@/config.js';
import { Crawler } from '@/application/Crawler.js';
import { AxiosInstance } from 'axios';
import { AppStore } from '@/store/AppStore';

export class BatchEntry {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  launch = async (): Promise<void> => {
    const appStore = new AppStore(this.client);
    const batchHistoryId = await appStore.createBatchHistory();
    const crawler = new Crawler(appStore, batchHistoryId);

    const result = [
      // await crawler.run(SITE.CLASSMETHOD),
      // await crawler.run(SITE.CYBOZUSHIKI),
      // await crawler.run(SITE.FREEE),
      await crawler.run(SITE.QIITA),
      await crawler.run(SITE.SONICGARDEN),
    ];

    await appStore.regist(result);

    // クローリング終了時刻を保存
    await appStore.updateBatchHistory(batchHistoryId);
  };
}
