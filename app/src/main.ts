import { BatchEntry } from './application/BatchLauncher.js';
import { applyConfig } from './config.js';

applyConfig();

const client = getPrismaClient();
const batch = new BatchEntry(client);
batch.launch().then(() => console.log('done'));
