import { BatchEntry } from './application/BatchLauncher.js';
import { applyConfig } from './config.js';
import { http } from './utils/axios.js';

applyConfig();

const batch = new BatchEntry(http);
batch.launch().then(() => console.log('done'));
