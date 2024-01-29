import { PlaywrightCrawler, createPlaywrightRouter } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { CybozushikiScraper } from './CybozushikiScraper.js';
import { HandlerFactory } from '@/crawlers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

export const cybozushikiLauncher = async (siteId: SITE) => {
  const client = getPrismaClient();
  const store = new ArticleStore(client);
  const scraper = new CybozushikiScraper();
  const domain = new ArticleDomain(store, siteId);
  const factory = new HandlerFactory(scraper, siteId, domain);

  const urls = SITES[siteId].urls;
  const requestHandler = await factory.get();
  const cybosushikiCrawler = new PlaywrightCrawler({ requestHandler });
  const result = await cybosushikiCrawler.run(urls);
  return { ...result, siteId };
};
