import { NewArticle } from '@/store/AppStore.js';
import { Request, Dictionary } from 'crawlee';
import { Scraper } from '../Scraper.js';
import { SITE } from '@/config.js';
import { Ogp } from '@/utils/ogp.js';

export class FreeeScraper implements Scraper {
  private ogp: Ogp;
  constructor(ogp: Ogp) {
    this.ogp = ogp;
  }
  getPageData(request: Request<Dictionary>, $: cheerio.CheerioAPI, siteId: SITE): NewArticle {
    // データ取得部
    const title = $('title').text();
    const content = $('div.entry-content').first().text();
    const url = request.url;
    const contentId = url.split('/').pop() as string;
    const ogpInfo = this.ogp.get($);

    return {
      title,
      siteId,
      content,
      contentHash: '',
      contentId,
      url,
      ...ogpInfo,
    };
  }
  getSelector() {
    return 'ul.recent-entries li.urllist-item div.urllist-item-inner > a';
  }
}
