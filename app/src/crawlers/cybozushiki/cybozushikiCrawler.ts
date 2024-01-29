import { PlaywrightCrawler, createPlaywrightRouter } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/articleStore.js';
import { CybozushikiScraper } from './CybozushikiScraper.js';
import { HandlerFactory } from '@/crawlers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

const client = getPrismaClient();
const store = new ArticleStore(client);
const scraper = new CybozushikiScraper();
const domain = new ArticleDomain(store, SITE.CYBOZUSHIKI);
const factory = new HandlerFactory(scraper, SITE.CYBOZUSHIKI, domain);

export const cybozushikiLauncher = async () => {
  const urls = SITES[SITE.CYBOZUSHIKI].urls;
  const requestHandler = await factory.get();
  const cybosushikiCrawler = new PlaywrightCrawler({ requestHandler });
  return await cybosushikiCrawler.run(urls);
};
