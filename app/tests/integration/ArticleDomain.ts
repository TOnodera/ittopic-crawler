import { test, describe, expect } from '@jest/globals';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { AppStore, NewArticle } from '@/store/AppStore.js';
import { SITE } from '@/config.js';
import { http } from '@/utils/axios';

describe('ArticleDomainのテスト', () => {
  test('正常系 / すべてのデータがセットされている場合は登録できること', () => {
    const article = {
      title: 'title',
      content: 'content',
      contentHash: 'content_hash',
      contentId: 'contentId',
      url: 'https://example.com',
      siteId: SITE.QIITA,
      ogpTitle: 'ogpTitle',
      ogpDescription: 'ogpDesc',
      ogpImage: 'ogpImage',
    } as NewArticle;
    const store = new AppStore(http);
    const domain = new ArticleDomain(store, SITE.QIITA);
    expect(domain.push(article)).toBeTruthy();
  });
  test('正常系 / OGP系のデータはundefinedを許容すること', () => {
    const article = {
      title: 'title',
      content: 'content',
      contentHash: 'content_hash',
      contentId: 'contentId',
      url: 'https://example.com',
      siteId: SITE.QIITA,
      ogpTitle: undefined,
      ogpDescription: undefined,
      ogpImage: undefined,
    } as NewArticle;
    const store = new AppStore(http);
    const domain = new ArticleDomain(store, SITE.QIITA);
    expect(domain.push(article)).toBeTruthy();
  });
});
