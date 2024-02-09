import { SITE } from '@/config.js';
import { Scraper } from './Scraper.js';
import { ClassmethodScraper } from './classmethod/ClassmethodScraper.js';
import { CybozushikiScraper } from './cybozushiki/CybozushikiScraper.js';
import { FreeeScraper } from './freee/FreeeScraper.js';
import { SonicgardenScraper } from './sonicgarden/SonicgardenScraper.js';
import { Ogp } from '@/utils/ogp.js';
import { SansanScraper } from './sansan/SansanScraper.js';

export class ScraperFactory {
  private ogp: Ogp;
  constructor(ogp: Ogp) {
    this.ogp = ogp;
  }
  get(siteId: SITE): Scraper {
    switch (siteId) {
      case SITE.CLASSMETHOD:
        return new ClassmethodScraper(this.ogp);
      case SITE.CYBOZUSHIKI:
        return new CybozushikiScraper(this.ogp);
      case SITE.FREEE:
        return new FreeeScraper(this.ogp);
      case SITE.SONICGARDEN:
        return new SonicgardenScraper(this.ogp);
      case SITE.SANSAN:
        return new SansanScraper(this.ogp);
    }
  }
}
