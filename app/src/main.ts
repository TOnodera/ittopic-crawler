// For more information, see https://crawlee.dev/
import { log } from 'crawlee';
import { qiitaLauncher } from './crawlers/qiita/qiitaCrawler.js';
import { classmethodLauncher } from './crawlers/classmethod/classmethodCrawler.js';

log.setLevel(log.LEVELS.DEBUG);

// Add first URL to the queue and start the crawl.
const results = await Promise.all([await qiitaLauncher(), await classmethodLauncher()]);

for (const result of results) {
  if (0 < result.requestsFailed) {
    // 通知
  }
}
