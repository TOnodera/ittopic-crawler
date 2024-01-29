import { SITE } from '@/config.js';
import { Scraper } from './Scraper.js';
import { ClassmethodScraper } from './classmethod/ClassmethodScraper.js';
import { CybozushikiScraper } from './cybozushiki/CybozushikiScraper.js';
import { FreeeScraper } from './freee/FreeeScraper.js';
import { QiitaScraper } from './qiita/QiitaScraper.js';
import { SonicgardenScraper } from './sonicgarden/SonicgardenScraper.js';

export class ScraperFactory {
  static get(siteId: SITE): Scraper {
    switch (siteId) {
      case SITE.CLASSMETHOD:
        return new ClassmethodScraper();
      case SITE.CYBOZUSHIKI:
        return new CybozushikiScraper();
      case SITE.FREEE:
        return new FreeeScraper();
      case SITE.QIITA:
        return new QiitaScraper();
      case SITE.SONICGARDEN:
        return new SonicgardenScraper();
    }
  }
}
