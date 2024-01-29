import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { FreeeScraper } from './FreeeScraper.js';
import { HandlerFactory } from '@/crawlers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

export const freeeLauncher = async (siteId: SITE) => {
  const client = getPrismaClient();
  const store = new ArticleStore(client);
  const scraper = new FreeeScraper();
  const domain = new ArticleDomain(store, siteId);
  const factory = new HandlerFactory(scraper, siteId, domain);

  const urls = SITES[siteId].urls;
  const requestHandler = await factory.get();
  const freeeCrawler = new PlaywrightCrawler({ requestHandler });
  return await { ...freeeCrawler.run(urls), siteId };
};
