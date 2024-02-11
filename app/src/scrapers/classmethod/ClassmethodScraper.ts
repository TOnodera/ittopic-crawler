import { NewArticle } from '@/store/AppStore.js';
import { Request, Dictionary } from 'crawlee';
import { Scraper } from '../Scraper.js';
import { SITE } from '@/config.js';
import { Ogp } from '@/utils/ogp.js';
import { CheerioAPI } from 'cheerio';

export class ClassmethodScraper implements Scraper {
  private ogp: Ogp;
  constructor(ogp: Ogp) {
    this.ogp = ogp;
  }
  getPageData(request: Request<Dictionary>, $: CheerioAPI, siteId: SITE): NewArticle {
    // データ取得部
    const title = $('title').text();
    const content = $('div.main > .content').first().text();
    const url = request.url;
    const contentId = decodeURI(url.split('/').slice(-2)[0] as string);
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
    return 'div.post-container > a';
  }
}
