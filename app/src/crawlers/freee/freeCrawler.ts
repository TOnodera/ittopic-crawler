import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/articleStore.js';
import { FreeeScraper } from './FreeeScraper.js';
import { HandlerFactory } from '@/crawlers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

const client = getPrismaClient();
const store = new ArticleStore(client);
const scraper = new FreeeScraper();
const domain = new ArticleDomain(store, SITE.FREEE);
const factory = new HandlerFactory(scraper, SITE.FREEE, domain);

export const freeeLauncher = async () => {
  const urls = SITES[SITE.FREEE].urls;
  const requestHandler = await factory.get();
  const freeeCrawler = new PlaywrightCrawler({ requestHandler });
  return await freeeCrawler.run(urls);
};
