// For more information, see https://crawlee.dev/
import { log } from 'crawlee';
import { SITE } from './config.js';
import { startCrawling } from './crawler.js';

log.setLevel(log.LEVELS.INFO);
/**
 * データの取得登録を行う
 */
// Promis.all([qiitaLauncher(), freeeLauncher(),...])にしたい
// 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
[
  await startCrawling(SITE.CLASSMETHOD),
  await startCrawling(SITE.CYBOZUSHIKI),
  await startCrawling(SITE.FREEE),
  await startCrawling(SITE.QIITA),
  await startCrawling(SITE.SONICGARDEN),
].forEach((stats) => {
  console.log(stats);
});
