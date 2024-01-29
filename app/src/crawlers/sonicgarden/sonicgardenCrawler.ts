import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/articleStore.js';
import { SonicgardenScraper } from './SonicgardenScraper.js';
import { HandlerFactory } from '@/crawlers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

const client = getPrismaClient();
const store = new ArticleStore(client);
const scraper = new SonicgardenScraper();
const domain = new ArticleDomain(store, SITE.SONICGARDEN);
const factory = new HandlerFactory(scraper, SITE.SONICGARDEN, domain);

export const sonicgardenLauncher = async () => {
  const urls = SITES[SITE.SONICGARDEN].urls;
  const requestHandler = await factory.get();
  const sonicgardenCrawler = new PlaywrightCrawler({ requestHandler });
  return await sonicgardenCrawler.run(urls);
};
