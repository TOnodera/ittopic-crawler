import { PlaywrightCrawler, createPlaywrightRouter } from 'crawlee';
import { SITES, SITE } from 'src/config.js';
import { getPrismaClient } from 'src/store/prismaClient.js';
import { ArticleStore } from 'src/store/articleStore.js';
import { QiitaScraper } from './QiitaScraper.js';
import { HandlerFactory } from 'src/crawlers/HandlerFactory.js';
import { ArticleDomain } from 'src/domain/ArticleDomain.js';

const client = getPrismaClient();
const store = new ArticleStore(client);
const scraper = new QiitaScraper();
const domain = new ArticleDomain(store, SITE.QIITA);
const factory = new HandlerFactory(scraper, SITE.QIITA, domain);

export const qiitaLauncher = async () => {
  const urls = SITES[SITE.QIITA].urls;
  const requestHandler = await factory.get();
  const qiitaCrawler = new PlaywrightCrawler({ requestHandler });
  return await qiitaCrawler.run(urls);
};
