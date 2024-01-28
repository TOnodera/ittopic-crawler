import { NewArticle } from 'src/store/articleStore.js';
import { Request, Dictionary } from 'crawlee';
import { Page } from 'playwright';
import { Scraper } from '../Scraper.js';
import { createHash } from 'crypto';
import { SITE } from 'src/config.js';

export class ClassmethodScraper implements Scraper {
  async getPageData(request: Request<Dictionary>, page: Page, siteId: SITE): Promise<NewArticle> {
    // データ取得部
    const title = await page.title();
    const content = (await page
      .locator('div.main > .content')
      .first()
      .textContent()) as string as string;
    const contentHash = createHash('md5')
      .update(content as string)
      .digest('hex');
    const url = request.url;
    const contentId = url.split('/').slice(-2)[0] as string;
    console.error(contentId);
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
    return 'div.post-container > a';
  }
}
