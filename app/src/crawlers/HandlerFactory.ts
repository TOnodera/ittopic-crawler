import { Scraper } from './scraper.js';
import { ArticleStore } from '@/store/articleStore.js';
import { Request, createPlaywrightRouter } from 'crawlee';
import { Page } from 'playwright';
import { SITE } from '@/config.js';
import { logger } from '@/utils.js';

export default class HandlerFactory {
  private articleStore: ArticleStore;
  private scraper: Scraper;
  private siteId: SITE;
  constructor(articleStore: ArticleStore, scraper: Scraper, siteId: SITE) {
    this.articleStore = articleStore;
    this.scraper = scraper;
    this.siteId = siteId;
  }

  get = async () => {
    const requestHandler = createPlaywrightRouter();
    // 詳細ページのハンドラ
    requestHandler.addHandler('ARTICLE', async ({ request, page }): Promise<void> => {
      const data = await this.scraper.getPageData(request, page, this.siteId);
      /**
       * データ登録部
       */
      // データが存在しない場合は新規登録
      const oldArticle = await this.articleStore.getArticleByContentId(this.siteId, data.contentId);
      if (!oldArticle) {
        await this.articleStore.createArticle(data);
        logger.info(`${SITE[this.siteId]} title: ${data.title} を登録しました`);
      }
      // データは存在するが、ハッシュ値が登録済みデータと一致しない場合はデータが更新されたとみなしてDBも更新する
      else {
        if (oldArticle.contentHash != data.contentHash) {
          await this.articleStore.updateArticle({ ...oldArticle, ...data });
          logger.info(`${SITE[this.siteId]} title: ${data.title} を更新しました`);
        }
      }
    });
    // enqueueLinksのセレクタに一覧ページに表示されている取得したい記事のリンクのセレクタを入れる
    requestHandler.addDefaultHandler(async ({ enqueueLinks }) => {
      const result = await enqueueLinks({ selector: this.scraper.getSelector(), label: 'ARTICLE' });
      if (0 < result.unprocessedRequests.length) {
        // 指定したセレクタでデータが取得できない場合はhtml構造が変化した可能性があるので通知処理を行う
      }
    });
    return requestHandler;
  };
}
