import { log } from 'crawlee';
import { SITE } from './config.js';
import { startCrawling } from './crawler.js';
import { statsRegister } from './stats/statsRegister.js';
import { logger } from './utils/logger.js';

/**
 * データの取得登録を行う
 */
try {
  log.setLevel(log.LEVELS.INFO);
  // Promis.all([qiitaLauncher(), freeeLauncher(),...])にしたい
  // 並列化したいけどcrawlee側でまだ未対応（experimental)だったので辞めとく
  [
    // await startCrawling(SITE.CLASSMETHOD),
    await startCrawling(SITE.CYBOZUSHIKI),
    await startCrawling(SITE.FREEE),
    // await startCrawling(SITE.QIITA),
    // await startCrawling(SITE.SONICGARDEN),
  ]
    // 統計情報の保存(事後処理)
    .forEach(statsRegister.regist);
} catch (e) {
  console.log(e);
}
