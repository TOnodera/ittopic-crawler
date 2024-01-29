import { PlaywrightCrawler, createPlaywrightRouter } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { HandlerFactory } from '../HandlerFactory.js';
import { ClassmethodScraper } from './ClassmethodScraper.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';

export const classmethodLauncher = async (siteId: SITE) => {
  const client = getPrismaClient();
  const store = new ArticleStore(client);
  const scraper = new ClassmethodScraper();
  const domain = new ArticleDomain(store, siteId);
  const factory = new HandlerFactory(scraper, siteId, domain);

  const urls = SITES[SITE.CLASSMETHOD].urls;
  const requestHandler = await factory.get();
  const classmethodCrawler = new PlaywrightCrawler({ requestHandler });
  return await { ...classmethodCrawler.run(urls), siteId };
};
