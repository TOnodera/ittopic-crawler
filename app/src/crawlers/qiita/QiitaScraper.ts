import { NewArticle } from '@/store/articleStore.js';
import { Request, Dictionary } from 'crawlee';
import { Page } from 'playwright';
import { Scraper } from '../Scraper.js';
import { createHash } from 'crypto';
import { SITE } from '@/config.js';

export default class ClassmethodScraper implements Scraper {
  async getPageData(request: Request<Dictionary>, page: Page, siteId: SITE): Promise<NewArticle> {
    // データ取得部
    const title = await page.title();
    const content = (await page.locator('.style-itrjxe').first().textContent()) as string;
    const contentHash = createHash('md5').update(content).digest('hex');
    const url = request.url;
    const contentId = url.split('/').pop() as string;

    return {
      title,
      siteId,
      content,
      contentHash,
      contentId,
      url,
    };
  }
  getSelector() {
    return 'article.style-l2axsx > a';
  }
}
