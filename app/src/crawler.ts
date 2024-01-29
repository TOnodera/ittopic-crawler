import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { HandlerFactory } from './scrapers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ScraperFactory } from './scrapers/ScraperFactory.js';

export const startCrawling = async (siteId: SITE) => {
  const client = getPrismaClient();
  const store = new ArticleStore(client);
  const scraper = ScraperFactory.get(siteId);
  const domain = new ArticleDomain(store, siteId);
  const handleFactory = new HandlerFactory(scraper, siteId, domain);

  const urls = SITES[siteId].urls;
  const requestHandler = await handleFactory.get();
  const classmethodCrawler = new PlaywrightCrawler({ requestHandler });
  return await { ...classmethodCrawler.run(urls), siteId };
};
