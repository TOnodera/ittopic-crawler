import { PlaywrightCrawler } from 'crawlee';
import { requestHandler } from './handler.js';

export const qiitaLauncher = async () => {
  const urls = ['https://qiita.com/'];
  const qiitaCrawler = new PlaywrightCrawler({ requestHandler });
  return await qiitaCrawler.run(urls);
};
