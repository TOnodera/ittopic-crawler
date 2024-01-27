import { PlaywrightCrawler } from 'crawlee';
import { requestHandler } from './handler.js';

const urls = ['https://qiita.com/'];
const qiitaCrawler = new PlaywrightCrawler({ requestHandler });

export const qiitaLauncher = async () => {
  return await qiitaCrawler.run(urls);
};
