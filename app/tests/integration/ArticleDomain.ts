import { test, describe, expect } from '@jest/globals';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { AppStore, NewArticle } from '@/store/AppStore.js';
import { SITE } from '@/config.js';

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
describe('ArticleDomainのテスト', () => {});
