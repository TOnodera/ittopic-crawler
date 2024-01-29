import { NewArticle } from '@/store/ArticleStore.js';
import { Request, Dictionary } from 'crawlee';
import { Page } from 'playwright';
import { Scraper } from '../Scraper.js';
import { SITE } from '@/config.js';

export class ClassmethodScraper implements Scraper {
  async getPageData(request: Request<Dictionary>, page: Page, siteId: SITE): Promise<NewArticle> {
    // データ取得部
    const title = await page.title();
    const content = (await page
      .locator('div.main > .content')
      .first()
      .textContent()) as string as string;
    const url = request.url;
    const contentId = url.split('/').slice(-2)[0] as string;
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
    return 'div.post-container > a';
  }
}
