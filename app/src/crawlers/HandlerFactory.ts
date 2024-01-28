import { Scraper } from './Scraper.js';
import { ArticleStore } from '@/store/articleStore.js';
import { createPlaywrightRouter } from 'crawlee';
import { SITE } from '@/config.js';
import SaveArticle from '@/domain/SaveArticle.js';

export default class HandlerFactory {
  private scraper: Scraper;
  private siteId: SITE;
  private domain: SaveArticle;
  constructor(scraper: Scraper, siteId: SITE, domain: SaveArticle) {
    this.scraper = scraper;
    this.siteId = siteId;
    this.domain = domain;
  }

  get = async () => {
    const requestHandler = createPlaywrightRouter();
    // 詳細ページのハンドラ
    requestHandler.addHandler('ARTICLE', async ({ request, page }): Promise<void> => {
      const data = await this.scraper.getPageData(request, page, this.siteId);
      await this.domain.save(data);
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
