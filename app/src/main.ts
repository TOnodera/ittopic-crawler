// For more information, see https://crawlee.dev/
import { log } from 'crawlee';
import { qiitaLauncher } from './crawlers/qiita/qiitaCrawler.js';
import { classmethodLauncher } from './crawlers/classmethod/classmethodCrawler.js';
import { cybozushikiLauncher } from './crawlers/cybozushiki/cybozushikiCrawler.js';
import { sonicgardenLauncher } from './crawlers/sonicgarden/sonicgardenCrawler.js';
import { freeeLauncher } from './crawlers/freee/freeCrawler.js';
import { SITE } from './config.js';

log.setLevel(log.LEVELS.INFO);
// 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
// await qiitaLauncher();
// await classmethodLauncher();
await cybozushikiLauncher(SITE.CYBOZUSHIKI);
await sonicgardenLauncher(SITE.SONICGARDEN);
// const stats = await freeeLauncher();

// 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
// Promis.all([qiitaLauncher(), freeeLauncher(),...])にしたい
