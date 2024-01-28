import { test, describe, expect } from '@jest/globals';
import { SITE } from '../../src/config';
import {
  createArticle,
  getArticle,
  getArticleByContentId,
  updateArticle,
} from '../../src/store/articleStore';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
const fixture = {
  title: 'test1',
  contentHash: 'hash',
  contentId: 'ad9fa9234',
  url: 'https://example.com',
  siteId: 1,
};

describe('articleStoreのテスト', () => {
  test('記事データの登録ができること', async () => {
    await createArticle(client, fixture);
  });
  test('記事データをIDで取得できること', async () => {
    const article = await getArticle(client, 1);
    expect(article?.id).toBe(1);
    expect(article?.title).toBe('test1');
    expect(article?.contentHash).toBe('hash');
  });
  test('記事データをcontentId,siteIdで取得できること', async () => {
    const article = await getArticleByContentId(client, SITE.QIITA, 'ad9fa9234');
    expect(article?.id).toBe(1);
    expect(article?.title).toBe('test1');
    expect(article?.contentHash).toBe('hash');
  });
  test('記事データの更新ができること', async () => {
    const article = await getArticle(client, 1);
    if (article) {
      await updateArticle(client, { ...article, title: 'test2', contentHash: 'hash2' });
    } else {
      throw new Error('想定外のエラー: このエラーが出た場合はテストコードに問題があります');
    }
    const updatedArticle = await getArticle(client, 1);
    expect(updatedArticle?.id).toBe(1);
    expect(updatedArticle?.title).toBe('test2');
    expect(updatedArticle?.contentHash).toBe('hash2');
  });
});
