import { BatchEntry } from './application/BatchLauncher.js';
import { getPrismaClient } from './store/prismaClient.js';
import { applyConfig } from './config.js';

applyConfig();

const client = getPrismaClient();
const batch = new BatchEntry(client);
batch.launch().then(() => console.log('done'));
