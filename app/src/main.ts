// For more information, see https://crawlee.dev/
import { log } from 'crawlee';
import { SITE } from './config.js';
import { startCrawling } from './crawler.js';

log.setLevel(log.LEVELS.INFO);
// 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
// await qiitaLauncher();
// await classmethodLauncher();
// const stats = await freeeLauncher();
await startCrawling(SITE.QIITA);

// 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
// Promis.all([qiitaLauncher(), freeeLauncher(),...])にしたい
