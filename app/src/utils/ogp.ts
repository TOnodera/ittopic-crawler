import { Page } from 'playwright';

export interface OgpInfo {
  ogpTitle: string | null;
  ogpImage: string | null;
  ogpDescription: string | null;
}
export class Ogp {
  async get(page: Page): Promise<OgpInfo> {
    const ogpTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogpImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const ogpDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute('content');
    return {
      ogpTitle,
      ogpImage,
      ogpDescription,
    };
  }
}
