import { createPlaywrightRouter } from 'crawlee';
import { createHash } from 'crypto';

export const requestHandler = createPlaywrightRouter();

requestHandler.addHandler('ARTICLE', async ({ request, page, log }) => {
  const title = await page.title();
  const content = await page.locator('.style-itrjxe').first().textContent();
  const hash = createHash('md5')
    .update(content || '')
    .digest('hex');
  const url = request.url;
  log.info(`title is ${title},url: ${url},content-hash: ${hash}`);
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
