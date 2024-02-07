import { CheerioCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { AppStore } from '@/store/AppStore.js';
import { HandlerFactory } from '../scrapers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ScraperFactory } from '../scrapers/ScraperFactory.js';
import { CrawlingResult } from 'shared/index.js';
import { Ogp } from '@/utils/ogp.js';

export class Crawler {
  private store: AppStore;
  constructor(store: AppStore) {
    this.store = store;
  }

  run = async (siteId: SITE): Promise<CrawlingResult> => {
    const ogp = new Ogp();
    const factory = new ScraperFactory(ogp);
    const scraper = factory.get(siteId);
    const domain = new ArticleDomain(this.store, siteId);
    const handleFactory = new HandlerFactory(scraper, siteId, domain);

    const urls = SITES[siteId].urls;
    const requestHandler = await handleFactory.get();
    const crawler = new CheerioCrawler({ requestHandler });
    const stats = await crawler.run(urls);
    const articles = this.store.getBuffAll();

    return { siteId, stats: { ...stats, siteId }, articles };
  };
}
