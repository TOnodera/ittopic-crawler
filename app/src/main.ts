import { BatchEntry } from './application/BatchLauncher.js';
import { applyConfig } from './config.js';
import { http } from './utils/axios.js';
import { logger } from './utils/logger.js';

applyConfig();

const batch = new BatchEntry(http);
batch
  .launch()
  .then(() => logger.info('クローリングが正常に終了しました'))
  .catch((e) => logger.error(`クローリング中にエラーが発生したため処理を終了しました ${e}`));
