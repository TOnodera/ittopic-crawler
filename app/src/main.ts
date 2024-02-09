import { BatchEntry } from './application/BatchLauncher.js';
import { http } from './utils/axios.js';
import { logger } from './utils/logger.js';

// 巡回バッチ起動
const batch = new BatchEntry(http);
batch
  .crawl()
  .then(() => logger.info('クローリングが正常に終了しました'))
  .catch((e) => logger.error(`クローリング中にエラーが発生したため処理を終了しました ${e}`));
