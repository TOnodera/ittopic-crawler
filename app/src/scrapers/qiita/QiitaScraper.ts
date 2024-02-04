import { NewArticle } from '@/store/AppStore.js';
import { Request, Dictionary } from 'crawlee';
import { Page } from 'playwright';
import { Scraper } from '../Scraper.js';
import { SITE } from '@/config.js';

export class QiitaScraper implements Scraper {
  async getPageData(request: Request<Dictionary>, page: Page, siteId: SITE): Promise<NewArticle> {
    // データ取得部
    const title = await page.title();
    const content = (await page.locator('.style-itrjxe').first().textContent()) as string;
    const url = request.url;
    const contentId = url.split('/').pop() as string;

    return {
      title,
      siteId,
      content,
      contentHash: '',
      contentId,
      url,
    };
  }
  getSelector() {
    return 'article.style-l2axsx > a';
  }
}
