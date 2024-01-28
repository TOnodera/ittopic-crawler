import { test, describe, expect } from '@jest/globals';
import { ArticleDomain } from '@/domain/ArticleDomain.js';
import { ArticleStore, NewArticle } from '@/store/articleStore.js';
import { PrismaClient } from '@prisma/client';
import { SITE } from '@/config.js';

test('hoge', () => {});
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
  test('タイトルがない場合はfalse', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    expect(await domain.save({ ...article, title: ' ' })).toBeFalsy();
  });
  test('本文がない場合はfalse', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    expect(await domain.save({ ...article, content: ' ' })).toBeFalsy();
  });
  test('既存データがない場合は新規登録', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    expect(await domain.save(article)).toBeTruthy();
  });
  test('既存データがある場合は更新', async () => {
    const domain = new ArticleDomain(store, SITE.QIITA);
    const updatedContent = 'content2';
    const updatingArticle = { ...article, content: updatedContent };
    console.error(updatingArticle);
    expect(await domain.save(updatingArticle)).toBeTruthy();
    const oldArticle = await store.getArticle(2);
    console.debug(oldArticle);
    expect(oldArticle?.content).toBe(updatedContent);
  });
});
