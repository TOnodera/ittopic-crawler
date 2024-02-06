import { SITE } from '@/config.js';
import { Crawler } from '@/application/Crawler.js';
import { AxiosInstance } from 'axios';
import { AppStore } from '@/store/AppStore';
import { BatchResult } from 'shared';

export class BatchEntry {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  crawl = async (): Promise<void> => {
    const appStore = new AppStore(this.client);
    const crawler = new Crawler(appStore);

    // 開始時刻を取得
    const startAt = new Date();

    // クローリング実行
    // Promis.all([])でやりたいところだが、crawleeでまだ未対応(experimenttal)なのでやめとく
    const crawlingResults = [
      await crawler.run(SITE.CLASSMETHOD),
      await crawler.run(SITE.CYBOZUSHIKI),
      await crawler.run(SITE.FREEE),
      await crawler.run(SITE.QIITA),
      await crawler.run(SITE.SONICGARDEN),
    ];

    // 終了時刻を取得
    const endAt = new Date();
    // 取得したすべてのデータを詰め込む
    const batchResult = {
      crawlingResults,
      batchHistory: {
        startAt,
        endAt,
      },
    } as BatchResult;
    // APIに投げて保存
    await appStore.regist(batchResult);
  };
}
