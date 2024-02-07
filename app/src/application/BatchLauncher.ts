import { SITE } from '@/config.js';
import { Crawler } from '@/application/Crawler.js';
import { AxiosInstance } from 'axios';
import { AppStore } from '@/store/AppStore';
import { BatchResult } from 'shared';
import { BatchTimer } from '@/utils/time';

export class BatchEntry {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  crawl = async (): Promise<void> => {
    const appStore = new AppStore(this.client);
    const crawler = new Crawler(appStore);
    const batchTimer = new BatchTimer();

    // 時間計測開始
    batchTimer.start();

    // クローリング実行
    // Promis.all([])でやりたいところだが、crawleeでまだ未対応(experimenttal)なのでやめとく
    const crawlingResults = [
      await crawler.run(SITE.CLASSMETHOD),
      await crawler.run(SITE.CYBOZUSHIKI),
      await crawler.run(SITE.FREEE),
      await crawler.run(SITE.QIITA),
      await crawler.run(SITE.SONICGARDEN),
    ];

    // 時間計測終了
    batchTimer.end();
    // 取得したすべてのデータを詰め込む
    const batchResult = {
      crawlingResults,
      batchHistory: {
        ...batchTimer.getResult(),
      },
    } as BatchResult;
    // APIに投げて保存
    await appStore.regist(batchResult);
  };
}
