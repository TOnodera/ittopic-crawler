// For more information, see https://crawlee.dev/
import { log } from 'crawlee';
import { qiitaLauncher } from './crawlers/qiita/qiitaCrawler.js';
import { classmethodLauncher } from './crawlers/classmethod/classmethodCrawler.js';
import { cybozushikiLauncher } from './crawlers/cybozushiki/cybozushikiCrawler.js';

log.setLevel(log.LEVELS.INFO);
// 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
//await qiitaLauncher();
//await classmethodLauncher();
await cybozushikiLauncher();
