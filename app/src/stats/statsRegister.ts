import { CrawlerStatsRegister } from '@/domain/CrawlerStatsRegister.js';
import { CrawlerStatsStore } from '@/store/CrawlerStatsStore.js';
import { getPrismaClient } from '@/store/prismaClient.js';
import { domainToASCII } from 'url';

const client = getPrismaClient();
const store = new CrawlerStatsStore(client);
export const statsRegister = new CrawlerStatsRegister(store);
