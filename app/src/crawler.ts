import { PlaywrightCrawler } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { ArticleStore } from '@/store/ArticleStore.js';
import { HandlerFactory } from './scrapers/HandlerFactory.js';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ScraperFactory } from './scrapers/ScraperFactory.js';
import { CrawlerStats } from './store/CrawlerStatsStore.js';

/**
 * サイトを巡回してデータの取得を行う。
 * サイトごとに構造は違うので具体的なデータの取得はScraperが行う。
 * この関数の前半部分でサイトごとの依存関係を生成して依存性の注入を行っている。
 *
 * 後半でクローラーを起動して処理開始。
 *
 * @param siteId
 * @returns Promise<CrawlerStats>
 */
export const startCrawling = async (siteId: SITE): Promise<CrawlerStats> => {
  const client = getPrismaClient();
  const store = new ArticleStore(client);
  const scraper = ScraperFactory.get(siteId);
  const domain = new ArticleDomain(store, siteId);
  const handleFactory = new HandlerFactory(scraper, siteId, domain);

  const urls = SITES[siteId].urls;
  const requestHandler = await handleFactory.get();
  const classmethodCrawler = new PlaywrightCrawler({ requestHandler });
  const result = await classmethodCrawler.run(urls);
  return { ...result, siteId };
};
