import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { HandlerFactory } from '../scrapers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ScraperFactory } from '../scrapers/ScraperFactory.js';
import { CrawlerStats } from '../store/CrawlerStatsStore.js';

export class Crawler {
  private store: ArticleStore;
  private batchHistoryId: number;
  constructor(store: ArticleStore, batchHistoryId: number) {
    this.store = store;
    this.batchHistoryId = batchHistoryId;
  }

  run = async (siteId: SITE): Promise<CrawlerStats> => {
    const scraper = ScraperFactory.get(siteId);
    const domain = new ArticleDomain(this.store, siteId);
    const handleFactory = new HandlerFactory(scraper, siteId, domain);

    const urls = SITES[siteId].urls;
    const requestHandler = await handleFactory.get();
    const classmethodCrawler = new PlaywrightCrawler({ requestHandler });
    const result = await classmethodCrawler.run(urls);
    return { ...result, siteId, batchHistoryId: this.batchHistoryId };
  };
}
