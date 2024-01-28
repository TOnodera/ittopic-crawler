import { Scraper } from './Scraper.js';
import { createPlaywrightRouter } from 'crawlee';
import { SITE } from 'src/config.js';
import { ArticleDomain } from 'src/domain/ArticleDomain.js';

/**
 * crawleeに登録する詳細ページに入った後のハンドラをここで登録する
 *
 * 基本ロジックはどのサイトでも
 * ・一覧ページに掲載されている記事のURLを取得
 * ・詳細ページのURLとタイトル・本文などを保存
 * という流れになる。
 *
 * なのでベースになる抽象ロジックを記載して、詳細なロジックはDIする。
 * Scraperはサイトごとのデータの取得方法、ArticleDomainは登録方法についてのビジネスロジックが書かれている。
 */
export class HandlerFactory {
  private scraper: Scraper;
  private siteId: SITE;
  private domain: ArticleDomain;
  constructor(scraper: Scraper, siteId: SITE, domain: ArticleDomain) {
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
        // TODO 指定したセレクタでデータが取得できない場合はhtml構造が変化した可能性があるので通知処理を行う
      }
    });
    return requestHandler;
  };
}
