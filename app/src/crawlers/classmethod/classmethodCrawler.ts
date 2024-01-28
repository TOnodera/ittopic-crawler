import { PlaywrightCrawler, createPlaywrightRouter } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/articleStore.js';
import HandlerFactory from '../HandlerFactory.js';
import ClassmethodScraper from './ClassmethodScraper.js';

const client = getPrismaClient();
const store = new ArticleStore(client);
const scraper = new ClassmethodScraper();
const factory = new HandlerFactory(store, scraper, SITE.CLASSMETHOD);

export const classmethodLauncher = async () => {
  const urls = SITES[SITE.CLASSMETHOD].urls;
  const requestHandler = await factory.get();
  const classmethodCrawler = new PlaywrightCrawler({ requestHandler });
  return await classmethodCrawler.run(urls);
};
