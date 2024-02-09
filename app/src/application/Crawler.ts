import { CheerioCrawler } from 'crawlee';
import { SITES, SITE, config, MIN_CONCURRENCY, MAX_CONCURRENCY } from '@/config.js';
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
    const factory = new ScraperFactory(new Ogp());
    const scraper = factory.get(siteId);
    const domain = new ArticleDomain(this.store, siteId);
    const handlerFactory = new HandlerFactory(scraper, siteId, domain);

    const urls = SITES[siteId].urls;
    const requestHandler = await handlerFactory.get();
    const crawler = new CheerioCrawler(
      {
        requestHandler,
        minConcurrency: MIN_CONCURRENCY,
        maxConcurrency: MAX_CONCURRENCY,
      },
      config
    );
    const stats = await crawler.run(urls);
    const articles = this.store.getBuffAll();

    return { siteId, stats: { ...stats, siteId }, articles };
  };
}
