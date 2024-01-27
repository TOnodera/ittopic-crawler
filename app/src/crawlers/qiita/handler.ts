import { createPlaywrightRouter } from 'crawlee';
import { createHash } from 'crypto';
import { createArticle, getArticleByContentId, updateArticle } from '@/store/articleStore.js';
import { SITE } from '@/config.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { logger } from '@/utils.js';

export const requestHandler = createPlaywrightRouter();
const client = getPrismaClient();

requestHandler.addHandler('ARTICLE', async ({ request, page, log }) => {
  // データ取得部
  const title = await page.title();
  const content = await page.locator('.style-itrjxe').first().textContent();
  const contentHash = createHash('md5')
    .update(content || '')
    .digest('hex');
  const url = request.url;
  const contentId = url.split('/').pop() as string;

  /**
   * データ登録部
   */
  const newArticle = { title, contentHash, siteId: SITE.QIITA, contentId, url };
  // データが存在しない場合は新規登録
  const oldArticle = await getArticleByContentId(client, SITE.QIITA, contentId);
  if (!oldArticle) {
    await createArticle(client, newArticle);
    logger.info(`title: ${newArticle.title}を登録しました`);
  }
  // データは存在するが、ハッシュ値が登録済みデータと一致しない場合はデータが更新されたとみなしてDBも更新する
  else {
    if (oldArticle.contentHash != newArticle.contentHash) {
      await updateArticle(client, { ...oldArticle, ...newArticle });
      logger.info(`title: ${newArticle.title}を更新しました`);
    }
  }
});

requestHandler.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  const selector = 'article.style-l2axsx > a';
  // Extract links from the current page
  // and add them to the crawling queue.
  const result = await enqueueLinks({ selector, label: 'ARTICLE' });
  if (0 < result.unprocessedRequests.length) {
    // 指定したセレクタでデータが取得できない場合はhtml構造が変化した可能性があるので通知処理を行う
  }
});
