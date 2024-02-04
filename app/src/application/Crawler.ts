import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { AppStore } from '@/store/AppStore.js';
import { HandlerFactory } from '../scrapers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ScraperFactory } from '../scrapers/ScraperFactory.js';
import { CrawlingResult } from 'shared/index.js';

export class Crawler {
  private store: AppStore;
  private batchHistoryId: number;
  constructor(store: AppStore, batchHistoryId: number) {
    this.store = store;
    this.batchHistoryId = batchHistoryId;
  }

  run = async (siteId: SITE): Promise<CrawlingResult> => {
    const scraper = ScraperFactory.get(siteId);
    const domain = new ArticleDomain(this.store, siteId, this.batchHistoryId);
    const handleFactory = new HandlerFactory(scraper, siteId, domain);

    const urls = SITES[siteId].urls;
    const requestHandler = await handleFactory.get();
    const crawler = new PlaywrightCrawler({ requestHandler });
    const stats = await crawler.run(urls);
    const articles = this.store.getBuffAll();

    return { siteId, stats: { ...stats, siteId, batchHistoryId: this.batchHistoryId }, articles };
  };
}
