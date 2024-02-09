import { NewArticle } from '@/store/AppStore.js';
import { Request, Dictionary } from 'crawlee';
import { Scraper } from '../Scraper.js';
import { SITE } from '@/config.js';
import { Ogp } from '@/utils/ogp.js';
import { CheerioAPI } from 'cheerio';

export class SansanScraper implements Scraper {
  private ogp: Ogp;
  constructor(ogp: Ogp) {
    this.ogp = ogp;
  }
  getPageData(request: Request<Dictionary>, $: CheerioAPI, siteId: SITE): NewArticle {
    // データ取得部
    const title = $('title').text();
    const content = $('.hatenablog-entry').first().text();
    const url = request.url;
    const urlWords = url.split('/');
    const contentId = `entry-${urlWords[4]}-${urlWords[5]}-${urlWords[6]}-${urlWords[7]}`;
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
    return 'a.entry-see-more';
  }
}
