export interface OgpInfo {
  ogpTitle: string | undefined;
  ogpImage: string | undefined;
  ogpDescription: string | undefined;
}
export class Ogp {
  get($: cheerio.CheerioAPI): OgpInfo {
    const ogpTitle = $('meta[property="og:title"]').attr('content');
    const ogpImage = $('meta[property="og:image"]').attr('content');
    const ogpDescription = $('meta[property="og:description"]').attr('content');
    return {
      ogpTitle,
      ogpImage,
      ogpDescription,
    };
  }
}
