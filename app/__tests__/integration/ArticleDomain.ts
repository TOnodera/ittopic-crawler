import { test, describe, expect } from '@jest/globals';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ArticleStore, NewArticle } from '@/store/ArticleStore.js';
import { PrismaClient } from '@prisma/client';
import { SITE } from '@/config.js';
import { resetAndSeedDatabase, resetDatabase } from '../settings/utility.js';

const client = new PrismaClient();
const store = new ArticleStore(client);
const article = {
  title: 'title',
  content: 'content',
  contentHash: 'content_hash',
  contentId: 'contentId',
  url: 'https://example.com',
  siteId: SITE.QIITA,
} as NewArticle;
describe('ArticleDomainのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });
  test('タイトルがない場合はfalse', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    const result = await domain.save({ ...article, title: ' ' });
    expect(result).toBeFalsy();
  });
  test('本文がない場合はfalse', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    const result = await domain.save({ ...article, content: ' ' });
    expect(result).toBeFalsy();
  });
  test('既存データがない場合は新規登録', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    const result = await domain.save(article);
    expect(result).toBeTruthy();
  });
  test('既存データがある場合は更新', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    const updatedContent = 'content2';
    const updatingArticle = { ...article, content: updatedContent };
    const updatedArticle = await domain.save(updatingArticle);
    expect(updatedArticle).toBeTruthy();
    const oldArticle = await store.getArticle(1);
    expect(oldArticle?.content).toBe(updatedContent);
  });
});
