import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { SonicgardenScraper } from './SonicgardenScraper.js';
import { HandlerFactory } from '@/crawlers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

export const sonicgardenLauncher = async (siteId: SITE) => {
  const client = getPrismaClient();
  const store = new ArticleStore(client);
  const scraper = new SonicgardenScraper();
  const domain = new ArticleDomain(store, siteId);
  const factory = new HandlerFactory(scraper, siteId, domain);

  const urls = SITES[siteId].urls;
  const requestHandler = await factory.get();
  const sonicgardenCrawler = new PlaywrightCrawler({ requestHandler });
  const result = sonicgardenCrawler.run(urls);
  return await { ...result, siteId };
};
