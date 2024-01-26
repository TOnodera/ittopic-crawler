// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, log } from 'crawlee';
import { router } from './router.js';

log.setLevel(log.LEVELS.INFO);
const qiitaCrawler = new PlaywrightCrawler({
    requestHandler: router,
    // headless: false
});

// Add first URL to the queue and start the crawl.
await qiitaCrawler.run(['https://qiita.com/']);
