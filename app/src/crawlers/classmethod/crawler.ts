import { PlaywrightCrawler, createPlaywrightRouter } from 'crawlee';
import { SITES, SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { createHash } from 'crypto';
import { createArticle, getArticleByContentId, updateArticle } from '@/store/articleStore.js';
import { logger } from '@/utils.js';

const requestHandler = createPlaywrightRouter();
const client = getPrismaClient();

requestHandler.addHandler('ARTICLE', async ({ request, page }) => {
  // データ取得部
  const title = await page.title();
  const content = await page.locator('div.main > .content').first().textContent();
  const contentHash = createHash('md5')
    .update(content as string)
    .digest('hex');
  const url = request.url;
  const contentId = url.split('/').slice(-2)[0] as string;
  console.error(contentId);

  /**
   * データ登録部
   */
  const newArticle = { title, contentHash, siteId: SITE.CLASSMETHOD, contentId, url };
  // データが存在しない場合は新規登録
  const oldArticle = await getArticleByContentId(client, SITE.CLASSMETHOD, contentId);
  if (!oldArticle) {
    await createArticle(client, newArticle);
    logger.info(`title: ${newArticle.title}を登録しました: ${newArticle}`);
  }
  // データは存在するが、ハッシュ値が登録済みデータと一致しない場合はデータが更新されたとみなしてDBも更新する
  else {
    if (oldArticle.contentHash != newArticle.contentHash) {
      await updateArticle(client, { ...oldArticle, ...newArticle });
      logger.info(`title: ${newArticle.title}を更新しました`);
    }
  }
  console.error(oldArticle, newArticle);
});

requestHandler.addDefaultHandler(async ({ enqueueLinks }) => {
  const selector = 'div.post-container > a';
  // Extract links from the current page
  // and add them to the crawling queue.
  const result = await enqueueLinks({ selector, label: 'ARTICLE' });
  if (0 < result.unprocessedRequests.length) {
    // 指定したセレクタでデータが取得できない場合はhtml構造が変化した可能性があるので通知処理を行う
  }
});

export const classmethodLauncher = async () => {
  console.log(SITES, SITES[SITE.CLASSMETHOD]);
  const urls = SITES[SITE.CLASSMETHOD].urls;
  const classmethodCrawler = new PlaywrightCrawler({ requestHandler });
  return await classmethodCrawler.run(urls);
};
