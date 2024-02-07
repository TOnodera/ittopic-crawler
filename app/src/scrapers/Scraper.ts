import { SITE } from '@/config.js';
import { NewArticle } from '@/store/AppStore';
import { Request } from 'crawlee';
import { CheerioAPI } from 'cheerio';

export interface Scraper {
  /**
   * 詳細ページのデータ取得に関する具体的な実装を記述する
   *
   * @param request
   * @param page
   * @param siteId
   */
  getPageData(request: Request, $: CheerioAPI, siteId: SITE): NewArticle;

  /**
   * 一覧ページから記事詳細ページを取得するためのcss selectorを返す
   */
  getSelector(): string;
}
